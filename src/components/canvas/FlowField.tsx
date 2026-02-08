"use client";

import { useEffect, useRef, useCallback } from "react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { curl2 } from "@/lib/noise";

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  speed: number;
  life: number;
  maxLife: number;
  isRed: boolean;
  alpha: number;
}

function createParticle(w: number, h: number, forceRed = false): Particle {
  const x = Math.random() * w;
  const y = Math.random() * h;
  const maxLife = 200 + Math.random() * 400;
  return {
    x,
    y,
    prevX: x,
    prevY: y,
    speed: 0.15 + Math.random() * 0.35,
    life: Math.random() * maxLife,
    maxLife,
    isRed: forceRed || Math.random() < 0.12,
    alpha: 0,
  };
}

export function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef({ progress: 0, velocity: 0 });

  const capability = useDeviceCapability();
  const prefersReducedMotion = usePrefersReducedMotion();

  const getParticleCount = useCallback(() => {
    if (prefersReducedMotion) return 0;
    switch (capability) {
      case "high": return 2500;
      case "medium": return 1200;
      case "low": return 500;
    }
  }, [capability, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId = 0;
    let time = 0;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let lastScrollY = 0;
    let smoothVelocity = 0;

    const init = () => {
      const count = getParticleCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(w, h));
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, w, h);
      }
      init();
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const rawVelocity = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      scrollRef.current = { progress, velocity: rawVelocity };
    };

    const animate = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const mouse = mouseRef.current;
      const { progress, velocity } = scrollRef.current;

      // Smooth the scroll velocity for organic transitions
      smoothVelocity += (velocity - smoothVelocity) * 0.08;
      const scrollEnergy = Math.min(smoothVelocity / 40, 1); // 0-1 normalized

      // --- Scroll-reactive parameters ---
      // Trail fade: faster fade when scrolling (shorter trails = more energy)
      const trailFade = 0.04 + scrollEnergy * 0.06;

      // Noise scale shifts with scroll position (different flow patterns per section)
      const noiseScale = 0.002 + progress * 0.001;

      // Time evolves faster when scrolling
      const timeSpeed = 0.0003 + scrollEnergy * 0.002;

      // Speed multiplier: particles accelerate when scrolling
      const speedMult = 1 + scrollEnergy * 1.2;

      // Red intensity increases toward bottom of page
      const redBoost = progress * 0.4;

      // Trail effect
      ctx.fillStyle = `rgba(10, 10, 10, ${trailFade})`;
      ctx.fillRect(0, 0, w, h);

      time += timeSpeed;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.life++;

        // Fade in/out based on lifecycle
        const lifeFraction = p.life / p.maxLife;
        if (lifeFraction < 0.1) {
          p.alpha = lifeFraction / 0.1;
        } else if (lifeFraction > 0.9) {
          p.alpha = (1 - lifeFraction) / 0.1;
        } else {
          p.alpha = 1;
        }

        // Reset dead particles
        if (p.life >= p.maxLife) {
          particles[i] = createParticle(w, h);
          continue;
        }

        p.prevX = p.x;
        p.prevY = p.y;

        // Get curl noise flow vector
        const [fx, fy] = curl2(p.x * noiseScale, p.y * noiseScale, time);

        let vx = fx * p.speed * speedMult;
        let vy = fy * p.speed * speedMult;

        // Scroll pushes particles downward
        if (scrollEnergy > 0.05) {
          vy += scrollEnergy * 1.5;
        }

        // Mouse attraction — large radius, strong pull
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 350 && dist > 0) {
          const force = (350 - dist) / 350;
          const attract = force * force * 2;
          vx += (dx / dist) * attract;
          vy += (dy / dist) * attract;
        }

        p.x += vx;
        p.y += vy;

        // Wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Avoid drawing a line across the screen on wrap
        const wrapDx = Math.abs(p.x - p.prevX);
        const wrapDy = Math.abs(p.y - p.prevY);
        if (wrapDx > w * 0.5 || wrapDy > h * 0.5) continue;

        // Draw trail line — red particles get boost from scroll position
        const alphaBoost = p.isRed ? redBoost : scrollEnergy * 0.15;
        const baseAlpha = p.alpha * (p.isRed ? 0.7 + alphaBoost : 0.3 + alphaBoost);

        if (p.isRed) {
          ctx.strokeStyle = `rgba(230, 57, 70, ${baseAlpha})`;
          ctx.lineWidth = 1.5 + scrollEnergy * 0.8;
        } else {
          const gray = 180 + Math.floor(Math.random() * 50);
          ctx.strokeStyle = `rgba(${gray}, ${gray}, ${gray}, ${baseAlpha})`;
          ctx.lineWidth = 0.8 + scrollEnergy * 0.4;
        }

        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [getParticleCount, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
