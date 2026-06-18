"use client";

import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="clay-card flex items-center justify-between px-5 py-3 rounded-clay-lg">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 font-black text-xl text-clay-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary rounded-md"
            aria-label="FlowSaaS home"
          >
            <span
              className="w-8 h-8 rounded-xl bg-clay-primary flex items-center justify-center text-white text-sm font-black shadow-clay-sm border-2 border-[#6356D5]"
              aria-hidden="true"
            >
              F
            </span>
            FlowSaaS
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-4 py-2 rounded-clay font-semibold text-clay-muted hover:text-clay-primary hover:bg-[#EDE9FF] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="font-bold text-clay-muted hover:text-clay-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary rounded-md px-2"
            >
              Log in
            </a>
            <a href="/signup" className="clay-btn-primary text-sm py-2 px-5">
              Get started free
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-clay border-2 border-[#E8E4FF] bg-white text-clay-muted hover:text-clay-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            id="mobile-menu"
            className="mt-2 clay-card px-4 py-4 flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-clay font-semibold text-clay-muted hover:text-clay-primary hover:bg-[#EDE9FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-[#E8E4FF] my-1" />
            <a
              href="/login"
              className="px-4 py-2.5 rounded-clay font-semibold text-clay-muted hover:bg-[#EDE9FF] transition-colors"
            >
              Log in
            </a>
            <a href="/signup" className="clay-btn-primary text-center text-sm py-2.5">
              Get started free
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
