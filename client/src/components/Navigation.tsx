import { Link, useLocation } from "wouter";
import { Globe, Trophy, Swords } from "lucide-react";
import { motion } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Vote", icon: Swords },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-background/60 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-black text-2xl tracking-tight text-white">
              Wonders<span className="text-gradient">Rank</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6">
            {links.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`
                    relative px-4 py-2 rounded-full font-medium text-sm sm:text-base flex items-center gap-2
                    transition-colors duration-300
                    ${isActive ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                  <span className="hidden sm:inline">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/20"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
