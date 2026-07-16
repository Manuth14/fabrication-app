// src/actions/projects.ts
"use server";

import { db } from "@/src/lib/db";
import { projects } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";

export async function addProjectAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "ඔබ ලොග් වී නොමැත." };

  const projectName = formData.get("projectName") as string;
  const cost = formData.get("cost") as string;

  try {
    await db.insert(projects).values({
      userId: session.user.id,
      projectName,
      cost,
    });
    revalidatePath("/dashboard"); // මේකෙන් Dashboard එක Refresh වෙනවා
    return { success: true };
  } catch (error) {
    return { error: "පרויක්ට් එක එකතු කිරීමේ දෝෂයක්." };
  }
}