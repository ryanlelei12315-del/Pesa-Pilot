# PesaPilot 🇰🇪
> **The Intelligent Financial Cockpit for African Students & Young Professionals**

PesaPilot is a private, light-mode financial operating system built specifically for campus life in Kenya. It bridges everyday mobile money habits—such as Safaricom M-Pesa and Airtel Money—with student bank accounts, debit/credit cards, and semester-long HELB loan disbursement pacing.

---

## 🌟 Key Capabilities

### 1. 📱 Automatic M-Pesa & Airtel Money SMS Extraction
- **Zero Manual Data Entry**: Paste any Safaricom M-Pesa confirmation text (Lipa na M-Pesa, Till Numbers, Paybill, Pochi la Biashara, Send Money, Bank-to-M-Pesa).
- **Auto-Categorization**: Automatically categorizes merchants into Food, Matatu Transport, Bedsitter Rent, Academics, and Side Hustles.
- **Fee Detection**: Separates Safaricom transaction tariffs to prevent phantom balance drift.
- **Smart Deduplication**: Safeguards against logging the same transaction reference twice.

### 2. 🛡️ Safe-to-Spend™ & Cash Runway Engine
- **Reserve Protection**: Locks upcoming semester rent and exam fees away from your spendable total.
- **Daily Spending Cap**: Calculates an exact, realistic daily allowance so semester upkeep lasts until exams.
- **HELB Loan Disbursement Pacing**: Solves the "week 2 wealth, week 8 broke" cycle by distributing lump-sum disbursements over semester weeks.

### 3. 💳 Wallets, Bank Cards & Connected Accounts
- **Benchmarked to Spendee Banks** with deep African personalization:
  - **Mobile Wallets**: Safaricom M-Pesa, Airtel Money.
  - **Kenyan Banks**: Equity Bank (EazzyBanking), KCB Bank (Vooma), Co-operative Bank (MCo-op Cash), NCBA Loop, Absa Bank Kenya (Timiza), Stanbic, Standard Chartered Kenya.
  - **Debit & Credit Cards**: Visual student card management with masked card numbers, balance limits, and instant one-click **Card Freeze / Unfreeze**.

### 4. 🧭 Financial Time Machine (What-If Simulator)
- Test discretionary purchases (takeout, new shoes, weekend trips) in a virtual sandbox before making payment.
- Projects the exact runway penalty in days and alerts you if a purchase breaches your locked rent reserve.

### 5. 🔒 Bank-Grade Security & Privacy by Design
- **Zero PIN Policy**: PesaPilot will **never** request, store, or transmit your 4-digit M-Pesa PIN or banking passwords.
- **Local Device Processing**: SMS messages are parsed directly on your local device without third-party ad tracker exposure.
- **Kenya Data Protection Act 2019 (KDPA)**: Complete data ownership with one-click Encrypted JSON export and immediate permanent account wiping.

### 6. 📲 Mobile App Downloads
- **Android APK**: Standalone downloadable mobile package (`v1.2.0`, 18 MB).
- **iOS / Safari PWA**: Optimized Progressive Web App with offline caching and home-screen launch.

---

## 🏷️ Student-First Pricing

| Plan | Pricing | Highlights |
| :--- | :--- | :--- |
| **Campus Starter** | **KSh 0** / forever | M-Pesa SMS reader, safe spend calculator, 2 connected accounts, offline mode |
| **Campus Navigator Pro** | **KSh 100** / mo *(Annual)* or KSh 150/mo | Unlimited cards & banks, HELB runway pacing, What-If simulator, Excel exports |
| **Chama & Hostel Circle** | **KSh 350** / mo *(Annual)* or KSh 450/mo | Up to 6 members, joint hostel utility split, transparent student chama ledger |

---

## 🏗️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Database & ORM**: [SQLite](https://www.sqlite.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: Secure HTTP-only cookie sessions with SHA-256 token hashing & bcrypt password encryption
- **Styling**: Pure Light-Mode Design System (`app/globals.css`) with restrained typography and smooth micro-transitions
- **Testing**: [Vitest](https://vitest.dev/) with comprehensive unit tests for regex SMS parsing and financial cashflow engines

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- npm or pnpm

### Installation

1. **Clone the repository and install dependencies**:
   ```bash
   git clone https://github.com/your-username/pesa-pilot.git
   cd pesa-pilot
   npm install
   ```

2. **Initialize Database & Seed Demo Data**:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

Run the test suite and type checker:

```bash
# Run unit tests with Vitest
npm run test

# Run TypeScript compilation check
npm run typecheck
```

---

## 📁 Project Structure

```
pesa-pilot/
├── app/
│   ├── (dashboard)/            # Dashboard subviews
│   ├── api/                    # Authenticated REST API routes
│   │   ├── auth/               # login, register, logout
│   │   ├── me/                 # session user profile
│   │   ├── accounts/           # financial accounts & cards
│   │   ├── transactions/       # transaction ledger
│   │   └── privacy/            # account data deletion
│   ├── dashboard/              # Cockpit dashboard (Overview, Ledger, Cards, Budget, Profile, Settings)
│   ├── download/               # Android APK & iOS install page
│   ├── login/                  # Expensify-benchmark light auth screen
│   ├── privacy/                # KDPA 2019 Privacy & Security policy
│   ├── pricing/                # Transparent student pricing plans
│   ├── register/               # Student registration screen
│   ├── globals.css             # 100% Light mode design system
│   ├── layout.tsx              # Root HTML & metadata layout
│   └── page.tsx                # Spendee-benchmark African landing page
├── components/                 # Reusable components (Navbar, Header, Sidebar, Modals, Simulator)
├── packages/
│   ├── financial-engine/       # Survival meter, cash flow, challenges, time machine
│   └── transaction-parser/     # Safaricom M-Pesa regex extraction & tests
├── prisma/
│   ├── schema.prisma           # Prisma schema (User, Account, Transaction, Session)
│   └── seed.js                 # Database seed script
└── public/
    ├── downloads/              # Official Android APK package
    └── images/                 # Optimized photographic assets
```

---

## 📄 License & Compliance

Built with pride for Kenyan university students. Complies with the **Kenya Data Protection Act 2019 (KDPA)**. Zero tracking cookies, zero PIN exposure, 100% student autonomy.
