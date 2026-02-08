import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
  Playfair_Display,
  Bebas_Neue,
  Sora,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
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

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mo Magneπ__ — Code / AI / Live",
  description:
    "Creative technologist building systems that listen, respond, and evolve.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} ${bebasNeue.variable} ${sora.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <HandTrackingProvider>
          <ScrollProgress />
          <Navbar />
          <main className="relative z-10">{children}</main>
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
