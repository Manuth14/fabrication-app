// src/actions/products.ts
"use server";

import { db } from "@/src/lib/db";
import { products } from "@/src/db/schema";
import { revalidatePath } from "next/cache";

// src/actions/products.ts
export async function addProductAction(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const imageUrl = formData.get("imageUrl") as string;

  console.log("Data to insert:", { name, price, imageUrl }); // මේක console එකේ පේනවද බලන්න

  if (!name || !price) return; // name හරි price හරි නැත්නම් insert වෙන්නේ නෑ

  await db.insert(products).values({ name, price, imageUrl });
  revalidatePath("/dashboard/products");
}