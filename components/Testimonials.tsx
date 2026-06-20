import AnimateIn from "@/components/ui/AnimateIn";

const testimonials = [
  {
    quote: "قبل FlowSaaS كنت أمضي ساعتين كل صباح في جمع التحديثات. الآن الموجز جاهز عند فنجان قهوتي الأول.",
    name: "سارة المنصور",
    role: "مديرة هندسة البرمجيات",
    avatar: "س",
    avatarColor: "#7C6FF7",
  },
  {
    quote: "\"اسأل الرئيس\" غيّرت طريقة تحضيري للاجتماعات. سؤال واحد وعندي صورة كاملة عن حالة كل مشروع.",
    name: "محمد الخالدي",
    role: "مدير المنتج · شركة ناشئة",
    avatar: "م",
    avatarColor: "#FF8FAB",
  },
  {
    quote: "الذكاء الاصطناعي في FlowSaaS ليس للاستعراض — يكتب رسائل المتابعة بلهجة طبيعية، وفريقي يستجيب لها فعلاً.",
    name: "أميرة الشامسي",
    role: "رئيسة العمليات",
    avatar: "أ",
    avatarColor: "#5ECFB1",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-28 px-5 bg-[#060618] overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Orb */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-clay-secondary/10 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-clay-secondary/30 bg-clay-secondary/10 text-clay-secondary text-sm font-bold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-clay-secondary animate-pulse" />
            قالوا عنّا
          </div>
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            الفرق التي{" "}
            <span className="gradient-text">تعتمد علينا</span>
          </h2>
          <p className="text-lg text-white/45 max-w-xl mx-auto">
            آراء حقيقية من فرق حقيقية — لا تقييمات مصطنعة.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {testimonials.map((t, i) => (
            <AnimateIn key={t.name} delay={i * 100} direction="up">
              <blockquote className="glass-card p-6 flex flex-col gap-5 h-full">
                {/* Stars */}
                <div className="flex gap-1" aria-label="5 من 5 نجوم" role="img">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#FFBF69]" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M8 1l1.94 4.38L15 6.27l-3.5 3.41.83 4.82L8 12.13l-4.33 2.37.83-4.82L1 6.27l5.06-.89L8 1z" />
                    </svg>
                  ))}
                </div>

                <p className="text-white/70 font-semibold leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <footer className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{ backgroundColor: t.avatarColor }}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <cite className="not-italic font-extrabold text-white text-sm block">{t.name}</cite>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            </AnimateIn>
          ))}
        </div>

        {/* Bottom trust bar */}
        <AnimateIn direction="up" delay={300}>
          <div
            className="rounded-clay-xl border border-white/8 px-8 py-6 grid grid-cols-3 gap-4 text-center"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            {[
              { val: "+3,400", label: "فريق نشط" },
              { val: "98%", label: "رضا المستخدمين" },
              { val: "4.9★", label: "متوسط التقييم" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black gradient-text mb-1">{s.val}</div>
                <div className="text-white/40 text-sm font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
