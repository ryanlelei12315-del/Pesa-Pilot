"use client";

import React, { useState } from "react";
import { parseMpesaSms } from "../packages/transaction-parser/mpesa-parser";
import { classifyTransaction } from "../packages/financial-engine/classification";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

const SAMPLES = [
  {
    label: "Lunch at Campus Cafe",
    text: "QK910248P0 Confirmed. Ksh 450.00 paid to KEMU CAMPUS CAFETERIA on 24/11/26 at 1:12 PM. New M-PESA balance is Ksh 11,250.00. Transaction cost, Ksh 0.00."
  },
  {
    label: "Matatu Fare",
    text: "QK940121L9 Confirmed. Ksh 180.00 sent to 0712345678 JOHN KAMAU on 24/11/26 at 8:40 AM. New M-PESA balance is Ksh 11,700.00. Transaction cost, Ksh 0.00."
  },
  {
    label: "Room Rent Split",
    text: "QK894192M1 Confirmed. Ksh 4,500.00 paid to BEDROOM HOUSING LTD on 22/11/26 at 9:15 AM. New M-PESA balance is Ksh 11,880.00. Transaction cost, Ksh 23.00."
  }
];

export function InteractivePreview() {
  const [activeTab, setActiveTab] = useState<"parser" | "safeSpend">("parser");
  const [smsInput, setSmsInput] = useState(SAMPLES[0].text);
  
  // Safe spend state
  const [totalBalance, setTotalBalance] = useState(24000);
  const [reservedRent, setReservedRent] = useState(8000);
  const [reservedExams, setReservedExams] = useState(3000);
  const [daysRemaining, setDaysRemaining] = useState(25);

  const parsed = parseMpesaSms(smsInput);
  const classification = parsed ? classifyTransaction(parsed.rawMessageReference, parsed.counterparty) : "UNKNOWN";

  const reservedTotal = reservedRent + reservedExams;
  const safeToSpend = Math.max(0, totalBalance - reservedTotal);
  const dailyAllowance = Math.round(safeToSpend / Math.max(1, daysRemaining));

  return (
    <div className="card-formal" style={{ padding: 28, background: "#0F172A", border: "1px solid #334155" }}>
      {/* Header Tabs */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <span className="badge badge-emerald" style={{ marginBottom: 6 }}>INTERACTIVE DEMO</span>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#F8FAFC" }}>Test the Engine in Real Time</h3>
        </div>
        <div style={{ display: "flex", background: "#0B1120", padding: 4, borderRadius: 8, border: "1px solid #1E293B" }}>
          <button
            onClick={() => setActiveTab("parser")}
            className={activeTab === "parser" ? "btn-primary btn-sm" : "btn-ghost btn-sm"}
          >
            M-Pesa SMS Parser
          </button>
          <button
            onClick={() => setActiveTab("safeSpend")}
            className={activeTab === "safeSpend" ? "btn-primary btn-sm" : "btn-ghost btn-sm"}
          >
            Safe-to-Spend Calculator
          </button>
        </div>
      </div>

      {activeTab === "parser" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
          {/* Left: Input */}
          <div>
            <label style={{ display: "block", fontSize: 13, color: "#94A3B8", marginBottom: 8, fontWeight: 500 }}>
              Paste any M-Pesa SMS or pick an example:
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {SAMPLES.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSmsInput(s.text)}
                  className="btn-secondary btn-sm"
                  style={{ fontSize: 11, padding: "4px 8px" }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <textarea
              value={smsInput}
              onChange={(e) => setSmsInput(e.target.value)}
              rows={5}
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                lineHeight: 1.5,
                background: "#070D18",
                border: "1px solid #334155",
                borderRadius: 8,
                padding: 12,
                color: "#E2E8F0"
              }}
              placeholder="Paste M-Pesa message here..."
            />
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: "#64748B" }}>
              <ShieldCheck size={14} color="#10B981" />
              <span>Parsed 100% in your browser. No message text leaves this device.</span>
            </div>
          </div>

          {/* Right: Parsed Output */}
          <div style={{
            background: "#070D18",
            border: parsed ? "1px solid #059669" : "1px solid #334155",
            borderRadius: 8,
            padding: 18,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: parsed ? "#34D399" : "#94A3B8" }}>
                  {parsed ? "EXTRACTION SUCCESSFUL" : "WAITING FOR MESSAGE"}
                </span>
                {parsed && <span className="badge badge-emerald">Categorized: {classification}</span>}
              </div>

              {parsed ? (
                <div style={{ display: "grid", gap: 10, fontSize: 13 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1E293B", paddingBottom: 6 }}>
                    <span style={{ color: "#64748B" }}>Reference Code:</span>
                    <span style={{ fontWeight: 600, color: "#F8FAFC", fontFamily: "monospace" }}>{parsed.rawMessageReference}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1E293B", paddingBottom: 6 }}>
                    <span style={{ color: "#64748B" }}>Amount Transacted:</span>
                    <span style={{ fontWeight: 700, color: parsed.transactionType === "INCOME" ? "#10B981" : "#F43F5E" }}>
                      {parsed.transactionType === "INCOME" ? "+" : "-"}KSh {(parsed.amount / 100).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1E293B", paddingBottom: 6 }}>
                    <span style={{ color: "#64748B" }}>Counterparty / Merchant:</span>
                    <span style={{ fontWeight: 600, color: "#38BDF8" }}>{parsed.counterparty || "Standard Transfer"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1E293B", paddingBottom: 6 }}>
                    <span style={{ color: "#64748B" }}>New Account Balance:</span>
                    <span style={{ fontWeight: 600, color: "#F8FAFC" }}>
                      {parsed.balance ? `KSh ${(parsed.balance / 100).toLocaleString()}` : "Not stated"}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ padding: "24px 0", textAlign: "center", color: "#64748B" }}>
                  <AlertCircle size={24} style={{ margin: "0 auto 8px auto", opacity: 0.6 }} />
                  <p style={{ fontSize: 13 }}>Paste a message to see instant structured breakdown.</p>
                </div>
              )}
            </div>

            <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #1E293B" }}>
              <Link href="/dashboard" className="btn-secondary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                <span>Use Full Ledger in Cockpit</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
          {/* Left: Inputs */}
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: "#94A3B8" }}>Total Combined Balance (M-Pesa + Bank)</span>
                <span style={{ fontWeight: 700, color: "#F8FAFC" }}>KSh {totalBalance.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={60000}
                step={500}
                value={totalBalance}
                onChange={(e) => setTotalBalance(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#10B981" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: "#94A3B8" }}>Reserved: Upcoming Rent / Hostel</span>
                <span style={{ fontWeight: 700, color: "#F59E0B" }}>KSh {reservedRent.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={20000}
                step={500}
                value={reservedRent}
                onChange={(e) => setReservedRent(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#F59E0B" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: "#94A3B8" }}>Reserved: Exam Fees / Course Materials</span>
                <span style={{ fontWeight: 700, color: "#F59E0B" }}>KSh {reservedExams.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10000}
                step={250}
                value={reservedExams}
                onChange={(e) => setReservedExams(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#F59E0B" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: "#94A3B8" }}>Days Left in Month / Semester</span>
                <span style={{ fontWeight: 700, color: "#38BDF8" }}>{daysRemaining} days</span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={1}
                value={daysRemaining}
                onChange={(e) => setDaysRemaining(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#38BDF8" }}
              />
            </div>
          </div>

          {/* Right: Output calculation */}
          <div style={{
            background: "#070D18",
            border: "1px solid #10B981",
            borderRadius: 8,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: 8 }}>PROTECTED COCKPIT METRICS</span>
              
              <div style={{ margin: "14px 0" }}>
                <span style={{ fontSize: 12, color: "#94A3B8", display: "block" }}>Safe To Spend Today:</span>
                <strong style={{ fontSize: 32, color: "#10B981", fontWeight: 800 }}>
                  KSh {safeToSpend.toLocaleString()}
                </strong>
                <p style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                  (KSh {reservedTotal.toLocaleString()} locked safely away for essentials)
                </p>
              </div>

              <div style={{ background: "#0F172A", padding: 12, borderRadius: 6, border: "1px solid #1E293B", marginTop: 12 }}>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>Recommended Daily Burn Cap:</span>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#38BDF8", marginTop: 2 }}>
                  KSh {dailyAllowance.toLocaleString()} <span style={{ fontSize: 12, fontWeight: 400, color: "#94A3B8" }}>/ day</span>
                </div>
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>
                  Staying below this cap guarantees you reach day {daysRemaining} with zero emergency deficit.
                </p>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <Link href="/dashboard" className="btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                <span>Track Your Actual Accounts</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
