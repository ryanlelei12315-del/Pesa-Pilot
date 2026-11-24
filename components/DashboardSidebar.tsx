"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ReceiptText,
  CreditCard,
  PieChart,
  Compass,
  Download,
  Wallet,
  LogOut,
  ChevronRight,
  User,
  Settings,
  ShieldCheck
} from "lucide-react";

export type DashboardTab = "overview" | "transactions" | "accounts" | "budget" | "simulator" | "profile" | "settings";

interface SidebarProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  safeToSpend: number;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onExport: () => void;
}

export function DashboardSidebar({
  currentTab,
  onSelectTab,
  safeToSpend,
  user,
  onLogout,
  onExport
}: SidebarProps) {
  const navItems: { id: DashboardTab; label: string; icon: React.ReactNode; tag?: string }[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={17} /> },
    { id: "transactions", label: "Transactions & SMS", icon: <ReceiptText size={17} /> },
    { id: "accounts", label: "Wallets & Cards", icon: <CreditCard size={17} /> },
    { id: "budget", label: "Budget & Runway", icon: <PieChart size={17} /> },
    { id: "simulator", label: "What-If Simulator", icon: <Compass size={17} />, tag: "Tool" },
    { id: "profile", label: "Student Profile", icon: <User size={17} /> },
    { id: "settings", label: "Security & Settings", icon: <Settings size={17} /> }
  ];

  return (
    <aside style={{
      width: 250,
      backgroundColor: "#FFFFFF",
      borderRight: "1px solid var(--line-default)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px 14px",
      minHeight: "100vh",
      position: "sticky",
      top: 0
    }}>
      <div>
        {/* Brand */}
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          padding: "6px 10px",
          marginBottom: 18
        }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            backgroundColor: "#059669",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(5, 150, 105, 0.25)"
          }}>
            <Wallet size={18} color="#FFFFFF" strokeWidth={2.2} />
          </div>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>
              Pesa<span style={{ color: "#059669" }}>Pilot</span>
            </span>
            <span style={{ display: "block", fontSize: 10, color: "#64748B", fontWeight: 500 }}>
              Secure Student Cockpit
            </span>
          </div>
        </Link>

        {/* Quick Safe Spend Pill */}
        <div style={{
          backgroundColor: "#F0FDF4",
          border: "1px solid #BBF7D0",
          borderRadius: 8,
          padding: "10px 12px",
          marginBottom: 20
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#166534", letterSpacing: 0.3 }}>
            SAFE TO SPEND TODAY
          </span>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#15803D", marginTop: 2 }}>
            KSh {safeToSpend.toLocaleString()}
          </div>
          <span style={{ fontSize: 10, color: "#166534", marginTop: 2, display: "block" }}>
            Locked rent &amp; fees deducted
          </span>
        </div>

        {/* Navigation Section */}
        <nav style={{ display: "grid", gap: 3 }}>
          {navItems.map((item) => {
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 12px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: active ? 600 : 500,
                  color: active ? "#0F172A" : "#64748B",
                  backgroundColor: active ? "#F1F5F9" : "transparent",
                  border: active ? "1px solid #E2E8F0" : "1px solid transparent",
                  transition: "all 150ms ease",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: active ? "#059669" : "#94A3B8" }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.tag ? (
                  <span className="badge badge-neutral" style={{ fontSize: 10, padding: "1px 5px" }}>
                    {item.tag}
                  </span>
                ) : active ? (
                  <ChevronRight size={14} color="#059669" />
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Area */}
      <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 14 }}>
        <button
          onClick={onExport}
          className="btn-ghost"
          style={{
            width: "100%",
            justifyContent: "flex-start",
            fontSize: 12,
            color: "#64748B",
            marginBottom: 8,
            padding: "8px 10px"
          }}
        >
          <Download size={14} color="#64748B" />
          <span>Export Encrypted JSON</span>
        </button>

        {/* User Card */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 10px",
          backgroundColor: "#F8FAFC",
          borderRadius: 8,
          border: "1px solid #E2E8F0"
        }}>
          <button
            onClick={() => onSelectTab("profile")}
            style={{
              textAlign: "left",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>
              {user?.name || "Student Pilot"}
            </div>
            <div style={{ fontSize: 10, color: "#64748B", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.email || "View profile"}
            </div>
          </button>
          <button
            onClick={onLogout}
            title="Log out of cockpit"
            style={{
              padding: 5,
              borderRadius: 4,
              color: "#94A3B8"
            }}
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
