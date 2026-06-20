const items = [
  "ترتيب الأولويات تلقائياً",
  "الموجز اليومي الذكي",
  "متابعة دبلوماسية",
  "تقارير فورية",
  "تنبيهات قبل الأزمات",
  "إسناد ذكي للمهام",
  "تكامل مع Slack",
  "إجابات من بياناتك",
];

export default function Marquee() {
  return (
    <section
      className="relative py-6 bg-[#04140E] overflow-hidden border-y border-white/5"
      aria-label="قدرات FlowSaaS"
    >
      {/* Edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
        style={{ background: "linear-gradient(to left, #04140E, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
        style={{ background: "linear-gradient(to right, #04140E, transparent)" }}
      />

      <div className="marquee-paused">
        <div className="marquee-track gap-4">
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] whitespace-nowrap flex-shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-clay-accent flex-shrink-0" aria-hidden="true" />
              <span className="text-white/65 font-semibold text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
