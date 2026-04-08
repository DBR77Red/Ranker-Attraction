import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Users, Trophy, Swords, Search, TrendingUp, Globe, ChevronRight, Copy, Check, Eye, Sparkles, Layers, MousePointer2, LayoutGrid, ImageIcon, Zap } from "lucide-react";
import { useState, useRef, useEffect } from "react";

/* ─── animation presets ─── */
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

/* ─── TOC config ─── */
const sections = [
  { id: "typography", num: "01", label: "Typography", icon: Sparkles },
  { id: "colors", num: "02", label: "Colors", icon: Eye },
  { id: "glass", num: "03", label: "Glass", icon: Layers },
  { id: "interactions", num: "04", label: "Interactions", icon: MousePointer2 },
  { id: "components", num: "05", label: "Components", icon: LayoutGrid },
  { id: "motion", num: "06", label: "Motion", icon: Zap },
  { id: "layout", num: "07", label: "Layout", icon: LayoutGrid },
  { id: "inspiration", num: "08", label: "Inspiration", icon: ImageIcon },
];

/* ─── Copy-to-clipboard color swatch ─── */
function ColorSwatch({ name, cssVar, hex, className }: { name: string; cssVar: string; hex: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group cursor-pointer" onClick={handleCopy}>
      <div className={`relative h-24 md:h-32 rounded-2xl border border-white/10 mb-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:border-white/20 overflow-hidden ${className}`}
        style={{ backgroundColor: hex }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 backdrop-blur-sm">
          {copied ? (
            <Check className="w-5 h-5 text-green-400" />
          ) : (
            <Copy className="w-5 h-5 text-white/80" />
          )}
        </div>
      </div>
      <p className="font-display font-bold text-white text-sm">{name}</p>
      <p className="text-white/40 text-xs font-mono">{cssVar}</p>
      <p className="text-white/30 text-xs font-mono">{hex}</p>
      {copied && (
        <p className="text-green-400 text-xs mt-1 font-medium">Copied!</p>
      )}
    </div>
  );
}

/* ─── Section Title with neon accent line ─── */
function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <motion.div {...fadeUp} className="mb-10 md:mb-14 relative">
      <span className="absolute -left-2 md:-left-6 -top-6 font-display font-black text-[6rem] md:text-[8rem] leading-none text-white/[0.03] select-none pointer-events-none">
        {number}
      </span>
      <div className="relative">
        {/* Neon accent line */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-primary to-transparent" />
          <span className="text-xs font-mono text-primary/60 uppercase tracking-[0.3em]">{number}</span>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white mb-2">
          {title}
        </h2>
        <p className="text-white/50 text-base md:text-lg max-w-xl">{subtitle}</p>
      </div>
    </motion.div>
  );
}

/* ─── Neon section divider ─── */
function SectionDivider() {
  return (
    <div className="relative h-px my-4">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-primary/40 shadow-[0_0_12px_rgba(255,0,255,0.3)]" />
    </div>
  );
}

/* ─── Live Spring Demo ─── */
function SpringDemo() {
  const [trigger, setTrigger] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full h-32 flex items-center justify-center">
        <motion.div
          animate={trigger ? { scale: [1, 1.3, 0.9, 1.05, 1], rotate: [0, -5, 5, -2, 0] } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-[0_0_40px_rgba(255,0,255,0.3)]"
        />
      </div>
      <button
        onClick={() => { setTrigger(!trigger); setTimeout(() => setTrigger(false), 50); }}
        className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all cursor-pointer"
      >
        Trigger Spring
      </button>
    </div>
  );
}

/* ─── Stagger Demo ─── */
function StaggerDemo() {
  const [trigger, setTrigger] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-3 h-32 items-end">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`${i}-${trigger}`}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
            className="w-10 rounded-xl bg-gradient-to-t from-secondary/80 to-secondary/20 border border-secondary/30"
            style={{ height: `${40 + i * 15}px` }}
          />
        ))}
      </div>
      <button
        onClick={() => setTrigger((t) => t + 1)}
        className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all cursor-pointer"
      >
        Replay Stagger
      </button>
    </div>
  );
}

/* ─── Floating TOC ─── */
function FloatingTOC({ activeSection }: { activeSection: string }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-4 xl:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1"
    >
      <div className="glass-panel rounded-2xl p-2">
        {sections.map((s) => {
          const isActive = activeSection === s.id;
          const Icon = s.icon;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`
                relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200
                ${isActive
                  ? "text-white bg-white/10"
                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
                }
              `}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">{s.label}</span>
              {isActive && (
                <motion.div
                  layoutId="toc-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════ */
/* ═══  MAIN COMPONENT  ═══════════════════════ */
/* ═══════════════════════════════════════════════ */
export default function VisualPlaybook() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* track active section for TOC */
  const [activeSection, setActiveSection] = useState("typography");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <FloatingTOC activeSection={activeSection} />

      {/* ══════════════════ HERO ══════════════════ */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-primary/15 blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] rounded-full bg-secondary/12 blur-[100px]"
          />
          <motion.div
            animate={{ x: [0, 20, -30, 0], y: [0, -20, 40, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="absolute top-[40%] left-[50%] w-[250px] h-[250px] rounded-full bg-accent/8 blur-[80px]"
          />
        </div>

        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-white/60 uppercase tracking-widest">Visual Design System</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-5xl sm:text-7xl md:text-[6.5rem] text-white mb-6 leading-[0.85] tracking-tight"
          >
            Wonders<span className="text-gradient">Rank</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/30 tracking-normal leading-relaxed">Visual Playbook</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            The definitive guide to the visual language of WondersRank.
            Every color, every typeface, every interaction — documented with intention.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3 text-sm"
          >
            {sections.slice(0, 5).map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40 hover:text-white/70 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
              >
                {s.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-2 rounded-full bg-white/30"
            />
          </div>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24 space-y-28 md:space-y-36">

        {/* ════════════════ 01. TYPOGRAPHY ════════════════ */}
        <motion.section id="typography" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="01" title="Typography" subtitle="Two fonts, one voice. Bold display headlines meet clean body copy." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Display Font */}
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden group">
              {/* Subtle corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="flex items-center gap-3 mb-6 relative">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full">Display</span>
                <span className="text-white/40 text-sm font-mono">--font-display</span>
              </div>
              <h3 className="font-display font-black text-5xl md:text-6xl text-white mb-4 leading-none relative">Outfit</h3>
              <p className="text-white/40 text-sm mb-8 relative">Used for headlines, navigation, ranks, and all attention-grabbing text. Weights: 400 to 900.</p>
              <div className="space-y-3 border-t border-white/5 pt-6 relative">
                {[
                  { weight: "Black 900", cls: "font-black text-3xl", opacity: "text-white" },
                  { weight: "Extra Bold 800", cls: "font-extrabold text-2xl", opacity: "text-white/80" },
                  { weight: "Bold 700", cls: "font-bold text-xl", opacity: "text-white/60" },
                  { weight: "Medium 500", cls: "font-medium text-lg", opacity: "text-white/40" },
                  { weight: "Regular 400", cls: "font-normal text-base", opacity: "text-white/30" },
                ].map((item) => (
                  <p key={item.weight} className={`font-display ${item.cls} ${item.opacity} hover:text-white transition-colors duration-200`}>
                    {item.weight}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Body Font */}
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="flex items-center gap-3 mb-6 relative">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-secondary/20 text-secondary rounded-full">Body</span>
                <span className="text-white/40 text-sm font-mono">--font-sans</span>
              </div>
              <h3 className="text-5xl md:text-6xl text-white mb-4 leading-none relative" style={{ fontFamily: 'DM Sans' }}>DM Sans</h3>
              <p className="text-white/40 text-sm mb-8 relative">Used for body text, descriptions, labels, and supporting content. Geometric proportions with friendly character.</p>
              <div className="space-y-3 border-t border-white/5 pt-6 relative">
                {[
                  { weight: "Extra Bold 800", cls: "font-extrabold text-3xl", opacity: "text-white" },
                  { weight: "Bold 700", cls: "font-bold text-2xl", opacity: "text-white/80" },
                  { weight: "Semibold 600", cls: "font-semibold text-xl", opacity: "text-white/60" },
                  { weight: "Medium 500", cls: "font-medium text-lg", opacity: "text-white/40" },
                  { weight: "Regular 400", cls: "font-normal text-base", opacity: "text-white/30" },
                ].map((item) => (
                  <p key={item.weight} className={`${item.cls} ${item.opacity} hover:text-white transition-colors duration-200`}>
                    {item.weight}
                  </p>
                ))}
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
                <div key={item.size} className="flex items-baseline gap-4 md:gap-8 group cursor-default">
                  <div className="w-24 md:w-32 flex-shrink-0 text-right">
                    <span className="font-mono text-xs text-white/30 group-hover:text-primary/60 transition-colors duration-200">{item.px}</span>
                    <br />
                    <span className="text-xs text-white/20 group-hover:text-white/40 transition-colors">{item.label}</span>
                  </div>
                  <p className={`font-display font-bold text-${item.size} text-white/80 truncate group-hover:text-gradient transition-all duration-300`}>
                    {item.example}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <SectionDivider />

        {/* ════════════════ 02. COLOR SYSTEM ════════════════ */}
        <motion.section id="colors" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="02" title="Color System" subtitle="Dark-first palette with neon accents. Designed for depth and drama. Click any swatch to copy." />

          {/* Core Colors */}
          <motion.div {...fadeUp} className="mb-12">
            <h3 className="font-display font-bold text-lg text-white/60 mb-6 uppercase tracking-wider flex items-center gap-3">
              Core Palette
              <span className="text-xs text-white/20 normal-case tracking-normal font-normal">(click to copy)</span>
            </h3>
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
              {[
                { name: ".text-gradient", desc: "Primary brand gradient — headlines, accents", cls: "bg-gradient-to-r from-primary via-[#a855f7] to-secondary" },
                { name: ".text-gradient-gold", desc: "Rank #1 — Gold medal treatment", cls: "bg-gradient-to-br from-[#ffd700] via-[#ffb000] to-[#ff8c00]" },
                { name: ".text-gradient-silver", desc: "Rank #2 — Silver medal treatment", cls: "bg-gradient-to-br from-[#e0e0e0] via-[#b8b8b8] to-[#888888]" },
              ].map((g) => (
                <motion.div key={g.name} className="group cursor-pointer" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <div className={`h-28 rounded-2xl ${g.cls} mb-3 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]`} />
                  <p className="font-display font-bold text-white text-sm">{g.name}</p>
                  <p className="text-white/40 text-xs">{g.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <SectionDivider />

        {/* ════════════════ 03. GLASS MORPHISM ════════════════ */}
        <motion.section id="glass" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
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
              <img src="https://www.touropia.com/gfx/b/2025/05/Colosseum.jpg" alt="Colosseum overlay example" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="relative z-10 mt-auto">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white/80 rounded-full">Image Overlay</span>
                <p className="text-white/80 text-sm mt-3">Cards use gradient overlays from solid to transparent over full-bleed images.</p>
              </div>
            </motion.div>
          </div>

          {/* Glass Blur Intensity Comparison */}
          <motion.div {...fadeUp} className="mt-10">
            <h3 className="font-display font-bold text-lg text-white/60 mb-6 uppercase tracking-wider">Blur Intensity Levels</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Subtle", blur: "backdrop-blur-sm", bg: "bg-white/[0.02]", border: "border-white/[0.05]" },
                { label: "Standard", blur: "backdrop-blur-xl", bg: "bg-white/[0.03]", border: "border-white/[0.08]" },
                { label: "Heavy", blur: "backdrop-blur-2xl", bg: "bg-white/[0.06]", border: "border-white/[0.12]" },
              ].map((level) => (
                <div key={level.label} className={`${level.blur} ${level.bg} ${level.border} border rounded-2xl p-6 text-center`}>
                  <p className="font-display font-bold text-white text-lg mb-1">{level.label}</p>
                  <p className="text-white/30 text-xs font-mono">{level.blur}</p>
                  <p className="text-white/30 text-xs font-mono">{level.bg}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <SectionDivider />

        {/* ════════════════ 04. BUTTONS & INTERACTIONS ════════════════ */}
        <motion.section id="interactions" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="04" title="Buttons & Interactions" subtitle="Every click feels intentional. Gradient reveals, scale feedback, confetti bursts." />

          <div className="space-y-8">
            {/* Vote Button */}
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 md:p-10">
              <h3 className="font-display font-bold text-xl text-white mb-2">Vote Button</h3>
              <p className="text-white/40 text-sm mb-8">The primary CTA. Transparent by default, gradient reveal on hover. Active scale-down for tactile feedback.</p>

              <div className="flex flex-wrap gap-6 items-end">
                <div className="space-y-2">
                  <span className="text-xs text-white/40 uppercase tracking-wider">Default</span>
                  <button className="relative w-56 md:w-64 py-4 rounded-2xl font-display font-bold text-lg overflow-hidden bg-white/5 border border-white/10 text-white cursor-default">
                    <span className="relative z-10">Vote for this</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-white/40 uppercase tracking-wider">Hover</span>
                  <button className="relative w-56 md:w-64 py-4 rounded-2xl font-display font-bold text-lg overflow-hidden border border-white/30 text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-default">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
                    <span className="relative z-10">Vote for this</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-white/40 uppercase tracking-wider">Voted</span>
                  <button className="relative w-56 md:w-64 py-4 rounded-2xl font-display font-bold text-lg overflow-hidden bg-white/5 border border-white/10 text-white/50 opacity-80 ring-4 ring-primary shadow-[0_0_50px_rgba(255,0,255,0.4)] cursor-default">
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
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full">Display</span>
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-secondary/20 text-secondary rounded-full">Body</span>
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

        <SectionDivider />

        {/* ════════════════ 05. COMPONENTS ════════════════ */}
        <motion.section id="components" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="05" title="Components" subtitle="The building blocks. Every component has a dark, glassy, immersive identity." />

          {/* Matchup Card */}
          <motion.div {...fadeUp} className="mb-12">
            <h3 className="font-display font-bold text-lg text-white/60 mb-6 uppercase tracking-wider">Matchup Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {[
                { name: "Eiffel Tower", location: "Paris, France", visitors: "6.1 million", img: "https://www.touropia.com/gfx/b/2025/05/Eiffel_Tower.jpg" },
                { name: "Colosseum", location: "Rome, Italy", visitors: "7.6 million", img: "https://www.touropia.com/gfx/b/2025/05/Colosseum.jpg" },
              ].map((a) => (
                <motion.div key={a.name} className="group glass-panel glass-panel-hover rounded-[2rem] overflow-hidden cursor-pointer" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
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
                      <button className="relative w-full py-3 rounded-2xl font-display font-bold text-base overflow-hidden bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 group/btn cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">Vote for this</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
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
                <p className="text-white/60 text-sm max-w-md">Centered between matchup cards. Solid background with deep shadow for elevation. Desktop only — mobile uses inline text.</p>
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
                <motion.div key={item.rank} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }} className={`flex items-center gap-6 p-5 rounded-3xl glass-panel-hover ${item.medal.bg} ${item.medal.border} border cursor-pointer`}>
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
                </motion.div>
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

        <SectionDivider />

        {/* ════════════════ 06. MOTION & ANIMATION ════════════════ */}
        <motion.section id="motion" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
          <SectionTitle number="06" title="Motion & Animation" subtitle="Spring physics and orchestrated transitions. Every element earns its entrance." />

          {/* Live Demos */}
          <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
            <div className="glass-panel rounded-3xl p-8">
              <h3 className="font-display font-bold text-xl text-white mb-2">Spring Physics</h3>
              <p className="text-white/40 text-sm mb-6">Natural bounce with configurable stiffness and damping. Click to see it in action.</p>
              <SpringDemo />
            </div>
            <div className="glass-panel rounded-3xl p-8">
              <h3 className="font-display font-bold text-xl text-white mb-2">Stagger Cascade</h3>
              <p className="text-white/40 text-sm mb-6">Elements enter sequentially with 80ms delay between each. Creates a wave effect.</p>
              <StaggerDemo />
            </div>
          </motion.div>

          {/* Specs Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8">
              <h3 className="font-display font-bold text-xl text-white mb-4">Page Transitions</h3>
              <div className="space-y-4 text-sm text-white/50">
                {[
                  { name: "Matchup Enter", code: "spring(200, 20)" },
                  { name: "Matchup Exit", code: "blur(10px) + scale" },
                  { name: "Leaderboard Stagger", code: "delay: i * 0.05s" },
                  { name: "Nav Indicator", code: "layoutId spring(300, 30)" },
                  { name: "Feed Items", code: "y: -20, scale: 0.95" },
                ].map((item, i, arr) => (
                  <div key={item.name} className={`flex justify-between items-center py-2 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <span>{item.name}</span>
                    <code className="text-primary/80 font-mono text-xs">{item.code}</code>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8">
              <h3 className="font-display font-bold text-xl text-white mb-4">Micro-Interactions</h3>
              <div className="space-y-4 text-sm text-white/50">
                {[
                  { name: "Vote Confetti", code: "canvas-confetti @ click origin" },
                  { name: "Card Hover Image", code: "scale(1.1) 700ms" },
                  { name: "Button Active", code: "scale(0.98)" },
                  { name: "Gradient Reveal", code: "opacity 0 → 1 on hover" },
                  { name: "Loser Card", code: "opacity-50 grayscale-50%" },
                ].map((item, i, arr) => (
                  <div key={item.name} className={`flex justify-between items-center py-2 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <span>{item.name}</span>
                    <code className="text-accent/80 font-mono text-xs">{item.code}</code>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <SectionDivider />

        {/* ════════════════ 07. LAYOUT ════════════════ */}
        <motion.section id="layout" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
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

            <div className="flex flex-wrap gap-4 md:gap-6 text-xs text-white/40">
              {[
                "max-w-7xl container",
                "12-col grid on lg+",
                "8:4 main/sidebar ratio",
                "Sticky sidebar top-28",
                "2rem border-radius throughout",
              ].map((spec) => (
                <span key={spec} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <ChevronRight className="w-3 h-3 text-primary/50" /> {spec}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <SectionDivider />

        {/* ════════════════ 08. VISUAL INSPIRATION ════════════════ */}
        <motion.section id="inspiration" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <img src={src} alt={`Visual reference ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-white/60 font-mono">ref_{String(i + 1).padStart(2, '0')}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="mt-10 glass-panel rounded-3xl p-8 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
            <p className="text-white/50 text-sm leading-relaxed max-w-3xl relative">
              The design language draws from mid-century travel posters — bold flat color, dramatic composition,
              typographic hierarchy — and reinterprets it through a dark, neon-lit digital lens. The result is an
              interface that feels both adventurous and premium: cards that invite exploration, rankings that
              celebrate achievement, and interactions that spark delight.
            </p>
          </motion.div>
        </motion.section>

        {/* ══════════════ FOOTER ══════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-16 relative"
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="font-display font-bold text-2xl text-white/15 mb-2">WondersRank Visual Playbook</p>
          <p className="text-xs text-white/25">Designed by Daniel Camelo</p>
        </motion.div>
      </div>
    </div>
  );
}
