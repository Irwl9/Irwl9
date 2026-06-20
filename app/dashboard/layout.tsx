import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, workspace_id")
    .eq("id", user.id)
    .single();

  const { data: workspace } = profile?.workspace_id
    ? await supabase
        .from("workspaces")
        .select("name")
        .eq("id", profile.workspace_id)
        .single()
    : { data: null };

  const displayName =
    profile?.full_name || user.email?.split("@")[0] || "مستخدم";
  const workspaceName = workspace?.name || "مساحة العمل";

  return (
    <div className="min-h-screen bg-clay-bg flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-l-2 border-[#CDEADE] flex-shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b-2 border-[#CDEADE]">
          <a
            href="/"
            className="font-display tracking-tight flex items-center gap-2 font-black text-lg text-clay-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary rounded-md"
          >
            <span className="w-7 h-7 rounded-lg bg-clay-primary flex items-center justify-center text-white text-xs font-black border-2 border-[#075438] flex-shrink-0">
              F
            </span>
            FlowSaaS
          </a>
          <p className="text-xs font-semibold text-clay-muted mt-1 truncate">
            {workspaceName}
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="التنقل الجانبي">
          {[
            { label: "لوحة التحكم", href: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", active: true },
            { label: "المشاريع", href: "/dashboard/projects", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z", active: false },
            { label: "المهام", href: "/dashboard/tasks", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", active: false },
            { label: "الفريق", href: "/dashboard/team", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0", active: false },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-clay font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary ${
                item.active
                  ? "bg-[#D6EFE4] text-clay-primary"
                  : "text-clay-muted hover:bg-[#EEF7F2] hover:text-clay-text"
              }`}
              aria-current={item.active ? "page" : undefined}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d={item.icon} />
              </svg>
              {item.label}
            </a>
          ))}
        </nav>

        {/* User + sign out */}
        <div className="px-3 py-4 border-t-2 border-[#CDEADE]">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-[#D6EFE4] border-2 border-[#9FD4BC] flex items-center justify-center text-clay-primary font-black text-xs flex-shrink-0">
              {displayName[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-clay-text truncate">{displayName}</p>
              <p className="text-xs text-clay-muted truncate">{user.email}</p>
            </div>
          </div>
          <form action={signOut} className="mt-2">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-clay font-semibold text-sm text-clay-muted hover:bg-[#FBF1D8] hover:text-[#B07D14] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary"
            >
              {/* Sign-out icon — mirrored for RTL */}
              <svg className="w-4 h-4 flex-shrink-0 scale-x-[-1]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
