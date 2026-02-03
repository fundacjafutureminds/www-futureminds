import { HeroSection } from "@/components/sections/HeroSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { ScholarshipsSection } from "@/components/sections/ScholarshipsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { NewsSection } from "@/components/sections/NewsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProgramsSection />
      <ScholarshipsSection />
      <ProjectsSection />
      <TrainingSection />
      <PublicationsSection />
      <NewsSection />
    </>
  );
}
