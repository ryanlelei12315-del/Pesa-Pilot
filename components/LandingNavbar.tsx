"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet, LogIn, ArrowRight, Download, ShieldCheck, CreditCard, Tag } from "lucide-react";

export function LandingNavbar() {
  const pathname = usePathname();

  return (
    <header style={{
      borderBottom: "1px solid var(--line-default)",
      backgroundColor: "#FFFFFF",
      position: "sticky",
      top: 0,
      zIndex: 50,
      width: "100%"
    }}>
      <div className="container-max" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 68
      }}>
        {/* Brand */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            backgroundColor: "#059669",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(5, 150, 105, 0.2)"
          }}>
            <Wallet size={19} color="#FFFFFF" strokeWidth={2.2} />
          </div>
          <div>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3, color: "#0F172A" }}>
              Pesa<span style={{ color: "#059669" }}>Pilot</span>
            </span>
            <span style={{ display: "block", fontSize: 10, color: "#64748B", fontWeight: 500 }}>
              African Student Financial Platform
            </span>
          </div>
        </Link>

        {/* Separated Navigation Links */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: 6
        }}>
          <Link
            href="/"
            style={{
              fontSize: 13,
              fontWeight: pathname === "/" ? 600 : 500,
              padding: "7px 12px",
              borderRadius: 6,
              color: pathname === "/" ? "#059669" : "#475569",
              backgroundColor: pathname === "/" ? "#ECFDF5" : "transparent"
            }}
          >
            Home
          </Link>

          <Link
            href="/#banks"
            style={{
              fontSize: 13,
              fontWeight: 500,
              padding: "7px 12px",
              borderRadius: 6,
              color: "#475569",
              display: "flex",
              alignItems: "center",
              gap: 5
            }}
          >
            <CreditCard size={14} color="#64748B" />
            <span>Connected Banks</span>
          </Link>

          <Link
            href="/pricing"
            style={{
              fontSize: 13,
              fontWeight: pathname === "/pricing" ? 600 : 500,
              padding: "7px 12px",
              borderRadius: 6,
              color: pathname === "/pricing" ? "#059669" : "#475569",
              backgroundColor: pathname === "/pricing" ? "#ECFDF5" : "transparent",
              display: "flex",
              alignItems: "center",
              gap: 5
            }}
          >
            <Tag size={14} color={pathname === "/pricing" ? "#059669" : "#64748B"} />
            <span>Pricing</span>
          </Link>

          <Link
            href="/download"
            style={{
              fontSize: 13,
              fontWeight: pathname === "/download" ? 600 : 500,
              padding: "7px 12px",
              borderRadius: 6,
              color: pathname === "/download" ? "#059669" : "#475569",
              backgroundColor: pathname === "/download" ? "#ECFDF5" : "transparent",
              display: "flex",
              alignItems: "center",
              gap: 5
            }}
          >
            <Download size={14} color={pathname === "/download" ? "#059669" : "#64748B"} />
            <span>Download</span>
          </Link>

          <Link
            href="/privacy"
            style={{
              fontSize: 13,
              fontWeight: pathname === "/privacy" ? 600 : 500,
              padding: "7px 12px",
              borderRadius: 6,
              color: pathname === "/privacy" ? "#059669" : "#475569",
              backgroundColor: pathname === "/privacy" ? "#ECFDF5" : "transparent",
              display: "flex",
              alignItems: "center",
              gap: 5
            }}
          >
            <ShieldCheck size={14} color={pathname === "/privacy" ? "#059669" : "#64748B"} />
            <span>Security</span>
          </Link>
        </nav>

        {/* Strictly Log In / Sign Up actions (never replaced by "Go to Dashboard") */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link
            href="/login"
            className="btn-ghost btn-sm"
            style={{ color: "#0F172A", fontWeight: 600, fontSize: 13 }}
          >
            <LogIn size={15} />
            <span>Log In</span>
          </Link>

          <div style={{ width: 1, height: 22, backgroundColor: "#E2E8F0" }} />

          <Link href="/register" className="btn-primary btn-sm">
            <span>Sign Up Free</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
