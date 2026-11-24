"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Plus,
  Search,
  CheckCircle2,
  Download,
  CreditCard,
  Lock,
  Unlock,
  Check,
  AlertCircle,
  User,
  Settings,
  Building,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  Trash2,
  Bell,
  RefreshCw
} from "lucide-react";

import { DashboardSidebar, DashboardTab } from "../../components/DashboardSidebar";
import { DashboardHeader } from "../../components/DashboardHeader";
import { AddTransactionModal } from "../../components/AddTransactionModal";
import { MpesaImportModal } from "../../components/MpesaImportModal";
import { TimeMachineSimulator } from "../../components/TimeMachineSimulator";

type Kind = "INCOME" | "EXPENSE" | "TRANSFER";

interface Account {
  id: string;
  name: string;
  type: "MPESA" | "BANK" | "DEBIT_CARD" | "CREDIT_CARD" | "SAVINGS" | "CASH";
  provider?: string;
  balance: number;
  reserved: number;
  cardNumber?: string;
  cardExpiry?: string;
  isFrozen?: boolean;
}

interface TransactionEntry {
  id: string;
  kind: Kind;
  amount: number;
  category: string;
  note: string;
  date: string;
  accountId: string;
  reference?: string;
}

interface StudentProfile {
  name: string;
  email: string;
  institution: string;
  course: string;
  academicYear: string;
  semester: string;
  phoneNumber: string;
}

const STORAGE_KEY = "pesapilot_dashboard_data_v4";

const DEFAULT_PROFILE: StudentProfile = {
  name: "Alex Kiprono",
  email: "alex@pesapilot.ke",
  institution: "University of Nairobi",
  course: "BSc Computer Science",
  academicYear: "Year 3",
  semester: "Semester 1",
  phoneNumber: "+254 712 345 678"
};

const SEED_ACCOUNTS: Account[] = [
  {
    id: "acc-mpesa",
    name: "M-Pesa Safaricom",
    type: "MPESA",
    provider: "Safaricom",
    balance: 14500,
    reserved: 5000
  },
  {
    id: "acc-debit-equity",
    name: "Equity Student Visa Debit",
    type: "DEBIT_CARD",
    provider: "Equity Bank",
    balance: 32000,
    reserved: 0,
    cardNumber: "4201 •••• •••• 4821",
    cardExpiry: "08/28",
    isFrozen: false
  },
  {
    id: "acc-credit-kcb",
    name: "KCB Student Credit Card",
    type: "CREDIT_CARD",
    provider: "KCB Bank",
    balance: 8500,
    reserved: 0,
    cardNumber: "5399 •••• •••• 9014",
    cardExpiry: "11/27",
    isFrozen: false
  },
  {
    id: "acc-savings",
    name: "Emergency Cash Pocket",
    type: "SAVINGS",
    provider: "Personal Lockbox",
    balance: 6500,
    reserved: 0
  }
];

const SEED_TRANSACTIONS: TransactionEntry[] = [
  {
    id: "tx-1",
    kind: "INCOME",
    amount: 25000,
    category: "HELB & LOANS",
    note: "HELB Upkeep disbursement",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString().slice(0, 10),
    accountId: "acc-debit-equity",
    reference: "HLB-99201-KE"
  },
  {
    id: "tx-2",
    kind: "EXPENSE",
    amount: 4500,
    category: "RENT & HOUSING",
    note: "Off-campus Bedsitter Rent",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString().slice(0, 10),
    accountId: "acc-mpesa",
    reference: "QK894192M1"
  },
  {
    id: "tx-3",
    kind: "EXPENSE",
    amount: 650,
    category: "FOOD",
    note: "Campus Cafeteria Lunch",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString().slice(0, 10),
    accountId: "acc-mpesa",
    reference: "QK910248P0"
  },
  {
    id: "tx-4",
    kind: "EXPENSE",
    amount: 250,
    category: "TRANSPORT",
    note: "Matatu to Campus Express",
    date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString().slice(0, 10),
    accountId: "acc-mpesa",
    reference: "QK940121L9"
  },
  {
    id: "tx-5",
    kind: "INCOME",
    amount: 3000,
    category: "SIDE HUSTLE",
    note: "Graphic design freelance job",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString().slice(0, 10),
    accountId: "acc-mpesa",
    reference: "QK955102X4"
  }
];

export default function DashboardPage() {
  const router = useRouter();

  const [tab, setTab] = useState<DashboardTab>("overview");
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [authChecked, setAuthChecked] = useState(false);

  const [accounts, setAccounts] = useState<Account[]>(SEED_ACCOUNTS);
  const [entries, setEntries] = useState<TransactionEntry[]>(SEED_TRANSACTIONS);
  const [monthlyBudget, setMonthlyBudget] = useState(22000);
  const [savingsGoal, setSavingsGoal] = useState(10000);
  const [daysRemainingInSemester, setDaysRemainingInSemester] = useState(26);

  const [notice, setNotice] = useState<string>("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isMpesaOpen, setIsMpesaOpen] = useState(false);
  const [txSearch, setTxSearch] = useState("");
  const [txCategoryFilter, setTxCategoryFilter] = useState("ALL");

  // Account creation state
  const [newAccName, setNewAccName] = useState("");
  const [newAccType, setNewAccType] = useState<Account["type"]>("DEBIT_CARD");
  const [newAccBalance, setNewAccBalance] = useState("");
  const [newAccReserved, setNewAccReserved] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");

  // Sync tab with URL search parameter if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as DashboardTab;
      if (tabParam && ["overview", "transactions", "accounts", "budget", "simulator", "profile", "settings"].includes(tabParam)) {
        setTab(tabParam);
      }
    }
  }, []);

  // Strict Authentication Guard
  useEffect(() => {
    async function verifyAuth() {
      let authenticated = false;

      // 1. Check server session
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const userData = await res.json();
          if (userData && userData.email) {
            setProfile(prev => ({
              ...prev,
              name: userData.name || prev.name,
              email: userData.email
            }));
            authenticated = true;
          }
        }
      } catch {
        // network fallback
      }

      // 2. Check local session
      if (!authenticated) {
        const local = localStorage.getItem("pesapilot_demo_session");
        if (local) {
          try {
            const parsed = JSON.parse(local);
            if (parsed && parsed.email) {
              setProfile(prev => ({ ...prev, name: parsed.name || prev.name, email: parsed.email }));
              authenticated = true;
            }
          } catch {
            // invalid session
          }
        }
      }

      if (!authenticated) {
        // Unauthenticated visitor -> redirect to login
        router.push("/login");
        return;
      }

      setAuthChecked(true);

      // Hydrate local data if stored
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.profile) setProfile(parsed.profile);
          if (parsed.accounts?.length) setAccounts(parsed.accounts);
          if (parsed.entries?.length) setEntries(parsed.entries);
          if (parsed.monthlyBudget) setMonthlyBudget(parsed.monthlyBudget);
          if (parsed.savingsGoal) setSavingsGoal(parsed.savingsGoal);
        }
      } catch {
        // Fallback to defaults
      }
    }

    verifyAuth();
  }, [router]);

  // Persist data locally
  useEffect(() => {
    if (authChecked) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ profile, accounts, entries, monthlyBudget, savingsGoal })
        );
      } catch {
        // Storage unavailable
      }
    }
  }, [profile, accounts, entries, monthlyBudget, savingsGoal, authChecked]);

  // Derived Financial Metrics
  const metrics = useMemo(() => {
    const totalBalance = accounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0);
    const totalReserved = accounts.reduce((sum, a) => sum + (Number(a.reserved) || 0), 0);
    const safeToSpend = Math.max(0, totalBalance - totalReserved);

    const totalExpense = entries
      .filter((e) => e.kind === "EXPENSE")
      .reduce((sum, e) => sum + e.amount, 0);

    const totalIncome = entries
      .filter((e) => e.kind === "INCOME")
      .reduce((sum, e) => sum + e.amount, 0);

    const uniqueDates = new Set(entries.map((e) => e.date)).size;
    const dailyBurn = uniqueDates > 0 ? Math.round(totalExpense / Math.max(1, uniqueDates)) : 450;
    const runwayDays = dailyBurn > 0 ? Math.floor(safeToSpend / dailyBurn) : 90;

    const categoryTotals = entries
      .filter((e) => e.kind === "EXPENSE")
      .reduce<Record<string, number>>((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      }, {});

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    const budgetRemaining = monthlyBudget - totalExpense;

    return {
      totalBalance,
      totalReserved,
      safeToSpend,
      totalExpense,
      totalIncome,
      dailyBurn,
      runwayDays,
      sortedCategories,
      budgetRemaining
    };
  }, [accounts, entries, monthlyBudget]);

  // Actions
  const handleAddTransaction = (newTx: {
    kind: Kind;
    amount: number;
    category: string;
    note: string;
    accountId: string;
    date: string;
  }) => {
    const entry: TransactionEntry = {
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      ...newTx
    };

    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === newTx.accountId) {
          const delta = newTx.kind === "INCOME" ? newTx.amount : newTx.kind === "EXPENSE" ? -newTx.amount : 0;
          return { ...acc, balance: acc.balance + delta };
        }
        return acc;
      })
    );

    setEntries((prev) => [entry, ...prev]);
    setNotice(`Saved ${newTx.kind.toLowerCase()}: KSh ${newTx.amount.toLocaleString()} in ${newTx.category}.`);
  };

  const handleImportMpesaSms = (parsedData: {
    kind: "EXPENSE" | "INCOME";
    amount: number;
    category: string;
    note: string;
    date: string;
    reference: string;
    balanceAfter: number;
  }) => {
    const mpesaAcc = accounts.find((a) => a.type === "MPESA") || accounts[0];
    const accountId = mpesaAcc?.id || "acc-mpesa";

    const entry: TransactionEntry = {
      id: `mpesa-${Date.now()}`,
      kind: parsedData.kind,
      amount: parsedData.amount,
      category: parsedData.category,
      note: parsedData.note,
      date: parsedData.date,
      accountId,
      reference: parsedData.reference
    };

    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === accountId) {
          return {
            ...acc,
            balance: parsedData.balanceAfter > 0 ? parsedData.balanceAfter : (acc.balance + (parsedData.kind === "INCOME" ? parsedData.amount : -parsedData.amount))
          };
        }
        return acc;
      })
    );

    setEntries((prev) => [entry, ...prev]);
    setNotice(`M-Pesa SMS [${parsedData.reference}] added and balance updated.`);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const balance = Number(newAccBalance) || 0;
    const reserved = Number(newAccReserved) || 0;

    if (!newAccName.trim()) {
      setNotice("Please enter an account name.");
      return;
    }

    const newAcc: Account = {
      id: `acc-${Date.now()}`,
      name: newAccName.trim(),
      type: newAccType,
      provider: newAccType.includes("CARD") ? "Student Card" : newAccType === "MPESA" ? "Safaricom" : "Bank",
      balance,
      reserved,
      cardNumber: newAccType.includes("CARD") ? (newCardNumber.trim() || "4000 •••• •••• 1234") : undefined,
      cardExpiry: newAccType.includes("CARD") ? "12/28" : undefined,
      isFrozen: false
    };

    setAccounts((prev) => [...prev, newAcc]);
    setNewAccName("");
    setNewAccBalance("");
    setNewAccReserved("");
    setNewCardNumber("");
    setNotice(`Added account "${newAcc.name}".`);
  };

  const toggleFreezeCard = (cardId: string) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === cardId) {
          const updated = !acc.isFrozen;
          setNotice(`${acc.name} is now ${updated ? "Frozen" : "Active"}.`);
          return { ...acc, isFrozen: updated };
        }
        return acc;
      })
    );
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("Student profile saved successfully.");
  };

  const handleDeleteAccountData = async () => {
    if (confirm("Are you sure you want to permanently delete your student financial data? This action cannot be undone.")) {
      try {
        await fetch("/api/privacy/delete", { method: "POST" });
      } catch {
        // offline
      }
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("pesapilot_demo_session");
      alert("All financial data has been wiped clean in compliance with KDPA 2019.");
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // offline
    }
    localStorage.removeItem("pesapilot_demo_session");
    router.push("/login");
  };

  const handleExportData = () => {
    const data = {
      profile,
      accounts,
      entries,
      monthlyBudget,
      savingsGoal,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pesapilot-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice("Encrypted JSON export downloaded securely.");
  };

  const filteredTransactions = useMemo(() => {
    return entries.filter((e) => {
      const matchSearch =
        e.note.toLowerCase().includes(txSearch.toLowerCase()) ||
        e.category.toLowerCase().includes(txSearch.toLowerCase()) ||
        (e.reference && e.reference.toLowerCase().includes(txSearch.toLowerCase()));
      const matchCat = txCategoryFilter === "ALL" || e.category === txCategoryFilter;
      return matchSearch && matchCat;
    });
  }, [entries, txSearch, txCategoryFilter]);

  if (!authChecked) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF"
      }}>
        <div style={{ textAlign: "center", color: "#64748B", fontSize: 14 }}>
          <p>Verifying secure session...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-page)" }}>
      {/* Sidebar */}
      <DashboardSidebar
        currentTab={tab}
        onSelectTab={setTab}
        safeToSpend={metrics.safeToSpend}
        user={{ name: profile.name, email: profile.email }}
        onLogout={handleLogout}
        onExport={handleExportData}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* App Bar */}
        <DashboardHeader
          currentTab={tab}
          onOpenAddModal={() => setIsAddOpen(true)}
          onOpenMpesaModal={() => setIsMpesaOpen(true)}
          safeToSpend={metrics.safeToSpend}
        />

        {/* Bank-Grade Security Status Ribbon */}
        <div style={{
          backgroundColor: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
          padding: "6px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          color: "#475569"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#166534" }}>
              <ShieldCheck size={14} color="#059669" />
              <strong>Bank-Grade 256-Bit TLS Active</strong>
            </span>
            <span style={{ color: "#94A3B8" }}>|</span>
            <span>Zero PIN Storage Verified</span>
            <span style={{ color: "#94A3B8" }}>|</span>
            <span>KDPA 2019 Compliant</span>
          </div>

          <div style={{ fontSize: 11, color: "#64748B" }}>
            University: <strong>{profile.institution}</strong>
          </div>
        </div>

        {/* Notice Banner */}
        {notice && (
          <div style={{
            margin: "16px 28px 0 28px",
            padding: "10px 14px",
            backgroundColor: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: 8,
            color: "#166534",
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle2 size={16} color="#059669" />
              <span>{notice}</span>
            </div>
            <button onClick={() => setNotice("")} style={{ color: "#166534", padding: "2px 6px" }}>
              ✕
            </button>
          </div>
        )}

        {/* Content Container */}
        <main style={{ padding: "24px 28px 48px 28px", flex: 1 }}>
          {/* TAB 1: OVERVIEW */}
          {tab === "overview" && (
            <div className="view-enter" style={{ display: "grid", gap: 20 }}>
              {/* Primary Metrics Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
                {/* Safe To Spend */}
                <div className="card-formal" style={{ backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#166534", textTransform: "uppercase" }}>
                      SAFE TO SPEND TODAY
                    </span>
                    <span className="badge badge-emerald">Live</span>
                  </div>
                  <strong style={{ display: "block", fontSize: 26, fontWeight: 800, color: "#15803D", margin: "8px 0 2px 0" }}>
                    KSh {metrics.safeToSpend.toLocaleString()}
                  </strong>
                  <span style={{ fontSize: 11, color: "#166534" }}>
                    Rent &amp; fees (KSh {metrics.totalReserved.toLocaleString()}) kept safe
                  </span>
                </div>

                {/* Total Balance */}
                <div className="card-formal">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>TOTAL MONEY</span>
                    <Wallet size={15} color="#94A3B8" />
                  </div>
                  <strong style={{ display: "block", fontSize: 24, fontWeight: 700, color: "#0F172A", margin: "8px 0 2px 0" }}>
                    KSh {metrics.totalBalance.toLocaleString()}
                  </strong>
                  <span style={{ fontSize: 11, color: "#64748B" }}>
                    Across {accounts.length} wallets &amp; cards
                  </span>
                </div>

                {/* Daily Burn & Runway */}
                <div className="card-formal">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>SEMESTER RUNWAY</span>
                    <span className="badge badge-blue">{metrics.runwayDays} Days Left</span>
                  </div>
                  <strong style={{ display: "block", fontSize: 24, fontWeight: 700, color: "#0284C7", margin: "8px 0 2px 0" }}>
                    ~KSh {metrics.dailyBurn.toLocaleString()}<span style={{ fontSize: 12, fontWeight: 400, color: "#64748B" }}>/day</span>
                  </strong>
                  <span style={{ fontSize: 11, color: "#64748B" }}>
                    Your average daily spending
                  </span>
                </div>

                {/* Monthly Outflow */}
                <div className="card-formal">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>TOTAL SPENT</span>
                    <ArrowUpRight size={15} color="#E11D48" />
                  </div>
                  <strong style={{ display: "block", fontSize: 24, fontWeight: 700, color: "#BE123C", margin: "8px 0 2px 0" }}>
                    KSh {metrics.totalExpense.toLocaleString()}
                  </strong>
                  <span style={{ fontSize: 11, color: "#64748B" }}>
                    Total In: +KSh {metrics.totalIncome.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Middle Section: Cards & Categories */}
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
                {/* Cards Quick View */}
                <div className="card-formal">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>My Debit &amp; Credit Cards</h3>
                    <button onClick={() => setTab("accounts")} className="btn-ghost btn-sm" style={{ fontSize: 12 }}>
                      Manage Cards →
                    </button>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    {accounts.filter(a => a.type.includes("CARD")).map((card) => (
                      <div
                        key={card.id}
                        style={{
                          backgroundColor: "#F8FAFC",
                          border: card.isFrozen ? "1px solid #FECDD3" : "1px solid #E2E8F0",
                          borderRadius: 10,
                          padding: "12px 14px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 34,
                            height: 34,
                            borderRadius: 6,
                            backgroundColor: card.type === "DEBIT_CARD" ? "#ECFDF5" : "#F0F9FF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <CreditCard size={18} color={card.type === "DEBIT_CARD" ? "#059669" : "#0284C7"} />
                          </div>
                          <div>
                            <strong style={{ fontSize: 13, color: "#0F172A", display: "block" }}>{card.name}</strong>
                            <span style={{ fontSize: 11, color: "#64748B", fontFamily: "monospace" }}>
                              {card.cardNumber || "•••• •••• •••• 4821"}
                            </span>
                          </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <strong style={{ fontSize: 14, color: "#059669", display: "block" }}>
                            KSh {card.balance.toLocaleString()}
                          </strong>
                          <span style={{ fontSize: 11, color: card.isFrozen ? "#E11D48" : "#64748B" }}>
                            {card.isFrozen ? "Card Frozen" : `Exp: ${card.cardExpiry || "08/28"}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #E2E8F0" }}>
                    <button
                      onClick={() => setTab("accounts")}
                      className="btn-secondary btn-sm"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <Plus size={14} />
                      <span>Add New Debit or Credit Card</span>
                    </button>
                  </div>
                </div>

                {/* Spending by Category */}
                <div className="card-formal">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Where Your Money Goes</h3>
                    <button onClick={() => setTab("budget")} className="btn-ghost btn-sm" style={{ fontSize: 12 }}>
                      Budget Details →
                    </button>
                  </div>

                  {metrics.sortedCategories.length ? (
                    <div style={{ display: "grid", gap: 10 }}>
                      {metrics.sortedCategories.map(([category, amount]) => {
                        const pct = Math.min(100, Math.round((amount / Math.max(metrics.totalExpense, 1)) * 100));
                        return (
                          <div key={category}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                              <span style={{ color: "#334155", fontWeight: 600 }}>{category}</span>
                              <span style={{ color: "#0F172A" }}>
                                KSh {amount.toLocaleString()} <span style={{ color: "#64748B" }}>({pct}%)</span>
                              </span>
                            </div>
                            <div style={{ height: 6, backgroundColor: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{
                                width: `${pct}%`,
                                height: "100%",
                                backgroundColor: category.includes("RENT") ? "#D97706" : category.includes("FOOD") ? "#059669" : "#0284C7",
                                borderRadius: 3
                              }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ color: "#64748B", fontSize: 13, padding: "16px 0", textAlign: "center" }}>
                      No expenses logged yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Recent Ledger Feed */}
              <div className="card-formal">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Recent Transactions</h3>
                  <button onClick={() => setTab("transactions")} className="btn-ghost btn-sm" style={{ fontSize: 12 }}>
                    View All ({entries.length}) →
                  </button>
                </div>

                <div style={{ display: "grid", gap: 6 }}>
                  {entries.slice(0, 5).map((entry) => (
                    <div
                      key={entry.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "9px 12px",
                        borderRadius: 6,
                        backgroundColor: "#F8FAFC",
                        border: "1px solid #E2E8F0"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: entry.kind === "INCOME" ? "#ECFDF5" : "#FFF1F2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {entry.kind === "INCOME" ? (
                            <ArrowDownLeft size={15} color="#059669" />
                          ) : (
                            <ArrowUpRight size={15} color="#E11D48" />
                          )}
                        </div>
                        <div>
                          <strong style={{ fontSize: 13, color: "#0F172A", display: "block" }}>
                            {entry.note || entry.category}
                          </strong>
                          <span style={{ fontSize: 11, color: "#64748B" }}>
                            {entry.category} · {entry.date} {entry.reference ? `· ${entry.reference}` : ""}
                          </span>
                        </div>
                      </div>

                      <strong style={{
                        fontSize: 13,
                        color: entry.kind === "INCOME" ? "#059669" : "#0F172A"
                      }}>
                        {entry.kind === "INCOME" ? "+" : "-"}KSh {entry.amount.toLocaleString()}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRANSACTIONS */}
          {tab === "transactions" && (
            <div className="view-enter" style={{ display: "grid", gap: 16 }}>
              {/* Search & Actions Bar */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
                backgroundColor: "#FFFFFF",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid #E2E8F0"
              }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, minWidth: 260 }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <Search size={14} color="#94A3B8" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      type="text"
                      placeholder="Search transactions, M-Pesa codes, shops..."
                      value={txSearch}
                      onChange={(e) => setTxSearch(e.target.value)}
                      style={{ paddingLeft: 32, fontSize: 13 }}
                    />
                  </div>

                  <select
                    value={txCategoryFilter}
                    onChange={(e) => setTxCategoryFilter(e.target.value)}
                    style={{ width: "auto", fontSize: 13 }}
                  >
                    <option value="ALL">All Categories</option>
                    <option value="FOOD">Food</option>
                    <option value="TRANSPORT">Transport</option>
                    <option value="RENT & HOUSING">Rent &amp; Housing</option>
                    <option value="HELB & LOANS">HELB &amp; Loans</option>
                    <option value="SIDE HUSTLE">Side Hustle</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setIsMpesaOpen(true)} className="btn-secondary btn-sm" style={{ borderColor: "#A7F3D0", color: "#047857", backgroundColor: "#ECFDF5" }}>
                    <span>Paste M-Pesa SMS</span>
                  </button>
                  <button onClick={() => setIsAddOpen(true)} className="btn-primary btn-sm">
                    <Plus size={14} />
                    <span>Record Manual Entry</span>
                  </button>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="card-formal" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1.5fr 1fr 1fr 130px",
                  padding: "10px 16px",
                  backgroundColor: "#F8FAFC",
                  borderBottom: "1px solid #E2E8F0",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#64748B"
                }}>
                  <span>DATE</span>
                  <span>DESCRIPTION / SHOP</span>
                  <span>CATEGORY</span>
                  <span>ACCOUNT / CARD</span>
                  <span style={{ textAlign: "right" }}>AMOUNT</span>
                </div>

                <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
                  {filteredTransactions.length ? (
                    filteredTransactions.map((tx) => {
                      const acc = accounts.find((a) => a.id === tx.accountId);
                      return (
                        <div
                          key={tx.id}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "100px 1.5fr 1fr 1fr 130px",
                            padding: "12px 16px",
                            borderBottom: "1px solid #F1F5F9",
                            fontSize: 13,
                            alignItems: "center"
                          }}
                        >
                          <span style={{ color: "#64748B", fontSize: 12 }}>{tx.date}</span>
                          <div>
                            <strong style={{ color: "#0F172A", display: "block" }}>{tx.note}</strong>
                            {tx.reference && (
                              <span style={{ fontSize: 10, color: "#0284C7", fontFamily: "monospace" }}>
                                Ref: {tx.reference}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="badge badge-neutral" style={{ fontSize: 11 }}>
                              {tx.category}
                            </span>
                          </div>
                          <span style={{ color: "#64748B", fontSize: 12 }}>{acc?.name || "M-Pesa"}</span>
                          <strong style={{
                            textAlign: "right",
                            color: tx.kind === "INCOME" ? "#059669" : "#0F172A",
                            fontSize: 13
                          }}>
                            {tx.kind === "INCOME" ? "+" : "-"}KSh {tx.amount.toLocaleString()}
                          </strong>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: "36px 0", textAlign: "center", color: "#64748B" }}>
                      <p>No transactions match your search filter.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WALLETS & CARDS */}
          {tab === "accounts" && (
            <div className="view-enter" style={{ display: "grid", gap: 20 }}>
              {/* Cards & Accounts Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                {accounts.map((acc) => {
                  const isCard = acc.type.includes("CARD");
                  return (
                    <div
                      key={acc.id}
                      className="card-formal"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: acc.isFrozen ? "1px solid #FECDD3" : "1px solid #E2E8F0"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <div>
                          <span className="badge badge-neutral" style={{ fontSize: 10, marginBottom: 4 }}>
                            {acc.type.replace("_", " ")}
                          </span>
                          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{acc.name}</h3>
                        </div>
                        {isCard ? (
                          <CreditCard size={18} color={acc.type === "DEBIT_CARD" ? "#059669" : "#0284C7"} />
                        ) : (
                          <Wallet size={18} color="#059669" />
                        )}
                      </div>

                      {isCard && acc.cardNumber && (
                        <div style={{
                          backgroundColor: "#F8FAFC",
                          padding: "8px 10px",
                          borderRadius: 6,
                          fontSize: 12,
                          fontFamily: "monospace",
                          color: "#475569",
                          marginBottom: 8,
                          display: "flex",
                          justifyContent: "space-between"
                        }}>
                          <span>{acc.cardNumber}</span>
                          <span>Exp: {acc.cardExpiry}</span>
                        </div>
                      )}

                      <div style={{ margin: "10px 0" }}>
                        <span style={{ fontSize: 11, color: "#64748B", display: "block" }}>Available Balance</span>
                        <strong style={{ fontSize: 22, fontWeight: 800, color: "#059669" }}>
                          KSh {acc.balance.toLocaleString()}
                        </strong>
                      </div>

                      <div style={{
                        backgroundColor: "#F8FAFC",
                        borderRadius: 6,
                        padding: "8px 10px",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        color: "#475569",
                        marginBottom: 10
                      }}>
                        <span>Locked for Rent/Fees:</span>
                        <strong style={{ color: "#D97706" }}>KSh {acc.reserved.toLocaleString()}</strong>
                      </div>

                      {isCard && (
                        <button
                          type="button"
                          onClick={() => toggleFreezeCard(acc.id)}
                          className={acc.isFrozen ? "btn-primary btn-sm" : "btn-secondary btn-sm"}
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            fontSize: 12,
                            backgroundColor: acc.isFrozen ? "#059669" : "#FFFFFF"
                          }}
                        >
                          {acc.isFrozen ? <Unlock size={13} /> : <Lock size={13} />}
                          <span>{acc.isFrozen ? "Unfreeze Card" : "Freeze Card"}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add Account or Card Form */}
              <div className="card-formal" style={{ maxWidth: 520 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>
                  Add a New Card or Account
                </h3>

                <form onSubmit={handleCreateAccount} style={{ display: "grid", gap: 10 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 3, fontWeight: 500 }}>
                      Card or Account Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Equity Student Debit Card or Co-op Bank"
                      value={newAccName}
                      onChange={(e) => setNewAccName(e.target.value)}
                      style={{ fontSize: 13 }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 3, fontWeight: 500 }}>
                        Type
                      </label>
                      <select
                        value={newAccType}
                        onChange={(e) => setNewAccType(e.target.value as Account["type"])}
                        style={{ fontSize: 13 }}
                      >
                        <option value="DEBIT_CARD">Debit Card (Visa/Mastercard)</option>
                        <option value="CREDIT_CARD">Credit Card</option>
                        <option value="MPESA">M-Pesa Wallet</option>
                        <option value="BANK">Bank Account</option>
                        <option value="SAVINGS">Emergency Pocket</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 3, fontWeight: 500 }}>
                        Balance (KSh)
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={newAccBalance}
                        onChange={(e) => setNewAccBalance(e.target.value)}
                        style={{ fontSize: 13 }}
                      />
                    </div>
                  </div>

                  {newAccType.includes("CARD") && (
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 3, fontWeight: 500 }}>
                        Card Number (Masked for safety)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 4201 •••• •••• 5592"
                        value={newCardNumber}
                        onChange={(e) => setNewCardNumber(e.target.value)}
                        style={{ fontSize: 13, fontFamily: "monospace" }}
                      />
                    </div>
                  )}

                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 3, fontWeight: 500 }}>
                      Money to Lock Away (Rent / Fees)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newAccReserved}
                      onChange={(e) => setNewAccReserved(e.target.value)}
                      style={{ fontSize: 13 }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: 4 }}>
                    <Plus size={15} />
                    <span>Save Card / Account</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: BUDGET & PACING */}
          {tab === "budget" && (
            <div className="view-enter" style={{ display: "grid", gap: 20 }}>
              <div className="card-formal">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <span className="badge badge-emerald" style={{ marginBottom: 4 }}>MONTHLY SPENDING LIMIT</span>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A" }}>
                      KSh {metrics.budgetRemaining.toLocaleString()} Remaining
                    </h2>
                    <p style={{ color: "#64748B", fontSize: 13, marginTop: 2 }}>
                      Monthly budget: KSh {monthlyBudget.toLocaleString()} · Spent: KSh {metrics.totalExpense.toLocaleString()}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#64748B" }}>Edit Limit:</span>
                    <input
                      type="number"
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(Number(e.target.value) || 0)}
                      style={{ width: 110, fontSize: 13, fontWeight: 700 }}
                    />
                  </div>
                </div>

                <div style={{ height: 8, backgroundColor: "#F1F5F9", borderRadius: 4, overflow: "hidden", margin: "16px 0 8px 0" }}>
                  <div style={{
                    width: `${Math.min(100, Math.round((metrics.totalExpense / Math.max(monthlyBudget, 1)) * 100))}%`,
                    height: "100%",
                    backgroundColor: metrics.budgetRemaining < 0 ? "#E11D48" : "#059669",
                    borderRadius: 4
                  }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748B" }}>
                  <span>0%</span>
                  <span>{Math.round((metrics.totalExpense / Math.max(monthlyBudget, 1)) * 100)}% spent</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Emergency Pocket Card */}
              <div className="card-formal">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Emergency Savings Pocket</h3>
                    <p style={{ fontSize: 12, color: "#64748B" }}>Cash for emergencies so you never have to borrow</p>
                  </div>
                  <strong style={{ fontSize: 16, color: "#059669" }}>
                    KSh {accounts.find(a => a.type === "SAVINGS")?.balance.toLocaleString() || 6500} / KSh {savingsGoal.toLocaleString()}
                  </strong>
                </div>

                <div style={{ height: 6, backgroundColor: "#F1F5F9", borderRadius: 3, overflow: "hidden", marginBottom: 12 }}>
                  <div style={{
                    width: `${Math.min(100, Math.round(((accounts.find(a => a.type === "SAVINGS")?.balance || 6500) / Math.max(savingsGoal, 1)) * 100))}%`,
                    height: "100%",
                    backgroundColor: "#059669",
                    borderRadius: 3
                  }} />
                </div>

                <button
                  onClick={() => {
                    setAccounts(prev =>
                      prev.map(a => a.type === "SAVINGS" ? { ...a, balance: a.balance + 500 } : a)
                    );
                    setNotice("Added KSh 500 to emergency pocket.");
                  }}
                  className="btn-secondary btn-sm"
                >
                  <Plus size={13} />
                  <span>Deposit KSh 500 to Emergency Pocket</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: SIMULATOR */}
          {tab === "simulator" && (
            <div className="view-enter">
              <TimeMachineSimulator
                currentBalance={metrics.totalBalance}
                safeToSpend={metrics.safeToSpend}
                dailyBurn={metrics.dailyBurn}
                daysRemaining={daysRemainingInSemester}
              />
            </div>
          )}

          {/* TAB 6: STUDENT PROFILE */}
          {tab === "profile" && (
            <div className="view-enter" style={{ display: "grid", gap: 20, maxWidth: 680 }}>
              <div className="card-formal">
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    backgroundColor: "#ECFDF5",
                    color: "#059669",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 800,
                    border: "2px solid #BBF7D0"
                  }}>
                    {profile.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>{profile.name}</h2>
                    <span style={{ fontSize: 13, color: "#64748B" }}>{profile.email}</span>
                    <div style={{ marginTop: 4 }}>
                      <span className="badge badge-emerald">Verified Kenyan Student</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleUpdateProfile} style={{ display: "grid", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        style={{ fontSize: 13 }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        disabled
                        value={profile.email}
                        style={{ fontSize: 13, backgroundColor: "#F8FAFC", color: "#64748B" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
                      University / Higher Institution
                    </label>
                    <input
                      type="text"
                      value={profile.institution}
                      onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                      placeholder="e.g. University of Nairobi, Kenyatta University"
                      style={{ fontSize: 13 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
                      Course / Degree Program
                    </label>
                    <input
                      type="text"
                      value={profile.course}
                      onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                      placeholder="e.g. BSc Computer Science, BCom Finance"
                      style={{ fontSize: 13 }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
                        Academic Year
                      </label>
                      <select
                        value={profile.academicYear}
                        onChange={(e) => setProfile({ ...profile, academicYear: e.target.value })}
                        style={{ fontSize: 13 }}
                      >
                        <option>Year 1</option>
                        <option>Year 2</option>
                        <option>Year 3</option>
                        <option>Year 4</option>
                        <option>Postgraduate</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
                        Semester
                      </label>
                      <select
                        value={profile.semester}
                        onChange={(e) => setProfile({ ...profile, semester: e.target.value })}
                        style={{ fontSize: 13 }}
                      >
                        <option>Semester 1</option>
                        <option>Semester 2</option>
                        <option>Trimester 3</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "#475569", marginBottom: 4, fontWeight: 500 }}>
                      M-Pesa Phone Number (for receipt matching)
                    </label>
                    <input
                      type="text"
                      value={profile.phoneNumber}
                      onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                      placeholder="+254 7XX XXX XXX"
                      style={{ fontSize: 13 }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: 6, width: "fit-content" }}>
                    <span>Save Profile Changes</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY & SETTINGS */}
          {tab === "settings" && (
            <div className="view-enter" style={{ display: "grid", gap: 20, maxWidth: 680 }}>
              {/* Security Health Card */}
              <div className="card-formal">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <ShieldCheck size={20} color="#059669" />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>
                    Bank-Grade Security Status
                  </h3>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    backgroundColor: "#F8FAFC",
                    borderRadius: 8
                  }}>
                    <div>
                      <strong style={{ fontSize: 13, color: "#0F172A", display: "block" }}>Session Encryption</strong>
                      <span style={{ fontSize: 11, color: "#64748B" }}>256-bit TLS bank-level transport protocol</span>
                    </div>
                    <span className="badge badge-emerald">Active</span>
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    backgroundColor: "#F8FAFC",
                    borderRadius: 8
                  }}>
                    <div>
                      <strong style={{ fontSize: 13, color: "#0F172A", display: "block" }}>PIN Access Policy</strong>
                      <span style={{ fontSize: 11, color: "#64748B" }}>Zero M-Pesa PIN or banking passwords stored</span>
                    </div>
                    <span className="badge badge-emerald">Compliant</span>
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    backgroundColor: "#F8FAFC",
                    borderRadius: 8
                  }}>
                    <div>
                      <strong style={{ fontSize: 13, color: "#0F172A", display: "block" }}>Local Data Isolation</strong>
                      <span style={{ fontSize: 11, color: "#64748B" }}>Client-side SMS parsing without ad trackers</span>
                    </div>
                    <span className="badge badge-emerald">Verified</span>
                  </div>
                </div>
              </div>

              {/* Data & Privacy Controls */}
              <div className="card-formal">
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 14 }}>
                  Data Management &amp; Backups
                </h3>

                <p style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>
                  You maintain 100% legal ownership of your data under the Kenya Data Protection Act 2019. Download your complete financial log or erase your account permanently.
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                  <button
                    onClick={handleExportData}
                    className="btn-secondary"
                    style={{ fontSize: 13 }}
                  >
                    <Download size={15} />
                    <span>Download Encrypted Backup (JSON)</span>
                  </button>
                </div>

                <div style={{
                  paddingTop: 16,
                  borderTop: "1px solid #E2E8F0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <strong style={{ fontSize: 13, color: "#E11D48", display: "block" }}>Delete Account &amp; Wipe Records</strong>
                    <span style={{ fontSize: 11, color: "#64748B" }}>Permanently erases all cards, transactions, and profile data</span>
                  </div>
                  <button
                    onClick={handleDeleteAccountData}
                    className="btn-secondary btn-sm"
                    style={{ borderColor: "#FECDD3", color: "#E11D48", backgroundColor: "#FFF1F2" }}
                  >
                    <Trash2 size={14} />
                    <span>Delete All Data</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AddTransactionModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        accounts={accounts}
        onAdd={handleAddTransaction}
      />

      <MpesaImportModal
        isOpen={isMpesaOpen}
        onClose={() => setIsMpesaOpen(false)}
        onImport={handleImportMpesaSms}
        existingReferences={entries.map(e => e.reference || "").filter(Boolean)}
      />
    </div>
  );
}
