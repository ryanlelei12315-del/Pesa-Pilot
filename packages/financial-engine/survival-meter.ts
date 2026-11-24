/**
 * Financial Survival Meter Module
 * Calculates financial safety metrics based on available funds and upcoming obligations.
 */

import { Transaction, FinancialAccount, FinancialGoal, RecurringPayment } from "../types";

/**
 * Calculate available balance (total available across all accounts)
 */
export function calculateAvailableBalance(
  accounts: FinancialAccount[]
): number {
  return accounts.reduce(
    (sum, account) => sum + (account.availableBalance || 0),
    0
  );
}

/**
 * Calculate reserved balance (total reserved across all accounts)
 */
export function calculateReservedBalance(
  accounts: FinancialAccount[]
): number {
  return accounts.reduce(
    (sum, account) => sum + (account.reservedBalance || 0),
    0
  );
}

/**
 * Calculate total balance
 */
export function calculateTotalBalance(
  accounts: FinancialAccount[]
): number {
  return accounts.reduce(
    (sum, account) => sum + (account.balance || 0),
    0
  );
}

/**
 * Calculate upcoming obligations from recurring payments
 */
export function calculateUpcomingObligations(
  recurringPayments: RecurringPayment[],
  lookAheadDays: number = 30
): {
  total: number;
  byType: Record<string, number>;
  nextPaymentDate: Date | null;
} {
  const today = new Date();
  const cutoffDate = new Date(today.getTime() + lookAheadDays * 24 * 60 * 60 * 1000);
  
  let total = 0;
  const byType: Record<string, number> = {};
  let nextPaymentDate: Date | null = null;
  
  recurringPayments.forEach((payment) => {
    if (payment.isActive && payment.nextDueDate) {
      const dueDate = new Date(payment.nextDueDate);
      if (dueDate <= cutoffDate) {
        total += payment.amount;
        byType[payment.type] = (byType[payment.type] || 0) + payment.amount;
        
        if (!nextPaymentDate || dueDate < nextPaymentDate) {
          nextPaymentDate = dueDate;
        }
      }
    }
  });
  
  return { total, byType, nextPaymentDate };
}

/**
 * Calculate days until next income
 */
export function calculateDaysUntilNextIncome(
  incomeSources: any[],
  transactions: Transaction[]
): number | null {
  // Find expected income (not yet received)
  const expectedIncome = incomeSources
    .filter((src) => src.isActive)
    .reduce((total, src) => total + src.amount, 0);
  
  // Check if any expected income has been received
  const receivedIncome = transactions
    .filter((t) => t.transactionType === "INCOME")
    .reduce((total, t) => total + t.amount, 0);
  
  if (receivedIncome >= expectedIncome) return 0; // All income received
  
  // Calculate days until next expected income
  // This is a simplified calculation - in a real app, we'd look at frequency and start dates
  return null; // Placeholder - would need more sophisticated logic
}

/**
 * Calculate safe-to-spend amount
 * Based on available balance minus reserved funds and upcoming obligations
 */
export function calculateSafeToSpend(
  accounts: FinancialAccount[],
  recurringPayments: RecurringPayment[],
  lookAheadDays: number = 30
): number {
  const available = calculateAvailableBalance(accounts);
  const reserved = calculateReservedBalance(accounts);
  const obligations = calculateUpcomingObligations(recurringPayments, lookAheadDays);
  
  // Safe to spend = available - reserved - upcoming obligations
  const safeAmount = available - reserved - obligations.total;
  
  return Math.max(0, safeAmount);
}

/**
 * Calculate financial runway (how many days funds will last)
 */
export function calculateFinancialRunway(
  accounts: FinancialAccount[],
  recurringPayments: RecurringPayment[],
  monthlyIncome: number = 0
): {
  days: number;
  dailySpend: number;
  totalAvailable: number;
  monthlyObligations: number;
} {
  const available = calculateAvailableBalance(accounts);
  const monthlyObligations = calculateUpcomingObligations(recurringPayments, 30).total;
  const netMonthly = monthlyIncome - monthlyObligations;
  const dailySpend = netMonthly > 0 ? 0 : Math.abs(netMonthly / 30);
  
  const days = dailySpend > 0 ? available / dailySpend : Infinity;
  
  return {
    days: Math.floor(days),
    dailySpend: Math.round(dailySpend),
    totalAvailable: available,
    monthlyObligations: Math.round(monthlyObligations),
  };
}

/**
 * Calculate reserve adequacy percentage
 */
export function calculateReserveAdequacy(
  accounts: FinancialAccount[],
  monthlyExpenses: number
): { percentage: number; adequate: boolean; monthsCovered: number } {
  const reserved = calculateReservedBalance(accounts);
  const monthlyExpensesAdjusted = monthlyExpenses || 1;
  
  const monthsCovered = reserved / monthlyExpensesAdjusted;
  const adequate = monthsCovered >= 3; // Adequate if 3+ months covered
  const percentage = Math.min((monthsCovered / 3) * 100, 100);
  
  return { percentage: Math.round(percentage), adequate, monthsCovered: Math.floor(monthsCovered) };
}

/**
 * Calculate emergency fund status
 */
export function calculateEmergencyFundStatus(
  accounts: FinancialAccount[],
  monthlyExpenses: number
): {
  hasEmergencyFund: boolean;
  fundSize: number;
  monthsCovered: number;
  recommendation: string;
} {
  const reserved = calculateReservedBalance(accounts);
  const monthsCovered = reserved / monthlyExpenses;
  
  const hasEmergencyFund = reserved >= monthlyExpenses * 3;
  
  let recommendation = "";
  if (!hasEmergencyFund && monthsCovered < 1) {
    recommendation = "Build emergency fund - aim for 3 months of expenses";
  } else if (!hasEmergencyFund && monthsCovered < 3) {
    recommendation = "Continue building emergency fund - you have " + Math.floor(monthsCovered) + " month(s) covered";
  } else if (hasEmergencyFund && monthsCovered < 6) {
    recommendation = "Good - consider building emergency fund to 6 months of expenses";
  } else {
    recommendation = "Excellent - emergency fund is well-funded";
  }
  
  return {
    hasEmergencyFund,
    fundSize: reserved,
    monthsCovered: Math.floor(monthsCovered),
    recommendation,
  };
}

export default {
  calculateAvailableBalance,
  calculateReservedBalance,
  calculateTotalBalance,
  calculateUpcomingObligations,
  calculateDaysUntilNextIncome,
  calculateSafeToSpend,
  calculateFinancialRunway,
  calculateReserveAdequacy,
  calculateEmergencyFundStatus,
};
