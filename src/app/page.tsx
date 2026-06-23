"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { MissionBriefSection } from "@/components/sections/MissionBriefSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollAnimations } from "@/components/ui/ScrollAnimations";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 relative overflow-hidden flex flex-col">
      <ScrollProgress />
      <ScrollAnimations />
      <Navbar />

      <HeroSection />
      <div className="section-divider" />
      <MissionBriefSection />
      <div className="section-divider" />
      <ExperienceSection />
      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <SkillsSection />
      <div className="section-divider" />
      <ContactSection />

      <Footer />
      <CommandPalette />
    </main>
  );
}
