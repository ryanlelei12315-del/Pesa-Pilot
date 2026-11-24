import Link from "next/link";
import { LandingNavbar } from "../components/LandingNavbar";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  CreditCard,
  Download,
  Lock,
  Wallet,
  Clock,
  Sparkles,
  Building,
  Check,
  Zap
} from "lucide-react";

export const metadata = {
  title: "PesaPilot — Kenya's Smart Student Money App",
  description: "Connect M-Pesa, Airtel Money, and Kenyan student bank cards in one clean, private place. Make HELB money last all semester."
};

const SUPPORTED_BANKS = [
  { name: "Safaricom M-Pesa", type: "Mobile Money", tag: "SMS Sync", color: "#059669", bg: "#ECFDF5" },
  { name: "Equity Bank", type: "Student Visa", tag: "EazzyBanking", color: "#991B1B", bg: "#FEF2F2" },
  { name: "KCB Bank", type: "Student Account", tag: "Vooma / App", color: "#1E3A8A", bg: "#EFF6FF" },
  { name: "Co-op Bank", type: "MCo-op Cash", tag: "Fast Sync", color: "#065F46", bg: "#ECFDF5" },
  { name: "NCBA Loop", type: "Digital Bank", tag: "Instant Sync", color: "#374151", bg: "#F3F4F6" },
  { name: "Absa Bank Kenya", type: "Timiza & Card", tag: "Verified", color: "#9F1239", bg: "#FFF1F2" },
  { name: "Airtel Money", type: "Mobile Wallet", tag: "Receipt Sync", color: "#DC2626", bg: "#FEF2F2" },
  { name: "HELB Loans", type: "Upkeep & Grants", tag: "Semester Pacing", color: "#0284C7", bg: "#F0F9FF" }
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}>
      {/* Navbar with Log In and Sign Up always present */}
      <LandingNavbar />

      <main>
        {/* HERO SECTION */}
        <section style={{
          padding: "64px 0 56px 0",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid var(--line-default)"
        }}>
          <div className="container-max">
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 48,
              alignItems: "center"
            }}>
              {/* Left Column */}
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span className="badge badge-emerald">AFRICAN STUDENT FINANCIAL PLATFORM</span>
                  <span className="badge badge-neutral">M-PESA &amp; CARDS</span>
                </div>

                <h1 style={{
                  fontSize: "clamp(34px, 4.4vw, 50px)",
                  fontWeight: 800,
                  letterSpacing: -0.8,
                  lineHeight: 1.16,
                  color: "#0F172A",
                  marginBottom: 18
                }}>
                  Connect your African wallets &amp; cards in one place.
                </h1>

                <p style={{
                  fontSize: 17,
                  color: "#475569",
                  lineHeight: 1.6,
                  marginBottom: 28,
                  maxWidth: 540
                }}>
                  Keep your rent, exam fees, and food money safely separated. PesaPilot reads your M-Pesa receipts, tracks your debit cards, and spaces out your HELB money so you never run dry before exams.
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                  <Link href="/register" className="btn-primary btn-lg">
                    <span>Sign Up Free</span>
                    <ArrowRight size={17} />
                  </Link>
                  <Link href="/login" className="btn-secondary btn-lg">
                    <span>Log In to Cockpit</span>
                  </Link>
                </div>

                {/* Proof badges */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 16,
                  paddingTop: 24,
                  borderTop: "1px solid #E2E8F0"
                }}>
                  <div>
                    <strong style={{ fontSize: 18, color: "#059669", fontWeight: 700, display: "block" }}>100% Private</strong>
                    <span style={{ fontSize: 12, color: "#64748B" }}>Zero PINs or passwords</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: 18, color: "#0284C7", fontWeight: 700, display: "block" }}>8+ Banks</strong>
                    <span style={{ fontSize: 12, color: "#64748B" }}>M-Pesa, Equity &amp; KCB</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: 18, color: "#0F172A", fontWeight: 700, display: "block" }}>Free Forever</strong>
                    <span style={{ fontSize: 12, color: "#64748B" }}>For university students</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Card */}
              <div style={{ position: "relative" }}>
                <div style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  border: "1px solid #E2E8F0",
                  padding: 12,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)"
                }}>
                  <div style={{
                    position: "relative",
                    width: "100%",
                    height: 380,
                    borderRadius: 12,
                    overflow: "hidden"
                  }}>
                    <img
                      src="/images/student-phone.jpg"
                      alt="Student checking M-Pesa balance on smartphone"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block"
                      }}
                    />
                  </div>

                  {/* Clean Light-Mode Overlay Card */}
                  <div style={{
                    marginTop: 12,
                    backgroundColor: "#F8FAFC",
                    borderRadius: 10,
                    padding: "14px 16px",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#059669", textTransform: "uppercase" }}>
                        SAFE TO SPEND TODAY
                      </span>
                      <strong style={{ display: "block", fontSize: 22, fontWeight: 800, color: "#0F172A", marginTop: 2 }}>
                        KSh 9,500
                      </strong>
                    </div>
                    <span className="badge badge-emerald">
                      Rent &amp; Fees Locked Away
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPENDEE-INSPIRED CONNECTED BANKS SECTION (AFRICAN PERSONALIZATION) */}
        <section id="banks" style={{ padding: "64px 0", backgroundColor: "#F8FAFC", borderBottom: "1px solid var(--line-default)" }}>
          <div className="container-max">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px auto" }}>
              <span className="badge badge-emerald" style={{ marginBottom: 8 }}>SPENDEE FOR AFRICA</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", letterSpacing: -0.4 }}>
                Connect your Kenyan banks &amp; mobile wallets
              </h2>
              <p style={{ color: "#64748B", fontSize: 15, marginTop: 8 }}>
                All your balances synchronized safely with zero PIN exposure. Track transactions across your favourite Kenyan financial services in real time.
              </p>
            </div>

            {/* Bank Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
              {SUPPORTED_BANKS.map((b, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 10,
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      backgroundColor: b.bg,
                      color: b.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 14
                    }}>
                      {b.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <strong style={{ fontSize: 14, color: "#0F172A", display: "block" }}>{b.name}</strong>
                      <span style={{ fontSize: 11, color: "#64748B" }}>{b.type}</span>
                    </div>
                  </div>

                  <span className="badge badge-neutral" style={{ fontSize: 10 }}>
                    {b.tag}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 28, fontSize: 13, color: "#64748B" }}>
              🔒 Connected via bank-grade device encryption. PesaPilot never touches or stores your banking passwords or M-Pesa PIN.
            </div>
          </div>
        </section>

        {/* EXPENSIFY-INSPIRED CORE FEATURES */}
        <section id="features" style={{ padding: "72px 0", backgroundColor: "#FFFFFF", borderBottom: "1px solid var(--line-default)" }}>
          <div className="container-max">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 52px auto" }}>
              <span className="badge badge-neutral" style={{ marginBottom: 8 }}>HOW IT WORKS</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", letterSpacing: -0.4 }}>
                Everything you need to survive the semester
              </h2>
              <p style={{ color: "#64748B", fontSize: 15, marginTop: 8 }}>
                PesaPilot keeps things simple. It works with your everyday Kenyan spending habits without complicated accounting words.
              </p>
            </div>

            {/* Feature 1: M-Pesa SMS Reader */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 40,
              alignItems: "center",
              marginBottom: 64
            }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: 10 }}>1. EASY EXPENSES</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>
                  Automatic M-Pesa SMS Reader
                </h3>
                <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.6, marginBottom: 18 }}>
                  No more typing out expenses by hand. Just paste your Safaricom confirmation SMS:
                </p>
                <div style={{ display: "grid", gap: 10, fontSize: 14, color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Recognizes cafeteria food, matatu rides, and bedsitter rent immediately.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Subtracts Safaricom transaction fees so your balances always match.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Never duplicates a receipt if pasted twice.</span>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 14,
                border: "1px solid #E2E8F0",
                padding: 10,
                boxShadow: "var(--shadow-md)"
              }}>
                <img
                  src="/images/bank-app.jpg"
                  alt="M-Pesa transaction dashboard and clean ledger"
                  style={{
                    width: "100%",
                    height: 280,
                    objectFit: "cover",
                    borderRadius: 10,
                    display: "block"
                  }}
                />
              </div>
            </div>

            {/* Feature 2: Cards & Bank Accounts */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 40,
              alignItems: "center",
              marginBottom: 64
            }}>
              <div style={{ order: 2 }}>
                <span className="badge badge-blue" style={{ marginBottom: 10 }}>2. CARDS &amp; BANKS</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>
                  Manage Debit &amp; Credit Cards
                </h3>
                <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.6, marginBottom: 18 }}>
                  Keep your Equity Student Visa, KCB Mastercard, and M-Pesa balances visible in one place:
                </p>
                <div style={{ display: "grid", gap: 10, fontSize: 14, color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} color="#0284C7" />
                    <span>See your card balances, daily limits, and card status at a glance.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} color="#0284C7" />
                    <span>Put your hostel rent aside so you don't accidentally spend it with your card.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} color="#0284C7" />
                    <span>Zero banking login credentials required.</span>
                  </div>
                </div>
              </div>

              <div style={{
                order: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 14,
                border: "1px solid #E2E8F0",
                padding: 10,
                boxShadow: "var(--shadow-md)"
              }}>
                <img
                  src="/images/invest-save.jpg"
                  alt="Student card budgeting and savings"
                  style={{
                    width: "100%",
                    height: 280,
                    objectFit: "cover",
                    borderRadius: 10,
                    display: "block"
                  }}
                />
              </div>
            </div>

            {/* Feature 3: HELB Pacing */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 40,
              alignItems: "center"
            }}>
              <div>
                <span className="badge badge-amber" style={{ marginBottom: 10 }}>3. HELB PACING</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>
                  Make your HELB loan last until exams
                </h3>
                <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.6, marginBottom: 18 }}>
                  When KSh 25,000 drops into your account, it's easy to feel wealthy in the first two weeks. PesaPilot calculates a safe daily allowance so you still have cash in week 12.
                </p>
                <div style={{ display: "grid", gap: 10, fontSize: 14, color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} color="#D97706" />
                    <span>Know exactly how many days of cash you have left.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={16} color="#D97706" />
                    <span>Pre-purchase test: check if buying takeout will hurt your weekly budget.</span>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 14,
                border: "1px solid #E2E8F0",
                padding: 10,
                boxShadow: "var(--shadow-md)"
              }}>
                <img
                  src="/images/student-lifestyle.jpg"
                  alt="Student campus lifestyle and budget peace of mind"
                  style={{
                    width: "100%",
                    height: 280,
                    objectFit: "cover",
                    borderRadius: 10,
                    display: "block"
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* PRICING OVERVIEW TEASER */}
        <section style={{ padding: "64px 0", backgroundColor: "#F8FAFC", borderBottom: "1px solid var(--line-default)" }}>
          <div className="container-tight">
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span className="badge badge-emerald" style={{ marginBottom: 8 }}>FAIR &amp; SIMPLE</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A" }}>
                Free for students. Upgrade when you need more.
              </h2>
              <p style={{ color: "#64748B", fontSize: 15, marginTop: 4 }}>
                No credit card required. Start free forever.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18
            }}>
              <div className="card-formal" style={{ backgroundColor: "#FFFFFF" }}>
                <span className="badge badge-neutral" style={{ marginBottom: 8 }}>FREE</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Campus Starter</h3>
                <div style={{ margin: "12px 0" }}>
                  <strong style={{ fontSize: 28, color: "#0F172A" }}>KSh 0</strong>
                  <span style={{ fontSize: 12, color: "#64748B" }}> / forever</span>
                </div>
                <p style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>
                  M-Pesa SMS reader, safe spend calculator, and local device backup.
                </p>
                <Link href="/register" className="btn-secondary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                  Start Free
                </Link>
              </div>

              <div className="card-formal" style={{ backgroundColor: "#FFFFFF", border: "2px solid #059669" }}>
                <span className="badge badge-emerald" style={{ marginBottom: 8 }}>PRO</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Campus Navigator</h3>
                <div style={{ margin: "12px 0" }}>
                  <strong style={{ fontSize: 28, color: "#059669" }}>KSh 100</strong>
                  <span style={{ fontSize: 12, color: "#64748B" }}> / month</span>
                </div>
                <p style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>
                  Unlimited cards, HELB semester runway planning, and What-If simulator.
                </p>
                <Link href="/pricing" className="btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                  View All Features →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION (Strict Light Mode) */}
        <section style={{ padding: "64px 0" }}>
          <div className="container-tight">
            <div style={{
              backgroundColor: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: 16,
              padding: "48px 32px",
              textAlign: "center"
            }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>
                Ready to take control of your student budget?
              </h2>
              <p style={{ color: "#475569", fontSize: 15, maxWidth: 500, margin: "0 auto 24px auto" }}>
                Create your private student money workspace in under 30 seconds.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <Link href="/register" className="btn-primary btn-lg">
                  <span>Sign Up Free</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/login" className="btn-secondary btn-lg" style={{ backgroundColor: "#FFFFFF" }}>
                  <span>Log In</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid var(--line-default)",
        padding: "36px 0",
        backgroundColor: "#FFFFFF",
        fontSize: 13,
        color: "#64748B"
      }}>
        <div className="container-max" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Wallet size={16} color="#059669" />
            <span style={{ fontWeight: 700, color: "#0F172A" }}>PesaPilot Kenya</span>
            <span>· African Student Financial Platform</span>
          </div>

          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/" style={{ color: "#475569" }}>Home</Link>
            <Link href="/#banks" style={{ color: "#475569" }}>Connected Banks</Link>
            <Link href="/pricing" style={{ color: "#475569" }}>Pricing</Link>
            <Link href="/download" style={{ color: "#475569" }}>Download Mobile</Link>
            <Link href="/privacy" style={{ color: "#475569" }}>Security &amp; Privacy</Link>
            <Link href="/login" style={{ color: "#475569" }}>Log In</Link>
            <Link href="/register" style={{ color: "#475569" }}>Sign Up</Link>
          </div>

          <div>
            © {new Date().getFullYear()} PesaPilot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
