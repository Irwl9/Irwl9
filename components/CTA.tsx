import AnimateIn from "@/components/ui/AnimateIn";

export default function CTA() {
  return (
    <section
      className="relative py-28 px-5 bg-clay-bg overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-clay-primary/15 blur-[80px]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-56 h-56 rounded-full bg-clay-secondary/15 blur-[80px]" />
      </div>

      <AnimateIn className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-clay-lg bg-clay-primary mx-auto mb-7 flex items-center justify-center shadow-glow animate-pulse-glow">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>

        <h2
          id="cta-heading"
          className="text-4xl md:text-5xl font-black text-clay-text mb-5 leading-tight"
        >
          فريقك يستحق{" "}
          <span className="text-clay-primary">رئيس أعمال ذكي</span>
        </h2>

        <p className="text-lg text-clay-muted mb-10 max-w-xl mx-auto">
          ابدأ مجاناً. لا بطاقة ائتمان. لا تعقيد. فقط فريق أكثر إنتاجية من اليوم الأول.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a href="/signup" className="clay-btn-primary text-lg px-10 py-4">
            ابدأ مجاناً الآن
          </a>
          <a href="/login" className="clay-btn-secondary text-lg px-10 py-4">
            لديك حساب؟ سجّل دخولك
          </a>
        </div>

        <p className="text-sm text-clay-muted/70 font-semibold">
          تجربة مجانية 14 يوماً &nbsp;·&nbsp; بدون رسوم إعداد &nbsp;·&nbsp; إلغاء في أي وقت
        </p>
      </AnimateIn>
    </section>
  );
}
