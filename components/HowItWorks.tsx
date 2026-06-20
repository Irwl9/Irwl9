import AnimateIn from "@/components/ui/AnimateIn";

const steps = [
  {
    num: "01",
    title: "أنشئ مساحة عملك",
    body: "سجّل في 30 ثانية، أضف فريقك، وحدّد هدفك الأول. لا إعدادات معقدة، لا أدلة مطوّلة.",
    color: "text-clay-primary",
    bg: "bg-[#D6EFE4] border-[#9FD4BC]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "أخبر الذكاء بأهدافك",
    body: "اكتب هدفك بكلماتك العادية. FlowSaaS يحوّله لخطة مهام مع مواعيد وأصحاب مسؤوليات — خلال ثوانٍ.",
    color: "text-[#B07D14]",
    bg: "bg-[#FBF1D8] border-[#F1DA9A]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "ارتحْ. الرئيس يتابع",
    body: "FlowSaaS يُرسل الموجز اليومي، يكتب رسائل المتابعة، ويُنبّهك عند الضرورة فقط. أنت للقرارات الكبيرة فقط.",
    color: "text-[#0D9C6E]",
    bg: "bg-[#D6F6EC] border-[#9DE9CE]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-28 px-5 bg-clay-bg"
      aria-labelledby="how-heading"
    >
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <span className="clay-badge mb-5 inline-flex">كيف يعمل</span>
          <h2
            id="how-heading"
            className="text-4xl md:text-5xl font-black text-clay-text mb-4"
          >
            ثلاث خطوات{" "}
            <span className="text-clay-primary">إلى الانطلاق</span>
          </h2>
          <p className="text-lg text-clay-muted max-w-xl mx-auto">
            من الاشتراك إلى الخطة الأولى في أقل من خمس دقائق.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-14 right-[calc(33%+24px)] left-[calc(33%+24px)] h-0.5 bg-gradient-to-l from-[#9FD4BC] via-[#9FD4BC] to-[#9FD4BC] z-0"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <AnimateIn key={step.num} delay={i * 120} direction="up">
              <div className="clay-card p-7 text-center relative z-10 group">
                {/* Number */}
                <div className="text-5xl font-black text-clay-text/8 mb-2 leading-none">{step.num}</div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-clay border-2 mx-auto mb-5 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${step.color} ${step.bg}`}
                  aria-hidden="true"
                >
                  {step.icon}
                </div>

                <h3 className="text-xl font-extrabold text-clay-text mb-3">{step.title}</h3>
                <p className="text-clay-muted leading-relaxed text-sm">{step.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={400} className="text-center mt-10">
          <a href="/signup" className="clay-btn-primary inline-flex px-10 py-4 text-base">
            جرّب مجاناً الآن
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}
