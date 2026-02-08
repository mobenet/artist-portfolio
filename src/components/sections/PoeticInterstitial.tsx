"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePoeticFragment } from "@/hooks/usePoeticFragment";

export function PoeticInterstitial() {
  const { text, isGenerated, ready } = usePoeticFragment();

  return (
    <section className="relative flex items-center justify-center px-6 md:px-12 lg:px-24 py-24 md:py-32 min-h-[40vh]">
      {/* Top rule */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 lg:left-24 lg:right-24 h-px bg-border/30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-2xl text-center"
      >
        {/* Machine provenance hint */}
        <span
          className="block text-accent/30 font-mono text-xs tracking-[0.3em] mb-6"
          aria-hidden
        >
          {"//"}
        </span>

        {/* Poetic text with blur cross-fade */}
        <div className="min-h-[4rem]">
          <AnimatePresence mode="wait">
            {ready && (
              <motion.p
                key={isGenerated ? "gen" : "fallback"}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-foreground/50 text-lg md:text-xl leading-relaxed italic whitespace-pre-line"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {text}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-6 right-6 md:left-12 md:right-12 lg:left-24 lg:right-24 h-px bg-border/30" />
    </section>
  );
}
