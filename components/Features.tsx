const features = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="2" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
    color: "bg-[#EDE9FF] border-[#C4BFEF] text-clay-primary shadow-clay",
    title: "إدارة المهام",
    description:
      "أنشئ المهام وعيّنها وتتبعها بسهولة. تساعد لوحات السحب والإفلات والتسميات المخصصة وتواريخ الاستحقاق فريقك على البقاء منسجماً تماماً.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    color: "bg-[#FFE4ED] border-[#FFBFCE] text-[#E8467C] shadow-clay-pink",
    title: "تعاون الفريق",
    description:
      "تعليقات في الوقت الفعلي، ومذكرات، وطرق عرض مشتركة تُبقي فريقك بأكمله منسجماً — أينما كانوا في العالم.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: "bg-[#E0F9F4] border-[#A8EEE0] text-[#2AB090] shadow-clay-mint",
    title: "أتمتة الذكاء الاصطناعي",
    description:
      "دع الذكاء الاصطناعي يتولى الأعمال المتكررة. تصنيف تلقائي للمهام، وكتابة ملخصات، وتوليد مهام فرعية، وتسليط الضوء على ما يستحق انتباهك.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: "bg-[#FFF4E0] border-[#FFD9A0] text-[#D97706] shadow-[3px_3px_0_0_#FFD9A0]",
    title: "التحليلات والرؤى",
    description:
      "مخططات ولوحات بيانات رائعة تُظهر سرعة الفريق ومعدلات الإنجاز والعوائق. اتخذ قرارات قائمة على البيانات بسهولة.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    color: "bg-[#EDE9FF] border-[#C4BFEF] text-clay-primary shadow-clay",
    title: "الإشعارات الذكية",
    description:
      "احصل على التحديث الصحيح في الوقت المناسب. وضع الملخص والساعات الهادئة والتصفية الذكية تُبقيك على اطلاع دون ضوضاء.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    color: "bg-[#FFE4ED] border-[#FFBFCE] text-[#E8467C] shadow-clay-pink",
    title: "أمان المؤسسات",
    description:
      "معتمد وفق SOC 2، ومشفر من طرف إلى طرف، ويدعم SSO/SAML وصلاحيات دقيقة. أمان على مستوى المؤسسات بسهولة الشركات الناشئة.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 px-4"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="clay-badge mb-4 inline-flex">كل ما تحتاجه</span>
          <h2 id="features-heading" className="section-heading mb-4">
            مصمم للفرق التي{" "}
            <span className="text-clay-primary">تُنجز</span>
          </h2>
          <p className="section-sub">
            قوي بما يكفي للمؤسسات، وبسيط بما يكفي للشركات الناشئة. يتكيف FlowSaaS مع طريقة عمل فريقك الفعلية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <article key={feature.title} className="clay-card p-6 group">
              <div
                className={`w-12 h-12 rounded-clay border-2 flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110 ${feature.color}`}
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-extrabold text-clay-text mb-2">
                {feature.title}
              </h3>
              <p className="text-clay-muted leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
