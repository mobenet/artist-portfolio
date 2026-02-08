"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FlowField } from "@/components/canvas/FlowField";

export default function SyntheticGhostPage() {
  return (
    <>
      <FlowField />
      <main className="relative z-10 max-w-[1200px] mx-auto px-6 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-8"
        >
          <Link
            href="/"
            className="text-caption text-muted font-mono uppercase tracking-widest hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            &larr; Back
          </Link>
        </motion.div>

        {/* HERO */}
        <section className="mt-8">
          <div className="relative overflow-hidden bg-surface min-h-[70vh] flex flex-col justify-end group border border-border">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.4) 50%, rgba(10, 10, 10, 0) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8ksrcBwnVaUUF4DzTGG3Ij9fSiRjcfyGHnju_tMBnuq4vCiTjW9LeD1rY3HtWIBCb0UKAG3DtmndDkhRxcKU2DKMTaCATyw235eTle0CczUOhWFKadJ-H8GHgeiA90g7kVPhH5J9IWUSNFov-FV9hlQwej4SUravEY0nizEDm1QP8aOL7RYMtwV3SNkjJz-_X7kbEISp_IheRwdJqCDclrxdl8j5UUDTcfzpLt9lyQIv3cK7MYn534pWhKVO2QQr1AVI_5HAdYF8')",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-8 md:p-16 space-y-6"
            >
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-accent text-background text-[10px] font-bold uppercase tracking-[0.2em]">
                  Installation
                </span>
                <span className="px-3 py-1 bg-foreground/5 backdrop-blur-md text-foreground text-[10px] font-bold border border-border uppercase tracking-[0.2em]">
                  AI &amp; Performance
                </span>
              </div>

              <h1 className="text-foreground text-6xl md:text-8xl font-display font-bold leading-none tracking-tighter">
                The Synthetic <br />
                <span className="text-accent">Ghost</span>
              </h1>

              <p className="text-foreground/70 text-lg md:text-xl max-w-2xl leading-relaxed">
                Exploring the liminal space between machine-generated latent
                vectors and the physical limitations of the human body.
              </p>
            </motion.div>
          </div>
        </section>

        {/* METADATA */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Year", value: "2024" },
            { label: "Latency", value: "12ms (Avg)", highlight: true },
            { label: "Stack", value: "PyTorch / WebGL" },
            { label: "Role", value: "Lead Developer & Artist" },
          ].map((item) => (
            <div
              key={item.label}
              className="border-t border-border py-6 flex flex-col gap-1"
            >
              <p className="text-caption text-accent font-mono font-bold uppercase tracking-widest">
                {item.label}
              </p>
              <p
                className={`text-lg font-medium ${
                  item.highlight ? "text-accent" : "text-foreground"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* CONCEPTUAL SUMMARY */}
        <section className="mt-20 grid md:grid-cols-12 gap-12" id="concept">
          <div className="md:col-span-5">
            <h2 className="text-3xl font-display font-bold tracking-tight text-foreground mb-8">
              Conceptual Summary
            </h2>
            <div className="space-y-6 text-foreground/70 leading-relaxed text-lg">
              <p>
                &quot;The Synthetic Ghost&quot; is a generative performance
                piece that uses a custom-trained neural network to analyze
                real-time dancer movements. These movements are then translated
                into a multi-dimensional latent space.
              </p>
              <p>
                The machine doesn&apos;t just mirror the artist; it predicts
                their next frame of motion, creating a &quot;ghost&quot; of the
                future that the performer must then react to, creating a
                recursive loop between biological intent and algorithmic
                projection.
              </p>
            </div>
          </div>

          <div className="md:col-span-7 bg-surface p-12 flex items-center justify-center border border-border relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 50 Q 25 25, 50 50 T 100 50"
                  fill="transparent"
                  stroke="#e63946"
                  strokeWidth="0.5"
                />
                <path
                  d="M0 60 Q 30 30, 60 60 T 100 60"
                  fill="transparent"
                  stroke="#e8e4e0"
                  strokeWidth="0.3"
                />
              </svg>
            </div>
            <div className="text-center z-10">
              <p className="font-mono text-sm tracking-[0.3em] text-muted">
                01001000 01001111 01010011 01010100
              </p>
            </div>
          </div>
        </section>

        {/* TECHNICAL DEEP-DIVE */}
        <section className="mt-32" id="code">
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">
              Technical Deep-Dive
            </h2>
            <p className="text-caption text-accent font-mono mt-2 tracking-widest uppercase">
              core_engine/latent_mapping.py
            </p>
          </div>

          <div className="bg-background overflow-hidden border border-border">
            <div className="flex items-center px-4 py-3 bg-surface border-b border-border">
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
                Inference Engine v2.4.0
              </span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <pre className="text-foreground/80">
                {`import torch
from ghost_engine import LatentMapper, PoseNet

# Initialize the neural bridge between body and latent space
mapper = LatentMapper(dimensions=512, model_path="weights/ghost_v2.pth")
pose_net = PoseNet(resolution=(1080, 1920))

def process_frame(video_input):
    """Predicts the 'ghost' pose based on current trajectory"""
    pose = pose_net.extract(video_input)
    # Calculate velocity vectors for temporal prediction
    vector = mapper.map_to_latent(pose)
    predicted_vector = mapper.predict_next(vector, temporal_window=20)
    return {
        "current": vector,
        "ghost": predicted_vector,
        "delta": torch.norm(vector - predicted_vector)
    }

# Resulting delta drives the shader opacity in WebGL`}
              </pre>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Low Latency",
                desc: "Optimized CUDA kernels allow for 12ms inference, essential for real-time performance feedback.",
              },
              {
                title: "Latent Mapping",
                desc: "512-dimensional vector space mapping ensures subtle nuances of body movement are captured.",
              },
              {
                title: "Temporal CNN",
                desc: "A temporal convolutional network predicts movement frames 200ms into the future.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-8 bg-surface border border-border hover:border-accent/40 transition-colors duration-300"
              >
                <h4 className="font-display font-bold mb-2 text-foreground">
                  {card.title}
                </h4>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* MEDIA / PROCESS & DOCUMENTATION */}
        <section className="mt-32" id="media">
          <h2 className="text-3xl font-display font-bold tracking-tight text-foreground mb-8">
            Process &amp; Documentation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {[
              {
                span: "md:col-span-8",
                h: "h-96",
                alt: "Main performance shot",
                caption: "Stage 01: Initial Calibration Phase",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE3cdDtC9Zb0kaZUUP8GmB5zY6pjYY6VXP28ZSE_mYhtqRLbie44-b7gGP8ZF3BSnSDc7RM5L1O0eC49d9x2FGAMPbfS2JLIhR4PWPN_FABBT_Rri4nG4mSYZHZjT3eRp0rMEcfCqV26pW4dhRciLeQARu_HokXAObSQ6GPCws4qcFV9muOo9E8aK07uZfAc4lYIPnd1_hKAREktUfUPFMFq81UFlDv5V_DaadGm2kxvmL_aKYrwBjX6tLarfAMDTwoss4uMk_gQU",
              },
              {
                span: "md:col-span-4",
                h: "h-96",
                alt: "Hardware interface",
                caption: "The Inference Rig",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxeF3Zwmcxo39miENDuAsBlnMsegl5HSo3vdOYxRo2X0h4gxT-qj4gXuMtTEvV9MUQ392KbrQK8604SqBAcWP5ujxIqcqMGUOihgW-cSDR8wZuWwSQ8zxJPyWn0TXL94BDFyagWnpR5bgozlVWG0EYGpfD7fdnXHj3AObFcyiRh4c1IfSM_4AYlr5jrn6VD95DDqWBGXkfJ6ZHzjBYYDA3Bru5KRPc1GqVR5wPsT8YOWqnFsAXLipUBVVe7cRwUjSpotlJ8Jw1Wwo",
              },
              {
                span: "md:col-span-4",
                h: "h-64",
                alt: "Code visualization",
                caption: "Latent Vector Visualization",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg3BafnFptRO8HBAoYTuVpXVq6Z0jKWqIzjq1sKwFk2TCpUm-3OuVgwqf0Q2u1xLAglXymGnlX4osePIAHQDin8I0AKIPOqSVBgUX-Ey2TdUC5ICfFPkszmruDoN83ezxx6LWnG8SLty6PtW7bZRsa66GzPfDnvbaM4zOqwRVXa4SEabnWFAsXm7MwVtYV1qvAvrAUfIMnVnGt_WFIHw24VHvBbEU32Jp7S-9a-_AvVa09t3HUzd7ihVbHF7VWHZc2J5FnW-vrByc",
              },
              {
                span: "md:col-span-8",
                h: "h-64",
                alt: "Lab environment",
                caption: "Final Exhibition Setup",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl0-G3zozv452UA08dAAlvHfnOgsRjWqauUsKDyHP7jcsdSSmTpLTbUFRFEODhlvut_pMxb6Abq9TsmICNjnLjrc_CLhENj7CAslOxT_xzpUfp0XLEbGBcVdgpG4vuPSUi9RkseXu5tcy41lwn-o3KHGPoipKif6RYgv7qk0zeq0P4DU-ATDInRbEnfl4hl6uuBf5__IC8fWZXB9XWBUe1iDE2ocA2GoIxhNMNxNyK4VuCF5cU4UChf5YtUl4lXKEnhNS24iE4S-c",
              },
            ].map((img) => (
              <div
                key={img.alt}
                className={`${img.span} group relative overflow-hidden ${img.h} bg-surface border border-border`}
              >
                <img
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  src={img.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <p className="text-caption text-accent font-mono uppercase tracking-widest">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="mt-32 pt-20 border-t border-border flex flex-col items-center text-center">
          <p className="text-caption text-accent font-mono uppercase tracking-[0.4em] mb-6">
            View More Work
          </p>
          <h3 className="text-5xl md:text-7xl font-display font-bold mb-12 tracking-tighter text-foreground">
            Explore More
          </h3>
          <Link
            href="/#projects"
            className="px-10 py-5 border border-border text-foreground hover:border-accent hover:text-accent transition-all inline-flex items-center gap-2 font-mono uppercase tracking-widest text-xs"
          >
            &larr; Return to Portfolio
          </Link>
        </section>
      </main>
    </>
  );
}
