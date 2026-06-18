import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const firstName =
    (profile?.full_name || user.email || "").split(/[\s@]/)[0];

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-clay-text mb-1">
          Morning, {firstName}.
        </h1>
        <p className="text-clay-muted font-semibold">
          Here&apos;s what needs your attention today.
        </p>
      </div>

      {/* Empty state — chief-of-staff voice */}
      <div className="clay-card p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-clay-lg bg-[#EDE9FF] border-2 border-[#C4BFEF] flex items-center justify-center shadow-clay">
          <svg
            className="w-8 h-8 text-clay-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-clay-text mb-2">
          Nothing&apos;s on fire.
        </h2>
        <p className="text-clay-muted mb-6 max-w-xs mx-auto">
          Give me a goal and I&apos;ll get the team moving.
        </p>
        <button
          className="clay-btn-primary px-6 py-3 text-sm"
          aria-label="Set a goal for your team"
        >
          Set a goal
        </button>
      </div>

      {/* Coming-soon feature cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            title: "Daily Brief",
            desc: "What shipped, what's blocked, who's behind — on demand.",
            color: "bg-[#EDE9FF] border-[#C4BFEF] text-clay-primary",
          },
          {
            title: "The Nudge",
            desc: "Stale task? I'll draft the chase message. You just send it.",
            color: "bg-[#FFE4ED] border-[#FFBFCE] text-[#E8467C]",
          },
          {
            title: "Ask me anything",
            desc: "\"What's at risk this week?\" Answered from your real data.",
            color: "bg-[#E0F9F4] border-[#A8EEE0] text-[#2AB090]",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="clay-card p-5 opacity-60 cursor-not-allowed select-none"
            aria-disabled="true"
          >
            <div
              className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-bold mb-3 ${card.color}`}
            >
              Coming soon
            </div>
            <h3 className="font-extrabold text-clay-text text-sm mb-1">
              {card.title}
            </h3>
            <p className="text-xs text-clay-muted leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
