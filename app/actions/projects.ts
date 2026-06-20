"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ActionState = { error: string | null };

function sanitize(val: FormDataEntryValue | null, max = 500): string {
  return String(val ?? "").trim().slice(0, max);
}

async function getWorkspaceId(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data } = await supabase
    .from("profiles")
    .select("workspace_id")
    .eq("id", userId)
    .single();
  return data?.workspace_id ?? null;
}

export async function createProject(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "غير مصرح." };

  const workspaceId = await getWorkspaceId(supabase, user.id);
  if (!workspaceId) return { error: "لا توجد مساحة عمل. أعد إنشاء الحساب." };

  const name = sanitize(formData.get("name"), 200);
  if (name.length < 2) return { error: "اسم المشروع مطلوب (حرفان على الأقل)." };

  const description = sanitize(formData.get("description"), 2000);
  const dueDateRaw = sanitize(formData.get("due_date"), 10);
  const due_date = /^\d{4}-\d{2}-\d{2}$/.test(dueDateRaw) ? dueDateRaw : null;

  const { error } = await supabase.from("projects").insert({
    workspace_id: workspaceId,
    name,
    description: description || null,
    due_date,
    owner_id: user.id,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

export async function updateProjectStatus(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const projectId = sanitize(formData.get("project_id"), 36);
  const status = sanitize(formData.get("status"), 20);

  const validStatuses = ["active", "completed", "archived"];
  if (!validStatuses.includes(status)) return;

  await supabase.from("projects").update({ status }).eq("id", projectId);

  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function deleteProject(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const projectId = sanitize(formData.get("project_id"), 36);

  await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("owner_id", user.id);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}
