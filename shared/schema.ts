import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const attractions = pgTable("attractions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  visitorCount: text("visitor_count").notNull(),
  eloScore: integer("elo_score").notNull().default(1200),
  matchesPlayed: integer("matches_played").notNull().default(0),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  winnerId: integer("winner_id").notNull(),
  loserId: integer("loser_id").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertAttractionSchema = createInsertSchema(attractions).omit({ id: true });
export const insertMatchSchema = createInsertSchema(matches).omit({ id: true, timestamp: true });

export type Attraction = typeof attractions.$inferSelect;
export type InsertAttraction = z.infer<typeof insertAttractionSchema>;

export type Match = typeof matches.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
