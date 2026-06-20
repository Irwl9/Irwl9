"use client";

import { useActionState } from "react";
import { updateTaskStatus } from "@/app/actions/tasks";

const statuses = [
  { value: "todo", label: "قيد الانتظار" },
  { value: "in_progress", label: "قيد التنفيذ" },
  { value: "done", label: "مكتملة" },
  { value: "blocked", label: "محظورة" },
];

export default function TaskStatusSelect({
  taskId,
  projectId,
  currentStatus,
}: {
  taskId: string;
  projectId: string;
  currentStatus: string;
}) {
  const [, action, pending] = useActionState(updateTaskStatus, { error: null });

  return (
    <form action={action}>
      <input type="hidden" name="task_id" value={taskId} />
      <input type="hidden" name="project_id" value={projectId} />
      <select
        name="status"
        defaultValue={currentStatus}
        disabled={pending}
        onChange={(e) => {
          const form = e.currentTarget.form;
          if (form) form.requestSubmit();
        }}
        className="text-xs font-bold px-2 py-1 rounded-clay border-2 border-[#CDEADE] bg-white text-clay-text focus:outline-none focus:border-clay-primary disabled:opacity-50 cursor-pointer"
        aria-label="تغيير حالة المهمة"
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </form>
  );
}
