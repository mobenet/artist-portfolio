"use client";

import { motion } from "framer-motion";
import { useRef, useCallback, useEffect, useState } from "react";
import { CyclingText } from "@/components/motion/CyclingText";

const NAMES = ["Mo", "MAGNETT__"];
const GLITCH_CHARS = "*^~#@$%&!?><{}[]|/\\";
const NAME_FONT = "var(--font-bebas)";

// Text scramble hook — cycles between names, scrambling through random chars
function useTextScramble(words: string[], interval = 3000, scrambleDuration = 600) {
  const [display, setDisplay] = useState(words[0]);
  const indexRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const cycle = () => {
      const from = words[indexRef.current];
      indexRef.current = (indexRef.current + 1) % words.length;
      const to = words[indexRef.current];

      const maxLen = Math.max(from.length, to.length);
      const steps = 12;
      let step = 0;

      const scramble = () => {
        step++;
        const progress = step / steps;

        let result = "";
        for (let i = 0; i < maxLen; i++) {
          const targetChar = i < to.length ? to[i] : "";

          if (progress > (i / maxLen) * 0.8 + 0.2) {
            // Resolved — show target character
            result += targetChar;
          } else {
            // Still scrambling — show random glyph
            result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
        }

        setDisplay(result);

        if (step < steps) {
          frameRef.current = window.setTimeout(scramble, scrambleDuration / steps);
        } else {
          setDisplay(to);
        }
      };

      scramble();
    };

    const timer = setInterval(cycle, interval);
    return () => {
      clearInterval(timer);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [words, interval, scrambleDuration]);

  return display;
}

// Red offset glitch on mouse move
interface GlitchFrame {
  offset1: { x: number; y: number };
  offset2: { x: number; y: number };
  clipTop: number;
  clipBottom: number;
}

function randomGlitchFrame(): GlitchFrame {
  const clipTop = Math.random() * 60;
  return {
    offset1: { x: (Math.random() - 0.5) * 14, y: (Math.random() - 0.5) * 6 },
    offset2: { x: (Math.random() - 0.5) * 14, y: (Math.random() - 0.5) * 6 },
    clipTop,
    clipBottom: clipTop + 15 + Math.random() * 30,
  };
}

function useGlitch() {
  const [glitch, setGlitch] = useState<GlitchFrame | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const frameRef = useRef<number>(0);

  const trigger = useCallback(() => {
    setGlitch(randomGlitchFrame());

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setGlitch(null);
    }, 80 + Math.random() * 80);
  }, []);

  const onMouseMove = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      if (Math.random() > 0.55) trigger();
      frameRef.current = 0;
    });
  }, [trigger]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { glitch, onMouseMove };
}

export function IntroSection() {
  const displayName = useTextScramble(NAMES, 3000, 600);
  const { glitch, onMouseMove } = useGlitch();

  const nameStyle = {
    fontFamily: NAME_FONT,
    fontSize: "clamp(3.5rem, 12vw, 11rem)",
  };

  return (
    <section
      id="intro"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-16"
    >
      {/* Top left monogram */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute top-8 left-6 md:left-12 lg:left-24"
      >
        <span className="text-[10px] font-mono text-muted tracking-[0.4em] uppercase">
          Portfolio / 2024
        </span>
      </motion.div>

      {/* Main name block */}
      <div className="relative">
        {/* Red accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-16 h-[3px] bg-accent mb-8 origin-left"
        />

        {/* Name with scramble + mouse glitch */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseMove={onMouseMove}
          className="relative cursor-default select-none"
        >
          {/* Base name */}
          <h1
            className="text-foreground font-bold leading-[0.85] tracking-[-0.04em] whitespace-nowrap"
            style={nameStyle}
          >
            {displayName}
          </h1>

          {/* Glitch layer 1 — red channel offset */}
          {glitch && (
            <h1
              aria-hidden
              className="absolute top-0 left-0 text-accent/70 font-bold leading-[0.85] tracking-[-0.04em] pointer-events-none mix-blend-screen whitespace-nowrap"
              style={{
                ...nameStyle,
                transform: `translate(${glitch.offset1.x}px, ${glitch.offset1.y}px)`,
                clipPath: `inset(${glitch.clipTop}% 0 ${100 - glitch.clipBottom}% 0)`,
              }}
            >
              {displayName}
            </h1>
          )}

          {/* Glitch layer 2 — inverse offset */}
          {glitch && (
            <h1
              aria-hidden
              className="absolute top-0 left-0 text-foreground/50 font-bold leading-[0.85] tracking-[-0.04em] pointer-events-none whitespace-nowrap"
              style={{
                ...nameStyle,
                transform: `translate(${glitch.offset2.x}px, ${glitch.offset2.y}px)`,
                clipPath: `inset(${glitch.clipBottom}% 0 ${100 - glitch.clipTop - 20}% 0)`,
              }}
            >
              {displayName}
            </h1>
          )}
        </motion.div>

        {/* Cycling role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 flex items-center gap-4"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <CyclingText
            words={["Code", "AI", "Sound Art", "Physical Computing", "Live Performance", "Generative Art", "Critical Technology"]}
            interval={2500}
            className="text-accent font-mono text-sm uppercase tracking-[0.2em]"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10 max-w-2xl border-l-2 border-accent/30 pl-6"
        >
          <p className="text-muted text-lg md:text-xl leading-relaxed">
            Interdisciplinary artist, creative technologist and performer.
            Exploring the boundaries between code, identity and perception
            through generative visuals, physical computing, live performance
            and interactive installations.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-6 md:right-12 lg:right-24 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] text-muted font-mono uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
          Scroll
        </span>
        <motion.div
          className="w-px h-16 bg-accent/40 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
        />
      </motion.div>
    </section>
  );
}
