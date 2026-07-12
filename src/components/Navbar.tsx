"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";

const sections = [
  { id: "intro", label: "Top" },
  { id: "work", label: "Work" },
  { id: "code", label: "Code" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("intro");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      aria-label="Section navigation"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={`fixed top-6 right-3 md:right-6 z-40 flex gap-0.5 md:gap-1 px-2 md:px-3 py-2 rounded-full transition-colors duration-300 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-md border border-border"
          : "bg-transparent"
      }`}
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToId(id)}
          aria-current={active === id ? "true" : undefined}
          className={`px-2 md:px-3 py-1.5 text-caption font-mono uppercase tracking-widest transition-colors duration-200 rounded-full ${
            active === id
              ? "text-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </motion.nav>
  );
}
