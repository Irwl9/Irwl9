"use client";

import { useActionState } from "react";
import { signUp } from "@/app/actions/auth";

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signUp, { error: null });

  return (
    <div className="clay-card p-8">
      <h1 className="text-2xl font-black text-clay-text mb-1">
        Get a chief-of-staff
      </h1>
      <p className="text-clay-muted text-sm mb-6">
        14 days free. No card required. Cancel whenever.
      </p>

      {state.error && (
        <div
          role="alert"
          className="mb-4 px-4 py-3 rounded-clay bg-[#FFE4ED] border-2 border-[#FFBFCE] text-[#E8467C] text-sm font-semibold"
        >
          {state.error}
        </div>
      )}

      <form action={action} className="space-y-4">
        <div>
          <label
            htmlFor="full_name"
            className="block text-sm font-bold text-clay-text mb-1.5"
          >
            Full name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            className="w-full px-4 py-3 rounded-clay border-2 border-[#C4BFEF] bg-white text-clay-text font-semibold text-sm
                       placeholder:text-clay-muted/50 focus:outline-none focus:border-clay-primary focus:ring-2 focus:ring-clay-primary/20
                       transition-colors"
            placeholder="Alex Chen"
          />
        </div>

        <div>
          <label
            htmlFor="workspace_name"
            className="block text-sm font-bold text-clay-text mb-1.5"
          >
            Workspace name
          </label>
          <input
            id="workspace_name"
            name="workspace_name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-clay border-2 border-[#C4BFEF] bg-white text-clay-text font-semibold text-sm
                       placeholder:text-clay-muted/50 focus:outline-none focus:border-clay-primary focus:ring-2 focus:ring-clay-primary/20
                       transition-colors"
            placeholder="Acme Engineering"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold text-clay-text mb-1.5"
          >
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 rounded-clay border-2 border-[#C4BFEF] bg-white text-clay-text font-semibold text-sm
                       placeholder:text-clay-muted/50 focus:outline-none focus:border-clay-primary focus:ring-2 focus:ring-clay-primary/20
                       transition-colors"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-bold text-clay-text mb-1.5"
          >
            Password{" "}
            <span className="font-normal text-clay-muted">(8+ characters)</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="w-full px-4 py-3 rounded-clay border-2 border-[#C4BFEF] bg-white text-clay-text font-semibold text-sm
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
          {isPending ? "Creating workspace…" : "Start free trial"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-clay-muted leading-relaxed">
        By signing up you agree to our{" "}
        <a href="#" className="font-semibold text-clay-primary hover:underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="font-semibold text-clay-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p>

      <p className="mt-3 text-center text-sm text-clay-muted">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-bold text-clay-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-clay-primary rounded"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
