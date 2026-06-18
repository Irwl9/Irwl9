export default function CTA() {
  return (
    <section className="py-24 px-4" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-4xl">
        <div className="clay-card p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-clay-primary/10 rounded-full blur-2xl" aria-hidden="true" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-clay-secondary/10 rounded-full blur-2xl" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-clay-accent/5 rounded-full blur-3xl" aria-hidden="true" />

          <div className="relative z-10">
            <span className="clay-badge mb-6 inline-flex">ابدأ اليوم</span>

            <h2 id="cta-heading" className="section-heading mb-6 max-w-2xl mx-auto">
              هل أنت مستعد{" "}
              <span className="text-clay-primary">للانطلاق؟</span>
            </h2>

            <p className="section-sub mb-10">
              انضم إلى أكثر من 12,000 فريق انتقل من الفوضى إلى النظام.
              مجاني للأبد. لا حاجة لبطاقة ائتمان.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup" className="clay-btn-primary text-lg px-10 py-4">
                ابدأ مجاناً — للأبد
              </a>
              <a
                href="#"
                className="clay-btn-secondary text-lg px-10 py-4 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                تحدث مع المبيعات
              </a>
            </div>

            <p className="mt-6 text-sm text-clay-muted font-semibold">
              تجربة مجانية 14 يوماً &nbsp;·&nbsp; بدون رسوم إعداد &nbsp;·&nbsp; إلغاء في أي وقت
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
