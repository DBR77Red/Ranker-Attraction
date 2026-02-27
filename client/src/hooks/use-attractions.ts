import { useQuery } from "@tanstack/react-query";
import { api, type AttractionListResponse, type MatchupResponse } from "@shared/routes";

function parseWithLogging<T>(schema: any, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    // For resilience, return the raw data anyway if we can't parse it, 
    // to avoid complete crash if backend schema drifts slightly during dev
    return data as T;
  }
  return result.data;
}

export function useAttractions() {
  return useQuery({
    queryKey: [api.attractions.list.path],
    queryFn: async () => {
      const res = await fetch(api.attractions.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch attractions");
      const data = await res.json();
      return parseWithLogging<AttractionListResponse>(api.attractions.list.responses[200], data, "attractions.list");
    },
  });
}

export function useMatchup() {
  return useQuery({
    queryKey: [api.attractions.matchup.path],
    queryFn: async () => {
      const res = await fetch(api.attractions.matchup.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch matchup");
      const data = await res.json();
      return parseWithLogging<MatchupResponse>(api.attractions.matchup.responses[200], data, "attractions.matchup");
    },
    // Don't refetch matchup on window focus so cards don't unexpectedly swap
    refetchOnWindowFocus: false,
  });
}
