"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/projects";

interface ProjectItemProps {
  project: Project;
  index: number;
}

export function ProjectItem({ project, index }: ProjectItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseY = useMotionValue(0.5);
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const imgY = useTransform(smoothY, [0, 1], [-15, 15]);
  const num = String(index + 1).padStart(2, "0");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseY.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        ref={ref}
        href={project.href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group block relative"
      >
        {/* Image — full bleed, tall */}
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(400px, 60vh, 700px)" }}>
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover will-change-transform"
            style={{ y: imgY, scale: 1.05 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />

          {/* Right accent bar on hover */}
          <div className="absolute top-0 right-0 w-[3px] h-full bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 pointer-events-none" />

          {/* Content overlay — bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
            <div className="flex items-start gap-6 md:gap-10">
              {/* Giant index number */}
              <span className="text-accent/20 group-hover:text-accent/50 font-display font-bold transition-colors duration-500 leading-none hidden md:block"
                    style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}>
                {num}
              </span>

              <div className="flex-1 min-w-0">
                {/* Tags row */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-[0.25em]">
                    {project.year}
                  </span>
                  <span className="w-4 h-px bg-accent/40" />
                  <span className="text-[10px] font-mono text-muted uppercase tracking-[0.2em]">
                    {project.tags.join(" / ")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-foreground leading-[0.95] tracking-tight group-hover:text-accent transition-colors duration-300"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}>
                  {project.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-2 text-muted text-sm md:text-base font-light">
                  {project.subtitle}
                </p>

                {/* CTA line — slides in on hover */}
                <div className="mt-5 flex items-center gap-3 overflow-hidden">
                  <motion.div
                    className="h-px bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: 32 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  />
                  <span className="text-[10px] font-mono text-accent uppercase tracking-[0.3em] translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    View Project
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
