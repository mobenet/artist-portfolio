export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  description: string;
  image: string;
  href: string;
}

export const projects: Project[] = [
  {
    slug: "the-synthetic-ghost",
    title: "The Synthetic Ghost",
    subtitle: "Generative Performance — AI & Body",
    year: "2024",
    tags: ["Installation", "AI & Performance", "PyTorch / WebGL"],
    description:
      "Generative performance piece using a custom-trained neural network to analyze real-time dancer movements, translating them into a multi-dimensional latent space. The machine predicts the next frame of motion, creating a recursive loop between biological intent and algorithmic projection.",
    image: "/projects/synthetic-ghost/hero.png",
    href: "/projects/the-synthetic-ghost",
  },
  {
    slug: "quantic-gender",
    title: "Quantic Gender",
    subtitle: "Immersive Installation — AI & Queer Identity",
    year: "2025",
    tags: ["Installation", "Generative AI", "Queer Theory"],
    description:
      "Immersive installation fusing quantum physics, machine learning and queer experience. A generative AI trained on a collective queer archive produces abstract, dreamlike visuals projected into the space — not to classify identity, but to contemplate its multiplicity. The machine doesn't identify, it imagines.",
    image: "",
    href: "#",
  },
];
