import { useAttractions } from "@/hooks/use-attractions";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Search, Swords, MapPin } from "lucide-react";
import { useState } from "react";

export default function Leaderboard() {
  const { data: attractions, isLoading } = useAttractions();
  const [search, setSearch] = useState("");

  const sortedAttractions = [...(attractions || [])]
    .sort((a, b) => b.eloScore - a.eloScore)
    .filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.location.toLowerCase().includes(search.toLowerCase()));

  const getMedalStyle = (index: number) => {
    switch (index) {
      case 0: return { color: "text-gradient-gold", bg: "bg-[#ffd700]/10", border: "border-[#ffd700]/30" };
      case 1: return { color: "text-gradient-silver", bg: "bg-[#e0e0e0]/10", border: "border-[#e0e0e0]/30" };
      case 2: return { color: "text-gradient-bronze", bg: "bg-[#cd7f32]/10", border: "border-[#cd7f32]/30" };
      default: return { color: "text-white/40", bg: "bg-white/5", border: "border-white/5" };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-6 md:mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex flex-wrap items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 md:mb-6 gap-2"
        >
          <Trophy className="w-6 h-6 md:w-8 md:h-8 text-accent" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-white">
            Global <span className="text-gradient">Rankings</span>
          </h1>
        </motion.div>
        <p className="text-sm sm:text-lg text-white/60 max-w-2xl mx-auto">
          The definitive tier list of world wonders, determined entirely by your head-to-head votes using the ELO rating system.
        </p>
        <p className="text-xs sm:text-sm text-white/40 mt-2">Made by Daniel Camelo</p>
      </div>
      {/* Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-3xl border border-white/5 shadow-xl">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input 
            type="text" 
            placeholder="Search wonders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex gap-4 text-sm font-medium text-white/50 px-4">
          <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Score</span>
          <span className="flex items-center gap-2"><Swords className="w-4 h-4" /> Matches</span>
        </div>
      </div>
      {/* Leaderboard List */}
      <div className="space-y-4">
        {isLoading ? (
          [1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse bg-white/5 h-32 rounded-3xl" />
          ))
        ) : sortedAttractions.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-2xl font-display text-white/60">No attractions found.</h3>
          </div>
        ) : (
          sortedAttractions.map((attraction, index) => {
            const style = getMedalStyle(index);
            const isTop3 = index < 3;

            return (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  relative overflow-hidden group flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-3xl
                  glass-panel-hover ${style.bg} ${style.border} border
                `}
              >
                {/* Rank Number */}
                <div className="w-12 sm:w-16 text-center font-display font-black sm:text-[32px] tracking-tighter text-white/40 drop-shadow-md text-[21px]">
                  #{index + 1}
                </div>
                {/* Image */}
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 relative group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow">
                  <img 
                    src={attraction.imageUrl} 
                    alt={attraction.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {isTop3 && (
                    <div className="absolute inset-0 border-2 rounded-2xl border-white/30" />
                  )}
                </div>
                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white font-display mb-1">
                    {attraction.name}
                  </h3>
                  <p className="text-white/60 text-sm flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5" /> {attraction.location}
                  </p>
                </div>
                {/* Stats */}
                <div className="flex flex-col items-end gap-1 pr-2 sm:pr-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-display font-bold text-lg sm:text-2xl md:text-3xl leading-none ${isTop3 ? 'text-white' : 'text-white/80'}`}>
                      {attraction.eloScore}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/40 hidden sm:inline">ELO</span>
                  </div>
                  <div className="text-xs font-medium text-white/40 bg-black/20 px-2 py-1 rounded-md">
                    {attraction.matchesPlayed} <span className="hidden sm:inline">Matches</span>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
