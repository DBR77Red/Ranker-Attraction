import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import fs from "fs";
import path from "path";

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
    const mdPath = path.resolve(process.cwd(), "attached_assets/content-1772188282515.md");
    if (fs.existsSync(mdPath)) {
      const content = fs.readFileSync(mdPath, "utf-8");
      const sections = content.split(/\n## /).filter(s => s.trim().length > 0);
      
      for (const section of sections) {
        const headerMatch = section.match(/(\d+\\\.\s+)?(.*?)\s+\((.*?)\)/);
        if (!headerMatch) continue;
        
        const fullTitle = headerMatch[2].trim();
        const visitorCount = headerMatch[3].trim();
        
        let name = fullTitle;
        let location = "Unknown";
        if (fullTitle.includes(',')) {
          const parts = fullTitle.split(',');
          name = parts[0].trim();
          location = parts.slice(1).join(',').trim();
        }
        
        const imgMatch = section.match(/!\[.*?\]\((.*?)\)/);
        const imageUrl = imgMatch ? imgMatch[1] : "";
        if (!imageUrl) continue;
        
        const textParts = section.split(/!\[.*?\]\(.*?\)/);
        let description = textParts.length > 1 ? textParts[1].trim() : "No description available.";
        // Clean up text
        description = description.replace(/\[SEE ALSO.*?\]\(.*?\)/gi, '').replace(/\n+/g, ' ').trim();
        if (description.length > 500) {
          description = description.substring(0, 497) + '...';
        }
        
        await storage.createAttraction({
          name,
          location,
          visitorCount,
          imageUrl,
          description,
          eloScore: 1200,
          matchesPlayed: 0
        });
      }
      console.log("Database seeded successfully with attractions.");
    }
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

  // Seed the database after API setup
  seedDatabase().catch(console.error);

  return httpServer;
}