"use client";

import { useActionState, useRef, useState } from "react";
import { createTask } from "@/app/actions/tasks";

const priorityOptions = [
  { value: "low", label: "منخفضة", color: "text-clay-muted" },
  { value: "medium", label: "متوسطة", color: "text-[#B07D14]" },
  { value: "high", label: "عالية", color: "text-[#D4440E]" },
  { value: "urgent", label: "عاجلة", color: "text-red-600" },
];

export default function NewTaskForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createTask, { error: null });
  const formRef = useRef<HTMLFormElement>(null);

  function handleSuccess() {
    if (!state.error && !pending) {
      formRef.current?.reset();
      setOpen(false);
    }
  }

  return (
    <div className="mt-6">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-clay border-2 border-dashed border-[#9FD4BC] text-clay-primary font-bold text-sm hover:bg-[#D6EFE4] transition-colors w-full justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          إضافة مهمة جديدة
        </button>
      ) : (
        <form
          ref={formRef}
          action={async (fd) => {
            await action(fd);
            handleSuccess();
          }}
          className="clay-card p-5 space-y-3"
        >
          <input type="hidden" name="project_id" value={projectId} />

          <div>
            <input
              name="title"
              required
              maxLength={500}
              placeholder="عنوان المهمة *"
              className="w-full px-3 py-2 rounded-clay border-2 border-[#CDEADE] bg-white text-clay-text placeholder:text-clay-muted/60 font-semibold text-sm focus:outline-none focus:border-clay-primary transition-colors"
            />
          </div>

          <div>
            <textarea
              name="description"
              maxLength={5000}
              rows={2}
              placeholder="وصف اختياري..."
              className="w-full px-3 py-2 rounded-clay border-2 border-[#CDEADE] bg-white text-clay-text placeholder:text-clay-muted/60 text-sm font-medium resize-none focus:outline-none focus:border-clay-primary transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-clay-muted mb-1">الأولوية</label>
              <select
                name="priority"
                defaultValue="medium"
                className="w-full px-3 py-2 rounded-clay border-2 border-[#CDEADE] bg-white text-clay-text text-sm font-semibold focus:outline-none focus:border-clay-primary transition-colors"
              >
                {priorityOptions.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-clay-muted mb-1">تاريخ الاستحقاق</label>
              <input
                name="due_date"
                type="date"
                className="w-full px-3 py-2 rounded-clay border-2 border-[#CDEADE] bg-white text-clay-text text-sm font-semibold focus:outline-none focus:border-clay-primary transition-colors"
              />
            </div>
          </div>

          {state.error && (
            <p className="text-red-600 text-xs font-bold bg-red-50 border border-red-200 rounded-clay px-3 py-2">
              {state.error}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={pending}
              className="clay-btn-primary px-5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? "جاري الحفظ..." : "حفظ المهمة"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="clay-btn-secondary px-4 py-2 text-sm"
            >
              إلغاء
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
