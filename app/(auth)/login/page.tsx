"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [state, action, isPending] = useActionState(signIn, { error: null });
  const searchParams = useSearchParams();
  const justVerified = searchParams.get("verify") === "1";

  return (
    <div className="clay-card p-8">
      <h1 className="text-2xl font-black text-clay-text mb-1">مرحباً بعودتك</h1>
      <p className="text-clay-muted text-sm mb-6">
        كبير موظفيك كان يراقب الأمور.
      </p>

      {justVerified && (
        <div className="mb-4 px-4 py-3 rounded-clay bg-[#D6F6EC] border-2 border-[#9DE9CE] text-[#0D9C6E] text-sm font-semibold">
          تحقق من بريدك الإلكتروني لتأكيد حسابك، ثم سجل الدخول هنا.
        </div>
      )}

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
          <label htmlFor="email" className="block text-sm font-bold text-clay-text mb-1.5">
            البريد الإلكتروني
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
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-bold text-clay-text">
              كلمة المرور
            </label>
            <a
              href="#"
              className="text-xs font-semibold text-clay-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-clay-primary rounded"
            >
              نسيت كلمة المرور؟
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
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
          {isPending ? "جارٍ تسجيل الدخول…" : "تسجيل الدخول"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-clay-muted">
        ليس لديك حساب؟{" "}
        <a
          href="/signup"
          className="font-bold text-clay-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-clay-primary rounded"
        >
          ابدأ مجاناً
        </a>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
