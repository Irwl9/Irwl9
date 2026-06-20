import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { deleteTask } from "@/app/actions/tasks";
import TaskStatusSelect from "@/components/dashboard/TaskStatusSelect";
import type { Task, Project } from "@/lib/types";

const PRIORITY_LABEL: Record<string, string> = {
  low: "منخفضة",
  medium: "متوسطة",
  high: "عالية",
  urgent: "عاجلة",
};

const PRIORITY_COLOR: Record<string, string> = {
  low: "text-clay-muted bg-[#EEF7F2] border-[#CDEADE]",
  medium: "text-[#B07D14] bg-[#FBF1D8] border-[#F1DA9A]",
  high: "text-orange-700 bg-orange-50 border-orange-200",
  urgent: "text-red-700 bg-red-50 border-red-200",
};

const STATUS_COLOR: Record<string, string> = {
  todo: "text-clay-muted",
  in_progress: "text-clay-primary",
  done: "text-[#0D9C6E]",
  blocked: "text-red-600",
};

const STATUS_LABEL: Record<string, string> = {
  todo: "انتظار",
  in_progress: "تنفيذ",
  done: "مكتملة",
  blocked: "محظورة",
};

function daysLabel(date: string | null) {
  if (!date) return null;
  const diff = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { text: `متأخر ${Math.abs(diff)}ي`, cls: "text-red-500 font-black" };
  if (diff === 0) return { text: "اليوم", cls: "text-orange-600 font-black" };
  if (diff <= 3) return { text: `${diff}ي`, cls: "text-[#B07D14] font-bold" };
  return { text: `${diff}ي`, cls: "text-clay-muted font-semibold" };
}

export default async function TasksPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("workspace_id")
    .eq("id", user.id)
    .single();

  const workspaceId = profile?.workspace_id;

  const [tasksRes, projectsRes] = await Promise.all([
    workspaceId
      ? supabase.from("tasks").select("*").eq("workspace_id", workspaceId).order("created_at", { ascending: false })
      : { data: [], error: null },
    workspaceId
      ? supabase.from("projects").select("id, name").eq("workspace_id", workspaceId)
      : { data: [], error: null },
  ]);

  const tasks: Task[] = (tasksRes.data ?? []) as Task[];
  const projects: Pick<Project, "id" | "name">[] = (projectsRes.data ?? []) as Pick<Project, "id" | "name">[];

  const projectMap = new Map(projects.map((p) => [p.id, p.name]));

  const pending = tasks.filter((t) => t.status !== "done");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-clay-text mb-1">المهام</h1>
          <p className="text-clay-muted font-semibold text-sm">
            {tasks.length > 0
              ? `${pending.length} معلقة · ${done.length} مكتملة`
              : "لا مهام بعد"}
          </p>
        </div>
        {projects.length > 0 && (
          <a
            href="/dashboard/projects"
            className="clay-btn-primary px-5 py-2.5 text-sm flex items-center gap-2"
          >
            افتح مشروعاً لإضافة مهمة
          </a>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="clay-card p-16 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-clay-lg bg-[#D6EFE4] border-2 border-[#9FD4BC] flex items-center justify-center">
            <svg className="w-7 h-7 text-clay-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-xl font-extrabold text-clay-text mb-2">لا مهام بعد</h2>
          <p className="text-clay-muted text-sm mb-6 max-w-xs mx-auto">
            ابدأ بإنشاء مشروع وإضافة المهام من صفحة المشروع.
          </p>
          <a href="/dashboard/projects" className="clay-btn-primary px-8 py-3 text-sm inline-flex">
            الذهاب إلى المشاريع
          </a>
        </div>
      ) : (
        <div className="clay-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="grid" aria-label="قائمة المهام">
              <thead>
                <tr className="border-b-2 border-[#CDEADE] bg-[#EEF7F2]">
                  <th className="px-4 py-3 text-right font-extrabold text-clay-text text-xs">المهمة</th>
                  <th className="px-4 py-3 text-right font-extrabold text-clay-text text-xs hidden md:table-cell">المشروع</th>
                  <th className="px-4 py-3 text-right font-extrabold text-clay-text text-xs">الأولوية</th>
                  <th className="px-4 py-3 text-right font-extrabold text-clay-text text-xs">الحالة</th>
                  <th className="px-4 py-3 text-right font-extrabold text-clay-text text-xs hidden sm:table-cell">الموعد</th>
                  <th className="px-4 py-3 text-right font-extrabold text-clay-text text-xs"></th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#CDEADE]">
                {tasks.map((task) => {
                  const dl = daysLabel(task.due_date);
                  return (
                    <tr key={task.id} className="hover:bg-[#EEF7F2] transition-colors group">
                      <td className="px-4 py-3">
                        <div>
                          <a
                            href={`/dashboard/projects/${task.project_id}`}
                            className="font-bold text-clay-text hover:text-clay-primary transition-colors"
                          >
                            {task.title}
                          </a>
                          {task.description && (
                            <p className="text-clay-muted text-xs mt-0.5 line-clamp-1">{task.description}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <a
                          href={`/dashboard/projects/${task.project_id}`}
                          className="text-clay-muted font-semibold text-xs hover:text-clay-primary transition-colors"
                        >
                          {projectMap.get(task.project_id) ?? "—"}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${PRIORITY_COLOR[task.priority]}`}>
                          {PRIORITY_LABEL[task.priority]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <TaskStatusSelect
                          taskId={task.id}
                          projectId={task.project_id}
                          currentStatus={task.status}
                        />
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        {dl ? (
                          <span className={`text-xs ${dl.cls}`}>{dl.text}</span>
                        ) : (
                          <span className="text-clay-muted/40 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <form action={deleteTask}>
                          <input type="hidden" name="task_id" value={task.id} />
                          <input type="hidden" name="project_id" value={task.project_id} />
                          <button
                            type="submit"
                            onClick={(e) => {
                              if (!confirm("هل تريد حذف هذه المهمة؟")) e.preventDefault();
                            }}
                            className="text-xs font-bold text-red-400 hover:text-red-600 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                          >
                            حذف
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
