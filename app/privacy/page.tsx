import Link from "next/link";
import { LandingNavbar } from "../../components/LandingNavbar";
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Trash2,
  Download,
  CheckCircle2,
  FileText
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Security Measures — PesaPilot",
  description: "Learn how PesaPilot protects your financial privacy in Kenya. Zero PIN access, local SMS processing, and complete data control."
};

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <LandingNavbar />

      <main style={{ padding: "48px 0 80px 0" }}>
        <div className="container-tight">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="badge badge-emerald" style={{ marginBottom: 10 }}>KENYA DATA PROTECTION COMPLIANT</span>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", letterSpacing: -0.5 }}>
              Privacy Policy &amp; Security Measures
            </h1>
            <p style={{ color: "#64748B", fontSize: 16, marginTop: 8, maxWidth: 580, margin: "8px auto 0 auto" }}>
              Your money is your personal business. Here is our simple, clear promise on how we handle your data.
            </p>
          </div>

          {/* Core Security Guarantees */}
          <div style={{ display: "grid", gap: 18, marginBottom: 44 }}>
            {/* Rule 1 */}
            <div className="card-formal" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: "#ECFDF5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <Lock size={20} color="#059669" />
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
                  1. Zero M-Pesa PIN or Banking Password Requests
                </h2>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6 }}>
                  PesaPilot will <strong>never</strong> ask for your 4-digit Safaricom M-Pesa PIN, your mobile banking password, or your card CVV codes. PesaPilot does not initiate transfers on your behalf. It simply helps you track and organize the confirmation texts you already receive.
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="card-formal" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: "#F0F9FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <Smartphone size={20} color="#0284C7" />
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
                  2. Local Device SMS Processing
                </h2>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6 }}>
                  When you paste an M-Pesa SMS confirmation message into PesaPilot, the message is read and categorized directly on your device. Your full message text is never uploaded to public ad servers or sold to data brokers.
                </p>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="card-formal" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: "#FFFBEB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <ShieldCheck size={20} color="#D97706" />
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
                  3. Kenya Data Protection Act 2019 (KDPA) Compliance
                </h2>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6 }}>
                  We respect the regulations set out under the Kenya Data Protection Act 2019. You maintain full ownership of all transaction logs, account names, and budget notes stored in your profile.
                </p>
              </div>
            </div>

            {/* Rule 4 */}
            <div className="card-formal" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: "#FFF1F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <Trash2 size={20} color="#E11D48" />
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
                  4. Instant Data Deletion &amp; Account Wipe
                </h2>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6 }}>
                  You have the right to be forgotten at any time. Inside your cockpit settings, you can trigger a permanent account deletion that erases your user profile, linked wallets, and transaction history immediately.
                </p>
              </div>
            </div>

            {/* Rule 5 */}
            <div className="card-formal" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: "#F8FAFC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <Download size={20} color="#64748B" />
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
                  5. Full Data Portability &amp; Backups
                </h2>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6 }}>
                  Your financial records are never trapped. With one click in the sidebar, download your entire financial ledger as a clean, standardized JSON file to save on your computer or open in spreadsheets.
                </p>
              </div>
            </div>
          </div>

          {/* Security Contact Card */}
          <div style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 12,
            padding: 24,
            textAlign: "center"
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
              Have questions regarding your security?
            </h3>
            <p style={{ fontSize: 14, color: "#64748B", marginBottom: 16 }}>
              Our engineering team is dedicated to keeping student financial tools transparent and safe.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <Link href="/login" className="btn-primary btn-sm">
                <span>Open Secure Cockpit</span>
              </Link>
              <Link href="/download" className="btn-secondary btn-sm">
                <span>Download App</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
