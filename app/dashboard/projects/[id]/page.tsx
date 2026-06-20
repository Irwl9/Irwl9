import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { updateProjectStatus } from "@/app/actions/projects";
import { deleteTask } from "@/app/actions/tasks";
import NewTaskForm from "@/components/dashboard/NewTaskForm";
import TaskStatusSelect from "@/components/dashboard/TaskStatusSelect";
import type { Project, Task } from "@/lib/types";

const STATUS_COLUMNS = [
  { key: "todo", label: "قيد الانتظار", color: "border-t-clay-muted/30", dot: "bg-clay-muted/40" },
  { key: "in_progress", label: "قيد التنفيذ", color: "border-t-clay-primary", dot: "bg-clay-primary" },
  { key: "done", label: "مكتملة", color: "border-t-[#34D8A6]", dot: "bg-[#34D8A6]" },
  { key: "blocked", label: "محظورة", color: "border-t-red-400", dot: "bg-red-400" },
] as const;

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

function daysLabel(date: string | null) {
  if (!date) return null;
  const diff = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { text: `متأخر ${Math.abs(diff)}ي`, cls: "text-red-500" };
  if (diff === 0) return { text: "اليوم", cls: "text-orange-600" };
  return { text: `${diff}ي`, cls: "text-clay-muted" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [projectRes, tasksRes] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).single(),
    supabase.from("tasks").select("*").eq("project_id", id).order("created_at", { ascending: false }),
  ]);

  if (!projectRes.data) notFound();

  const project = projectRes.data as Project;
  const tasks: Task[] = (tasksRes.data ?? []) as Task[];

  const done = tasks.filter((t) => t.status === "done").length;
  const pct = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;
  const isOwner = project.owner_id === user.id;

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Breadcrumb */}
      <a
        href="/dashboard/projects"
        className="text-sm font-bold text-clay-muted hover:text-clay-primary transition-colors flex items-center gap-1 mb-6"
      >
        <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        المشاريع
      </a>

      {/* Project header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1">
            <h1 className="text-3xl font-black text-clay-text mb-2">{project.name}</h1>
            {project.description && (
              <p className="text-clay-muted font-semibold text-sm max-w-2xl">{project.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isOwner && (
              <form action={updateProjectStatus}>
                <input type="hidden" name="project_id" value={project.id} />
                <input type="hidden" name="status" value={project.status === "completed" ? "active" : "completed"} />
                <button
                  type="submit"
                  className="clay-btn-secondary px-4 py-2 text-sm"
                >
                  {project.status === "completed" ? "أعد تفعيله" : "اكتمل المشروع ✓"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Progress + meta */}
        <div className="mt-4 clay-card p-4 flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between text-xs font-bold text-clay-muted mb-1.5">
              <span>التقدم — {done} من {tasks.length} مهام</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-[#D6EFE4] overflow-hidden">
              <div
                className="h-full bg-clay-primary rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          {project.due_date && (() => {
            const d = daysLabel(project.due_date);
            return d ? (
              <div className="text-center">
                <div className={`text-xl font-black ${d.cls}`}>{d.text}</div>
                <div className="text-xs font-semibold text-clay-muted">موعد الاستحقاق</div>
              </div>
            ) : null;
          })()}
          <div className="text-center">
            <div className="text-xl font-black text-clay-primary">{tasks.filter(t => t.status === "in_progress").length}</div>
            <div className="text-xs font-semibold text-clay-muted">قيد التنفيذ</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-red-500">{tasks.filter(t => t.status === "blocked").length}</div>
            <div className="text-xs font-semibold text-clay-muted">محظورة</div>
          </div>
        </div>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {STATUS_COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className={`clay-card pt-0 overflow-hidden border-t-4 ${col.color}`}>
              <div className="px-4 py-3 border-b-2 border-[#CDEADE] flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                <span className="font-extrabold text-clay-text text-sm">{col.label}</span>
                <span className="mr-auto text-xs font-black text-clay-muted bg-[#EEF7F2] px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>
              <div className="p-3 space-y-2 min-h-[100px]">
                {colTasks.map((task) => {
                  const dl = daysLabel(task.due_date);
                  return (
                    <div key={task.id} className="bg-white rounded-clay border-2 border-[#CDEADE] p-3 shadow-sm group">
                      <p className="font-bold text-clay-text text-xs leading-relaxed mb-2">
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-clay-muted text-xs mb-2 line-clamp-2">{task.description}</p>
                      )}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${PRIORITY_COLOR[task.priority]}`}>
                          {PRIORITY_LABEL[task.priority]}
                        </span>
                        {dl && (
                          <span className={`text-[10px] font-bold ${dl.cls}`}>{dl.text}</span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-1">
                        <TaskStatusSelect
                          taskId={task.id}
                          projectId={project.id}
                          currentStatus={task.status}
                        />
                        <form action={deleteTask}>
                          <input type="hidden" name="task_id" value={task.id} />
                          <input type="hidden" name="project_id" value={project.id} />
                          <button
                            type="submit"
                            onClick={(e) => {
                              if (!confirm("هل تريد حذف هذه المهمة؟")) e.preventDefault();
                            }}
                            className="text-[10px] font-bold text-red-400 hover:text-red-600 px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                          >
                            حذف
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })}
                {colTasks.length === 0 && (
                  <p className="text-center text-clay-muted/50 text-xs py-4 font-semibold">
                    لا مهام
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add task form */}
      <NewTaskForm projectId={project.id} />
    </div>
  );
}
