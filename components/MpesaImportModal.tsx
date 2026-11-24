"use client";

import React, { useState } from "react";
import { parseMpesaSms } from "../packages/transaction-parser/mpesa-parser";
import { classifyTransaction } from "../packages/financial-engine/classification";
import { X, MessageSquare, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";

interface MpesaImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (entry: {
    kind: "EXPENSE" | "INCOME";
    amount: number;
    category: string;
    note: string;
    date: string;
    reference: string;
    balanceAfter: number;
  }) => void;
  existingReferences: string[];
}

const DEMO_SMS_SAMPLES = [
  "QK910248P0 Confirmed. Ksh 650.00 paid to CAMPUS CAFETERIA on 24/11/26 at 1:12 PM. New M-PESA balance is Ksh 13,850.00. Transaction cost, Ksh 0.00.",
  "QK940121L9 Confirmed. Ksh 250.00 sent to 0712345678 JOHN MATATU on 24/11/26 at 8:40 AM. New M-PESA balance is Ksh 13,600.00. Transaction cost, Ksh 0.00.",
  "QK894192M1 Confirmed. Ksh 4,500.00 paid to GREENVIEW HOUSING LTD on 22/11/26 at 9:15 AM. New M-PESA balance is Ksh 9,100.00. Transaction cost, Ksh 23.00.",
  "QK955102X4 Confirmed. You have received Ksh 3,000.00 from PETER OMONDI on 24/11/26 at 11:20 AM. New M-PESA balance is Ksh 12,100.00."
];

export function MpesaImportModal({
  isOpen,
  onClose,
  onImport,
  existingReferences
}: MpesaImportModalProps) {
  const [smsText, setSmsText] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const parsed = parseMpesaSms(smsText);
  const isDuplicate = parsed && existingReferences.includes(parsed.rawMessageReference);
  const category = parsed ? classifyTransaction(parsed.rawMessageReference, parsed.counterparty) : "";

  const handleCommit = () => {
    if (!parsed) {
      setError("Please paste a valid Safaricom M-Pesa confirmation SMS.");
      return;
    }
    if (isDuplicate) {
      setError(`Message with reference ${parsed.rawMessageReference} was already imported.`);
      return;
    }

    onImport({
      kind: parsed.transactionType === "INCOME" ? "INCOME" : "EXPENSE",
      amount: parsed.amount / 100,
      category: category || "MISCELLANEOUS",
      note: `${parsed.counterparty ? `${parsed.counterparty} - ` : ""}${parsed.rawMessageReference}`,
      date: parsed.transactionDate,
      reference: parsed.rawMessageReference,
      balanceAfter: parsed.balance ? parsed.balance / 100 : 0
    });

    setSmsText("");
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
        maxWidth: 520,
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        boxShadow: "var(--shadow-lg)",
        padding: 24
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              backgroundColor: "#ECFDF5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <MessageSquare size={16} color="#059669" />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>M-Pesa SMS Extraction</h3>
              <p style={{ fontSize: 11, color: "#64748B" }}>Automatic categorization from Safaricom receipts</p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: "#94A3B8", padding: 4 }}>
            <X size={17} />
          </button>
        </div>

        {/* Quick sample buttons */}
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 11, color: "#64748B", display: "block", marginBottom: 6 }}>
            Click sample to test:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Cafeteria Lunch", "Matatu Fare", "Bedsitter Rent", "Payment Received"].map((lbl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSmsText(DEMO_SMS_SAMPLES[idx]);
                  setError("");
                }}
                className="btn-secondary btn-sm"
                style={{ fontSize: 11, padding: "3px 8px" }}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div style={{ marginBottom: 14 }}>
          <textarea
            rows={4}
            value={smsText}
            onChange={(e) => {
              setSmsText(e.target.value);
              setError("");
            }}
            placeholder="Paste your M-Pesa confirmation text message here..."
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              backgroundColor: "#F8FAFC",
              border: "1px solid #CBD5E1",
              borderRadius: 8,
              padding: 10,
              color: "#0F172A"
            }}
          />
        </div>

        {/* Live Parse Preview Card */}
        {parsed && (
          <div style={{
            backgroundColor: "#F8FAFC",
            border: isDuplicate ? "1px solid #FCD34D" : "1px solid #A7F3D0",
            borderRadius: 8,
            padding: 12,
            marginBottom: 14
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: isDuplicate ? "#D97706" : "#059669" }}>
                {isDuplicate ? "DUPLICATE ENTRY DETECTED" : "RECEIPT VERIFIED"}
              </span>
              <span className="badge badge-emerald">Category: {category}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
              <div>
                <span style={{ color: "#64748B", display: "block" }}>Reference</span>
                <strong style={{ color: "#0F172A", fontFamily: "monospace" }}>{parsed.rawMessageReference}</strong>
              </div>
              <div>
                <span style={{ color: "#64748B", display: "block" }}>Amount</span>
                <strong style={{ color: parsed.transactionType === "INCOME" ? "#059669" : "#E11D48" }}>
                  {parsed.transactionType === "INCOME" ? "+" : "-"}KSh {(parsed.amount / 100).toLocaleString()}
                </strong>
              </div>
              <div>
                <span style={{ color: "#64748B", display: "block" }}>Merchant / Party</span>
                <span style={{ color: "#0284C7", fontWeight: 600 }}>{parsed.counterparty || "Standard Transfer"}</span>
              </div>
              <div>
                <span style={{ color: "#64748B", display: "block" }}>New M-Pesa Balance</span>
                <span style={{ color: "#0F172A", fontWeight: 600 }}>
                  {parsed.balance ? `KSh ${(parsed.balance / 100).toLocaleString()}` : "Not in SMS"}
                </span>
              </div>
            </div>

            {isDuplicate && (
              <p style={{ color: "#D97706", fontSize: 11, marginTop: 8 }}>
                Warning: This transaction reference is already recorded in your ledger.
              </p>
            )}
          </div>
        )}

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
            <AlertTriangle size={14} color="#E11D48" />
            <span>{error}</span>
          </div>
        )}

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748B" }}>
            <ShieldCheck size={14} color="#059669" />
            <span>Private client-side parse</span>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!parsed || isDuplicate}
              onClick={handleCommit}
              className="btn-primary btn-sm"
              style={{ opacity: (!parsed || isDuplicate) ? 0.5 : 1 }}
            >
              <span>Add to Ledger</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
