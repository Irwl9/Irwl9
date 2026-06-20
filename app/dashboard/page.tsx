import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Task, Project } from "@/lib/types";

const PRIORITY_LABEL: Record<string, string> = {
  low: "منخفضة",
  medium: "متوسطة",
  high: "عالية",
  urgent: "عاجلة",
};

const PRIORITY_COLOR: Record<string, string> = {
  low: "bg-[#EEF7F2] text-clay-muted border-[#CDEADE]",
  medium: "bg-[#FBF1D8] text-[#B07D14] border-[#F1DA9A]",
  high: "bg-orange-50 text-orange-700 border-orange-200",
  urgent: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABEL: Record<string, string> = {
  todo: "قيد الانتظار",
  in_progress: "قيد التنفيذ",
  done: "مكتملة",
  blocked: "محظورة",
};

function greeting() {
  const h = new Date().getUTCHours() + 3; // Gulf time UTC+3
  if (h >= 5 && h < 12) return "صباح الخير";
  if (h >= 12 && h < 18) return "مرحباً";
  if (h >= 18 && h < 22) return "مساء الخير";
  return "أهلاً";
}

function daysUntil(dateStr: string | null) {
  if (!dateStr) return null;
  const diff = Math.ceil(
    (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, workspace_id")
    .eq("id", user.id)
    .single();

  const firstName = (profile?.full_name || user.email || "").split(/[\s@]/)[0];
  const workspaceId = profile?.workspace_id;

  // Fetch real data
  const [projectsRes, tasksRes] = await Promise.all([
    workspaceId
      ? supabase
          .from("projects")
          .select("*")
          .eq("workspace_id", workspaceId)
          .order("created_at", { ascending: false })
      : { data: [], error: null },
    workspaceId
      ? supabase
          .from("tasks")
          .select("*")
          .eq("workspace_id", workspaceId)
          .order("created_at", { ascending: false })
      : { data: [], error: null },
  ]);

  const projects: Project[] = (projectsRes.data ?? []) as Project[];
  const tasks: Task[] = (tasksRes.data ?? []) as Task[];

  const activeProjects = projects.filter((p) => p.status === "active");
  const pendingTasks = tasks.filter((t) => t.status !== "done");
  const doneTasks = tasks.filter((t) => t.status === "done");
  const overdueTasks = pendingTasks.filter((t) => {
    const d = daysUntil(t.due_date);
    return d !== null && d < 0;
  });

  const urgentTasks = pendingTasks
    .filter((t) => t.priority === "urgent" || t.priority === "high")
    .slice(0, 5);

  const recentTasks = tasks.slice(0, 6);

  const hasData = projects.length > 0 || tasks.length > 0;

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-clay-text mb-1">
            {greeting()}، {firstName}.
          </h1>
          <p className="text-clay-muted font-semibold">
            {hasData
              ? "إليك ما يحتاج انتباهك اليوم."
              : "ابدأ بإنشاء مشروعك الأول."}
          </p>
        </div>
        <a
          href="/dashboard/projects/new"
          className="clay-btn-primary px-5 py-2.5 text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          مشروع جديد
        </a>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            value: activeProjects.length,
            label: "مشروع نشط",
            color: "text-clay-primary",
            bg: "bg-[#D6EFE4] border-[#9FD4BC]",
          },
          {
            value: pendingTasks.length,
            label: "مهمة معلقة",
            color: "text-[#B07D14]",
            bg: "bg-[#FBF1D8] border-[#F1DA9A]",
          },
          {
            value: overdueTasks.length,
            label: "متأخرة",
            color: overdueTasks.length > 0 ? "text-red-600" : "text-clay-muted",
            bg: overdueTasks.length > 0 ? "bg-red-50 border-red-200" : "bg-[#EEF7F2] border-[#CDEADE]",
          },
          {
            value: doneTasks.length,
            label: "مكتملة",
            color: "text-[#0D9C6E]",
            bg: "bg-[#D6F6EC] border-[#9DE9CE]",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`clay-card p-5 border-2 ${stat.bg}`}
          >
            <div className={`text-3xl font-black mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-clay-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      {!hasData ? (
        /* Empty state */
        <div className="clay-card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-clay-lg bg-[#D6EFE4] border-2 border-[#9FD4BC] flex items-center justify-center shadow-clay">
            <svg
              className="w-8 h-8 text-clay-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-extrabold text-clay-text mb-2">
            ابدأ مشروعك الأول
          </h2>
          <p className="text-clay-muted mb-6 max-w-xs mx-auto">
            أنشئ مشروعاً، أضف المهام، وتابع تقدم فريقك في مكان واحد.
          </p>
          <a href="/dashboard/projects/new" className="clay-btn-primary px-8 py-3 text-sm inline-flex">
            إنشاء مشروع
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Urgent / high priority tasks */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-clay-text text-lg">المهام العاجلة</h2>
              <a href="/dashboard/tasks" className="text-xs font-bold text-clay-primary hover:underline">
                عرض الكل ←
              </a>
            </div>
            {urgentTasks.length === 0 ? (
              <div className="clay-card p-8 text-center text-clay-muted font-semibold text-sm">
                لا مهام عاجلة — فريقك على المسار الصحيح 🎉
              </div>
            ) : (
              <div className="space-y-2">
                {urgentTasks.map((task) => {
                  const days = daysUntil(task.due_date);
                  const project = projects.find((p) => p.id === task.project_id);
                  return (
                    <a
                      key={task.id}
                      href={`/dashboard/projects/${task.project_id}`}
                      className="clay-card p-4 flex items-start gap-3 hover:border-clay-primary/30 transition-colors group"
                    >
                      <div
                        className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                          task.priority === "urgent"
                            ? "bg-red-500"
                            : "bg-orange-400"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-clay-text text-sm group-hover:text-clay-primary transition-colors truncate">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {project && (
                            <span className="text-xs text-clay-muted font-semibold">
                              {project.name}
                            </span>
                          )}
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border font-bold ${PRIORITY_COLOR[task.priority]}`}
                          >
                            {PRIORITY_LABEL[task.priority]}
                          </span>
                          <span className="text-xs font-semibold text-clay-muted">
                            {STATUS_LABEL[task.status]}
                          </span>
                        </div>
                      </div>
                      {days !== null && (
                        <div
                          className={`text-xs font-black flex-shrink-0 ${
                            days < 0
                              ? "text-red-600"
                              : days === 0
                              ? "text-orange-600"
                              : "text-clay-muted"
                          }`}
                        >
                          {days < 0
                            ? `متأخر ${Math.abs(days)}ي`
                            : days === 0
                            ? "اليوم"
                            : `${days}ي`}
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-clay-text text-lg">المشاريع</h2>
              <a href="/dashboard/projects" className="text-xs font-bold text-clay-primary hover:underline">
                عرض الكل ←
              </a>
            </div>
            <div className="space-y-2">
              {activeProjects.slice(0, 5).map((project) => {
                const projectTasks = tasks.filter((t) => t.project_id === project.id);
                const done = projectTasks.filter((t) => t.status === "done").length;
                const total = projectTasks.length;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <a
                    key={project.id}
                    href={`/dashboard/projects/${project.id}`}
                    className="clay-card p-4 block hover:border-clay-primary/30 transition-colors group"
                  >
                    <p className="font-bold text-clay-text text-sm group-hover:text-clay-primary transition-colors truncate mb-2">
                      {project.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-[#D6EFE4] overflow-hidden">
                        <div
                          className="h-full bg-clay-primary rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-clay-muted flex-shrink-0">
                        {done}/{total}
                      </span>
                    </div>
                  </a>
                );
              })}
              {activeProjects.length === 0 && (
                <div className="clay-card p-6 text-center">
                  <p className="text-sm text-clay-muted font-semibold mb-3">لا مشاريع نشطة</p>
                  <a href="/dashboard/projects/new" className="text-xs font-bold text-clay-primary hover:underline">
                    + أنشئ مشروعاً
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recent activity */}
      {recentTasks.length > 0 && (
        <div className="mt-8">
          <h2 className="font-black text-clay-text text-lg mb-4">آخر النشاطات</h2>
          <div className="clay-card divide-y-2 divide-[#CDEADE]">
            {recentTasks.map((task) => {
              const project = projects.find((p) => p.id === task.project_id);
              return (
                <div key={task.id} className="px-5 py-3 flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      task.status === "done"
                        ? "bg-[#34D8A6]"
                        : task.status === "in_progress"
                        ? "bg-clay-primary"
                        : task.status === "blocked"
                        ? "bg-red-400"
                        : "bg-clay-muted/40"
                    }`}
                  />
                  <span className="font-semibold text-sm text-clay-text flex-1 truncate">
                    {task.title}
                  </span>
                  {project && (
                    <span className="text-xs text-clay-muted font-semibold hidden sm:block truncate max-w-[120px]">
                      {project.name}
                    </span>
                  )}
                  <span className="text-xs font-bold text-clay-muted flex-shrink-0">
                    {STATUS_LABEL[task.status]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
