"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectItem } from "@/components/ProjectItem";

export function ProjectsSection() {
  return (
    <section id="work" className="relative py-32">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="px-6 md:px-12 lg:px-24 mb-20 flex items-end gap-6"
      >
        <div>
          <p className="text-[10px] font-mono text-accent uppercase tracking-[0.4em] mb-3">
            Selected Work
          </p>
          <h2 className="text-display-lg font-display font-bold text-foreground tracking-tight">
            Work
          </h2>
        </div>
        <motion.div
          className="hidden md:block h-px bg-border flex-1 mb-3"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
      </motion.div>

      {/* Project list — full bleed */}
      <div className="space-y-2">
        {projects.map((project, i) => (
          <ProjectItem key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
