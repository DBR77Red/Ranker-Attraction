import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import { z } from "zod";
import { seedAttractions } from "./seed-data";

function calculateElo(winnerElo: number, loserElo: number) {
  const K = 32;
  const expectedWinner = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
  const expectedLoser = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));

  const winnerDelta = Math.round(K * (1 - expectedWinner));
  const loserDelta = Math.round(K * (0 - expectedLoser));

  return { winnerDelta, loserDelta };
}

async function seedDatabase() {
  const existing = await storage.getAttractions();
  if (existing.length > 0) return;

  try {
    for (const attraction of seedAttractions) {
      await storage.createAttraction(attraction);
    }
    console.log("Database seeded successfully with attractions.");
  } catch (e) {
    console.error("Error seeding DB:", e);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.attractions.list.path, async (req, res) => {
    const attractions = await storage.getAttractions();
    res.json(attractions);
  });

  app.get(api.attractions.matchup.path, async (req, res) => {
    const matchup = await storage.getMatchup();
    res.json(matchup);
  });

  app.get(api.votes.recent.path, async (req, res) => {
    const recent = await storage.getRecentMatches();
    res.json(recent);
  });

  app.post(api.votes.create.path, async (req, res) => {
    try {
      const { winnerId, loserId } = api.votes.create.input.parse(req.body);
      
      const winner = await storage.getAttraction(winnerId);
      const loser = await storage.getAttraction(loserId);
      
      if (!winner || !loser) {
        return res.status(400).json({ message: "Invalid attraction IDs" });
      }

      const { winnerDelta, loserDelta } = calculateElo(winner.eloScore, loser.eloScore);
      
      await storage.updateAttractionStats(winnerId, winnerDelta);
      await storage.updateAttractionStats(loserId, loserDelta);
      await storage.createMatch({ winnerId, loserId });
      
      res.status(201).json({ winner, loser });
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({ message: e.errors[0].message, field: e.errors[0].path.join('.') });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Seed the database before serving — must await so serverless functions
  // don't terminate before seeding completes.
  await seedDatabase();

  return httpServer;
}