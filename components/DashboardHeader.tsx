"use client";

import React from "react";
import { Plus, MessageSquare, ShieldCheck, Lock } from "lucide-react";
import { DashboardTab } from "./DashboardSidebar";

interface HeaderProps {
  currentTab: DashboardTab;
  onOpenAddModal: () => void;
  onOpenMpesaModal: () => void;
  safeToSpend: number;
}

export function DashboardHeader({
  currentTab,
  onOpenAddModal,
  onOpenMpesaModal
}: HeaderProps) {
  const titles: Record<DashboardTab, { title: string; subtitle: string }> = {
    overview: {
      title: "Cockpit Overview",
      subtitle: "Live financial liquidity, survival runway, and category burn rate"
    },
    transactions: {
      title: "Transactions Ledger & SMS Extraction",
      subtitle: "Verified payment logs with automated M-Pesa till and paybill classification"
    },
    accounts: {
      title: "Wallets & Cards",
      subtitle: "M-Pesa balance, student debit/credit cards, and locked reserve funds"
    },
    budget: {
      title: "Budget & Spending Allocation",
      subtitle: "Semester spending limits and emergency fund milestones"
    },
    simulator: {
      title: "Financial Time Machine",
      subtitle: "Pre-purchase 'What-If' scenario testing and burn velocity impact"
    },
    profile: {
      title: "Student Profile",
      subtitle: "University information, degree program, and verified contact details"
    },
    settings: {
      title: "Security & Settings",
      subtitle: "Bank-grade encryption status, privacy controls, and data exports"
    }
  };

  const meta = titles[currentTab] || titles.overview;

  return (
    <header style={{
      height: 68,
      borderBottom: "1px solid var(--line-default)",
      backgroundColor: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 28px",
      position: "sticky",
      top: 0,
      zIndex: 20
    }}>
      {/* Title & subtitle */}
      <div>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>
          {meta.title}
        </h1>
        <p style={{ fontSize: 12, color: "#64748B", margin: "2px 0 0 0" }}>
          {meta.subtitle}
        </p>
      </div>

      {/* Security Badge and Action controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Bank-Grade Security Pill */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          backgroundColor: "#F0FDF4",
          border: "1px solid #BBF7D0",
          borderRadius: 6,
          padding: "4px 10px",
          fontSize: 11,
          fontWeight: 600,
          color: "#166534"
        }}>
          <ShieldCheck size={14} color="#059669" />
          <span>256-bit Encrypted</span>
        </div>

        <button
          onClick={onOpenMpesaModal}
          className="btn-secondary btn-sm"
          style={{ borderColor: "#A7F3D0", color: "#047857", backgroundColor: "#ECFDF5" }}
        >
          <MessageSquare size={14} color="#059669" />
          <span>Import M-Pesa SMS</span>
        </button>

        <button
          onClick={onOpenAddModal}
          className="btn-primary btn-sm"
        >
          <Plus size={14} />
          <span>New Entry</span>
        </button>
      </div>
    </header>
  );
}
