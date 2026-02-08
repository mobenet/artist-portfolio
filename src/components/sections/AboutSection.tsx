"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 md:px-12 lg:px-24 py-32">
      {/* Header + Bio — two-column layout */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="grid md:grid-cols-12 gap-8 md:gap-16"
      >
        {/* Left column — label + name + tagline */}
        <div className="md:col-span-4">
          <p className="text-caption uppercase tracking-[0.3em] text-accent mb-4 font-mono">
            About
          </p>
          <h2 className="text-display-lg font-display font-bold text-foreground">
            Mo Benet
          </h2>
          <div className="w-12 h-[2px] bg-accent mt-4 mb-4" />
          <p className="text-body text-foreground/50 font-mono text-sm leading-relaxed">
            Artist, technologist, performer.
            <br />
            Building at the edge of code and body.
          </p>
        </div>

        {/* Right column — bio text with highlighted phrases */}
        <div className="md:col-span-8 space-y-6 text-body-lg text-foreground/60 leading-relaxed">
          <p>
            Interdisciplinary artist, creative technologist and performer with a
            background in <span className="text-foreground">computer engineering</span> and
            a master&apos;s in <span className="text-foreground">artificial intelligence</span>.
            Focused on critical technology, sound art and embodied experimentation.
          </p>
          <p>
            My practice spans <span className="text-foreground">generative visuals, physical
            computing, live performance and interactive installations</span>, exploring
            the boundaries between code, identity and perception. Through a
            transhackfeminist and queer lens, I seek to open speculative spaces
            where technological structures can be reimagined as{" "}
            <span className="text-accent">poetic, political and affective</span>.
          </p>
          <p>
            Co-founder of <span className="text-foreground">Pechblenda</span>, a
            bio-electro-chemical transhackfeminist tech-lab. Former creative
            technologist at the <span className="text-foreground">Cyborg Foundation
            Labs</span> collaborating with Neil Harbisson. Presented work at
            Transmediale, S&oacute;nar+D, Chaos Communication Camp, and HackteriaLab.
          </p>
        </div>
      </motion.div>

      {/* Metadata grid — full width, with left accent borders */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-16 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {[
          {
            label: "Focus",
            value: "Sound Art\nPhysical Computing\nCritical Technology",
          },
          {
            label: "Stack",
            value: "Python, Max/MSP\nTouchDesigner, PyTorch\nArduino",
          },
          {
            label: "Education",
            value: "MSc Artificial Intelligence\nBSc Computer Science",
          },
          {
            label: "Based",
            value: "Barcelona",
          },
        ].map((item) => (
          <div key={item.label} className="border-l-2 border-accent/30 pl-4">
            <p className="text-[10px] text-accent font-mono uppercase tracking-[0.3em] mb-3">
              {item.label}
            </p>
            <p className="text-body text-foreground whitespace-pre-line leading-relaxed">
              {item.value}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
