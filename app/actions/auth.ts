"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

type AuthState = { error: string | null };

export async function signIn(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function signUp(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();
  const admin = createAdminClient();

  const fullName = (formData.get("full_name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const password = formData.get("password") as string;
  const workspaceName = (formData.get("workspace_name") as string).trim();

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error) return { error: error.message };

  // If email confirmation is required, data.session will be null.
  if (!data.user) return { error: "Sign-up failed. Try again." };

  // Create workspace and link profile via admin client (bypasses RLS).
  const { data: workspace, error: wsError } = await admin
    .from("workspaces")
    .insert({ name: workspaceName, owner_id: data.user.id })
    .select("id")
    .single();

  if (wsError) return { error: "Could not create workspace: " + wsError.message };

  await admin
    .from("profiles")
    .update({ workspace_id: workspace.id, full_name: fullName })
    .eq("id", data.user.id);

  // If no session (email confirmation pending) send to login with a message.
  if (!data.session) {
    redirect("/login?verify=1");
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
