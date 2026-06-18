"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is there a free plan?",
    a: "Yes! Our Starter plan is free forever for up to 5 team members and 10 projects. No credit card required to sign up.",
  },
  {
    q: "Can I switch plans at any time?",
    a: "Absolutely. You can upgrade, downgrade, or cancel your plan at any time from your account settings. Billing is prorated.",
  },
  {
    q: "How does the AI automation work?",
    a: "FlowSaaS AI analyzes your task patterns to auto-generate subtasks, suggest assignees, write summaries, and surface blockers. Pro plans get 50 AI runs/month; Enterprise gets unlimited.",
  },
  {
    q: "Is my data secure?",
    a: "We're SOC 2 Type II certified, use end-to-end encryption at rest and in transit, and offer SSO/SAML for Enterprise customers. We never sell your data.",
  },
  {
    q: "What integrations do you support?",
    a: "FlowSaaS integrates with Slack, GitHub, Figma, Google Workspace, Zapier, and 50+ tools. Custom webhooks and a full REST API are available on Pro and above.",
  },
  {
    q: "Do you offer discounts for nonprofits or education?",
    a: "Yes — we offer 50% off for verified nonprofits and educational institutions. Reach out to our team with proof of status to apply.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 px-4"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <span className="clay-badge mb-4 inline-flex">FAQ</span>
          <h2 id="faq-heading" className="section-heading mb-4">
            Got questions?
          </h2>
          <p className="section-sub">
            Everything you need to know before you dive in.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="clay-card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary focus-visible:ring-inset rounded-clay-lg"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-extrabold text-clay-text">{faq.q}</span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 border-[#C4BFEF] bg-[#EDE9FF] flex items-center justify-center text-clay-primary transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                      <path d="M7 1v12M1 7h12" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-label={faq.q}
                    className="px-6 pb-5"
                  >
                    <p className="text-clay-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
