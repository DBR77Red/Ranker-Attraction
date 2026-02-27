import { db } from "./db";
import { attractions, matches, type InsertAttraction, type InsertMatch, type Attraction, type Match } from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  getAttractions(): Promise<Attraction[]>;
  getAttraction(id: number): Promise<Attraction | undefined>;
  getMatchup(): Promise<Attraction[]>; 
  createAttraction(attraction: InsertAttraction): Promise<Attraction>;
  updateAttractionStats(id: number, eloDelta: number): Promise<void>;
  createMatch(match: InsertMatch): Promise<Match>;
  getRecentMatches(): Promise<(Match & { winnerName: string, loserName: string })[]>;
}

export class DatabaseStorage implements IStorage {
  async getAttractions(): Promise<Attraction[]> {
    return await db.select().from(attractions).orderBy(desc(attractions.eloScore));
  }

  async getAttraction(id: number): Promise<Attraction | undefined> {
    const [attraction] = await db.select().from(attractions).where(eq(attractions.id, id));
    return attraction;
  }

  async getMatchup(): Promise<Attraction[]> {
    // Select 2 random attractions
    return await db.select().from(attractions).orderBy(sql`RANDOM()`).limit(2);
  }

  async createAttraction(attraction: InsertAttraction): Promise<Attraction> {
    const [newAttraction] = await db.insert(attractions).values(attraction).returning();
    return newAttraction;
  }

  async updateAttractionStats(id: number, eloDelta: number): Promise<void> {
    await db.update(attractions)
      .set({
        eloScore: sql`${attractions.eloScore} + ${eloDelta}`,
        matchesPlayed: sql`${attractions.matchesPlayed} + 1`
      })
      .where(eq(attractions.id, id));
  }

  async createMatch(match: InsertMatch): Promise<Match> {
    const [newMatch] = await db.insert(matches).values(match).returning();
    return newMatch;
  }

  async getRecentMatches(): Promise<(Match & { winnerName: string, loserName: string })[]> {
    const recentMatches = await db.select().from(matches).orderBy(desc(matches.timestamp)).limit(10);
    
    if (recentMatches.length === 0) return [];

    const allAttractions = await this.getAttractions();
    const attrMap = new Map(allAttractions.map(a => [a.id, a.name]));

    return recentMatches.map(m => ({
      ...m,
      winnerName: attrMap.get(m.winnerId) || 'Unknown',
      loserName: attrMap.get(m.loserId) || 'Unknown'
    }));
  }
}

export const storage = new DatabaseStorage();