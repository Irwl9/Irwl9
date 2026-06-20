import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mada:wght@300..900&family=Reem+Kufi:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-clay-bg">
        {children}
      </body>
    </html>
  );
}
