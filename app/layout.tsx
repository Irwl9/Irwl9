import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

// Single practical brand typeface — readable at every size, used for
// both body/UI (--font-body) and headings/brand (--font-display).
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-brand",
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
    <html lang="ar" dir="rtl" className={ibmPlexArabic.variable}>
      <body className="min-h-screen bg-clay-bg">
        {children}
      </body>
    </html>
  );
}
