import { FlowField } from "@/components/canvas/FlowField";
import { IntroSection } from "@/components/sections/IntroSection";
import { PoeticInterstitial } from "@/components/sections/PoeticInterstitial";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CodeSection } from "@/components/sections/CodeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <FlowField />
      <IntroSection />
      <PoeticInterstitial />
      <ProjectsSection />
      <CodeSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
