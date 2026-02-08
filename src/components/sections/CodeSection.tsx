"use client";

import { motion } from "framer-motion";
import { codeProjects } from "@/lib/code-projects";

export function CodeSection() {
  return (
    <section id="code" className="relative px-6 md:px-12 lg:px-24 py-32">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-16 flex items-end gap-6"
      >
        <div>
          <p className="text-[10px] font-mono text-accent uppercase tracking-[0.4em] mb-3">
            Lab / Open Source
          </p>
          <h2 className="text-display-lg font-display font-bold text-foreground tracking-tight">
            Code
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

      {/* Project list */}
      <div className="space-y-0">
        {codeProjects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group block border-t border-border py-6 md:py-8 hover:bg-surface/30 transition-colors duration-300 -mx-4 px-4"
          >
            <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-start">
              {/* Title + arrow */}
              <div className="md:col-span-3 flex items-center gap-3">
                <span className="text-accent/40 font-mono text-[10px] tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-bold text-foreground group-hover:text-accent transition-colors duration-300 text-lg">
                  {project.title}
                </h3>
              </div>

              {/* Description */}
              <p className="md:col-span-5 text-sm text-foreground/50 group-hover:text-foreground/70 leading-relaxed transition-colors duration-300">
                {project.description}
              </p>

              {/* Tags */}
              <div className="md:col-span-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-foreground/40 border border-border group-hover:border-accent/30 group-hover:text-accent/70 px-2 py-0.5 uppercase tracking-wider transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* GitHub arrow */}
              <div className="md:col-span-1 hidden md:flex justify-end items-center">
                <span className="text-foreground/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 font-mono text-sm">
                  &rarr;
                </span>
              </div>
            </div>
          </motion.a>
        ))}

        {/* Bottom border */}
        <div className="border-t border-border" />
      </div>

      {/* GitHub profile link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex justify-end"
      >
        <a
          href="https://github.com/mobenet"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-foreground/40 hover:text-accent transition-colors duration-300"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
            All repositories
          </span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            &rarr;
          </span>
        </a>
      </motion.div>
    </section>
  );
}
