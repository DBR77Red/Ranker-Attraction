import { useMatchup } from "@/hooks/use-attractions";
import { useVote } from "@/hooks/use-votes";
import { RecentMatches } from "@/components/RecentMatches";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useState } from "react";

export default function Vote() {
  const { data: matchup, isLoading, isError } = useMatchup();
  const voteMutation = useVote();
  
  // Track which card was clicked to animate it differently
  const [clickedId, setClickedId] = useState<number | null>(null);

  const handleVote = (winnerId: number, loserId: number, e: React.MouseEvent) => {
    if (voteMutation.isPending) return;
    
    // Confetti burst on click
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x, y },
      colors: ['#ff00ff', '#00ffff', '#ffff00']
    });

    setClickedId(winnerId);
    voteMutation.mutate({ winnerId, loserId });
  };

  const matchupKey = matchup ? `${matchup[0].id}-${matchup[1].id}` : 'loading';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Main Voting Arena */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
              Which is more <span className="text-gradient">Breathtaking?</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Cast your vote and help us rank the wonders of the world. Your choice impacts the global ELO ranking.
            </p>
            <p className="text-sm text-white/40 mt-2">Made by Daniel Camelo</p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto min-h-[600px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-4 text-primary">
                    <Loader2 className="w-12 h-12 animate-spin" />
                    <span className="font-display font-bold animate-pulse">Finding contenders...</span>
                  </div>
                </motion.div>
              ) : isError || !matchup || matchup.length < 2 ? (
                <motion.div key="error" className="absolute inset-0 flex items-center justify-center text-white/50">
                  Failed to load matchup. Please try again later.
                </motion.div>
              ) : (
                <motion.div 
                  key={matchupKey}
                  className="w-full flex flex-col md:flex-row gap-6 md:gap-8 items-stretch relative"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.3 } }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  
                  {/* VS Badge (Desktop: center, Mobile: between) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 
                    w-16 h-16 rounded-full bg-background border-[4px] border-card flex items-center justify-center
                    shadow-[0_0_30px_rgba(30,10,60,1)] font-display font-black text-2xl italic text-white
                    hidden md:flex">
                    VS
                  </div>

                  {matchup.map((attraction, idx) => {
                    const opponent = matchup[idx === 0 ? 1 : 0];
                    const isClicked = clickedId === attraction.id;
                    const isPending = voteMutation.isPending;

                    return (
                      <div key={attraction.id} className="flex-1 w-full flex flex-col">
                        <div className={`
                          relative group flex-1 glass-panel rounded-[2rem] overflow-hidden flex flex-col
                          ${isPending && !isClicked ? 'opacity-50 scale-95 grayscale-[50%]' : ''}
                          ${isPending && isClicked ? 'ring-4 ring-primary shadow-[0_0_50px_rgba(255,0,255,0.4)] z-10' : 'glass-panel-hover'}
                          transition-all duration-500
                        `}>
                          
                          {/* Single container: image as background, content on top */}
                          <div className="relative flex-1 flex flex-col justify-between p-6 md:p-8">
                            <img
                              src={attraction.imageUrl}
                              alt={attraction.name}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                            <div className="relative z-10 mt-auto">
                              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-2 leading-tight drop-shadow-md">
                                {attraction.name}
                              </h2>
                              <div className="flex flex-wrap gap-3 mb-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium text-white/90 border border-white/10">
                                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                                  {attraction.location}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium text-white/90 border border-white/10">
                                  <Users className="w-3.5 h-3.5 text-accent" />
                                  {attraction.visitorCount}
                                </span>
                              </div>

                              <button
                                onClick={(e) => handleVote(attraction.id, opponent.id, e)}
                                disabled={isPending}
                                className="
                                  relative w-full py-5 rounded-2xl font-display font-bold text-xl overflow-hidden
                                  bg-white/5 border border-white/10 text-white
                                  hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                                  active:scale-[0.98] transition-all duration-300 group/btn
                                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                "
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                  {isPending ? (isClicked ? 'Voted!' : 'Voting...') : 'Vote for this'}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Side Panel: Recent Matches */}
        <div className="lg:col-span-4 h-[600px] lg:h-auto lg:sticky lg:top-28">
          <RecentMatches />
        </div>
      </div>
    </div>
  );
}
