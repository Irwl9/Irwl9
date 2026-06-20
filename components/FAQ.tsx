"use client";

import { useState } from "react";

const faqs = [
  {
    q: "هل هناك خطة مجانية؟",
    a: "نعم! خطتنا المبتدئة مجانية للأبد لما يصل إلى 5 أعضاء و10 مشاريع. لا حاجة لبطاقة ائتمان للتسجيل.",
  },
  {
    q: "هل يمكنني تغيير الخطة في أي وقت؟",
    a: "بالتأكيد. يمكنك الترقية أو التخفيض أو إلغاء خطتك في أي وقت من إعدادات حسابك. يُحسب الدفع بشكل تناسبي.",
  },
  {
    q: "كيف تعمل أتمتة الذكاء الاصطناعي؟",
    a: "يحلل ذكاء FlowSaaS الاصطناعي أنماط مهامك لتوليد مهام فرعية تلقائياً، واقتراح مكلفين، وكتابة ملخصات، وتحديد العوائق. الخطط المحترفة تحصل على 50 تشغيلاً شهرياً؛ المؤسسات تحصل على عدد غير محدود.",
  },
  {
    q: "هل بياناتي آمنة؟",
    a: "نحن معتمدون وفق SOC 2 النوع الثاني، ونستخدم التشفير الشامل للبيانات في وضع السكون وأثناء النقل، ونقدم تسجيل الدخول الموحد لعملاء المؤسسات. لا نبيع بياناتك أبداً.",
  },
  {
    q: "ما التكاملات التي تدعمونها؟",
    a: "يتكامل FlowSaaS مع Slack وGitHub وFigma وGoogle Workspace وZapier وأكثر من 50 أداة. الخطافات المخصصة وواجهة REST API الكاملة متاحة للخطة المحترفة وما فوق.",
  },
  {
    q: "هل تقدمون خصومات للمنظمات غير الربحية أو التعليم؟",
    a: "نعم — نقدم خصماً بنسبة 50% للمنظمات غير الربحية والمؤسسات التعليمية الموثقة. تواصل مع فريقنا بإثبات الوضع للتقديم.",
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
          <span className="clay-badge mb-4 inline-flex">الأسئلة الشائعة</span>
          <h2 id="faq-heading" className="section-heading mb-4">
            هل لديك{" "}
            <span className="font-bold text-clay-primary">أسئلة؟</span>
          </h2>
          <p className="section-sub">
            كل ما تحتاج معرفته قبل أن تبدأ.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="clay-card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-right gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary focus-visible:ring-inset rounded-clay-lg"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-extrabold text-clay-text">{faq.q}</span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 border-[#9FD4BC] bg-[#D6EFE4] flex items-center justify-center text-clay-primary transition-transform duration-200 ${
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
