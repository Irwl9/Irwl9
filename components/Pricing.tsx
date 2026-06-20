"use client";

import { useState } from "react";

const plans = [
  {
    name: "المبتدئ",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "مثالي للمؤسسين المستقلين والفرق الصغيرة التي تبدأ للتو.",
    features: [
      "حتى 5 أعضاء",
      "10 مشاريع نشطة",
      "5 جيجابايت تخزين",
      "تحليلات أساسية",
      "دعم البريد الإلكتروني",
    ],
    missing: ["أتمتة الذكاء الاصطناعي", "تسجيل الدخول الموحد", "دعم ذو أولوية"],
    cta: "ابدأ مجاناً",
    ctaClass: "clay-btn-secondary w-full text-center",
    highlighted: false,
    badge: null,
    cardClass: "clay-card",
  },
  {
    name: "المحترف",
    monthlyPrice: 18,
    yearlyPrice: 14,
    description: "كل ما تحتاجه الفرق للإنجاز بشكل أسرع والتعاون بشكل أفضل.",
    features: [
      "أعضاء غير محدودين",
      "مشاريع غير محدودة",
      "100 جيجابايت تخزين",
      "تحليلات متقدمة",
      "أتمتة ذكاء اصطناعي (50 تشغيل/شهر)",
      "دعم بريد إلكتروني ذو أولوية",
      "تكاملات مخصصة",
    ],
    missing: ["تسجيل الدخول الموحد", "مدير نجاح عملاء مخصص"],
    cta: "ابدأ تجربة المحترف مجاناً",
    ctaClass: "clay-btn-primary w-full text-center",
    highlighted: true,
    badge: "الأكثر شيوعاً",
    cardClass:
      "animated-border bg-clay-primary rounded-clay-lg text-white md:scale-105 shadow-glow",
  },
  {
    name: "المؤسسات",
    monthlyPrice: 49,
    yearlyPrice: 38,
    description: "ضوابط مخصصة وامتثال ودعم للمنظمات الكبيرة.",
    features: [
      "كل شيء غير محدود",
      "تسجيل الدخول الموحد / SAML",
      "امتثال SOC 2",
      "أتمتة ذكاء اصطناعي (غير محدودة)",
      "مدير نجاح عملاء مخصص",
      "تأهيل مخصص",
      "اتفاقية مستوى خدمة 99.99%",
    ],
    missing: [],
    cta: "تواصل مع المبيعات",
    ctaClass: "clay-btn-secondary w-full text-center",
    highlighted: false,
    badge: null,
    cardClass: "clay-card",
  },
];

const CheckIcon = ({ light }: { light?: boolean }) => (
  <svg
    className={`w-4 h-4 flex-shrink-0 ${light ? "text-white/90" : "text-clay-accent"}`}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
  </svg>
);

const XIcon = ({ light }: { light?: boolean }) => (
  <svg
    className={`w-4 h-4 flex-shrink-0 ${light ? "text-white/40" : "text-clay-muted/40"}`}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
  </svg>
);

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="py-24 px-4"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="clay-badge mb-4 inline-flex">أسعار بسيطة</span>
          <h2 id="pricing-heading" className="section-heading mb-4">
            اختر خطة،{" "}
            <span className="font-bold text-clay-primary">وابدأ الإنجاز</span>
          </h2>
          <p className="section-sub mb-8">
            لا رسوم خفية. لا عقود. إلغاء في أي وقت.
          </p>

          {/* Billing toggle — kept dir=ltr for toggle UX */}
          <div className="inline-flex items-center gap-3 clay-card px-5 py-3 rounded-clay-lg" dir="ltr">
            <span className={`font-bold text-sm ${!yearly ? "text-clay-primary" : "text-clay-muted"}`}>
              شهري
            </span>
            <button
              role="switch"
              aria-checked={yearly}
              aria-label="تفعيل الفوترة السنوية"
              onClick={() => setYearly(!yearly)}
              className={`relative w-12 h-6 rounded-full border-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary ${
                yearly ? "bg-clay-primary border-[#075438]" : "bg-white border-[#9FD4BC]"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white border border-[#9FD4BC] shadow transition-transform duration-200 ${
                  yearly ? "translate-x-6 border-white" : ""
                }`}
              />
            </button>
            <span className={`font-bold text-sm ${yearly ? "text-clay-primary" : "text-clay-muted"}`}>
              سنوي
              <span className="mr-1.5 clay-badge text-xs py-0.5 px-2">وفّر 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative p-6 ${plan.cardClass}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-clay-primary font-black text-xs px-3 py-1 rounded-full border-2 border-[#9FD4BC] shadow-clay-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className={`text-xl font-extrabold mb-1 ${plan.highlighted ? "text-white" : "text-clay-text"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlighted ? "text-white/70" : "text-clay-muted"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6" dir="ltr">
                <span className={`text-5xl font-black ${plan.highlighted ? "text-white" : "text-clay-text"}`}>
                  ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className={`text-sm font-semibold ml-1 ${plan.highlighted ? "text-white/70" : "text-clay-muted"}`}>
                  / شهر {yearly && plan.yearlyPrice > 0 && "(يُدفع سنوياً)"}
                </span>
              </div>

              <a
                href="#"
                className={`${plan.ctaClass} block py-3 mb-6 text-sm font-bold rounded-clay text-center transition-all duration-150`}
                style={
                  plan.highlighted
                    ? {
                        background: "rgba(255,255,255,0.15)",
                        border: "2px solid rgba(255,255,255,0.3)",
                        color: "white",
                        boxShadow: "3px 3px 0 0 rgba(0,0,0,0.15)",
                      }
                    : undefined
                }
              >
                {plan.cta}
              </a>

              <ul className="space-y-2" role="list" aria-label={`مزايا خطة ${plan.name}`}>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckIcon light={plan.highlighted} />
                    <span className={plan.highlighted ? "text-white/90" : "text-clay-text font-medium"}>
                      {f}
                    </span>
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <XIcon light={plan.highlighted} />
                    <span className={plan.highlighted ? "text-white/40" : "text-clay-muted/50"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-clay-muted mt-8 font-semibold">
          جميع الخطط تتضمن تجربة مجانية لمدة 14 يوماً. لا حاجة لبطاقة ائتمان.
        </p>
      </div>
    </section>
  );
}
