/**
 * Cash Flow Intelligence Module
 * Calculates deterministic financial metrics based on transaction data.
 */

import { FinancialAccount, Transaction, Budget, FinancialGoal, RecurringPayment } from "../types";

/**
 * Calculate total income for a user
 */
export function calculateTotalIncome(
  transactions: Transaction[],
  incomeThreshold: number = 0
): number {
  return transactions
    .filter((t) => t.transactionType === "INCOME" && t.amount > incomeThreshold)
    .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Calculate total expenditure for a user
 */
export function calculateTotalExpenditure(
  transactions: Transaction[],
  expenseThreshold: number = 0
): number {
  return transactions
    .filter((t) => t.transactionType === "EXPENSE" && t.amount > expenseThreshold)
    .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * Calculate net cash flow
 */
export function calculateNetCashFlow(
  transactions: Transaction[]
): number {
  const income = calculateTotalIncome(transactions);
  const expenditure = calculateTotalExpenditure(transactions);
  return income - expenditure;
}

/**
 * Calculate spending velocity (daily average)
 */
export function calculateSpendingVelocity(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): number {
  const periodTransactions = transactions.filter(
    (t) => new Date(t.transactionDate) >= startDate && new Date(t.transactionDate) <= endDate
  );
  
  const expenditure = calculateTotalExpenditure(periodTransactions);
  const days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  
  return days > 0 ? expenditure / days : 0;
}

/**
 * Calculate daily burn rate
 */
export function calculateDailyBurnRate(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): number {
  return calculateSpendingVelocity(transactions, startDate, endDate);
}

/**
 * Calculate weekly spending
 */
export function calculateWeeklySpending(
  transactions: Transaction[],
  startDate: Date
): { weekStart: Date; weekEnd: Date; total: number; byCategory: Record<string, number> } {
  const weekEnd = new Date(startDate);
  weekEnd.setDate(weekEnd.getDate() + 7);
  weekEnd.setHours(23, 59, 59, 999);
  
  const weekTransactions = transactions.filter(
    (t) => new Date(t.transactionDate) >= startDate && new Date(t.transactionDate) <= weekEnd
  );
  
  const total = calculateTotalExpenditure(weekTransactions);
  const byCategory: Record<string, number> = {};
  
  weekTransactions.forEach((t) => {
    const category = t.category || "UNKNOWN";
    byCategory[category] = (byCategory[category] || 0) + t.amount;
  });
  
  return { weekStart: startDate, weekEnd, total, byCategory };
}

/**
 * Calculate monthly spending
 */
export function calculateMonthlySpending(
  transactions: Transaction[],
  month: number,
  year: number
): { total: number; byCategory: Record<string, number>; byAccount: Record<string, number> } {
  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 0);
  
  const monthTransactions = transactions.filter(
    (t) => new Date(t.transactionDate) >= monthStart && new Date(t.transactionDate) <= monthEnd
  );
  
  const total = calculateTotalExpenditure(monthTransactions);
  const byCategory: Record<string, number> = {};
  const byAccount: Record<string, number> = {};
  
  monthTransactions.forEach((t) => {
    const category = t.category || "UNKNOWN";
    byCategory[category] = (byCategory[category] || 0) + t.amount;
    
    if (t.accountId) {
      byAccount[t.accountId] = (byAccount[t.accountId] || 0) + t.amount;
    }
  });
  
  return { total, byCategory, byAccount };
}

/**
 * Calculate category distribution
 */
export function calculateCategoryDistribution(
  transactions: Transaction[]
): Record<string, number> {
  const distribution: Record<string, number> = {};
  
  transactions.forEach((t) => {
    if (t.transactionType === "EXPENSE") {
      const category = t.category || "UNKNOWN";
      distribution[category] = (distribution[category] || 0) + t.amount;
    }
  });
  
  return distribution;
}

/**
 * Calculate savings rate
 */
export function calculateSavingsRate(
  income: number,
  expenditure: number
): number {
  if (income <= 0) return 0;
  return ((income - expenditure) / income) * 100;
}

/**
 * Calculate budget progress
 */
export function calculateBudgetProgress(
  spent: number,
  limit: number
): { percentage: number; remaining: number; overBudget: boolean } {
  const percentage = (spent / limit) * 100;
  const remaining = limit - spent;
  const overBudget = spent > limit;
  
  return { percentage: Math.min(percentage, 100), remaining, overBudget };
}

/**
 * Calculate financial goal progress
 */
export function calculateGoalProgress(
  current: number,
  target: number
): { percentage: number; remaining: number; onTrack: boolean } {
  if (target <= 0) return { percentage: 100, remaining: 0, onTrack: true };
  
  const percentage = (current / target) * 100;
  const remaining = target - current;
  const onTrack = current >= target * 0.5; // On track if 50% reached
  
  return { percentage: Math.min(percentage, 100), remaining, onTrack };
}

/**
 * Calculate cash flow trend
 */
export function calculateCashFlowTrend(
  transactions: Transaction[],
  months: number = 3
): "IMPROVING" | "STABLE" | "DECLINING" {
  // Get transactions for the last N months
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);
  
  const periodTransactions = transactions.filter(
    (t) => new Date(t.transactionDate) >= startDate && new Date(t.transactionDate) <= endDate
  );
  
  // Calculate monthly totals
  const monthlyTotals: number[] = [];
  for (let i = 0; i < months; i++) {
    let month = endDate.getMonth() - i;
    let year = endDate.getFullYear();
    if (month < 0) { month += 12; year -= 1; }
    
    const monthly = calculateMonthlySpending(periodTransactions, month + 1, year);
    monthlyTotals.push(monthly.total);
  }
  
  // Sort descending (most recent first)
  const sorted = [...monthlyTotals].sort((a, b) => b - a);
  
  // Compare first half vs second half
  const midPoint = Math.floor(sorted.length / 2);
  const firstHalf = sorted.slice(0, midPoint).reduce((a, b) => a + b, 0);
  const secondHalf = sorted.slice(midPoint).reduce((a, b) => a + b, 0);
  
  if (firstHalf < secondHalf * 0.8) return "IMPROVING";
  if (firstHalf > secondHalf * 1.2) return "DECLINING";
  return "STABLE";
}

export default {
  calculateTotalIncome,
  calculateTotalExpenditure,
  calculateNetCashFlow,
  calculateSpendingVelocity,
  calculateDailyBurnRate,
  calculateWeeklySpending,
  calculateMonthlySpending,
  calculateCategoryDistribution,
  calculateSavingsRate,
  calculateBudgetProgress,
  calculateGoalProgress,
  calculateCashFlowTrend,
};
