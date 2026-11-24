/**
 * M-Pesa SMS Parser
 * Parses M-Pesa SMS messages and normalizes them into transaction objects.
 */

// Normalized output format
export interface MpesaSmsOutput {
  provider: "MPESA";
  transactionType: "EXPENSE" | "INCOME" | "TRANSFER";
  transactionCode: string;
  amount: number; // In minor units (cents)
  currency: "KES";
  counterparty: string | null;
  phoneNumber: string | null;
  transactionDate: string; // ISO date string
  balance: number | null; // Balance after transaction
  rawMessageReference: string;
}

/**
 * Parses an M-Pesa SMS message and returns normalized transaction data.
 * 
 * @param rawMessage The raw SMS text message
 * @returns Normalized transaction data or null if the message cannot be parsed
 */
export function parseMpesaSms(rawMessage: string): MpesaSmsOutput | null {
  const message = rawMessage.trim();
  
  // M-Pesa error message pattern
  if (message.toLowerCase().includes("error") || message.toLowerCase().includes("failed")) {
    return null;
  }

  // Real Safaricom M-Pesa SMS pattern
  // e.g. "QK910248P0 Confirmed. Ksh 650.00 paid to CAMPUS CAFETERIA on 24/11/26 at 1:12 PM. New M-PESA balance is Ksh 13,850.00."
  // or "QK940121L9 Confirmed. Ksh 250.00 sent to 0712345678 JOHN MATATU on 24/11/26..."
  // or "QK955102X4 Confirmed. You have received Ksh 3,000.00 from PETER OMONDI on 24/11/26..."
  const codeMatch = message.match(/^([A-Z0-9]{8,12})\s+Confirmed\./i);
  if (codeMatch) {
    const code = codeMatch[1].toUpperCase();
    const amountMatch = message.match(/(?:Ksh|KES)\s*([\d,.]+)/i);
    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, "")) : 0;
    
    const isCredit = /received|credited|from/i.test(message) && !/sent to|paid to/i.test(message);

    // Counterparty extraction: between 'paid to' / 'sent to' / 'from' and 'on' / '. New'
    let counterparty: string | null = null;
    const cpMatch = message.match(/(?:paid to|sent to|from)\s+(.+?)(?:\s+on\s+|\.\s*New|\.$|$)/i);
    if (cpMatch) {
      counterparty = cpMatch[1].trim();
    }

    // Balance extraction
    let balance: number | null = null;
    const balMatch = message.match(/New M-PESA balance is\s*(?:Ksh|KES)\s*([\d,.]+)/i);
    if (balMatch) {
      balance = Math.round(parseFloat(balMatch[1].replace(/,/g, "")) * 100);
    }

    return {
      provider: "MPESA",
      transactionType: isCredit ? "INCOME" : "EXPENSE",
      transactionCode: code,
      amount: Math.round(amount * 100),
      currency: "KES",
      counterparty,
      phoneNumber: null,
      transactionDate: new Date().toISOString().split("T")[0],
      balance,
      rawMessageReference: code,
    };
  }

  // Pattern: "M-Pesa SMS: KES 500.00 sent to Example Merchant. Balance: KES 1200.00"
  const mpesaPattern = /M-Pesa SMS:\s*KES\s*([\d,.]+)\s*(sent|received)\s*(.+?)(?:\.Balance:\s*KES\s*([\d,.]+))?/i;
  const match = message.match(mpesaPattern);

  if (!match) {
    // Try alternative pattern: "KES 500.00 debited/credited"
    const altPattern = /KES\s*([\d,.]+)\s*(debited|credited)/i;
    const altMatch = message.match(altPattern);
    
    if (altMatch) {
      const amount = parseFloat(altMatch[1].replace(/,/g, ""));
      const isCredit = altMatch[2] === "credited";
      
      return {
        provider: "MPESA",
        transactionType: isCredit ? "INCOME" : "EXPENSE",
        transactionCode: generateTransactionCode(),
        amount: Math.round(amount * 100), // Convert to minor units
        currency: "KES",
        counterparty: extractCounterparty(message),
        phoneNumber: null,
        transactionDate: new Date().toISOString().split("T")[0],
        balance: null,
        rawMessageReference: message.substring(0, 50),
      };
    }
    
    return null;
  }

  const [, rawAmount, action, counterparty, rawBalance] = match;
  const amount = parseFloat(rawAmount.replace(/,/g, ""));
  const isCredit = action.toLowerCase() === "received";
  
  return {
    provider: "MPESA",
    transactionType: isCredit ? "INCOME" : "EXPENSE",
    transactionCode: generateTransactionCode(),
    amount: Math.round(amount * 100), // Convert to minor units
    currency: "KES",
    counterparty: extractCounterparty(message) || match[3].trim(),
    phoneNumber: null,
    transactionDate: new Date().toISOString().split("T")[0],
    balance: rawBalance ? Math.round(parseFloat(rawBalance.replace(/,/g, "")) * 100) : null,
    rawMessageReference: message.substring(0, 50),
  };
}

/**
 * Extracts the counterparty/merchant name from an M-Pesa message.
 */
function extractCounterparty(message: string): string | null {
  // Try to find a merchant name after common M-Pesa keywords
  const keywords = ["M-Pesa", "Buy Goods", "Pay Bill", "Lipa Na M-Pesa"];
  for (const kw of keywords) {
    const idx = message.indexOf(kw);
    if (idx !== -1) {
      const after = message.substring(idx + kw.length).trim();
      // Return the next word or phrase as the counterparty
      const parts = after.split(/\s+/);
      if (parts.length > 0) {
        return parts[0];
      }
    }
  }
  
  // Default: try to extract a reasonable counterparty from the message
  const lines = message.split("\n");
  for (const line of lines) {
    if (line.length > 3 && line.length < 50 && !line.toLowerCase().includes("kes")) {
      return line.trim();
    }
  }
  
  return null;
}

/**
 * Generates a random transaction code.
 */
function generateTransactionCode(): string {
  return Math.random().toString(36).substring(2, 9).toUpperCase();
}

export default { parseMpesaSms };
