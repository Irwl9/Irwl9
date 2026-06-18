const testimonials = [
  {
    quote:
      "قلّص FlowSaaS وقت تخطيط السبرينت لدينا إلى النصف. تجميع المهام بالذكاء الاصطناعي وحده يستحق كل قرش.",
    name: "سارة ك.",
    role: "مديرة الهندسة",
    company: "Stripe",
    avatar: "س",
    avatarBg: "bg-[#EDE9FF] text-clay-primary border-[#C4BFEF]",
    rating: 5,
  },
  {
    quote:
      "استبدلنا Jira وNotion وخيوط Slack بأداة واحدة. تواصل الفريق لدينا لم يكن أكثر وضوحاً من أي وقت مضى.",
    name: "ماركوس ت.",
    role: "رئيس المنتج",
    company: "Vercel",
    avatar: "م",
    avatarBg: "bg-[#E0F9F4] text-[#2AB090] border-[#A8EEE0]",
    rating: 5,
  },
  {
    quote:
      "لوحة التحليلات وحدها غيّرت طريقة تقديم تقاريري للمساهمين. أحب التصميم أيضاً!",
    name: "بريا ن.",
    role: "المدير التنفيذي للعمليات",
    company: "Linear",
    avatar: "ب",
    avatarBg: "bg-[#FFE4ED] text-[#E8467C] border-[#FFBFCE]",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} من 5 نجوم`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#FFBF69]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 1l1.94 4.38L15 6.27l-3.5 3.41.83 4.82L8 12.13l-4.33 2.37.83-4.82L1 6.27l5.06-.89L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-4 bg-white/60"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="clay-badge mb-4 inline-flex">رسائل حب</span>
          <h2 id="testimonials-heading" className="section-heading mb-4">
            الفرق <span className="text-clay-secondary">تعشق</span> FlowSaaS
          </h2>
          <p className="section-sub">
            لا تأخذ كلامنا حجة — اسمع من الفرق التي أنجزت أكثر وضغطت أقل.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="clay-card p-6 flex flex-col gap-4"
            >
              <StarRating count={t.rating} />
              <p className="text-clay-text font-semibold leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm flex-shrink-0 ${t.avatarBg}`}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <cite className="not-italic font-extrabold text-clay-text text-sm">
                    {t.name}
                  </cite>
                  <p className="text-xs text-clay-muted">
                    {t.role} · {t.company}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-16 clay-card p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "+12,000", label: "فريق يستخدم FlowSaaS" },
            { value: "98%", label: "رضا العملاء" },
            { value: "4.9/5", label: "متوسط التقييم" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-black text-clay-primary mb-1">{stat.value}</div>
              <div className="text-clay-muted font-semibold text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
