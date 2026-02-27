import { useRecentVotes } from "@/hooks/use-votes";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, History } from "lucide-react";

export function RecentMatches() {
  const { data: recentVotes, isLoading } = useRecentVotes();

  return (
    <div className="glass-panel rounded-3xl p-6 flex flex-col h-full max-h-[800px]">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="p-2 rounded-lg bg-white/5">
          <History className="w-5 h-5 text-secondary" />
        </div>
        <h2 className="font-display font-bold text-xl text-white">Live Feed</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-white/5 h-20 rounded-2xl" />
            ))}
          </div>
        ) : recentVotes?.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 pb-10">
            <History className="w-12 h-12 mb-3" />
            <p>No votes yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {recentVotes?.map((vote) => (
                <motion.div
                  key={vote.id}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  layout
                  className="p-4 rounded-2xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.05] hover:border-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-green-500/20 text-green-400 flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> Winner
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {vote.timestamp ? formatDistanceToNow(new Date(vote.timestamp), { addSuffix: true }) : 'Just now'}
                    </span>
                  </div>
                  <div className="font-semibold text-white truncate">{vote.winnerName}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <span className="text-rose-400/80 text-xs font-bold">def.</span>
                    <span className="truncate">{vote.loserName}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
