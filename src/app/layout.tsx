import type { Metadata, Viewport } from "next";
import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
  Playfair_Display,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { BootSequence } from "@/components/layout/BootSequence";
import { HandTrackingProvider } from "@/context/HandTrackingContext";
import { HandTrackingToggle } from "@/components/hand-tracking/HandTrackingToggle";
import { CameraPreview } from "@/components/hand-tracking/CameraPreview";
import { VirtualCursor } from "@/components/hand-tracking/VirtualCursor";
import { HandGestureScrollListener } from "@/components/hand-tracking/HandGestureScrollListener";
import { HandTrackingGuide } from "@/components/hand-tracking/HandTrackingGuide";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobenet.vercel.app";

const DESCRIPTION =
  "Interdisciplinary artist and creative technologist. Generative visuals, physical computing, sound art and live performance — systems that listen, respond, and evolve.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mo Magnett__ — Code / AI / Live",
    template: "%s — Mo Magnett__",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Mo Magnett__ — Code / AI / Live",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Mo Magnett__",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mo Magnett__ — Code / AI / Live",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mo Benet",
  alternateName: "Mo Magnett__",
  url: SITE_URL,
  jobTitle: "Creative Technologist & Interdisciplinary Artist",
  knowsAbout: [
    "Generative Art",
    "Artificial Intelligence",
    "Physical Computing",
    "Sound Art",
    "Live Performance",
  ],
  sameAs: [
    "https://github.com/mobenet",
    "https://instagram.com/mobenet",
    "https://linkedin.com/in/mobenet",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} ${bebasNeue.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <HandTrackingProvider>
          <BootSequence />
          <SmoothScroll />
          <ScrollProgress />
          <Navbar />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <GrainOverlay />
          <CustomCursor />
          <HandTrackingToggle />
          <CameraPreview />
          <HandTrackingGuide />
          <VirtualCursor />
          <HandGestureScrollListener />
        </HandTrackingProvider>
      </body>
    </html>
  );
}
