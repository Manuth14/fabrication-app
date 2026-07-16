// src/db/schema.ts
import { pgTable, text, serial, timestamp, numeric } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  projectName: text("project_name").notNull(),
  cost: text("cost"), // මෙතන අපි P&L track කරන්න ඕන දේවල් දාමු
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"), // පින්තූරයේ ලින්ක් එක දාන්න
});