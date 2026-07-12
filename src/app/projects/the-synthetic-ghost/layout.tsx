import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Synthetic Ghost",
  description:
    "Generative performance piece using a custom-trained neural network to analyze real-time dancer movements — a recursive loop between biological intent and algorithmic projection.",
  openGraph: {
    title: "The Synthetic Ghost — Mo Magnett__",
    description:
      "Generative performance piece: AI, body and latent space in a recursive live loop.",
    images: ["/projects/synthetic-ghost/hero.png"],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Synthetic Ghost — Mo Magnett__",
    images: ["/projects/synthetic-ghost/hero.png"],
  },
};

export default function SyntheticGhostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
