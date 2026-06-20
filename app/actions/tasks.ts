"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type ActionState = { error: string | null };

function sanitize(val: FormDataEntryValue | null, max = 500): string {
  return String(val ?? "").trim().slice(0, max);
}

const VALID_STATUSES = ["todo", "in_progress", "done", "blocked"] as const;
const VALID_PRIORITIES = ["low", "medium", "high", "urgent"] as const;

export async function createTask(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "غير مصرح." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("workspace_id")
    .eq("id", user.id)
    .single();
  if (!profile?.workspace_id) return { error: "لا توجد مساحة عمل." };

  const project_id = sanitize(formData.get("project_id"), 36);
  const title = sanitize(formData.get("title"), 500);
  const description = sanitize(formData.get("description"), 5000);
  const priority = sanitize(formData.get("priority"), 20) || "medium";
  const dueDateRaw = sanitize(formData.get("due_date"), 10);
  const due_date = /^\d{4}-\d{2}-\d{2}$/.test(dueDateRaw) ? dueDateRaw : null;

  if (!title) return { error: "عنوان المهمة مطلوب." };
  if (!project_id) return { error: "المشروع مطلوب." };
  if (!VALID_PRIORITIES.includes(priority as typeof VALID_PRIORITIES[number])) {
    return { error: "أولوية غير صالحة." };
  }

  const { error } = await supabase.from("tasks").insert({
    project_id,
    workspace_id: profile.workspace_id,
    title,
    description: description || null,
    priority,
    due_date,
    status: "todo",
    assignee_id: user.id,
  });

  if (error) return { error: error.message };

  revalidatePath(`/dashboard/projects/${project_id}`);
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
  return { error: null };
}

export async function updateTaskStatus(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "غير مصرح." };

  const taskId = sanitize(formData.get("task_id"), 36);
  const projectId = sanitize(formData.get("project_id"), 36);
  const status = sanitize(formData.get("status"), 20);

  if (!VALID_STATUSES.includes(status as typeof VALID_STATUSES[number])) {
    return { error: "حالة غير صالحة." };
  }

  const { error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId);

  if (error) return { error: error.message };

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
  return { error: null };
}

export async function deleteTask(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const taskId = sanitize(formData.get("task_id"), 36);
  const projectId = sanitize(formData.get("project_id"), 36);

  await supabase.from("tasks").delete().eq("id", taskId);

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
}
