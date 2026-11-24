/**
 * Financial Time Machine Module
 * Interactive scenario simulator for "what-if" financial decisions.
 */

import { Transaction, FinancialAccount, FinancialGoal, Budget } from "../types";

/**
 * Scenario result from a financial simulation
 */
export interface ScenarioResult {
  currentBalance: number;
  projectedBalance: number;
  cashFlowImpact: number;
  goalImpact: {
    goalId: string;
    currentAmount: number;
    projectedAmount: number;
    onTrack: boolean;
  }[];
  riskIndicators: string[];
  recommendations: string[];
}

/**
 * Run a "what if I spend KSh X today" scenario
 */
export function simulateSpendScenario(
  currentBalance: number,
  amount: number,
  transactions: Transaction[],
  accounts: FinancialAccount[]
): ScenarioResult {
  const newBalance = currentBalance - amount;
  const cashFlowImpact = -amount;
  
  // Calculate impact on goals
  const goalImpact = transactions
    .filter((t) => t.transactionType === "GOAL")
    .map((t) => ({
      goalId: t.reference || "unknown",
      currentAmount: 0, // Would need goal data
      projectedAmount: 0, // Would need goal data
      onTrack: false,
    }));
  
  // Risk indicators
  const riskIndicators: string[] = [];
  if (newBalance < 0) {
    riskIndicators.push("Balance would go negative");
  }
  if (amount > currentBalance * 0.2) {
    riskIndicators.push("Large discretionary spend relative to balance");
  }
  
  // Recommendations
  const recommendations: string[] = [];
  if (newBalance < 0) {
    recommendations.push("Consider reducing the spend amount");
  }
  if (newBalance > 0 && newBalance < 1000) {
    recommendations.push("Remaining balance is low - consider saving");
  }
  
  return {
    currentBalance,
    projectedBalance: newBalance,
    cashFlowImpact,
    goalImpact,
    riskIndicators,
    recommendations,
  };
}

/**
 * Run a "what if I save KSh X daily" scenario
 */
export function simulateSaveScenario(
  currentBalance: number,
  dailyAmount: number,
  days: number,
  transactions: Transaction[],
  accounts: FinancialAccount[]
): ScenarioResult {
  const totalSavings = dailyAmount * days;
  const newBalance = currentBalance + totalSavings;
  const cashFlowImpact = totalSavings;
  
  const riskIndicators: string[] = [];
  if (currentBalance < 0 && totalSavings < Math.abs(currentBalance)) {
    riskIndicators.push("Saving may not cover negative balance");
  }
  
  const recommendations: string[] = [];
  recommendations.push(`Saving KSh ${dailyAmount} daily for ${days} days will add KSh ${totalSavings} to your balance`);
  if (newBalance > 0) {
    recommendations.push("Your balance will be positive after the savings period");
  }
  
  return {
    currentBalance,
    projectedBalance: newBalance,
    cashFlowImpact,
    goalImpact: [],
    riskIndicators,
    recommendations,
  };
}

/**
 * Run a "what if my HELB payment is delayed by X days" scenario
 */
export function simulateHELBDelayScenario(
  currentBalance: number,
  helbAmount: number,
  delayDays: number,
  recurringPayments: any[],
  lookAheadDays: number = 30
): ScenarioResult {
  const delayedObligations = recurringPayments
    .filter((p) => p.isActive)
    .reduce((total, p) => total + p.amount, 0);
  
  const newBalance = currentBalance - delayedObligations; // Without HELB income
  const cashFlowImpact = -delayedObligations;
  
  const riskIndicators: string[] = [];
  if (newBalance < 0) {
    riskIndicators.push("May struggle without HELB disbursement");
  }
  if (delayDays > 14) {
    riskIndicators.push("Delay of " + delayDays + " days is significant");
  }
  
  const recommendations: string[] = [];
  if (newBalance < 0) {
    recommendations.push("Consider alternative income sources or budget adjustments");
  }
  recommendations.push("Contact HELB for expected disbursement date");
  
  return {
    currentBalance,
    projectedBalance: newBalance,
    cashFlowImpact,
    goalImpact: [],
    riskIndicators,
    recommendations,
  };
}

/**
 * Run a "what if I purchase a laptop for KSh X" scenario
 */
export function simulatePurchaseScenario(
  currentBalance: number,
  amount: number,
  isEssential: boolean = false,
  transactions: Transaction[],
  accounts: FinancialAccount[]
): ScenarioResult {
  const newBalance = currentBalance - amount;
  const cashFlowImpact = -amount;
  
  const riskIndicators: string[] = [];
  if (amount > currentBalance) {
    riskIndicators.push("Purchase exceeds current balance");
  }
  if (!isEssential && amount > currentBalance * 0.5) {
    riskIndicators.push("Large discretionary purchase relative to balance");
  }
  
  const recommendations: string[] = [];
  if (newBalance < 0) {
    recommendations.push("Consider saving up for the purchase");
    recommendations.push("Look for deals or installment options");
  }
  if (isEssential) {
    recommendations.push("Essential purchase - ensure remaining balance covers obligations");
  }
  recommendations.push("Track this expense to understand spending patterns");
  
  return {
    currentBalance,
    projectedBalance: newBalance,
    cashFlowImpact,
    goalImpact: [],
    riskIndicators,
    recommendations,
  };
}

/**
 * Run a comprehensive scenario simulation
 */
export function runScenarioSimulation(
  currentBalance: number,
  scenarios: {
    type: "spend" | "save" | "helb_delay" | "purchase";
    amount?: number;
    dailyAmount?: number;
    days?: number;
    helbAmount?: number;
    delayDays?: number;
    isEssential?: boolean;
  }[],
  accounts: FinancialAccount[],
  transactions: Transaction[],
  recurringPayments: any[]
): ScenarioResult[] {
  return scenarios.map((scenario) => {
    switch (scenario.type) {
      case "spend":
        return simulateSpendScenario(
          currentBalance,
          scenario.amount || 0,
          transactions,
          accounts
        );
      case "save":
        return simulateSaveScenario(
          currentBalance,
          scenario.dailyAmount || 0,
          scenario.days || 30,
          transactions,
          accounts
        );
      case "helb_delay":
        return simulateHELBDelayScenario(
          currentBalance,
          scenario.helbAmount || 0,
          scenario.delayDays || 14,
          recurringPayments
        );
      case "purchase":
        return simulatePurchaseScenario(
          currentBalance,
          scenario.amount || 0,
          scenario.isEssential ?? false,
          transactions,
          accounts
        );
      default:
        return {
          currentBalance,
          projectedBalance: currentBalance,
          cashFlowImpact: 0,
          goalImpact: [],
          riskIndicators: [],
          recommendations: ["Unknown scenario type"],
        };
    }
  });
}

export default {
  simulateSpendScenario,
  simulateSaveScenario,
  simulateHELBDelayScenario,
  simulatePurchaseScenario,
  runScenarioSimulation,
};
