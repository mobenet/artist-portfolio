"use client";

import { motion } from "framer-motion";
import { useHandTracking } from "@/context/HandTrackingContext";

export function VirtualCursor() {
  const { enabled, tracking, handState } = useHandTracking();

  if (!enabled || !tracking || !handState?.detected) return null;

  const { screenX, screenY, isPinching, isOpenPalm } = handState;

  // Ring size changes with gesture
  const ringSize = isPinching ? 20 : isOpenPalm ? 48 : 32;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] pointer-events-none"
      animate={{
        x: screenX - ringSize / 2,
        y: screenY - ringSize / 2,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
    >
      {/* Outer ring */}
      <motion.div
        className="rounded-full border-2 border-accent flex items-center justify-center"
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isPinching ? 1 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {/* Center dot */}
        <motion.div
          className="rounded-full bg-accent"
          animate={{
            width: isPinching ? 6 : 4,
            height: isPinching ? 6 : 4,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
