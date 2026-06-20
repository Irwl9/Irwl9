import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import SidebarNav from "@/components/dashboard/SidebarNav";

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

        {/* Dynamic nav — client component for active highlight */}
        <SidebarNav />

        {/* User + sign out */}
        <div className="px-3 py-4 border-t-2 border-[#CDEADE]">
          <div className="flex items-center gap-3 px-2 py-2">
            <div
              className="w-8 h-8 rounded-full bg-[#D6EFE4] border-2 border-[#9FD4BC] flex items-center justify-center text-clay-primary font-black text-xs flex-shrink-0"
              aria-hidden="true"
            >
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
              <svg
                className="w-4 h-4 flex-shrink-0 scale-x-[-1]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-white border-b-2 border-[#CDEADE] px-4 py-3 flex items-center justify-between">
        <a href="/" className="font-black text-clay-primary flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-clay-primary flex items-center justify-center text-white text-xs font-black">F</span>
          FlowSaaS
        </a>
        <span className="text-xs font-semibold text-clay-muted">{workspaceName}</span>
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0 pt-0 md:pt-0 mt-14 md:mt-0">{children}</main>
    </div>
  );
}
