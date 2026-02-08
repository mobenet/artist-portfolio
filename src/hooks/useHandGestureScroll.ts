"use client";

import { useEffect, useRef } from "react";
import { useHandTracking } from "@/context/HandTrackingContext";

const SECTION_IDS = ["intro", "work", "code", "about", "contact"];
const SWIPE_THRESHOLD = 0.012; // normalized wrist velocity
const COOLDOWN_MS = 1000;

export function useHandGestureScroll() {
  const { enabled, handState } = useHandTracking();
  const lastScrollTime = useRef(0);

  useEffect(() => {
    if (!enabled || !handState?.detected) return;

    const { wristVelocityY } = handState;
    const now = Date.now();

    if (
      Math.abs(wristVelocityY) < SWIPE_THRESHOLD ||
      now - lastScrollTime.current < COOLDOWN_MS
    ) {
      return;
    }

    // Find current section
    const scrollY = window.scrollY + window.innerHeight / 2;
    let currentIndex = 0;
    for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTION_IDS[i]);
      if (el && scrollY >= el.offsetTop) {
        currentIndex = i;
        break;
      }
    }

    // Swipe down (positive velocity) → next section, up → previous
    const nextIndex =
      wristVelocityY > 0
        ? Math.min(currentIndex + 1, SECTION_IDS.length - 1)
        : Math.max(currentIndex - 1, 0);

    if (nextIndex !== currentIndex) {
      const target = document.getElementById(SECTION_IDS[nextIndex]);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        lastScrollTime.current = now;
      }
    }
  }, [enabled, handState]);
}
