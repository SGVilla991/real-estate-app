"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/app/actions/auth";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {state.error}
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
        <input
          name="fullName"
          type="text"
          required
          placeholder="John Doe"
          className="w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background"
        />
      </div>

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
          minLength={8}
          placeholder="Min. 8 characters"
          className="w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-light transition-colors disabled:opacity-60 mt-2"
      >
        {pending ? "Creating account…" : "Create Account"}
      </button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold hover:text-accent transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}
