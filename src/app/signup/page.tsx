// src/app/signup/page.tsx
"use client";

import { useActionState } from "react";
import { signUpAction } from "@/src/actions/auth";
import Link from "next/link";

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signUpAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form action={action} className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Sign Up</h1>
        
        {state?.success && (
          <p className="mb-4 text-sm text-green-600">සාර්ථකව ලියාපදිංචි විය! දැන් <Link href="/login" className="underline">Login</Link> වන්න.</p>
        )}
        
        {state?.message && !state?.success && (
          <p className="mb-4 text-sm text-red-500">{state.message}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input name="name" type="text" required className="mt-1 w-full rounded border p-2" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded border p-2" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium">Password</label>
          <input name="password" type="password" required className="mt-1 w-full rounded border p-2" />
        </div>

        <button
          disabled={isPending}
          className="w-full rounded bg-green-600 p-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {isPending ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}