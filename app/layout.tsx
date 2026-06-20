import type { Metadata } from "next";
import { Reem_Kufi, Rubik } from "next/font/google";
import "./globals.css";

// Body / UI — rounded, distinctive, clearly not Cairo
const rubik = Rubik({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

// Display / brand — geometric Kufi signature
const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowSaaS — دع العمل يدير نفسه",
  description: "المنصة المتكاملة التي تساعد الفرق على التعاون والإنجاز والنمو.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${rubik.variable} ${reemKufi.variable}`}>
      <body className="min-h-screen bg-clay-bg">
        {children}
      </body>
    </html>
  );
}
