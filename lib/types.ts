export type ActionState = { error: string | null };

export type Project = {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  status: "active" | "completed" | "archived";
  owner_id: string | null;
  due_date: string | null;
  created_at: string;
};

export type Task = {
  id: string;
  project_id: string;
  workspace_id: string;
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "done" | "blocked";
  priority: "low" | "medium" | "high" | "urgent";
  assignee_id: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};
