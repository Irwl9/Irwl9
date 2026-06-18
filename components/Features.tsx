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
    title: "Task management",
    description:
      "Create, assign, and track tasks with ease. Drag and drop boards, custom labels, and due dates keep your team perfectly in sync.",
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
    title: "Team collaboration",
    description:
      "Real-time comments, @mentions, and shared views so your whole team stays aligned — wherever they are in the world.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: "bg-[#E0F9F4] border-[#A8EEE0] text-[#2AB090] shadow-clay-mint",
    title: "AI automation",
    description:
      "Let AI handle the busywork. Auto-categorize tasks, write summaries, generate subtasks, and surface what actually needs your attention.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    color: "bg-[#FFF4E0] border-[#FFD9A0] text-[#D97706] shadow-[3px_3px_0_0_#FFD9A0]",
    title: "Analytics & insights",
    description:
      "Beautiful charts and dashboards that show team velocity, burndown rates, and bottlenecks. Make data-driven decisions effortlessly.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    color: "bg-[#EDE9FF] border-[#C4BFEF] text-clay-primary shadow-clay",
    title: "Smart notifications",
    description:
      "Get the right update at the right time. Digest mode, quiet hours, and intelligent filtering keep you informed without the noise.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    color: "bg-[#FFE4ED] border-[#FFBFCE] text-[#E8467C] shadow-clay-pink",
    title: "Enterprise security",
    description:
      "SOC 2 certified, end-to-end encrypted, SSO/SAML support, and granular permissions. Enterprise-grade security, startup-friendly simplicity.",
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
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="clay-badge mb-4 inline-flex">Everything you need</span>
          <h2 id="features-heading" className="section-heading mb-4">
            Built for teams that{" "}
            <span className="text-clay-primary">ship</span>
          </h2>
          <p className="section-sub">
            Powerful enough for enterprises, simple enough for startups. FlowSaaS adapts to how your team actually works.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="clay-card p-6 group"
            >
              {/* Icon */}
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
