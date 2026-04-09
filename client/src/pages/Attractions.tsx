import { useAttractions } from "@/hooks/use-attractions";
import { motion } from "framer-motion";
import { MapPin, Users, Search, Trophy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cleanDescription } from "@/utils/text-cleaner";

export default function Attractions() {
  const { data: attractions, isLoading } = useAttractions();
  const [search, setSearch] = useState("");

  const sortedAttractions = [...(attractions || [])]
    .sort((a, b) => b.eloScore - a.eloScore)
    .filter(
      (a) =>
        !search ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.location.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Header */}
      <div className="mb-6 md:mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex flex-wrap items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 md:mb-6 gap-2"
        >
          <Trophy className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-white">
            Explore <span className="text-gradient">Wonders</span>
          </h1>
        </motion.div>
        <p className="text-sm sm:text-lg text-white/60 max-w-2xl mx-auto">
          Discover all the world's most breathtaking attractions. Browse the complete collection that powers the rankings.
        </p>
        <p className="text-xs sm:text-sm text-white/40 mt-2">Made by Daniel Camelo</p>
      </div>

      {/* Search */}
      <div className="mb-8 glass-panel p-4 rounded-3xl">
        <div className="relative w-full sm:max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search wonders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white/5 rounded-3xl h-[380px]" />
          ))}
        </div>
      ) : sortedAttractions.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
          <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-2xl font-display text-white/60">No attractions found.</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAttractions.map((attraction, index) => {
            const globalRank =
              [...(attractions || [])]
                .sort((a, b) => b.eloScore - a.eloScore)
                .findIndex((a) => a.id === attraction.id) + 1;

            return (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="glass-panel glass-panel-hover rounded-3xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={attraction.imageUrl}
                    alt={attraction.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                  {/* Rank badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-bold text-white/80 flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-accent" />
                    #{globalRank}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    {attraction.name}
                  </h3>
                  <p className="text-white/60 text-sm flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                    {attraction.location}
                  </p>
                  <p className="text-white/40 text-sm line-clamp-2 mb-4">
                    {cleanDescription(attraction.description)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70">
                      <Users className="w-3 h-3 text-accent" />
                      {attraction.visitorCount}
                    </span>
                    <span className="text-xs font-bold text-white/40">
                      {attraction.eloScore} ELO
                    </span>
                  </div>
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(attraction.name.replace(/ /g, "_"))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Learn more
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}