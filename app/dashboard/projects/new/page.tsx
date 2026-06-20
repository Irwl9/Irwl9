"use client";

import { useActionState } from "react";
import { createProject } from "@/app/actions/projects";

export default function NewProjectPage() {
  const [state, action, pending] = useActionState(createProject, { error: null });

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <a href="/dashboard/projects" className="text-sm font-bold text-clay-muted hover:text-clay-primary transition-colors flex items-center gap-1 mb-4">
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          المشاريع
        </a>
        <h1 className="text-3xl font-black text-clay-text mb-1">مشروع جديد</h1>
        <p className="text-clay-muted font-semibold text-sm">أضف تفاصيل مشروعك وابدأ بإضافة المهام.</p>
      </div>

      <form action={action} className="clay-card p-7 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-extrabold text-clay-text mb-2">
            اسم المشروع <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={200}
            placeholder="مثال: إطلاق MVP — Q3 2025"
            className="w-full px-4 py-3 rounded-clay-lg border-2 border-[#CDEADE] bg-white text-clay-text placeholder:text-clay-muted/60 font-semibold focus:outline-none focus:border-clay-primary transition-colors text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-extrabold text-clay-text mb-2">
            الوصف <span className="text-clay-muted font-medium">(اختياري)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={2000}
            placeholder="ما الذي يهدف إليه هذا المشروع؟"
            className="w-full px-4 py-3 rounded-clay-lg border-2 border-[#CDEADE] bg-white text-clay-text placeholder:text-clay-muted/60 font-medium resize-none focus:outline-none focus:border-clay-primary transition-colors text-sm"
          />
        </div>

        <div>
          <label htmlFor="due_date" className="block text-sm font-extrabold text-clay-text mb-2">
            تاريخ الاستحقاق <span className="text-clay-muted font-medium">(اختياري)</span>
          </label>
          <input
            id="due_date"
            name="due_date"
            type="date"
            className="px-4 py-3 rounded-clay-lg border-2 border-[#CDEADE] bg-white text-clay-text font-semibold focus:outline-none focus:border-clay-primary transition-colors text-sm"
          />
        </div>

        {state.error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-clay px-4 py-3">
            <p className="text-red-700 font-bold text-sm">{state.error}</p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="clay-btn-primary px-8 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "جاري الإنشاء..." : "إنشاء المشروع"}
          </button>
          <a href="/dashboard/projects" className="clay-btn-secondary px-6 py-3 text-sm">
            إلغاء
          </a>
        </div>
      </form>
    </div>
  );
}
