"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "المزايا", href: "#features" },
  { label: "كيف يعمل", href: "#how" },
  { label: "الأسعار", href: "#pricing" },
  { label: "التقييمات", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#CDEADE] shadow-sm"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between"
        aria-label="التنقل الرئيسي"
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 font-black text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary rounded-md"
          aria-label="الصفحة الرئيسية لـ FlowSaaS"
        >
          <span
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black border-2 flex-shrink-0 transition-all ${
              dark
                ? "bg-white/20 border-white/30 text-white"
                : "bg-clay-primary border-[#075438] text-white"
            }`}
            aria-hidden="true"
          >
            F
          </span>
          <span className={`font-display tracking-tight transition-colors font-black ${dark ? "text-white" : "text-clay-text"}`}>
            FlowSaaS
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-4 py-2 rounded-clay font-semibold text-sm transition-colors ${
                  dark
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-clay-muted hover:text-clay-text hover:bg-[#D6EFE4]"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className={`font-bold text-sm px-4 py-2 rounded-clay transition-colors ${
              dark ? "text-white/80 hover:text-white" : "text-clay-muted hover:text-clay-primary"
            }`}
          >
            تسجيل الدخول
          </a>
          <a
            href="/signup"
            className={`font-bold text-sm px-5 py-2.5 rounded-clay border-2 transition-all ${
              dark
                ? "bg-white/15 text-white border-white/30 hover:bg-white/25 backdrop-blur-sm"
                : "bg-clay-primary text-white border-[#075438] shadow-clay-sm hover:shadow-clay hover:-translate-x-0.5 hover:-translate-y-0.5"
            }`}
          >
            ابدأ مجاناً
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${dark ? "text-white" : "text-clay-text"}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-b border-[#CDEADE] px-5 py-4 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-clay font-semibold text-sm text-clay-muted hover:text-clay-text hover:bg-[#D6EFE4] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <hr className="border-[#CDEADE] my-2" />
          <a href="/login" className="px-4 py-2.5 font-semibold text-sm text-clay-muted text-center">
            تسجيل الدخول
          </a>
          <a href="/signup" className="clay-btn-primary text-center text-sm py-2.5">
            ابدأ مجاناً
          </a>
        </div>
      )}
    </header>
  );
}
