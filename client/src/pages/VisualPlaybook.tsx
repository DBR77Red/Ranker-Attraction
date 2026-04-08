import { motion } from "framer-motion";
import { MapPin, Users, Trophy, Swords, History, Search, TrendingUp, Globe, ChevronRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <motion.div {...fadeUp} className="mb-10 md:mb-14 relative">
      <span className="absolute -left-2 md:-left-6 -top-6 font-display font-black text-[6rem] md:text-[8rem] leading-none text-white/[0.03] select-none pointer-events-none">
        {number}
      </span>
      <div className="relative">
        <h2 className="font-display font-black text-3xl md:text-5xl text-white mb-2">
          {title}
        </h2>
        <p className="text-white/50 text-base md:text-lg max-w-xl">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function ColorSwatch({ name, cssVar, hex, className }: { name: string; cssVar: string; hex: string; className?: string }) {
  return (
    <div className="group">
      <div className={`h-24 md:h-32 rounded-2xl border border-white/10 mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg ${className}`}
        style={{ backgroundColor: hex }}
      />
      <p className="font-display font-bold text-white text-sm">{name}</p>
      <p className="text-white/40 text-xs font-mono">{cssVar}</p>
      <p className="text-white/30 text-xs font-mono">{hex}</p>
    </div>
  );
}

export default function VisualPlaybook() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/15 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px]" />
        </div>

        {/* Grid texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-white/60 uppercase tracking-widest">Visual Design System</span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-white mb-6 leading-[0.9] tracking-tight">
            Wonders<span className="text-gradient">Rank</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/40 tracking-normal">Visual Playbook</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
            The definitive guide to the visual language of WondersRank.
            Every color, every typeface, every interaction — documented with intention.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/40">
            {["Typography", "Color System", "Components", "Interactions", "Layout"].map((item) => (
              <span key={item} className="px-4 py-2 rounded-full bg-white/5 border border-white/5">{item}</span>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-white/40" />
          </div>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 space-y-32 md:space-y-40">

        {/* === 01. TYPOGRAPHY === */}
        <motion.section variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="01" title="Typography" subtitle="Two fonts, one voice. Bold display headlines meet clean body copy." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Display Font */}
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full">Display</span>
                <span className="text-white/40 text-sm font-mono">--font-display</span>
              </div>
              <h3 className="font-display font-black text-5xl md:text-6xl text-white mb-4 leading-none">Outfit</h3>
              <p className="text-white/40 text-sm mb-8">Used for headlines, navigation, ranks, and all attention-grabbing text. Weights: 400 to 900.</p>
              <div className="space-y-3 border-t border-white/5 pt-6">
                <p className="font-display font-black text-3xl text-white">Black 900</p>
                <p className="font-display font-extrabold text-2xl text-white/80">Extra Bold 800</p>
                <p className="font-display font-bold text-xl text-white/60">Bold 700</p>
                <p className="font-display font-medium text-lg text-white/40">Medium 500</p>
                <p className="font-display font-normal text-base text-white/30">Regular 400</p>
              </div>
            </motion.div>

            {/* Body Font */}
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-secondary/20 text-secondary rounded-full">Body</span>
                <span className="text-white/40 text-sm font-mono">--font-sans</span>
              </div>
              <h3 className="text-5xl md:text-6xl text-white mb-4 leading-none" style={{ fontFamily: 'DM Sans' }}>DM Sans</h3>
              <p className="text-white/40 text-sm mb-8">Used for body text, descriptions, labels, and supporting content. Geometric proportions with friendly character.</p>
              <div className="space-y-3 border-t border-white/5 pt-6">
                <p className="font-extrabold text-3xl text-white">Extra Bold 800</p>
                <p className="font-bold text-2xl text-white/80">Bold 700</p>
                <p className="font-semibold text-xl text-white/60">Semibold 600</p>
                <p className="font-medium text-lg text-white/40">Medium 500</p>
                <p className="font-normal text-base text-white/30">Regular 400</p>
              </div>
            </motion.div>
          </div>

          {/* Type Scale */}
          <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 md:p-10">
            <h3 className="font-display font-bold text-xl text-white mb-8">Type Scale</h3>
            <div className="space-y-6 overflow-hidden">
              {[
                { size: "5xl", px: "48px", label: "Hero Headline", example: "Which is more Breathtaking?" },
                { size: "4xl", px: "36px", label: "Page Title", example: "Global Rankings" },
                { size: "3xl", px: "30px", label: "Card Title", example: "Machu Picchu" },
                { size: "xl", px: "20px", label: "Section Header", example: "Live Feed" },
                { size: "base", px: "16px", label: "Body", example: "Cast your vote and help us rank the wonders of the world." },
                { size: "sm", px: "14px", label: "Label / Badge", example: "1.5 million visitors" },
                { size: "xs", px: "12px", label: "Caption / Meta", example: "Made by Daniel Camelo" },
              ].map((item) => (
                <div key={item.size} className="flex items-baseline gap-4 md:gap-8 group">
                  <div className="w-24 md:w-32 flex-shrink-0 text-right">
                    <span className="font-mono text-xs text-white/30 group-hover:text-white/50 transition-colors">{item.px}</span>
                    <br />
                    <span className="text-xs text-white/20">{item.label}</span>
                  </div>
                  <p className={`font-display font-bold text-${item.size} text-white truncate group-hover:text-gradient transition-all`}>
                    {item.example}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* === 02. COLOR SYSTEM === */}
        <motion.section variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="02" title="Color System" subtitle="Dark-first palette with neon accents. Designed for depth and drama." />

          {/* Core Colors */}
          <motion.div {...fadeUp} className="mb-12">
            <h3 className="font-display font-bold text-lg text-white/60 mb-6 uppercase tracking-wider">Core Palette</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
              <ColorSwatch name="Background" cssVar="--background" hex="hsl(240, 60%, 4%)" className="bg-background border-2" />
              <ColorSwatch name="Card" cssVar="--card" hex="hsl(240, 40%, 8%)" className="!bg-[hsl(240,40%,8%)]" />
              <ColorSwatch name="Primary" cssVar="--primary" hex="hsl(320, 100%, 60%)" className="!bg-[hsl(320,100%,60%)]" />
              <ColorSwatch name="Secondary" cssVar="--secondary" hex="hsl(190, 100%, 50%)" className="!bg-[hsl(190,100%,50%)]" />
              <ColorSwatch name="Accent" cssVar="--accent" hex="hsl(45, 100%, 55%)" className="!bg-[hsl(45,100%,55%)]" />
            </div>
          </motion.div>

          {/* Semantic Colors */}
          <motion.div {...fadeUp} className="mb-12">
            <h3 className="font-display font-bold text-lg text-white/60 mb-6 uppercase tracking-wider">Semantic</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              <ColorSwatch name="Border" cssVar="--border" hex="hsl(240, 30%, 16%)" className="!bg-[hsl(240,30%,16%)]" />
              <ColorSwatch name="Muted" cssVar="--muted" hex="hsl(240, 30%, 12%)" className="!bg-[hsl(240,30%,12%)]" />
              <ColorSwatch name="Destructive" cssVar="--destructive" hex="hsl(0, 100%, 60%)" className="!bg-[hsl(0,100%,60%)]" />
              <ColorSwatch name="Ring/Focus" cssVar="--ring" hex="hsl(320, 100%, 60%)" className="!bg-[hsl(320,100%,60%)]" />
            </div>
          </motion.div>

          {/* Gradients */}
          <motion.div {...fadeUp}>
            <h3 className="font-display font-bold text-lg text-white/60 mb-6 uppercase tracking-wider">Gradients & Effects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="group">
                <div className="h-28 rounded-2xl bg-gradient-to-r from-primary via-[#a855f7] to-secondary mb-3 transition-transform group-hover:scale-105" />
                <p className="font-display font-bold text-white text-sm">.text-gradient</p>
                <p className="text-white/40 text-xs">Primary brand gradient — headlines, accents</p>
              </div>
              <div className="group">
                <div className="h-28 rounded-2xl bg-gradient-to-br from-[#ffd700] via-[#ffb000] to-[#ff8c00] mb-3 transition-transform group-hover:scale-105" />
                <p className="font-display font-bold text-white text-sm">.text-gradient-gold</p>
                <p className="text-white/40 text-xs">Rank #1 — Gold medal treatment</p>
              </div>
              <div className="group">
                <div className="h-28 rounded-2xl bg-gradient-to-br from-[#e0e0e0] via-[#b8b8b8] to-[#888888] mb-3 transition-transform group-hover:scale-105" />
                <p className="font-display font-bold text-white text-sm">.text-gradient-silver</p>
                <p className="text-white/40 text-xs">Rank #2 — Silver medal treatment</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* === 03. GLASS MORPHISM === */}
        <motion.section variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="03" title="Glass Morphism" subtitle="Frosted surfaces that float above the dark void. Depth through translucency." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 flex flex-col gap-4">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/5 text-white/50 rounded-full self-start">.glass-panel</span>
              <p className="text-white/60 text-sm">Base surface. <code className="text-primary/80 text-xs">bg-white/[0.03]</code> with backdrop blur and subtle border.</p>
              <div className="mt-auto pt-4 border-t border-white/5">
                <code className="text-xs text-white/30 font-mono block leading-relaxed">
                  backdrop-blur-xl<br />
                  border-white/[0.08]<br />
                  shadow-[0_8px_32px]
                </code>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="glass-panel glass-panel-hover rounded-3xl p-8 flex flex-col gap-4 cursor-pointer">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/5 text-white/50 rounded-full self-start">.glass-panel-hover</span>
              <p className="text-white/60 text-sm">Interactive surface. Brightens on hover with a pink glow. Hover me!</p>
              <div className="mt-auto pt-4 border-t border-white/5">
                <code className="text-xs text-white/30 font-mono block leading-relaxed">
                  hover:bg-white/[0.06]<br />
                  hover:border-white/[0.15]<br />
                  hover:shadow-pink/15
                </code>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="relative rounded-3xl p-8 flex flex-col gap-4 overflow-hidden">
              <img src="https://www.touropia.com/gfx/b/2025/05/Colosseum.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="relative z-10 mt-auto">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white/80 rounded-full">Image Overlay</span>
                <p className="text-white/80 text-sm mt-3">Cards use gradient overlays from solid to transparent over full-bleed images.</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* === 04. BUTTONS & INTERACTIONS === */}
        <motion.section variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="04" title="Buttons & Interactions" subtitle="Every click feels intentional. Gradient reveals, scale feedback, confetti bursts." />

          <div className="space-y-8">
            {/* Vote Button */}
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 md:p-10">
              <h3 className="font-display font-bold text-xl text-white mb-2">Vote Button</h3>
              <p className="text-white/40 text-sm mb-8">The primary CTA. Transparent by default, gradient reveal on hover. Active scale-down for tactile feedback.</p>

              <div className="flex flex-wrap gap-6 items-end">
                <div className="space-y-2">
                  <span className="text-xs text-white/40 uppercase tracking-wider">Default</span>
                  <button className="relative w-64 py-4 rounded-2xl font-display font-bold text-lg overflow-hidden bg-white/5 border border-white/10 text-white">
                    <span className="relative z-10">Vote for this</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-white/40 uppercase tracking-wider">Hover</span>
                  <button className="relative w-64 py-4 rounded-2xl font-display font-bold text-lg overflow-hidden border border-white/30 text-white shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
                    <span className="relative z-10">Vote for this</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-white/40 uppercase tracking-wider">Voted</span>
                  <button className="relative w-64 py-4 rounded-2xl font-display font-bold text-lg overflow-hidden bg-white/5 border border-white/10 text-white/50 opacity-80 ring-4 ring-primary shadow-[0_0_50px_rgba(255,0,255,0.4)]">
                    <span className="relative z-10">Voted!</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Badges & Pills */}
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 md:p-10">
              <h3 className="font-display font-bold text-xl text-white mb-2">Badges & Pills</h3>
              <p className="text-white/40 text-sm mb-8">Contextual labels with frosted glass effect. Icon + text for scannability.</p>

              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium text-white/90 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-secondary" /> Paris, France
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium text-white/90 border border-white/10">
                  <Users className="w-3.5 h-3.5 text-accent" /> 6.1 million
                </span>
                <span className="text-xs font-medium px-2 py-1 rounded bg-green-500/20 text-green-400 flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> Winner
                </span>
                <span className="text-rose-400/80 text-xs font-bold px-2 py-1 rounded bg-rose-500/10">def.</span>
                <span className="text-xs font-medium text-white/40 bg-black/20 px-2 py-1 rounded-md">42 Matches</span>
              </div>
            </motion.div>

            {/* Navigation Pill */}
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 md:p-10">
              <h3 className="font-display font-bold text-xl text-white mb-2">Navigation</h3>
              <p className="text-white/40 text-sm mb-8">Floating pill indicator follows active route with spring physics. Icons on mobile, full labels on desktop.</p>

              <div className="inline-flex items-center gap-1 bg-background/80 p-2 rounded-full border border-white/5">
                <div className="relative px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="absolute inset-0 rounded-full bg-white/10 border border-white/20" />
                  <Swords className="w-4 h-4 text-primary relative z-10" />
                  <span className="text-white text-sm font-medium relative z-10">Vote</span>
                </div>
                <div className="px-4 py-2 rounded-full flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-medium">Leaderboard</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* === 05. COMPONENTS === */}
        <motion.section variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="05" title="Components" subtitle="The building blocks. Every component has a dark, glassy, immersive identity." />

          {/* Matchup Card */}
          <motion.div {...fadeUp} className="mb-12">
            <h3 className="font-display font-bold text-lg text-white/60 mb-6 uppercase tracking-wider">Matchup Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {[
                { name: "Eiffel Tower", location: "Paris, France", visitors: "6.1 million", img: "https://www.touropia.com/gfx/b/2025/05/Eiffel_Tower.jpg" },
                { name: "Colosseum", location: "Rome, Italy", visitors: "7.6 million", img: "https://www.touropia.com/gfx/b/2025/05/Colosseum.jpg" },
              ].map((a) => (
                <div key={a.name} className="group glass-panel glass-panel-hover rounded-[2rem] overflow-hidden">
                  <div className="relative flex flex-col justify-between p-6 min-h-[360px]">
                    <img src={a.img} alt={a.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="relative z-10 mt-auto">
                      <h2 className="font-display font-bold text-3xl text-white mb-2">{a.name}</h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium text-white/90 border border-white/10">
                          <MapPin className="w-3.5 h-3.5 text-secondary" /> {a.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium text-white/90 border border-white/10">
                          <Users className="w-3.5 h-3.5 text-accent" /> {a.visitors}
                        </span>
                      </div>
                      <button className="relative w-full py-3 rounded-2xl font-display font-bold text-base overflow-hidden bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 group/btn">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">Vote for this</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* VS Badge */}
          <motion.div {...fadeUp} className="mb-12">
            <h3 className="font-display font-bold text-lg text-white/60 mb-6 uppercase tracking-wider">VS Badge</h3>
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 rounded-full bg-background border-[4px] border-card flex items-center justify-center shadow-[0_0_30px_rgba(30,10,60,1)] font-display font-black text-2xl italic text-white">
                VS
              </div>
              <div>
                <p className="text-white/60 text-sm">Centered between matchup cards. Solid background with deep shadow for elevation. Desktop only — mobile uses inline text.</p>
              </div>
            </div>
          </motion.div>

          {/* Leaderboard Row */}
          <motion.div {...fadeUp} className="mb-12">
            <h3 className="font-display font-bold text-lg text-white/60 mb-6 uppercase tracking-wider">Leaderboard Row</h3>
            <div className="space-y-4 max-w-3xl">
              {[
                { rank: 1, name: "Senso-ji Temple", location: "Tokyo, Japan", elo: 1248, matches: 12, img: "https://www.touropia.com/gfx/b/2025/05/Senso-ji-Temple.jpg", medal: { bg: "bg-[#ffd700]/10", border: "border-[#ffd700]/30" } },
                { rank: 2, name: "Niagara Falls", location: "Ontario, Canada", elo: 1232, matches: 8, img: "https://www.touropia.com/gfx/b/2025/05/Niagara_Falls.jpg", medal: { bg: "bg-[#e0e0e0]/10", border: "border-[#e0e0e0]/30" } },
                { rank: 4, name: "Eiffel Tower", location: "Paris, France", elo: 1200, matches: 6, img: "https://www.touropia.com/gfx/b/2025/05/Eiffel_Tower.jpg", medal: { bg: "bg-white/5", border: "border-white/5" } },
              ].map((item) => (
                <div key={item.rank} className={`flex items-center gap-6 p-5 rounded-3xl glass-panel-hover ${item.medal.bg} ${item.medal.border} border`}>
                  <div className="w-16 text-center font-display font-black text-[32px] tracking-tighter text-white/40">#{item.rank}</div>
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white font-display mb-1">{item.name}</h3>
                    <p className="text-white/60 text-sm flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {item.location}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 pr-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className={`font-display font-bold text-2xl leading-none ${item.rank <= 3 ? 'text-white' : 'text-white/80'}`}>{item.elo}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-white/40">ELO</span>
                    </div>
                    <div className="text-xs font-medium text-white/40 bg-black/20 px-2 py-1 rounded-md">{item.matches} Matches</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Match Feed Item */}
          <motion.div {...fadeUp}>
            <h3 className="font-display font-bold text-lg text-white/60 mb-6 uppercase tracking-wider">Live Feed Item</h3>
            <div className="max-w-sm glass-panel rounded-3xl p-6">
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.05]">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-green-500/20 text-green-400 flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> Winner
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">2 min ago</span>
                  </div>
                  <div className="font-semibold text-white">Taj Mahal</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <span className="text-rose-400/80 text-xs font-bold">def.</span>
                    <span>Great Wall of China</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* === 06. MOTION & ANIMATION === */}
        <motion.section variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="06" title="Motion & Animation" subtitle="Spring physics and orchestrated transitions. Every element earns its entrance." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8">
              <h3 className="font-display font-bold text-xl text-white mb-4">Page Transitions</h3>
              <div className="space-y-4 text-sm text-white/50">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Matchup Enter</span>
                  <code className="text-primary/80 font-mono text-xs">spring(200, 20)</code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Matchup Exit</span>
                  <code className="text-primary/80 font-mono text-xs">blur(10px) + scale</code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Leaderboard Stagger</span>
                  <code className="text-primary/80 font-mono text-xs">delay: i * 0.05s</code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Nav Indicator</span>
                  <code className="text-primary/80 font-mono text-xs">layoutId spring(300, 30)</code>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Feed Items</span>
                  <code className="text-primary/80 font-mono text-xs">y: -20, scale: 0.95</code>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8">
              <h3 className="font-display font-bold text-xl text-white mb-4">Micro-Interactions</h3>
              <div className="space-y-4 text-sm text-white/50">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Vote Confetti</span>
                  <code className="text-accent/80 font-mono text-xs">canvas-confetti @ click origin</code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Card Hover Image</span>
                  <code className="text-accent/80 font-mono text-xs">scale(1.1) 700ms</code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Button Active</span>
                  <code className="text-accent/80 font-mono text-xs">scale(0.98)</code>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span>Gradient Reveal</span>
                  <code className="text-accent/80 font-mono text-xs">opacity 0 → 1 on hover</code>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Loser Card</span>
                  <code className="text-accent/80 font-mono text-xs">opacity-50 grayscale-50%</code>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* === 07. LAYOUT === */}
        <motion.section variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="07" title="Layout Architecture" subtitle="Responsive grid system. Desktop: 12-col with sticky sidebar. Mobile: stacked single column." />

          <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-12 gap-3 mb-8">
              {/* Nav mock */}
              <div className="col-span-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center px-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-secondary" />
                  <span className="font-display font-bold text-xs text-white/60">WondersRank</span>
                </div>
                <div className="ml-auto flex gap-2">
                  <div className="w-14 h-6 rounded-full bg-white/10" />
                  <div className="w-20 h-6 rounded-full bg-white/5" />
                </div>
              </div>

              {/* Main area */}
              <div className="col-span-12 md:col-span-8 space-y-3">
                <div className="h-8 w-48 rounded-lg bg-white/5" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-48 rounded-2xl bg-gradient-to-t from-primary/10 to-transparent border border-white/10 flex items-end p-3">
                    <span className="text-[10px] text-white/40">Card A</span>
                  </div>
                  <div className="h-48 rounded-2xl bg-gradient-to-t from-secondary/10 to-transparent border border-white/10 flex items-end p-3">
                    <span className="text-[10px] text-white/40">Card B</span>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-span-12 md:col-span-4">
                <div className="h-full min-h-[200px] rounded-2xl bg-white/[0.03] border border-white/10 p-3 space-y-2">
                  <div className="h-6 w-20 rounded bg-white/5" />
                  <div className="h-12 rounded-xl bg-white/[0.03] border border-white/5" />
                  <div className="h-12 rounded-xl bg-white/[0.03] border border-white/5" />
                  <div className="h-12 rounded-xl bg-white/[0.03] border border-white/5" />
                  <span className="text-[10px] text-white/30 block text-center">Live Feed (sticky)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-white/40">
              <span className="flex items-center gap-2"><ChevronRight className="w-3 h-3" /> max-w-7xl container</span>
              <span className="flex items-center gap-2"><ChevronRight className="w-3 h-3" /> 12-col grid on lg+</span>
              <span className="flex items-center gap-2"><ChevronRight className="w-3 h-3" /> 8:4 main/sidebar ratio</span>
              <span className="flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Sticky sidebar top-28</span>
              <span className="flex items-center gap-2"><ChevronRight className="w-3 h-3" /> 2rem border-radius throughout</span>
            </div>
          </motion.div>
        </motion.section>

        {/* === 08. VISUAL INSPIRATION === */}
        <motion.section variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="08" title="Visual Inspiration" subtitle="Vintage travel poster art meets dark neon modernity. The soul of WondersRank." />

          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {[
              "/visual-references/reference1.jpg",
              "/visual-references/reference2.jpg",
              "/visual-references/reference3.jpg",
              "/visual-references/reference4.jpg",
              "/visual-references/reference5.jpg",
            ].map((src, i) => (
              <motion.div
                key={i}
                className="relative aspect-[2/3] rounded-2xl overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={src} alt={`Reference ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="mt-10 glass-panel rounded-3xl p-8">
            <p className="text-white/50 text-sm leading-relaxed max-w-3xl">
              The design language draws from mid-century travel posters — bold flat color, dramatic composition,
              typographic hierarchy — and reinterprets it through a dark, neon-lit digital lens. The result is an
              interface that feels both adventurous and premium: cards that invite exploration, rankings that
              celebrate achievement, and interactions that spark delight.
            </p>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-16 border-t border-white/5"
        >
          <p className="font-display font-bold text-2xl text-white/20 mb-2">WondersRank Visual Playbook</p>
          <p className="text-xs text-white/30">Designed by Daniel Camelo</p>
        </motion.div>
      </div>
    </div>
  );
}
