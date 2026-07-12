"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";

// Assembled at runtime so the address never appears as plain text in the
// HTML or as a single string in the JS bundle — cheap scrapers miss it.
const EMAIL_PARTS = ["mbenet", "proton", "me"];
const buildEmail = () => `${EMAIL_PARTS[0]}@${EMAIL_PARTS[1]}.${EMAIL_PARTS[2]}`;

const socials = [
  { label: "GitHub", href: "https://github.com/mobenet" },
  { label: "Instagram", href: "https://instagram.com/mobenet" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mobenet" },
];

export function ContactSection() {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  // Deferred client-only reveal: keeps the address out of the SSR HTML
  useEffect(() => {
    const timer = window.setTimeout(() => setEmail(buildEmail()), 0);
    return () => clearTimeout(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(buildEmail()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="relative px-6 md:px-12 lg:px-24 py-32">
      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-caption uppercase tracking-[0.3em] text-accent mb-6 font-mono"
      >
        Contact
      </motion.p>

      {/* Heading — more personal */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-display-lg font-display font-bold text-foreground mb-4 max-w-3xl"
      >
        Open to collaborations,
        <br />
        residencies &amp; <span className="text-accent">weird ideas</span>.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-foreground/50 text-lg mb-16 max-w-xl"
      >
        If it involves code, sound, bodies, or machines — I&apos;m probably interested.
      </motion.p>

      {/* Email — dominant element */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={email ? `mailto:${email}` : undefined}
            className="group inline-flex items-center gap-4"
            aria-label="Send me an email"
          >
            <span className="w-8 h-[2px] bg-accent group-hover:w-16 transition-all duration-300" />
            <span
              className="font-display font-bold text-foreground group-hover:text-accent transition-colors duration-300 tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              {email || "decrypting…"}
            </span>
          </a>
          {email && (
            <button
              onClick={copyEmail}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted hover:text-accent border border-border hover:border-accent px-4 py-2 transition-colors duration-300"
              aria-label="Copy email address"
            >
              {copied ? "copied ✓" : "copy"}
            </button>
          )}
        </div>
      </motion.div>

      {/* Social links — more prominent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 flex gap-6"
      >
        {socials.map((link) => (
          <MagneticButton key={link.label} strength={0.25}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 py-3 border border-border hover:border-accent transition-colors duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-300" />
              <span className="text-sm text-foreground/70 font-mono uppercase tracking-widest group-hover:text-accent transition-colors duration-300">
                {link.label}
              </span>
            </a>
          </MagneticButton>
        ))}
      </motion.div>

      {/* Footer — integrated */}
      <div className="mt-32 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <p className="text-[11px] text-foreground/30 font-mono tracking-wider">
          &copy; {new Date().getFullYear()} Mo Benet
        </p>
        <p className="text-[11px] text-foreground/30 font-mono italic tracking-wider">
          This site is a living canvas.
        </p>
      </div>
    </section>
  );
}
