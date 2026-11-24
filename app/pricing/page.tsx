"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LandingNavbar } from "../../components/LandingNavbar";
import { Check, ArrowRight, ShieldCheck, HelpCircle, Sparkles, Wallet } from "lucide-react";

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <LandingNavbar />

      <main style={{ padding: "56px 0 88px 0" }}>
        <div className="container-max">
          {/* Header */}
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 36px auto" }}>
            <span className="badge badge-emerald" style={{ marginBottom: 10 }}>SIMPLE, HONEST PRICING</span>
            <h1 style={{ fontSize: 34, fontWeight: 800, color: "#0F172A", letterSpacing: -0.6 }}>
              Student plans for every campus budget
            </h1>
            <p style={{ color: "#64748B", fontSize: 16, marginTop: 8 }}>
              Start 100% free with no credit card required. Upgrade anytime for unlimited bank sync and group bills.
            </p>

            {/* Monthly / Annual Toggle */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#F1F5F9",
              padding: "4px 8px",
              borderRadius: 24,
              border: "1px solid #E2E8F0",
              marginTop: 24
            }}>
              <button
                onClick={() => setAnnualBilling(false)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  color: !annualBilling ? "#0F172A" : "#64748B",
                  backgroundColor: !annualBilling ? "#FFFFFF" : "transparent",
                  boxShadow: !annualBilling ? "0 1px 3px rgba(0,0,0,0.06)" : "none"
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnualBilling(true)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  color: annualBilling ? "#0F172A" : "#64748B",
                  backgroundColor: annualBilling ? "#FFFFFF" : "transparent",
                  boxShadow: annualBilling ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <span>Annual</span>
                <span className="badge badge-emerald" style={{ fontSize: 10, padding: "1px 6px" }}>Save 33%</span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            maxWidth: 1040,
            margin: "0 auto 64px auto"
          }}>
            {/* Free Tier */}
            <div className="card-formal" style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <span className="badge badge-neutral" style={{ marginBottom: 12 }}>STUDENT FREE</span>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Campus Starter</h2>
                <p style={{ fontSize: 13, color: "#64748B", marginTop: 4, marginBottom: 20 }}>
                  Essential money tracking for individual students.
                </p>

                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: "#0F172A" }}>KSh 0</span>
                  <span style={{ fontSize: 13, color: "#64748B", marginLeft: 4 }}>/ forever</span>
                </div>

                <div style={{ display: "grid", gap: 12, fontSize: 13, color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <span>M-Pesa SMS Instant Receipt Parser</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <span>Safe-to-Spend Daily Calculator</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <span>Up to 2 Wallets (M-Pesa + 1 Bank)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <span>Rent &amp; Fee Reserve Locking</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <span>100% Offline Mode &amp; Local Storage</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <Link
                  href="/register"
                  className="btn-secondary"
                  style={{ width: "100%", justifyContent: "center", padding: "11px" }}
                >
                  <span>Start Free</span>
                </Link>
              </div>
            </div>

            {/* Pro Tier (Featured) */}
            <div className="card-formal" style={{
              backgroundColor: "#FFFFFF",
              border: "2px solid #059669",
              boxShadow: "0 8px 24px -4px rgba(5, 150, 105, 0.12)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div style={{
                position: "absolute",
                top: -12,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#059669",
                color: "#FFFFFF",
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 12px",
                borderRadius: 12,
                letterSpacing: 0.5
              }}>
                MOST POPULAR
              </div>

              <div>
                <span className="badge badge-emerald" style={{ marginBottom: 12 }}>STUDENT PRO</span>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Campus Navigator</h2>
                <p style={{ fontSize: 13, color: "#64748B", marginTop: 4, marginBottom: 20 }}>
                  Complete cashflow mastery with HELB loan pacing and cards.
                </p>

                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: "#059669" }}>
                    KSh {annualBilling ? "100" : "150"}
                  </span>
                  <span style={{ fontSize: 13, color: "#64748B", marginLeft: 4 }}>
                    / month {annualBilling ? "(KSh 1,200 billed yearly)" : "(billed monthly)"}
                  </span>
                </div>

                <div style={{ display: "grid", gap: 12, fontSize: 13, color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <strong>Everything in Student Free</strong>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <span>Unlimited Cards, M-Pesa &amp; Bank Accounts</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <span>HELB Semester Disbursement Runway Pacing</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <span>What-If Purchase Simulator &amp; Savings Habits</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <span>Card Freeze Simulation &amp; Spend Alert Caps</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#059669" />
                    <span>Export to Clean Excel CSV &amp; Encrypted Backups</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <Link
                  href="/register"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "11px" }}
                >
                  <span>Get Started with Pro</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Chama & Group Tier */}
            <div className="card-formal" style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <span className="badge badge-blue" style={{ marginBottom: 12 }}>CHAMA &amp; GROUPS</span>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Hostel &amp; Chama Circle</h2>
                <p style={{ fontSize: 13, color: "#64748B", marginTop: 4, marginBottom: 20 }}>
                  For room splits, chamas, and campus project teams.
                </p>

                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: "#0F172A" }}>
                    KSh {annualBilling ? "350" : "450"}
                  </span>
                  <span style={{ fontSize: 13, color: "#64748B", marginLeft: 4 }}>
                    / month {annualBilling ? "(KSh 4,200 billed yearly)" : ""}
                  </span>
                </div>

                <div style={{ display: "grid", gap: 12, fontSize: 13, color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#0284C7" />
                    <strong>Everything in Pro for up to 6 members</strong>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#0284C7" />
                    <span>Shared hostel bills &amp; WiFi split manager</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#0284C7" />
                    <span>Transparent student chama ledger</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={16} color="#0284C7" />
                    <span>Member payment confirmation tracking</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <Link
                  href="/register"
                  className="btn-secondary"
                  style={{ width: "100%", justifyContent: "center", padding: "11px" }}
                >
                  <span>Start Group Circle</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Guarantee Banner */}
          <div style={{
            maxWidth: 720,
            margin: "0 auto",
            backgroundColor: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: 12,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16
          }}>
            <ShieldCheck size={32} color="#059669" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#166534" }}>
                100% Student Fair Pricing Guarantee
              </h3>
              <p style={{ fontSize: 13, color: "#15803D", marginTop: 2 }}>
                No hidden auto-renewal traps, no credit card required to start, and full data export if you decide to cancel.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
