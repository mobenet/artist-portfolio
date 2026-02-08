"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHandTracking } from "@/context/HandTrackingContext";

const PREVIEW_W = 160;
const PREVIEW_H = 120;

export function CameraPreview() {
  const { enabled, tracking, handState, videoElement } = useHandTracking();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled || !tracking || !videoElement) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!videoElement || videoElement.readyState < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw mirrored, desaturated video
      ctx.save();
      ctx.translate(PREVIEW_W, 0);
      ctx.scale(-1, 1);
      ctx.filter = "saturate(0.15)";
      ctx.drawImage(videoElement, 0, 0, PREVIEW_W, PREVIEW_H);
      ctx.restore();

      // Draw landmarks
      const lm = handState?.landmarks;
      if (lm) {
        ctx.fillStyle = "#e63946";
        for (const point of lm) {
          const x = (1 - point.x) * PREVIEW_W; // mirror
          const y = point.y * PREVIEW_H;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(rafRef.current);
  }, [enabled, tracking, videoElement, handState]);

  return (
    <AnimatePresence>
      {enabled && tracking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 right-6 z-50 rounded-lg overflow-hidden border border-border/50 shadow-lg"
        >
          <canvas
            ref={canvasRef}
            width={PREVIEW_W}
            height={PREVIEW_H}
            className="block"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
