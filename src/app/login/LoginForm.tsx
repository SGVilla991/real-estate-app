"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const confirmError = searchParams.get("error") === "confirmation_failed";
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      {registered && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-xl px-4 py-3">
          ✓ Account created! Check your email and click the confirmation link, then sign in here.
        </div>
      )}

      {confirmError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          The confirmation link expired or is invalid. Please register again or contact support.
        </div>
      )}

      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {state.error}
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-light transition-colors disabled:opacity-60 mt-2"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>

      <p className="text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-semibold hover:text-accent transition-colors">
          Create one
        </Link>
      </p>
    </form>
  );
}
