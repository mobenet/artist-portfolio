"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "> init flow_field .............. ok",
  "> load gesture_engine .......... ok",
  "> calibrate identity ........... unresolved",
  "> boot portfolio",
];

const LINE_INTERVAL = 260;
const HOLD_AFTER_LAST = 500;
const STORAGE_KEY = "mo-booted";

export function BootSequence() {
  const [phase, setPhase] = useState<"pending" | "running" | "done">("pending");
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const timers: number[] = [];

    // Deferred so the decision doesn't set state synchronously in the effect
    timers.push(
      window.setTimeout(() => {
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduced || sessionStorage.getItem(STORAGE_KEY)) {
          setPhase("done");
          return;
        }
        sessionStorage.setItem(STORAGE_KEY, "1");
        setPhase("running");

        BOOT_LINES.forEach((_, i) => {
          timers.push(
            window.setTimeout(() => setLineCount(i + 1), (i + 1) * LINE_INTERVAL)
          );
        });
        timers.push(
          window.setTimeout(
            () => setPhase("done"),
            BOOT_LINES.length * LINE_INTERVAL + HOLD_AFTER_LAST
          )
        );
      }, 0)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[90] bg-background flex items-center justify-center"
          aria-hidden
        >
          <div className="font-mono text-xs md:text-sm text-muted space-y-2 px-6">
            {BOOT_LINES.slice(0, lineCount).map((line, i) => (
              <p key={line}>
                {i === BOOT_LINES.length - 1 ? (
                  <span className="text-accent">{line}</span>
                ) : (
                  line
                )}
              </p>
            ))}
            {phase === "running" && lineCount < BOOT_LINES.length && (
              <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
