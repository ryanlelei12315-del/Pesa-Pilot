/**
 * Transaction Duplicate Detection
 * Prevents repeated SMS imports, duplicate transaction references, 
 * and duplicate financial records.
 */

import { MpesaSmsOutput, parseMpesaSms } from "./mpesa-parser";

/**
 * Fingerprint a transaction based on its key identifying characteristics.
 * This is used as a fallback when the provider transaction ID is not available.
 */
export function generateTransactionFingerprint(
  transaction: MpesaSmsOutput
): string {
  const { amount, transactionType, transactionDate, counterparty } = transaction;
  // Create a hash-like fingerprint from key fields
  const input = `${amount}-${transactionType}-${transactionDate}-${counterparty || ""}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0; // Bitwise hash
  }
  return (hash >>> 0).toString(16);
}

/**
 * Checks if a transaction already exists in the transactions list.
 * Uses provider transaction ID as the primary check, with fallback to fingerprint.
 * 
 * @param existingTransactions List of existing transactions
 * @param newTransaction The new transaction to check
 * @returns True if the transaction is a duplicate
 */
export function isDuplicateTransaction(
  existingTransactions: Array<Partial<MpesaSmsOutput> & { reference?: string }>,
  newTransaction: MpesaSmsOutput
): boolean {
  // First check: provider transaction reference (if available)
  if (newTransaction.transactionCode) {
    const exists = existingTransactions.some(
      (tx) => tx.reference === newTransaction.transactionCode || tx.transactionCode === newTransaction.transactionCode
    );
    if (exists) {
      return true;
    }
  }

  // Second check: transaction fingerprint (fallback)
  const fingerprint = generateTransactionFingerprint(newTransaction);
  const exists = existingTransactions.some(
    (tx) => {
      if (!tx.amount || !tx.transactionType || !tx.transactionDate) return false;
      const existingFingerprint = generateTransactionFingerprint(tx as MpesaSmsOutput);
      return existingFingerprint === fingerprint;
    }
  );
  
  return exists;
}

/**
 * Removes duplicate transactions from a list, keeping only the first occurrence.
 * 
 * @param transactions List of transactions (may contain duplicates)
 * @returns Unique transactions list
 */
export function removeDuplicates(
  transactions: MpesaSmsOutput[]
): MpesaSmsOutput[] {
  const unique: MpesaSmsOutput[] = [];
  const seen = new Set<string>();
  
  for (const tx of transactions) {
    const fingerprint = generateTransactionFingerprint(tx);
    if (!seen.has(fingerprint)) {
      seen.add(fingerprint);
      unique.push(tx);
    }
  }
  
  return unique;
}

/**
 * SMS Import History Tracker
 * Tracks imported messages to prevent repeated imports.
 */
export class SmsImportHistory {
  private importedReferences: Set<string> = new Set();

  /**
   * Mark a message as imported.
   * 
   * @param messageReference The reference of the message to mark
   */
  markImported(messageReference: string): void {
    this.importedReferences.add(messageReference);
  }

  /**
   * Check if a message has already been imported.
   * 
   * @param messageReference The reference to check
   * @returns True if the message has been imported
   */
  isImported(messageReference: string): boolean {
    return this.importedReferences.has(messageReference);
  }

  /**
   * Get the count of imported messages.
   */
  getImportCount(): number {
    return this.importedReferences.size;
  }

  /**
   * Get all imported message references.
   */
  getImportedReferences(): Set<string> {
    return new Set(this.importedReferences);
  }
}
