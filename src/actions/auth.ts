// src/actions/auth.ts
"use server";

import { db } from "@/src/lib/db";
import { users } from "@/src/db/schema";
import { signIn } from "@/src/lib/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";

// 1. Signup Action
// src/actions/auth.ts
export async function signUpAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
    });
    return { success: true }; // මෙය සත්‍ය නම් පේජ් එකේ message එක පෙන්නනවා
  } catch (error) {
    return { success: false, message: "ලියාපදිංචි වීමේදී දෝෂයක් සිදුවිය." };
  }
}

// 2. Login Action
export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email හෝ Password වැරදියි!" };
    }
    throw error; // NextAuth redirect එක වැඩ කරන්න ඕනේ නිසා මේක තියෙන්න ඕනේ
  }
}