"use client";

import { useActionState } from "react";
import { signUp } from "@/app/actions/auth";

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signUp, { error: null });

  return (
    <div className="clay-card p-8">
      <h1 className="text-2xl font-black text-clay-text mb-1">
        احصل على كبير موظفين
      </h1>
      <p className="text-clay-muted text-sm mb-6">
        14 يوماً مجاناً. لا بطاقة مطلوبة. إلغاء متى شئت.
      </p>

      {state.error && (
        <div
          role="alert"
          className="mb-4 px-4 py-3 rounded-clay bg-[#FBF1D8] border-2 border-[#F1DA9A] text-[#B07D14] text-sm font-semibold"
        >
          {state.error}
        </div>
      )}

      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="full_name" className="block text-sm font-bold text-clay-text mb-1.5">
            الاسم الكامل
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            className="w-full px-4 py-3 rounded-clay border-2 border-[#9FD4BC] bg-white text-clay-text font-semibold text-sm
                       placeholder:text-clay-muted/50 focus:outline-none focus:border-clay-primary focus:ring-2 focus:ring-clay-primary/20
                       transition-colors"
            placeholder="محمد العلي"
          />
        </div>

        <div>
          <label htmlFor="workspace_name" className="block text-sm font-bold text-clay-text mb-1.5">
            اسم مساحة العمل
          </label>
          <input
            id="workspace_name"
            name="workspace_name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-clay border-2 border-[#9FD4BC] bg-white text-clay-text font-semibold text-sm
                       placeholder:text-clay-muted/50 focus:outline-none focus:border-clay-primary focus:ring-2 focus:ring-clay-primary/20
                       transition-colors"
            placeholder="شركة المستقبل للتقنية"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-clay-text mb-1.5">
            البريد الإلكتروني للعمل
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            dir="ltr"
            className="w-full px-4 py-3 rounded-clay border-2 border-[#9FD4BC] bg-white text-clay-text font-semibold text-sm
                       placeholder:text-clay-muted/50 focus:outline-none focus:border-clay-primary focus:ring-2 focus:ring-clay-primary/20
                       transition-colors text-left"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-clay-text mb-1.5">
            كلمة المرور{" "}
            <span className="font-normal text-clay-muted">(8+ أحرف)</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            dir="ltr"
            className="w-full px-4 py-3 rounded-clay border-2 border-[#9FD4BC] bg-white text-clay-text font-semibold text-sm
                       placeholder:text-clay-muted/50 focus:outline-none focus:border-clay-primary focus:ring-2 focus:ring-clay-primary/20
                       transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="clay-btn-primary w-full py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0"
        >
          {isPending ? "جارٍ إنشاء مساحة العمل…" : "ابدأ التجربة المجانية"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-clay-muted leading-relaxed">
        بالتسجيل، أنت توافق على{" "}
        <a href="#" className="font-semibold text-clay-primary hover:underline">
          الشروط
        </a>{" "}
        و{" "}
        <a href="#" className="font-semibold text-clay-primary hover:underline">
          سياسة الخصوصية
        </a>
        .
      </p>

      <p className="mt-3 text-center text-sm text-clay-muted">
        هل لديك حساب بالفعل؟{" "}
        <a
          href="/login"
          className="font-bold text-clay-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-clay-primary rounded"
        >
          تسجيل الدخول
        </a>
      </p>
    </div>
  );
}
