"use client";

import { useHandTracking } from "@/context/HandTrackingContext";
import { motion } from "framer-motion";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HandTrackingToggle() {
  const { enabled, loading, toggle } = useHandTracking();
  const capability = useDeviceCapability();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Hide on low-capability devices or reduced motion
  if (capability === "low" || prefersReducedMotion) return null;

  return (
    <motion.button
      onClick={toggle}
      disabled={loading}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4 }}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-300 ${
        enabled
          ? "bg-accent/20 border-accent text-accent"
          : "bg-surface/60 border-border text-muted hover:text-foreground hover:border-foreground/30"
      } backdrop-blur-sm`}
      aria-label={enabled ? "Disable hand tracking" : "Enable hand tracking"}
      title={enabled ? "Disable hand tracking" : "Enable hand tracking"}
    >
      {loading ? (
        <svg
          className="w-5 h-5 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" opacity={0.25} />
          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Hand icon */}
          <path d="M18 11V6a1 1 0 0 0-2 0" />
          <path d="M16 8V4a1 1 0 0 0-2 0v4" />
          <path d="M14 8V5a1 1 0 0 0-2 0v5" />
          <path d="M12 12V8a1 1 0 0 0-2 0v8.5c0 .28-.22.5-.5.5a.5.5 0 0 1-.35-.15l-1.79-1.79a1.41 1.41 0 0 0-2 2L9 21h9a2 2 0 0 0 2-2v-5.5a1.5 1.5 0 0 0-3 0V11" />
        </svg>
      )}

      {/* Active indicator dot */}
      {enabled && !loading && (
        <motion.span
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </motion.button>
  );
}
