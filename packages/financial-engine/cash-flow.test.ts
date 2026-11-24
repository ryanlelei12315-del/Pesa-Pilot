import { describe, expect, it } from "vitest";
import { calculateNetCashFlow, calculateSavingsRate } from "./cash-flow";
import type { Transaction } from "../types";

describe("cash flow", () => {
  it("does not count transfers as income or spending", () => {
    const transactions: Transaction[] = [{ transactionType: "INCOME", amount: 50000, transactionDate: new Date() }, { transactionType: "EXPENSE", amount: 12500, transactionDate: new Date() }, { transactionType: "TRANSFER", amount: 10000, transactionDate: new Date() }];
    expect(calculateNetCashFlow(transactions)).toBe(37500);
  });
  it("calculates a KES savings rate", () => expect(calculateSavingsRate(50000, 12500)).toBe(75));
});
