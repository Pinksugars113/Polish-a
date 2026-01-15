import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().default("Lacquer Enthusiast"),
  avatarUrl: text("avatar_url"),
  sessionId: text("session_id").notNull(),
});

export const polishes = pgTable("polishes", {
  id: serial("id").primaryKey(),
  brand: text("brand").notNull(),
  name: text("name").notNull(),
  color: text("color").notNull(), // Hex code
  finish: text("finish").notNull().default("Glossy"), // Glossy, Matte, Jelly, Cateye, Glitter, Shimmer
  photoUrl: text("photo_url"), // Optional photo of the actual polish
  notes: text("notes"),
  sessionId: text("session_id").notNull(),
});

export const manicures = pgTable("manicures", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  photoUrl: text("photo_url"),
  notes: text("notes"),
  polishIds: integer("polish_ids").array().notNull(),
  sessionId: text("session_id").notNull(),
});

export const insertPolishSchema = createInsertSchema(polishes).omit({ id: true });
export const insertManicureSchema = createInsertSchema(manicures).omit({ id: true });

export type Polish = typeof polishes.$inferSelect;
export type InsertPolish = z.infer<typeof insertPolishSchema>;
export type Manicure = typeof manicures.$inferSelect;
export type InsertManicure = z.infer<typeof insertManicureSchema>;
