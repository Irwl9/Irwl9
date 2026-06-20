"use client";
import AnimateIn from "@/components/ui/AnimateIn";

const features = [
  {
    id: "goal",
    label: "محرك الأهداف",
    tag: "goal engine",
    headline: "هدف واحد → خطة كاملة",
    body: "أخبر FlowSaaS بما تريد تحقيقه. سيقترح المهام، يوزّع المسؤوليات، ويضع مواعيد ذكية بناءً على طاقة فريقك الفعلية.",
    accent: "#0B7A57",
    accentBg: "rgba(52,216,166,0.12)",
    accentBorder: "rgba(52,216,166,0.25)",
    demo: (
      <div className="space-y-2 mt-4">
        <div className="px-3 py-2 rounded-clay bg-white/8 border border-white/10 text-white/60 text-xs">
          🎯 &nbsp;الهدف: إطلاق MVP في 6 أسابيع
        </div>
        {["تصميم واجهة المستخدم", "بناء API الأساسي", "اختبار الأداء", "إعداد CI/CD"].map((t, i) => (
          <div key={t} className="flex items-center gap-2 px-3 py-2 rounded-clay bg-white/5 border border-white/8">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: ["#0B7A57","#E0A82E","#34D8A6","#FFBF69"][i] }}
            />
            <span className="text-white/70 text-xs flex-1">{t}</span>
            <span className="text-white/30 text-[10px]">أ.{i + 1}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "brief",
    label: "الموجز اليومي",
    tag: "daily brief",
    headline: "تقرير يومي — بدون جهد",
    body: "كل صباح يكتب FlowSaaS موجزاً لك: ما أُنجز، ما تأخر، من بحاجة للدعم. جاهز للنشر في Slack أو البريد بضغطة واحدة.",
    accent: "#E0A82E",
    accentBg: "rgba(224,168,46,0.12)",
    accentBorder: "rgba(224,168,46,0.25)",
    demo: (
      <div className="mt-4 p-3 rounded-clay bg-white/5 border border-white/8 space-y-2">
        <p className="text-white/40 text-[10px] uppercase tracking-widest">موجز يوم الأحد · 8:00 ص</p>
        {[
          { icon: "✅", text: "5 مهام أُكملت من الفريق" },
          { icon: "⏳", text: "تصميم الصفحة الرئيسية — متأخر يومين" },
          { icon: "🧠", text: "اقتراح: أُسند المهمة لريم" },
        ].map((item) => (
          <div key={item.text} className="flex items-start gap-2">
            <span className="text-sm">{item.icon}</span>
            <p className="text-white/65 text-xs leading-relaxed">{item.text}</p>
          </div>
        ))}
        <button className="mt-1 w-full text-xs font-bold text-[#E0A82E] border border-[#E0A82E]/30 rounded-clay px-3 py-1.5 hover:bg-[#E0A82E]/10 transition-colors">
          أرسل إلى Slack ←
        </button>
      </div>
    ),
  },
  {
    id: "nudge",
    label: "التنبيه الذكي",
    tag: "smart nudge",
    headline: "متابعة دبلوماسية — لا محرجة",
    body: "مهمة متأخرة؟ FlowSaaS يكتب رسالة المتابعة بنبرة مناسبة. أنت فقط تختار إرسالها — أو تعدّلها في ثانية.",
    accent: "#34D8A6",
    accentBg: "rgba(52,216,166,0.12)",
    accentBorder: "rgba(52,216,166,0.25)",
    demo: (
      <div className="mt-4 space-y-2">
        <p className="text-white/35 text-[10px] uppercase tracking-widest">رسالة مقترحة · لـ محمد</p>
        <div className="p-3 rounded-clay bg-white/5 border border-white/8 text-white/65 text-xs leading-relaxed">
          مرحباً محمد، أردت أن أتحقق من مهمة &quot;مراجعة العقد&quot;. هل تحتاج دعماً أو تمديداً للموعد؟ 🙏
        </div>
        <div className="flex gap-2">
          <button className="flex-1 text-xs font-bold text-[#34D8A6] border border-[#34D8A6]/30 rounded-clay px-3 py-1.5 hover:bg-[#34D8A6]/10 transition-colors">
            أرسل ✓
          </button>
          <button className="flex-1 text-xs font-bold text-white/40 border border-white/10 rounded-clay px-3 py-1.5 hover:bg-white/5 transition-colors">
            عدّل
          </button>
        </div>
      </div>
    ),
  },
  {
    id: "ask",
    label: "اسأل الرئيس",
    tag: "ask the chief",
    headline: "سؤال واحد — إجابة من بياناتك",
    body: "\"ما المشاريع في خطر الأسبوع القادم؟\" — اكتب سؤالك واحصل على إجابة مباشرة من بياناتك الحقيقية. لا جداول، لا تخمين.",
    accent: "#FFBF69",
    accentBg: "rgba(255,191,105,0.12)",
    accentBorder: "rgba(255,191,105,0.25)",
    demo: (
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-clay bg-white/8 border border-white/10">
          <span className="text-white/30 text-xs flex-1">ما المشاريع في خطر؟</span>
          <div className="w-5 h-5 rounded bg-[#FFBF69] flex items-center justify-center">
            <svg className="w-3 h-3 text-[#04140E]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z" />
            </svg>
          </div>
        </div>
        <div className="p-3 rounded-clay bg-white/5 border border-[#FFBF69]/20 text-white/65 text-xs leading-relaxed">
          <span className="text-[#FFBF69] font-bold">رئيس الأعمال: </span>
          مشروعان في خطر — &quot;إطلاق التطبيق&quot; متأخر 3 أيام، و&quot;التكامل مع Stripe&quot; لم تُبدأ بعد.
        </div>
      </div>
    ),
  },
];

export default function AIFeatures() {
  return (
    <section
      id="features"
      className="relative py-28 px-5 bg-[#04140E] overflow-hidden"
      aria-labelledby="ai-features-heading"
    >
      {/* Background orb */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-clay-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-clay-primary/30 bg-clay-primary/10 text-clay-primary text-sm font-bold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-clay-primary animate-pulse" />
            مزايا الذكاء الاصطناعي
          </div>
          <h2
            id="ai-features-heading"
            className="text-4xl md:text-5xl font-light text-white mb-4 leading-[1.4]"
          >
            أربع قدرات{" "}
            <span className="gradient-text font-bold">تُغير قواعد اللعبة</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            ليس ذكاءً اصطناعياً للديكور — كل ميزة مربوطة ببياناتك الحقيقية وتُنتج نتائج قابلة للتنفيذ.
          </p>
        </AnimateIn>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <AnimateIn key={f.id} delay={i * 80} direction="up" className="h-full">
              <article
                className="group hover-glow rounded-clay-xl p-6 border transition-all duration-300 cursor-pointer h-full"
                style={{
                  background: f.accentBg,
                  borderColor: f.accentBorder,
                }}
              >
                {/* Tag */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider border"
                  style={{ color: f.accent, borderColor: `${f.accent}40`, background: `${f.accent}15` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: f.accent }} />
                  {f.tag}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{f.headline}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{f.body}</p>

                {/* Live demo */}
                {f.demo}
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
