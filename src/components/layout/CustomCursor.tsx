"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const INTERACTIVE_SELECTOR = "a, button, [role='button']";

export function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const active = finePointer && !prefersReducedMotion;
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("custom-cursor");

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setInteractive(
        !!(e.target as Element | null)?.closest?.(INTERACTIVE_SELECTOR)
      );
    };
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none">
      {/* Center dot — follows instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[85] w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-accent"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
      {/* Trailing ring — expands over interactive elements */}
      <motion.div
        className="fixed top-0 left-0 z-[85] rounded-full border border-accent/70 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: interactive ? 44 : 26,
          height: interactive ? 44 : 26,
          opacity: visible ? (interactive ? 1 : 0.6) : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </div>
  );
}
