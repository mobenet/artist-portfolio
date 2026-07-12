"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useHandTracking, handStateRef } from "@/context/HandTrackingContext";

type Gesture = "idle" | "pinch" | "palm";

const RING_SIZE: Record<Gesture, number> = {
  pinch: 20,
  palm: 48,
  idle: 32,
};

export function VirtualCursor() {
  const { enabled, tracking } = useHandTracking();
  const [gesture, setGesture] = useState<Gesture>("idle");
  const [detected, setDetected] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Read per-frame hand state from the shared ref in our own rAF loop —
  // avoids re-rendering the React tree at camera framerate.
  useEffect(() => {
    if (!enabled || !tracking) return;

    let rafId = 0;
    const update = () => {
      const hs = handStateRef.current;
      if (hs?.detected) {
        x.set(hs.screenX);
        y.set(hs.screenY);
        setDetected(true);
        setGesture(hs.isPinching ? "pinch" : hs.isOpenPalm ? "palm" : "idle");
      } else {
        setDetected(false);
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [enabled, tracking, x, y]);

  if (!enabled || !tracking || !detected) return null;

  const ringSize = RING_SIZE[gesture];

  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] pointer-events-none"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      {/* Outer ring */}
      <motion.div
        className="rounded-full border-2 border-accent flex items-center justify-center"
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: gesture === "pinch" ? 1 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {/* Center dot */}
        <motion.div
          className="rounded-full bg-accent"
          animate={{
            width: gesture === "pinch" ? 6 : 4,
            height: gesture === "pinch" ? 6 : 4,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
