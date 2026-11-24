import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PesaPilot — Smart Financial Cockpit for Kenyan Students",
  description: "Automated M-Pesa SMS extraction, cash runway pacing, and safe-to-spend intelligence engineered for Kenyan student life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
