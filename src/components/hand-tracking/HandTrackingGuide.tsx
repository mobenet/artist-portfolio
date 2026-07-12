"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHandTracking } from "@/context/HandTrackingContext";

const gestures = [
  {
    label: "Move",
    desc: "Point with index finger to control the cursor",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4v18M16 4l-5 5M16 4l5 5" />
        <circle cx="16" cy="26" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Click",
    desc: "Pinch thumb and index finger together",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="14" r="4" />
        <circle cx="20" cy="14" r="4" />
        <path d="M16 14v6" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    label: "Scroll",
    desc: "Swipe wrist up or down to navigate sections",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 6l-4 4h8l-4-4ZM16 26l-4-4h8l-4 4Z" />
        <path d="M16 10v12" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    label: "Scatter",
    desc: "Open palm to push particles away",
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16l-6-6M16 16l6-6M16 16l-6 6M16 16l6 6" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    ),
  },
];

export function HandTrackingGuide() {
  const { enabled, tracking } = useHandTracking();
  const [visible, setVisible] = useState(false);

  // Show guide when tracking starts; stays until dismissed so first-time
  // users have time to read all four gestures. Shown once per session.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (enabled && tracking) {
        if (!sessionStorage.getItem("mo-gestures-seen")) {
          setVisible(true);
        }
      } else {
        setVisible(false);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [enabled, tracking]);

  const dismiss = () => {
    sessionStorage.setItem("mo-gestures-seen", "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-20 right-[11.5rem] z-50 w-56 rounded-lg border border-border/50 bg-surface/80 backdrop-blur-md shadow-lg overflow-hidden"
        >
          <div className="px-3 pt-3 pb-1.5 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Gestures
            </span>
            <button
              onClick={dismiss}
              className="text-muted hover:text-foreground transition-colors text-xs font-mono"
              aria-label="Dismiss guide"
            >
              &times;
            </button>
          </div>

          <ul className="px-3 pb-3 space-y-2.5">
            {gestures.map((g) => (
              <li key={g.label} className="flex items-start gap-2.5">
                <span className="text-accent mt-0.5 shrink-0">{g.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground leading-tight">
                    {g.label}
                  </p>
                  <p className="text-[10px] text-muted leading-snug">
                    {g.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
