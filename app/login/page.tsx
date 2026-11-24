"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wallet, Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password. Please try again.");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      backgroundColor: "#F8FAFC"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 920,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))"
      }}>
        {/* Left Side: Expensify-Inspired Visual Brand Panel */}
        <div style={{
          position: "relative",
          backgroundColor: "#F1F5F9",
          minHeight: 440,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px 36px",
          overflow: "hidden"
        }}>
          {/* Real image from app/images */}
          <img
            src="/images/student-phone.jpg"
            alt="Student managing financial cockpit"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          {/* Light gradient overlay for crisp readability */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.88) 0%, rgba(248, 250, 252, 0.96) 100%)"
          }} />

          {/* Top Brand on Panel */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 3px rgba(5, 150, 105, 0.25)"
              }}>
                <Wallet size={19} color="#FFFFFF" strokeWidth={2.2} />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", letterSpacing: -0.3 }}>
                Pesa<span style={{ color: "#059669" }}>Pilot</span>
              </span>
            </Link>
          </div>

          {/* Bottom Headline & Proof on Panel */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <span className="badge badge-emerald">BANK-GRADE SECURITY</span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", lineHeight: 1.3, marginBottom: 8 }}>
              One clear place for your M-Pesa, cards, and student loans.
            </h3>
            <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>
              Local-first encryption. Zero Safaricom PIN or banking passwords requested.
            </p>
          </div>
        </div>

        {/* Right Side: Clean Formal Form (No Dummy Data) */}
        <div style={{ padding: "44px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", letterSpacing: -0.4 }}>
              Sign in to your account
            </h1>
            <p style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>
              Enter your email and password to access your dashboard.
            </p>
          </div>

          {error && (
            <div style={{
              backgroundColor: "#FFF1F2",
              border: "1px solid #FECDD3",
              borderRadius: 8,
              padding: "10px 14px",
              color: "#9F1239",
              fontSize: 13,
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <AlertCircle size={16} color="#E11D48" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#334155", marginBottom: 6, fontWeight: 600 }}>
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={16} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.ac.ke"
                  style={{ paddingLeft: 38, fontSize: 14 }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: 13, color: "#334155", fontWeight: 600 }}>
                  Password
                </label>
              </div>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ paddingLeft: 38, paddingRight: 40, fontSize: 14 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94A3B8",
                    padding: 4
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: "100%", padding: "12px", marginTop: 6, fontSize: 14 }}
            >
              {loading ? "Signing In..." : "Continue to Dashboard"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div style={{
            marginTop: 24,
            paddingTop: 18,
            borderTop: "1px solid #E2E8F0",
            textAlign: "center",
            fontSize: 13,
            color: "#64748B"
          }}>
            Don't have an account yet?{" "}
            <Link href="/register" style={{ color: "#059669", fontWeight: 600 }}>
              Create an account
            </Link>
          </div>

          <div style={{ textAlign: "center", marginTop: 14 }}>
            <Link href="/" style={{ fontSize: 12, color: "#94A3B8" }}>
              ← Return to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
