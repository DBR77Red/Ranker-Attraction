import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type RecentVotesResponse, type VoteInput } from "@shared/routes";

function parseWithLogging<T>(schema: any, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    return data as T;
  }
  return result.data;
}

export function useRecentVotes() {
  return useQuery({
    queryKey: [api.votes.recent.path],
    queryFn: async () => {
      const res = await fetch(api.votes.recent.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch recent votes");
      const data = await res.json();
      return parseWithLogging<RecentVotesResponse>(api.votes.recent.responses[200], data, "votes.recent");
    },
  });
}

export function useVote() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (vote: VoteInput) => {
      const validated = api.votes.create.input.parse(vote);
      const res = await fetch(api.votes.create.path, {
        method: api.votes.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Failed to submit vote");
      return res.json();
    },
    onSuccess: () => {
      // Invalidate to get next matchup immediately
      queryClient.invalidateQueries({ queryKey: [api.attractions.matchup.path] });
      // Invalidate leaderboard and recent matches to reflect new vote
      queryClient.invalidateQueries({ queryKey: [api.attractions.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.votes.recent.path] });
    },
  });
}
