// src/db/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

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