import { z } from 'zod';
import { attractions, matches } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  attractions: {
    list: {
      method: 'GET' as const,
      path: '/api/attractions' as const,
      responses: {
        200: z.array(z.custom<typeof attractions.$inferSelect>()),
      },
    },
    matchup: {
      method: 'GET' as const,
      path: '/api/attractions/matchup' as const,
      responses: {
        200: z.array(z.custom<typeof attractions.$inferSelect>()), // length 2
      },
    },
  },
  votes: {
    create: {
      method: 'POST' as const,
      path: '/api/votes' as const,
      input: z.object({
        winnerId: z.number(),
        loserId: z.number(),
      }),
      responses: {
        201: z.object({
          winner: z.custom<typeof attractions.$inferSelect>(),
          loser: z.custom<typeof attractions.$inferSelect>(),
        }),
        400: errorSchemas.validation,
      },
    },
    recent: {
      method: 'GET' as const,
      path: '/api/votes/recent' as const,
      responses: {
        200: z.array(z.object({
          id: z.number(),
          timestamp: z.date().nullable(),
          winnerName: z.string(),
          loserName: z.string(),
        })),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type VoteInput = z.infer<typeof api.votes.create.input>;
export type VoteResponse = z.infer<typeof api.votes.create.responses[201]>;
export type AttractionListResponse = z.infer<typeof api.attractions.list.responses[200]>;
export type MatchupResponse = z.infer<typeof api.attractions.matchup.responses[200]>;
export type RecentVotesResponse = z.infer<typeof api.votes.recent.responses[200]>;
