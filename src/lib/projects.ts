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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8ksrcBwnVaUUF4DzTGG3Ij9fSiRjcfyGHnju_tMBnuq4vCiTjW9LeD1rY3HtWIBCb0UKAG3DtmndDkhRxcKU2DKMTaCATyw235eTle0CczUOhWFKadJ-H8GHgeiA90g7kVPhH5J9IWUSNFov-FV9hlQwej4SUravEY0nizEDm1QP8aOL7RYMtwV3SNkjJz-_X7kbEISp_IheRwdJqCDclrxdl8j5UUDTcfzpLt9lyQIv3cK7MYn534pWhKVO2QQr1AVI_5HAdYF8",
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
