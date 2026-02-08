import { FlowField } from "@/components/canvas/FlowField";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <FlowField />
      <IntroSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
