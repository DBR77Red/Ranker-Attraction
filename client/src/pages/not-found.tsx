import { motion } from "framer-motion";
import { Globe, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel rounded-3xl p-10 md:p-14 max-w-lg w-full text-center relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-[80px]" />

        <div className="relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20"
          >
            <Globe className="w-8 h-8 text-white" />
          </motion.div>

          <h1 className="font-display font-black text-6xl md:text-7xl text-white mb-2">
            4<span className="text-gradient">0</span>4
          </h1>
          <p className="text-white/50 text-lg mb-8">
            This wonder hasn't been discovered yet.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to voting
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
