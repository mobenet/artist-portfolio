"use client";

import { useState, useEffect } from "react";

export type DeviceCapability = "high" | "medium" | "low";

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>("high");

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // WebGL capability check
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    const hasWebGL = !!gl;

    if (!hasWebGL || (isMobile && cores < 4) || memory < 4) {
      setCapability("low");
    } else if (isMobile || cores < 8 || memory < 8) {
      setCapability("medium");
    } else {
      setCapability("high");
    }
  }, []);

  return capability;
}
