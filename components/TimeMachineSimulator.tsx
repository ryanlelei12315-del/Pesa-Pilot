"use client";

import React, { useState } from "react";
import { Compass, AlertTriangle, CheckCircle2, Award } from "lucide-react";
import { simulateSpendScenario } from "../packages/financial-engine/time-machine";
import { exampleChallenges } from "../packages/financial-engine/challenges";

interface SimulatorProps {
  currentBalance: number;
  safeToSpend: number;
  dailyBurn: number;
  daysRemaining: number;
}

export function TimeMachineSimulator({
  safeToSpend,
  dailyBurn,
  daysRemaining
}: SimulatorProps) {
  const [spendAmount, setSpendAmount] = useState(1500);
  const [activePreset, setActivePreset] = useState("Weekend Outing");
  const [challenges, setChallenges] = useState(exampleChallenges);

  const presets = [
    { label: "Course Materials / Books", amount: 1800 },
    { label: "Weekend Outing", amount: 1500 },
    { label: "Clothing / Shoes", amount: 3200 },
    { label: "Emergency Medicine", amount: 1200 },
    { label: "Monthly Data Bundle", amount: 1000 }
  ];

  const newSafeSpend = Math.max(0, safeToSpend - spendAmount);
  const newDaysRunway = dailyBurn > 0 ? Math.floor(newSafeSpend / dailyBurn) : daysRemaining;
  const daysLost = Math.max(0, daysRemaining - newDaysRunway);

  const toggleChallenge = (id: string) => {
    setChallenges(prev =>
      prev.map(c => c.id === id ? { ...c, isCompleted: !c.isCompleted } : c)
    );
  };

  return (
    <div style={{ display: "grid", gap: 20 }}>
      {/* Simulation Sandbox Card */}
      <div className="card-formal" style={{ backgroundColor: "#FFFFFF" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <Compass size={18} color="#0284C7" />
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                Pre-Purchase Simulator
              </h2>
            </div>
            <p style={{ fontSize: 13, color: "#64748B" }}>
              Test discretionary expenses before transacting to see the effect on your semester runway.
            </p>
          </div>
          <span className="badge badge-blue">What-If Tool</span>
        </div>

        {/* Quick Presets */}
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 11, color: "#64748B", display: "block", marginBottom: 6 }}>
            Quick scenario presets:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSpendAmount(p.amount);
                  setActivePreset(p.label);
                }}
                className={activePreset === p.label ? "btn-primary btn-sm" : "btn-secondary btn-sm"}
                style={{ fontSize: 11, padding: "5px 10px" }}
              >
                {p.label} (KSh {p.amount.toLocaleString()})
              </button>
            ))}
          </div>
        </div>

        {/* Slider & Input */}
        <div style={{
          backgroundColor: "#F8FAFC",
          border: "1px solid #E2E8F0",
          borderRadius: 8,
          padding: 14,
          marginBottom: 16
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>Simulated Spend Amount:</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, color: "#64748B" }}>KSh</span>
              <input
                type="number"
                min="0"
                max={safeToSpend * 2}
                step="100"
                value={spendAmount}
                onChange={(e) => {
                  setSpendAmount(Number(e.target.value));
                  setActivePreset("Custom");
                }}
                style={{
                  width: 120,
                  fontSize: 15,
                  fontWeight: 700,
                  padding: "4px 8px",
                  textAlign: "right"
                }}
              />
            </div>
          </div>

          <input
            type="range"
            min="0"
            max={Math.max(10000, safeToSpend * 1.5)}
            step="100"
            value={spendAmount}
            onChange={(e) => {
              setSpendAmount(Number(e.target.value));
              setActivePreset("Custom");
            }}
            style={{ width: "100%", accentColor: "#0284C7" }}
          />
        </div>

        {/* Projected Outcomes Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {/* Box 1 */}
          <div style={{
            backgroundColor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            padding: 12
          }}>
            <span style={{ fontSize: 11, color: "#64748B", display: "block" }}>Current Safe Spend</span>
            <strong style={{ fontSize: 17, color: "#0F172A", display: "block", marginTop: 2 }}>
              KSh {safeToSpend.toLocaleString()}
            </strong>
            <span style={{ fontSize: 11, color: "#059669" }}>Rent locked away</span>
          </div>

          {/* Box 2 */}
          <div style={{
            backgroundColor: "#F8FAFC",
            border: newSafeSpend < 1000 ? "1px solid #FECDD3" : "1px solid #E2E8F0",
            borderRadius: 8,
            padding: 12
          }}>
            <span style={{ fontSize: 11, color: "#64748B", display: "block" }}>Projected Safe Spend</span>
            <strong style={{
              fontSize: 17,
              color: newSafeSpend < 1000 ? "#E11D48" : "#0284C7",
              display: "block",
              marginTop: 2
            }}>
              KSh {newSafeSpend.toLocaleString()}
            </strong>
            <span style={{ fontSize: 11, color: "#64748B" }}>
              -{Math.round((spendAmount / Math.max(1, safeToSpend)) * 100)}% of buffer
            </span>
          </div>

          {/* Box 3 */}
          <div style={{
            backgroundColor: "#F8FAFC",
            border: daysLost > 3 ? "1px solid #FDE68A" : "1px solid #E2E8F0",
            borderRadius: 8,
            padding: 12
          }}>
            <span style={{ fontSize: 11, color: "#64748B", display: "block" }}>Projected Runway</span>
            <strong style={{ fontSize: 17, color: daysLost > 3 ? "#D97706" : "#0F172A", display: "block", marginTop: 2 }}>
              {newDaysRunway} Days
            </strong>
            <span style={{ fontSize: 11, color: daysLost > 0 ? "#E11D48" : "#059669" }}>
              {daysLost > 0 ? `Cost: ~${daysLost} days of runway` : "No runway penalty"}
            </span>
          </div>
        </div>

        {/* Verdict Advice */}
        <div style={{
          marginTop: 16,
          padding: 12,
          borderRadius: 8,
          backgroundColor: spendAmount > safeToSpend ? "#FFF1F2" : spendAmount > safeToSpend * 0.3 ? "#FFFBEB" : "#F0FDF4",
          border: spendAmount > safeToSpend ? "1px solid #FECDD3" : spendAmount > safeToSpend * 0.3 ? "1px solid #FDE68A" : "1px solid #BBF7D0",
          display: "flex",
          alignItems: "flex-start",
          gap: 10
        }}>
          {spendAmount > safeToSpend ? (
            <AlertTriangle size={18} color="#E11D48" style={{ flexShrink: 0, marginTop: 2 }} />
          ) : spendAmount > safeToSpend * 0.3 ? (
            <AlertTriangle size={18} color="#D97706" style={{ flexShrink: 0, marginTop: 2 }} />
          ) : (
            <CheckCircle2 size={18} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
          )}

          <div>
            <h4 style={{
              fontSize: 13,
              fontWeight: 700,
              color: spendAmount > safeToSpend ? "#9F1239" : spendAmount > safeToSpend * 0.3 ? "#92400E" : "#166534"
            }}>
              {spendAmount > safeToSpend
                ? "Warning: Exceeds Safe Spending Limit"
                : spendAmount > safeToSpend * 0.3
                ? "Caution: Significant Impact on Allowance"
                : "Safe Spend Approved"}
            </h4>
            <p style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>
              {spendAmount > safeToSpend
                ? `Spending KSh ${spendAmount.toLocaleString()} will dip into your locked rent or exam fees by KSh ${(spendAmount - safeToSpend).toLocaleString()}. We suggest deferring this purchase.`
                : spendAmount > safeToSpend * 0.3
                ? `This purchase represents over 30% of your remaining free funds. Your daily allowance will tighten for the next ${daysRemaining} days.`
                : `This expense fits comfortably within your current balance without endangering your semester reserves.`}
            </p>
          </div>
        </div>
      </div>

      {/* Student Challenges */}
      <div className="card-formal" style={{ backgroundColor: "#FFFFFF" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Award size={17} color="#D97706" />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
              Active Student Savings Habits
            </h3>
          </div>
          <span className="badge badge-emerald">
            {challenges.filter(c => c.isCompleted).length} of {challenges.length} Done
          </span>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          {challenges.map((c) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                borderRadius: 6,
                backgroundColor: "#F8FAFC",
                border: c.isCompleted ? "1px solid #A7F3D0" : "1px solid #E2E8F0",
                gap: 12
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={() => toggleChallenge(c.id)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    border: c.isCompleted ? "none" : "1px solid #94A3B8",
                    backgroundColor: c.isCompleted ? "#059669" : "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}
                >
                  {c.isCompleted && <CheckCircle2 size={14} color="#FFFFFF" />}
                </button>
                <div>
                  <h4 style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: c.isCompleted ? "#94A3B8" : "#0F172A",
                    textDecoration: c.isCompleted ? "line-through" : "none"
                  }}>
                    {c.title}
                  </h4>
                  <p style={{ fontSize: 11, color: "#64748B" }}>
                    {c.description} {c.targetAmount ? `· Target: KSh ${c.targetAmount.toLocaleString()}` : ""}
                  </p>
                </div>
              </div>

              <span className={c.difficulty === "EASY" ? "badge badge-blue" : "badge badge-amber"}>
                {c.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
