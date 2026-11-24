"use client";

import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";

interface AccountOption {
  id: string;
  name: string;
  type: string;
  balance: number;
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: AccountOption[];
  onAdd: (entry: {
    kind: "EXPENSE" | "INCOME" | "TRANSFER";
    amount: number;
    category: string;
    note: string;
    accountId: string;
    date: string;
  }) => void;
}

const CATEGORIES = [
  "FOOD",
  "TRANSPORT",
  "RENT & UTILITIES",
  "ACADEMICS & BOOKS",
  "HELB & GRANTS",
  "SIDE HUSTLE",
  "ENTERTAINMENT",
  "EMERGENCY"
];

export function AddTransactionModal({
  isOpen,
  onClose,
  accounts,
  onAdd
}: AddTransactionModalProps) {
  const [kind, setKind] = useState<"EXPENSE" | "INCOME">("EXPENSE");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("FOOD");
  const [customCategory, setCustomCategory] = useState("");
  const [note, setNote] = useState("");
  const [accountId, setAccountId] = useState(accounts[0]?.id || "");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Please provide a valid amount above 0.");
      return;
    }
    if (!accountId) {
      setError("Please select an account.");
      return;
    }

    const finalCategory = customCategory.trim() || category;

    onAdd({
      kind,
      amount: numericAmount,
      category: finalCategory.toUpperCase(),
      note: note.trim() || finalCategory,
      accountId,
      date
    });

    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(15, 23, 42, 0.45)",
      backdropFilter: "blur(2px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: 16
    }}>
      <div className="card-formal view-enter" style={{
        width: "100%",
        maxWidth: 460,
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        boxShadow: "var(--shadow-lg)",
        padding: 24
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Record Transaction</h3>
          <button onClick={onClose} style={{ color: "#94A3B8", padding: 4 }}>
            <X size={17} />
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: "#FFF1F2",
            border: "1px solid #FECDD3",
            borderRadius: 6,
            padding: "8px 12px",
            color: "#9F1239",
            fontSize: 12,
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 6
          }}>
            <AlertCircle size={14} color="#E11D48" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          {/* Type Toggle */}
          <div style={{ display: "flex", backgroundColor: "#F1F5F9", padding: 3, borderRadius: 8, border: "1px solid #E2E8F0" }}>
            <button
              type="button"
              onClick={() => setKind("EXPENSE")}
              style={{
                flex: 1,
                padding: "7px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                color: kind === "EXPENSE" ? "#FFFFFF" : "#64748B",
                backgroundColor: kind === "EXPENSE" ? "#E11D48" : "transparent"
              }}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setKind("INCOME")}
              style={{
                flex: 1,
                padding: "7px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                color: kind === "INCOME" ? "#FFFFFF" : "#64748B",
                backgroundColor: kind === "INCOME" ? "#059669" : "transparent"
              }}
            >
              Income / HELB
            </button>
          </div>

          {/* Amount */}
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
              Amount (KSh)
            </label>
            <input
              type="number"
              required
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 450"
              style={{ fontSize: 16, fontWeight: 700 }}
            />
          </div>

          {/* Account Selector */}
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
              Source Account
            </label>
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              style={{ fontSize: 13 }}
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} (Bal: KSh {acc.balance.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {/* Category selection */}
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 6, fontWeight: 500 }}>
              Category
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setCustomCategory("");
                  }}
                  style={{
                    fontSize: 11,
                    padding: "3px 8px",
                    borderRadius: 4,
                    backgroundColor: category === cat && !customCategory ? "#059669" : "#F1F5F9",
                    color: category === cat && !customCategory ? "#FFFFFF" : "#475569",
                    border: "1px solid #E2E8F0"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Or type custom category..."
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              style={{ fontSize: 12 }}
            />
          </div>

          {/* Note / Counterparty */}
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
              Note or Merchant
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Java House Lunch or Campus Matatu"
              style={{ fontSize: 13 }}
            />
          </div>

          {/* Date */}
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ fontSize: 13 }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1 }}
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
