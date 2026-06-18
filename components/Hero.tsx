export default function Hero() {
  return (
    <section
      className="relative overflow-hidden py-20 px-4"
      aria-label="Hero section"
    >
      {/* Background blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-clay-primary/10 rounded-full blur-3xl -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-clay-secondary/10 rounded-full blur-3xl translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="clay-badge animate-bounce-slow">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 1l1.94 4.38L15 6.27l-3.5 3.41.83 4.82L8 12.13l-4.33 2.37.83-4.82L1 6.27l5.06-.89L8 1z" />
            </svg>
            Now with AI-powered workflows
          </span>
        </div>

        {/* Heading */}
        <h1 className="section-heading mb-6 max-w-4xl mx-auto">
          Work smarter,{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-clay-primary">ship faster</span>
            <span
              className="absolute -bottom-1 left-0 right-0 h-4 bg-clay-secondary/30 rounded-full -z-10"
              aria-hidden="true"
            />
          </span>{" "}
          — together
        </h1>

        {/* Subheading */}
        <p className="section-sub mb-10 mx-auto">
          FlowSaaS brings your team, tools, and tasks into one delightfully simple workspace.
          Stop juggling apps and start getting things done.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#"
            className="clay-btn-primary text-lg px-8 py-4 w-full sm:w-auto"
          >
            Start for free
          </a>
          <a
            href="#"
            className="clay-btn-secondary text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-clay-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.542L6.3 2.84z" />
            </svg>
            Watch demo
          </a>
        </div>

        {/* Social proof strip */}
        <p className="text-sm text-clay-muted font-semibold mb-4">
          Trusted by 12,000+ teams worldwide
        </p>
        <div
          className="flex flex-wrap justify-center gap-6 opacity-50"
          aria-label="Trusted by companies"
        >
          {["Acme Corp", "Stripe", "Linear", "Vercel", "Notion"].map((name) => (
            <span key={name} className="font-black text-clay-text text-sm tracking-wide uppercase">
              {name}
            </span>
          ))}
        </div>

        {/* App mockup */}
        <div className="mt-16 relative">
          <div className="clay-card mx-auto max-w-4xl p-2 rounded-clay-xl">
            <div className="bg-[#F8F6FF] rounded-2xl overflow-hidden border border-[#E8E4FF]">
              {/* Fake browser chrome */}
              <div className="bg-white border-b border-[#E8E4FF] px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF8FAB] border border-[#FFBFCE]" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-[#FFBF69] border border-[#FFD9A0]" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-[#5ECFB1] border border-[#A8EEE0]" aria-hidden="true" />
                <div className="flex-1 mx-4 bg-[#F0EDF8] rounded-lg h-6 flex items-center px-3">
                  <span className="text-xs text-clay-muted font-semibold">app.flowsaas.io/dashboard</span>
                </div>
              </div>

              {/* Dashboard preview */}
              <div className="p-6 grid grid-cols-3 gap-4">
                {/* Sidebar */}
                <div className="col-span-1 space-y-2">
                  {["Dashboard", "Projects", "Tasks", "Team", "Analytics", "Settings"].map((item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2 rounded-xl font-semibold text-sm ${
                        i === 0
                          ? "bg-clay-primary text-white shadow-clay-sm border border-[#6356D5]"
                          : "text-clay-muted hover:bg-[#EDE9FF]"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="col-span-2 space-y-3">
                  {/* Stat cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Tasks Done", value: "142", color: "bg-[#EDE9FF] border-[#C4BFEF] shadow-clay-sm" },
                      { label: "Active", value: "28", color: "bg-[#FFE4ED] border-[#FFBFCE] shadow-clay-pink" },
                      { label: "Members", value: "9", color: "bg-[#E0F9F4] border-[#A8EEE0] shadow-clay-mint" },
                    ].map((stat) => (
                      <div key={stat.label} className={`rounded-xl border-2 p-3 ${stat.color}`}>
                        <div className="text-xs font-semibold text-clay-muted">{stat.label}</div>
                        <div className="text-2xl font-black text-clay-text">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Task list */}
                  <div className="space-y-2">
                    {["Design new onboarding flow", "Fix login edge case", "Write API docs"].map((task, i) => (
                      <div
                        key={task}
                        className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border-2 border-[#E8E4FF] shadow-clay-sm"
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                            i === 0 ? "bg-clay-primary border-[#6356D5]" : "border-[#C4BFEF]"
                          }`}
                          aria-hidden="true"
                        />
                        <span className={`text-xs font-semibold ${i === 0 ? "line-through text-clay-muted" : "text-clay-text"}`}>
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating accent cards */}
          <div
            className="absolute -left-4 top-12 hidden lg:block clay-card px-4 py-3 bg-white rounded-clay w-44 animate-float"
            aria-hidden="true"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-[#5ECFB1] border-2 border-[#A8EEE0] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-clay-text">Sprint done!</span>
            </div>
            <p className="text-xs text-clay-muted">All 18 tasks shipped</p>
          </div>

          <div
            className="absolute -right-4 bottom-12 hidden lg:block clay-card px-4 py-3 bg-white rounded-clay w-44 animate-float-delay"
            aria-hidden="true"
          >
            <div className="text-xs font-bold text-clay-text mb-1">Team velocity</div>
            <div className="flex items-end gap-1 h-8">
              {[40, 60, 45, 80, 70, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i === 5 ? "#7C6FF7" : "#C4BFEF",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
