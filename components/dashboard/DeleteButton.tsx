"use client";

import { useActionState } from "react";
import type { ActionState } from "@/lib/types";

export default function DeleteButton({
  action,
  hiddenFields,
  label = "حذف",
  confirmMessage = "هل أنت متأكد من الحذف؟",
}: {
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>;
  hiddenFields: Record<string, string>;
  label?: string;
  confirmMessage?: string;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {state.error && (
        <p className="text-red-600 text-xs mb-1">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors disabled:opacity-50"
        aria-label={label}
      >
        {pending ? "..." : label}
      </button>
    </form>
  );
}
