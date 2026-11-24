/** Shared, storage-safe finance domain types. Amounts are Kenyan shillings. */
export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER" | "REFUND" | "ADJUSTMENT" | "GOAL";

export interface FinancialAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  availableBalance?: number;
  reservedBalance?: number;
  isActive?: boolean;
}

export interface Transaction {
  id?: string;
  reference?: string | null;
  transactionType: TransactionType;
  amount: number;
  transactionDate: string | Date;
  category?: string | null;
  description?: string | null;
  counterparty?: string | null;
  accountId?: string | null;
}

export interface Budget { id: string; name: string; limitAmount?: number; periodStart?: string | Date; periodEnd?: string | Date; }
export interface FinancialGoal { id: string; name: string; targetAmount: number; currentAmount: number; deadline?: string | Date; }
export interface RecurringPayment { id: string; name: string; type: string; amount: number; nextDueDate: string | Date; isActive: boolean; }
