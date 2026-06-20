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
          صباح الخير، {firstName}.
        </h1>
        <p className="text-clay-muted font-semibold">
          إليك ما يحتاج انتباهك اليوم.
        </p>
      </div>

      {/* Empty state */}
      <div className="clay-card p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-clay-lg bg-[#D6EFE4] border-2 border-[#9FD4BC] flex items-center justify-center shadow-clay">
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
          لا شيء يحترق.
        </h2>
        <p className="text-clay-muted mb-6 max-w-xs mx-auto">
          أعطني هدفاً وسأحرك الفريق.
        </p>
        <button
          className="clay-btn-primary px-6 py-3 text-sm"
          aria-label="حدد هدفاً لفريقك"
        >
          حدد هدفاً
        </button>
      </div>

      {/* Coming-soon feature cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            title: "الموجز اليومي",
            desc: "ما تم إنجازه، وما هو معلق، ومن يتأخر — عند الطلب.",
            color: "bg-[#D6EFE4] border-[#9FD4BC] text-clay-primary",
          },
          {
            title: "التنبيه",
            desc: "مهمة متأخرة؟ سأكتب رسالة المتابعة. أنت فقط أرسلها.",
            color: "bg-[#FBF1D8] border-[#F1DA9A] text-[#B07D14]",
          },
          {
            title: "اسألني أي شيء",
            desc: "\"ما الذي في خطر هذا الأسبوع؟\" إجابة من بياناتك الحقيقية.",
            color: "bg-[#D6F6EC] border-[#9DE9CE] text-[#0D9C6E]",
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
              قريباً
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
