"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

export function usePrefersReducedMotion(): boolean {
  // Assume reduced motion on the server; corrected right after hydration
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}
