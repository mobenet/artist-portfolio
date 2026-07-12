"use client";

import { useSyncExternalStore } from "react";

export type DeviceCapability = "high" | "medium" | "low";

// Detection is static per session — cache it so the getSnapshot call is cheap
// and stable across renders.
let cached: DeviceCapability | null = null;

function detectCapability(): DeviceCapability {
  if (cached) return cached;

  const cores = navigator.hardwareConcurrency || 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // WebGL capability check
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  const hasWebGL = !!gl;

  if (!hasWebGL || (isMobile && cores < 4) || memory < 4) {
    cached = "low";
  } else if (isMobile || cores < 8 || memory < 8) {
    cached = "medium";
  } else {
    cached = "high";
  }
  return cached;
}

const emptySubscribe = () => () => {};

export function useDeviceCapability(): DeviceCapability {
  // Conservative "medium" during SSR; real value resolves on hydration.
  return useSyncExternalStore(emptySubscribe, detectCapability, () => "medium");
}
