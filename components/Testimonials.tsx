const testimonials = [
  {
    quote:
      "FlowSaaS cut our sprint planning time in half. The AI task grouping alone is worth every penny.",
    name: "Sarah K.",
    role: "Engineering Lead",
    company: "Stripe",
    avatar: "SK",
    avatarBg: "bg-[#EDE9FF] text-clay-primary border-[#C4BFEF]",
    rating: 5,
  },
  {
    quote:
      "We replaced Jira, Notion, and Slack threads with one tool. Our team communication has never been cleaner.",
    name: "Marcus T.",
    role: "Head of Product",
    company: "Vercel",
    avatar: "MT",
    avatarBg: "bg-[#E0F9F4] text-[#2AB090] border-[#A8EEE0]",
    rating: 5,
  },
  {
    quote:
      "The analytics dashboard alone has transformed how I report to stakeholders. Love the claymorphism design too!",
    name: "Priya N.",
    role: "COO",
    company: "Linear",
    avatar: "PN",
    avatarBg: "bg-[#FFE4ED] text-[#E8467C] border-[#FFBFCE]",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`} role="img">
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
          <span className="clay-badge mb-4 inline-flex">Love letters</span>
          <h2 id="testimonials-heading" className="section-heading mb-4">
            Teams <span className="text-clay-secondary">love</span> FlowSaaS
          </h2>
          <p className="section-sub">
            Don&apos;t take our word for it — hear from teams who&apos;ve shipped more, stressed less.
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

        {/* Metrics strip */}
        <div className="mt-16 clay-card p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "12,000+", label: "Teams using FlowSaaS" },
            { value: "98%", label: "Customer satisfaction" },
            { value: "4.9/5", label: "Average rating" },
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
