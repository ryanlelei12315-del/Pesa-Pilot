import React from "react";

/**
 * Smart, professional SVG illustrations tailored for PesaPilot
 * Designed with a formal, smart, technical look with crisp geometry and subtle emerald/navy tones.
 */

export function SmartCockpitIllustration({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 680 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="PesaPilot Financial Cockpit Interface Preview"
    >
      <defs>
        <linearGradient id="cockpitBg" x1="0" y1="0" x2="680" y2="440" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F172A" />
          <stop offset="1" stopColor="#0B1120" />
        </linearGradient>
        <linearGradient id="emeraldCard" x1="0" y1="0" x2="300" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#064E3B" stopOpacity="0.8" />
          <stop offset="1" stopColor="#042F2E" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="70%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <filter id="cardShadow" x="-10" y="-10" width="700" height="460" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="16" stdDeviation="24" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Main Window Frame */}
      <rect x="10" y="10" width="660" height="420" rx="16" fill="url(#cockpitBg)" stroke="#334155" strokeWidth="1.5" filter="url(#cardShadow)" />
      
      {/* Top Window Bar */}
      <rect x="10" y="10" width="660" height="42" rx="16" fill="#1E293B" fillOpacity="0.6" />
      <circle cx="34" cy="31" r="5" fill="#EF4444" fillOpacity="0.8" />
      <circle cx="50" cy="31" r="5" fill="#F59E0B" fillOpacity="0.8" />
      <circle cx="66" cy="31" r="5" fill="#10B981" fillOpacity="0.8" />
      
      {/* Search / Status bar */}
      <rect x="100" y="22" width="220" height="18" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <text x="120" y="35" fill="#64748B" fontSize="10" fontFamily="sans-serif">pesapilot.ke/dashboard/cockpit</text>
      <circle cx="110" cy="31" r="3" fill="#10B981" />

      {/* Live sync pill */}
      <rect x="520" y="21" width="130" height="20" rx="10" fill="#064E3B" fillOpacity="0.5" stroke="#059669" strokeWidth="1" />
      <circle cx="533" cy="31" r="3.5" fill="#34D399" />
      <text x="544" y="35" fill="#A7F3D0" fontSize="10" fontWeight="600" fontFamily="sans-serif">M-Pesa Auto-Sync</text>

      {/* Hero Safe-to-Spend Metric Card */}
      <g transform="translate(30, 68)">
        <rect width="380" height="160" rx="12" fill="url(#emeraldCard)" stroke="#059669" strokeWidth="1.2" />
        <text x="24" y="36" fill="#A7F3D0" fontSize="11" fontWeight="700" letterSpacing="1" fontFamily="sans-serif">SAFE TO SPEND TODAY</text>
        <text x="24" y="82" fill="#FFFFFF" fontSize="38" fontWeight="800" fontFamily="sans-serif">KSh 9,500</text>
        <text x="24" y="110" fill="#CBD5E1" fontSize="12" fontFamily="sans-serif">Protected: KSh 5,000 reserved for rent &amp; exam fees</text>
        
        {/* Progress bar */}
        <rect x="24" y="128" width="332" height="8" rx="4" fill="#042F2E" />
        <rect x="24" y="128" width="220" height="8" rx="4" fill="url(#gaugeGrad)" />
        <text x="24" y="148" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">68% of monthly budget remaining</text>
        <text x="310" y="148" fill="#34D399" fontSize="10" fontWeight="600" fontFamily="sans-serif">Healthy</text>
      </g>

      {/* Runway / Survival Gauge Card */}
      <g transform="translate(426, 68)">
        <rect width="224" height="160" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1.2" />
        <text x="18" y="32" fill="#94A3B8" fontSize="11" fontWeight="600" fontFamily="sans-serif">FINANCIAL RUNWAY</text>
        <text x="18" y="70" fill="#38BDF8" fontSize="32" fontWeight="800" fontFamily="sans-serif">28 Days</text>
        <text x="18" y="94" fill="#64748B" fontSize="11" fontFamily="sans-serif">Until next HELB disbursement</text>
        
        <path d="M 20 135 Q 70 120, 110 126 T 204 110" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
        <circle cx="204" cy="110" r="4" fill="#38BDF8" />
        <rect x="18" y="142" width="188" height="2" fill="#334155" />
      </g>

      {/* Recent Activity Table Card */}
      <g transform="translate(30, 244)">
        <rect width="620" height="170" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="1" />
        
        {/* Table Header */}
        <text x="24" y="28" fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily="sans-serif">Verified Transactions</text>
        <rect x="520" y="14" width="76" height="22" rx="6" fill="#0F172A" stroke="#475569" strokeWidth="1" />
        <text x="532" y="29" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Filter All</text>
        <line x1="24" y1="42" x2="596" y2="42" stroke="#334155" strokeWidth="1" />

        {/* Row 1 */}
        <g transform="translate(24, 52)">
          <circle cx="12" cy="12" r="12" fill="#064E3B" />
          <path d="M 9 12 L 12 9 L 15 12 M 12 9 L 12 16" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="36" y="12" fill="#F8FAFC" fontSize="12" fontWeight="600" fontFamily="sans-serif">HELB Upkeep Disbursement</text>
          <text x="36" y="24" fill="#64748B" fontSize="10" fontFamily="sans-serif">Equity Bank · Ref: HLB-99201-KE</text>
          <rect x="360" y="2" width="70" height="18" rx="4" fill="#0F172A" />
          <text x="372" y="14" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Government</text>
          <text x="560" y="16" fill="#10B981" fontSize="13" fontWeight="700" textAnchor="end" fontFamily="sans-serif">+KSh 25,000</text>
        </g>

        {/* Row 2 */}
        <g transform="translate(24, 96)">
          <circle cx="12" cy="12" r="12" fill="#3B1D28" />
          <path d="M 9 12 L 12 15 L 15 12 M 12 15 L 12 8" stroke="#F43F5E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="36" y="12" fill="#F8FAFC" fontSize="12" fontWeight="600" fontFamily="sans-serif">Campus Cafeteria &amp; Lunch</text>
          <text x="36" y="24" fill="#64748B" fontSize="10" fontFamily="sans-serif">M-Pesa · Paybill 247247 · QK910248P0</text>
          <rect x="360" y="2" width="56" height="18" rx="4" fill="#0F172A" />
          <text x="372" y="14" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Food</text>
          <text x="560" y="16" fill="#F8FAFC" fontSize="13" fontWeight="700" textAnchor="end" fontFamily="sans-serif">-KSh 650</text>
        </g>

        {/* Row 3 */}
        <g transform="translate(24, 138)">
          <circle cx="12" cy="12" r="12" fill="#3B1D28" />
          <path d="M 9 12 L 12 15 L 15 12 M 12 15 L 12 8" stroke="#F43F5E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="36" y="12" fill="#F8FAFC" fontSize="12" fontWeight="600" fontFamily="sans-serif">Matatu Campus Express</text>
          <text x="36" y="24" fill="#64748B" fontSize="10" fontFamily="sans-serif">M-Pesa · Till 88291 · QK940121L9</text>
          <rect x="360" y="2" width="65" height="18" rx="4" fill="#0F172A" />
          <text x="372" y="14" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Transport</text>
          <text x="560" y="16" fill="#F8FAFC" fontSize="13" fontWeight="700" textAnchor="end" fontFamily="sans-serif">-KSh 250</text>
        </g>
      </g>
    </svg>
  );
}

export function MpesaParserIllustration({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 600 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="Smart M-Pesa SMS Extraction Diagram"
    >
      <defs>
        <linearGradient id="mpesaCardGrad" x1="0" y1="0" x2="600" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B132B" />
          <stop offset="100%" stopColor="#1C2541" />
        </linearGradient>
      </defs>

      <rect width="600" height="380" rx="14" fill="url(#mpesaCardGrad)" stroke="#334155" strokeWidth="1" />

      {/* Raw SMS Box */}
      <g transform="translate(30, 36)">
        <rect width="250" height="190" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="1" />
        <rect x="14" y="14" width="85" height="18" rx="4" fill="#1E293B" />
        <text x="22" y="27" fill="#10B981" fontSize="9" fontWeight="700" fontFamily="sans-serif">SMS INCOMING</text>
        
        <text x="14" y="54" fill="#E2E8F0" fontSize="11" fontFamily="monospace">QK8921829 Confirmed.</text>
        <text x="14" y="72" fill="#E2E8F0" fontSize="11" fontFamily="monospace">KSh 1,200.00 sent to</text>
        <text x="14" y="90" fill="#34D399" fontSize="11" fontWeight="700" fontFamily="monospace">NAIVAS SUPERMARKET</text>
        <text x="14" y="108" fill="#E2E8F0" fontSize="11" fontFamily="monospace">on 24/11/26 at 2:15 PM.</text>
        <text x="14" y="126" fill="#94A3B8" fontSize="11" fontFamily="monospace">New M-PESA balance is</text>
        <text x="14" y="144" fill="#38BDF8" fontSize="11" fontWeight="700" fontFamily="monospace">KSh 8,450.00.</text>
        <text x="14" y="166" fill="#64748B" fontSize="9" fontFamily="sans-serif">Transaction cost KSh 15.00.</text>
      </g>

      {/* Processing Engine Middle Icon */}
      <g transform="translate(288, 110)">
        <circle cx="16" cy="16" r="20" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5" />
        <path d="M 8 16 L 24 16 M 18 10 L 24 16 L 18 22" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="16" y="46" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Smart NLP Parser</text>
      </g>

      {/* Parsed Structure Result */}
      <g transform="translate(320, 36)">
        <rect width="250" height="190" rx="10" fill="#1E293B" stroke="#059669" strokeWidth="1.2" />
        <rect x="14" y="14" width="90" height="18" rx="4" fill="#064E3B" />
        <text x="22" y="27" fill="#A7F3D0" fontSize="9" fontWeight="700" fontFamily="sans-serif">STRUCTURED DATA</text>

        {/* Fields */}
        <text x="14" y="56" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Reference:</text>
        <text x="110" y="56" fill="#F8FAFC" fontSize="11" fontWeight="600" fontFamily="monospace">QK8921829</text>

        <text x="14" y="80" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Amount:</text>
        <text x="110" y="80" fill="#F43F5E" fontSize="12" fontWeight="700" fontFamily="sans-serif">KSh 1,200.00</text>

        <text x="14" y="104" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Classification:</text>
        <rect x="110" y="92" width="110" height="18" rx="4" fill="#0F172A" />
        <text x="118" y="105" fill="#38BDF8" fontSize="10" fontWeight="600" fontFamily="sans-serif">GROCERIES &amp; FOOD</text>

        <text x="14" y="130" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Account Updated:</text>
        <text x="110" y="130" fill="#F8FAFC" fontSize="11" fontFamily="sans-serif">M-Pesa Safaricom</text>

        <text x="14" y="154" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Safe Spend Impact:</text>
        <text x="110" y="154" fill="#10B981" fontSize="11" fontWeight="600" fontFamily="sans-serif">-KSh 1,200 (Safe)</text>
      </g>

      {/* Bottom Insights Banner */}
      <g transform="translate(30, 250)">
        <rect width="540" height="95" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1" />
        <circle cx="28" cy="47" r="14" fill="#064E3B" />
        <path d="M 23 47 L 27 51 L 34 43" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="56" y="38" fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily="sans-serif">Zero-Touch Privacy &amp; 100% Client-Side Extraction</text>
        <text x="56" y="58" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">PesaPilot processes your SMS directly in memory. Your M-Pesa PIN, full statement, and credentials are never stored or requested.</text>
        <text x="56" y="78" fill="#38BDF8" fontSize="10" fontWeight="600" fontFamily="sans-serif">Supports: Lipa na M-Pesa, Till Numbers, Paybill, Send Money, Pochi la Biashara &amp; Bank Transfers</text>
      </g>
    </svg>
  );
}

export function RunwaySimulatorIllustration({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 540 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="Financial Runway & Burn Rate Projection"
    >
      <rect width="540" height="320" rx="14" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      
      {/* Grid Lines */}
      <line x1="50" y1="50" x2="500" y2="50" stroke="#1E293B" strokeDasharray="3 3" />
      <line x1="50" y1="100" x2="500" y2="100" stroke="#1E293B" strokeDasharray="3 3" />
      <line x1="50" y1="150" x2="500" y2="150" stroke="#1E293B" strokeDasharray="3 3" />
      <line x1="50" y1="200" x2="500" y2="200" stroke="#1E293B" strokeDasharray="3 3" />
      <line x1="50" y1="240" x2="500" y2="240" stroke="#334155" strokeWidth="1" />

      {/* Axis Labels */}
      <text x="44" y="54" fill="#64748B" fontSize="9" textAnchor="end" fontFamily="sans-serif">KSh 30k</text>
      <text x="44" y="104" fill="#64748B" fontSize="9" textAnchor="end" fontFamily="sans-serif">KSh 20k</text>
      <text x="44" y="154" fill="#64748B" fontSize="9" textAnchor="end" fontFamily="sans-serif">KSh 10k</text>
      <text x="44" y="204" fill="#64748B" fontSize="9" textAnchor="end" fontFamily="sans-serif">KSh 5k (Safe Floor)</text>

      {/* Timeline Labels */}
      <text x="70" y="258" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Week 1 (HELB)</text>
      <text x="180" y="258" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Week 4 (Midterm)</text>
      <text x="310" y="258" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Week 8</text>
      <text x="430" y="258" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Week 12 (Exams)</text>

      {/* Recommended Burn Curve */}
      <path d="M 70 70 C 150 90, 240 120, 310 160 S 430 190, 480 200" fill="none" stroke="#10B981" strokeWidth="3" />
      {/* Danger Curve without PesaPilot */}
      <path d="M 70 70 C 130 120, 200 180, 260 230" fill="none" stroke="#F43F5E" strokeWidth="2" strokeDasharray="4 4" />

      {/* Badges on Chart */}
      <circle cx="260" cy="230" r="4" fill="#F43F5E" />
      <rect x="230" y="195" width="85" height="20" rx="4" fill="#3B1D28" stroke="#F43F5E" strokeWidth="1" />
      <text x="238" y="208" fill="#FECDD3" fontSize="9" fontWeight="700" fontFamily="sans-serif">Premature Broke</text>

      <circle cx="480" cy="200" r="5" fill="#10B981" />
      <rect x="420" y="165" width="95" height="20" rx="4" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
      <text x="428" y="178" fill="#A7F3D0" fontSize="9" fontWeight="700" fontFamily="sans-serif">Semester End Buffer</text>

      {/* Footer Info */}
      <text x="50" y="295" fill="#CBD5E1" fontSize="11" fontWeight="600" fontFamily="sans-serif">PesaPilot Controlled Pace</text>
      <text x="230" y="295" fill="#64748B" fontSize="11" fontFamily="sans-serif">Allocates safe daily spending so you never run out before semester finishes.</text>
    </svg>
  );
}

export function SecurityShieldIllustration({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 280 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="Security and Privacy Shield"
    >
      <path
        d="M 140 20 L 220 50 C 220 140, 140 210, 140 210 C 140 210, 60 140, 60 50 Z"
        fill="#064E3B"
        fillOpacity="0.4"
        stroke="#10B981"
        strokeWidth="2.5"
      />
      <circle cx="140" cy="110" r="32" fill="#0F172A" stroke="#34D399" strokeWidth="2" />
      <rect x="130" y="105" width="20" height="18" rx="3" fill="#10B981" />
      <path d="M 134 105 L 134 98 C 134 93, 146 93, 146 98 L 146 105" stroke="#10B981" strokeWidth="2" fill="none" />
      <circle cx="140" cy="113" r="2" fill="#0F172A" />
      <text x="140" y="170" fill="#F8FAFC" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">LOCAL-FIRST ENCRYPTION</text>
      <text x="140" y="186" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="sans-serif">No bank password or M-Pesa PIN requested</text>
    </svg>
  );
}
