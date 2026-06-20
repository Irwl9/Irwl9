import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateProjectStatus, deleteProject } from "@/app/actions/projects";
import type { Project, Task } from "@/lib/types";

const STATUS_LABEL: Record<string, string> = {
  active: "نشط",
  completed: "مكتمل",
  archived: "مؤرشف",
};

const STATUS_COLOR: Record<string, string> = {
  active: "bg-[#D6EFE4] text-clay-primary border-[#9FD4BC]",
  completed: "bg-[#D6F6EC] text-[#0D9C6E] border-[#9DE9CE]",
  archived: "bg-[#EEF7F2] text-clay-muted border-[#CDEADE]",
};

function DaysLeft({ date }: { date: string | null }) {
  if (!date) return null;
  const diff = Math.ceil(
    (new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (diff < 0) return <span className="text-red-500 text-xs font-bold">متأخر {Math.abs(diff)} يوم</span>;
  if (diff === 0) return <span className="text-orange-600 text-xs font-bold">اليوم</span>;
  if (diff <= 7) return <span className="text-[#B07D14] text-xs font-bold">{diff} أيام</span>;
  return <span className="text-clay-muted text-xs font-semibold">{diff} يوم</span>;
}

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("workspace_id")
    .eq("id", user.id)
    .single();

  const workspaceId = profile?.workspace_id;

  const [projectsRes, tasksRes] = await Promise.all([
    workspaceId
      ? supabase.from("projects").select("*").eq("workspace_id", workspaceId).order("created_at", { ascending: false })
      : { data: [], error: null },
    workspaceId
      ? supabase.from("tasks").select("id, project_id, status").eq("workspace_id", workspaceId)
      : { data: [], error: null },
  ]);

  const projects: Project[] = (projectsRes.data ?? []) as Project[];
  const tasks: Pick<Task, "id" | "project_id" | "status">[] = (tasksRes.data ?? []) as Pick<Task, "id" | "project_id" | "status">[];

  function getTaskStats(projectId: string) {
    const pt = tasks.filter((t) => t.project_id === projectId);
    return { total: pt.length, done: pt.filter((t) => t.status === "done").length };
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-clay-text mb-1">المشاريع</h1>
          <p className="text-clay-muted font-semibold text-sm">
            {projects.length > 0
              ? `${projects.length} مشروع في مساحة عملك`
              : "لا مشاريع بعد — ابدأ بإنشاء أول مشروع"}
          </p>
        </div>
        <a href="/dashboard/projects/new" className="clay-btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          مشروع جديد
        </a>
      </div>

      {projects.length === 0 ? (
        <div className="clay-card p-16 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-clay-lg bg-[#D6EFE4] border-2 border-[#9FD4BC] flex items-center justify-center">
            <svg className="w-8 h-8 text-clay-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-extrabold text-clay-text mb-2">لا مشاريع بعد</h2>
          <p className="text-clay-muted mb-6 max-w-xs mx-auto text-sm">
            أنشئ مشروعاً لتنظيم مهام فريقك وتتبع التقدم.
          </p>
          <a href="/dashboard/projects/new" className="clay-btn-primary px-8 py-3 text-sm inline-flex">
            إنشاء مشروع
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => {
            const { total, done } = getTaskStats(project.id);
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            return (
              <article key={project.id} className="clay-card p-5 flex flex-col gap-4 group">
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={`/dashboard/projects/${project.id}`}
                    className="font-extrabold text-clay-text text-base group-hover:text-clay-primary transition-colors leading-tight flex-1"
                  >
                    {project.name}
                  </a>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${STATUS_COLOR[project.status]}`}>
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>

                {project.description && (
                  <p className="text-clay-muted text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                )}

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-clay-muted mb-1.5">
                    <span>{total > 0 ? `${done} من ${total} مهام` : "لا مهام بعد"}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#D6EFE4] overflow-hidden">
                    <div
                      className="h-full bg-clay-primary rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-1 border-t-2 border-[#CDEADE]">
                  <DaysLeft date={project.due_date} />
                  <div className="flex items-center gap-2">
                    {/* Status toggle form */}
                    <form action={updateProjectStatus}>
                      <input type="hidden" name="project_id" value={project.id} />
                      <input type="hidden" name="status" value={project.status === "completed" ? "active" : "completed"} />
                      <button
                        type="submit"
                        className="text-xs font-bold text-clay-muted hover:text-clay-primary px-2 py-1 rounded transition-colors"
                      >
                        {project.status === "completed" ? "أعد تفعيله" : "أكملته"}
                      </button>
                    </form>
                    {project.owner_id === user.id && (
                      <form
                        action={deleteProject}
                        onSubmit={(e) => {
                          if (!confirm(`هل تريد حذف "${project.name}"؟ لا يمكن التراجع.`)) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input type="hidden" name="project_id" value={project.id} />
                        <button
                          type="submit"
                          className="text-xs font-bold text-red-400 hover:text-red-600 px-2 py-1 rounded transition-colors"
                        >
                          حذف
                        </button>
                      </form>
                    )}
                    <a
                      href={`/dashboard/projects/${project.id}`}
                      className="text-xs font-bold text-clay-primary px-3 py-1.5 rounded-clay bg-[#D6EFE4] border border-[#9FD4BC] hover:bg-[#C2E5D3] transition-colors"
                    >
                      فتح ←
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
