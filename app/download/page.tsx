import Link from "next/link";
import { LandingNavbar } from "../../components/LandingNavbar";
import {
  Download,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  QrCode,
  Sparkles,
  Layers,
  HelpCircle
} from "lucide-react";

export const metadata = {
  title: "Download PesaPilot — Android APK & iOS App",
  description: "Get PesaPilot on your phone. Direct Android APK download and iOS installation guide for students in Kenya."
};

export default function DownloadPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      <LandingNavbar />

      <main style={{ padding: "48px 0 80px 0" }}>
        <div className="container-tight">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="badge badge-emerald" style={{ marginBottom: 10 }}>OFFICIAL RELEASES</span>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", letterSpacing: -0.5 }}>
              Download PesaPilot for Mobile
            </h1>
            <p style={{ color: "#64748B", fontSize: 16, marginTop: 8, maxWidth: 540, margin: "8px auto 0 auto" }}>
              Keep your daily student budget right in your pocket. Track your M-Pesa expenses anywhere, anytime.
            </p>
          </div>

          {/* Download Platforms Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 48 }}>
            {/* Android APK Card */}
            <div className="card-formal" style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #BBF7D0",
              boxShadow: "0 4px 12px rgba(5, 150, 105, 0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: "#ECFDF5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Smartphone size={24} color="#059669" />
                  </div>
                  <span className="badge badge-emerald">Direct APK</span>
                </div>

                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
                  Android Mobile App
                </h2>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.5, marginBottom: 16 }}>
                  Official standalone APK package. Reads incoming M-Pesa SMS alerts directly with zero setup.
                </p>

                <div style={{
                  backgroundColor: "#F8FAFC",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 12,
                  color: "#64748B",
                  display: "grid",
                  gap: 4,
                  marginBottom: 20
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Version:</span>
                    <strong style={{ color: "#0F172A" }}>v1.2.0 Stable</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Size:</span>
                    <strong style={{ color: "#0F172A" }}>18.4 MB</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Requires:</span>
                    <strong style={{ color: "#0F172A" }}>Android 8.0 or higher</strong>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="/downloads/pesapilot-v1.2.0.apk"
                  download="pesapilot-v1.2.0.apk"
                  className="btn-primary"
                  style={{ width: "100%", padding: "12px", justifyContent: "center", textDecoration: "none" }}
                >
                  <Download size={16} />
                  <span>Download Android APK (18 MB)</span>
                </a>

                <span style={{ display: "block", textAlign: "center", fontSize: 11, color: "#94A3B8", marginTop: 8 }}>
                  Verified safe · SHA-256 verified build
                </span>
              </div>
            </div>

            {/* iOS WebApp / TestFlight Card */}
            <div className="card-formal" style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #BAE6FD",
              boxShadow: "0 4px 12px rgba(2, 132, 199, 0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: "#F0F9FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Smartphone size={24} color="#0284C7" />
                  </div>
                  <span className="badge badge-blue">iOS &amp; iPhone</span>
                </div>

                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
                  iPhone / iOS WebApp
                </h2>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.5, marginBottom: 16 }}>
                  Works smoothly on Safari with full offline capability and local encryption.
                </p>

                <div style={{
                  backgroundColor: "#F8FAFC",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 12,
                  color: "#64748B",
                  display: "grid",
                  gap: 4,
                  marginBottom: 20
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Format:</span>
                    <strong style={{ color: "#0F172A" }}>Progressive Web App</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Installation:</span>
                    <strong style={{ color: "#0F172A" }}>Add to Home Screen</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Requires:</span>
                    <strong style={{ color: "#0F172A" }}>Safari / iOS 14+</strong>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="/login"
                  className="btn-secondary"
                  style={{ width: "100%", padding: "12px", justifyContent: "center", textDecoration: "none", borderColor: "#0284C7", color: "#0284C7" }}
                >
                  <ExternalLink size={16} />
                  <span>Launch on iPhone Safari</span>
                </Link>

                <span style={{ display: "block", textAlign: "center", fontSize: 11, color: "#94A3B8", marginTop: 8 }}>
                  Tap Share in Safari &gt; Select "Add to Home Screen"
                </span>
              </div>
            </div>
          </div>

          {/* Simple 3-Step Install Guide */}
          <div className="card-formal" style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>
              How to Install the Android APK
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
              <div style={{ padding: "12px", backgroundColor: "#F8FAFC", borderRadius: 8 }}>
                <strong style={{ fontSize: 14, color: "#059669", display: "block", marginBottom: 4 }}>
                  Step 1: Download
                </strong>
                <p style={{ fontSize: 13, color: "#475569" }}>
                  Tap the "Download Android APK" button above to save the file to your phone.
                </p>
              </div>

              <div style={{ padding: "12px", backgroundColor: "#F8FAFC", borderRadius: 8 }}>
                <strong style={{ fontSize: 14, color: "#059669", display: "block", marginBottom: 4 }}>
                  Step 2: Allow Install
                </strong>
                <p style={{ fontSize: 13, color: "#475569" }}>
                  If your phone asks for permission to install from your browser, toggle "Allow from this source".
                </p>
              </div>

              <div style={{ padding: "12px", backgroundColor: "#F8FAFC", borderRadius: 8 }}>
                <strong style={{ fontSize: 14, color: "#059669", display: "block", marginBottom: 4 }}>
                  Step 3: Open &amp; Sign In
                </strong>
                <p style={{ fontSize: 13, color: "#475569" }}>
                  Open PesaPilot, log in with your university email or use Demo mode, and you are ready!
                </p>
              </div>
            </div>
          </div>

          {/* Support callout */}
          <div style={{ textAlign: "center", fontSize: 13, color: "#64748B" }}>
            Need help installing or have questions? Check our{" "}
            <Link href="/privacy" style={{ color: "#059669", fontWeight: 600 }}>
              Privacy &amp; Security measures
            </Link>{" "}
            or email us at support@pesapilot.ke.
          </div>
        </div>
      </main>
    </div>
  );
}
