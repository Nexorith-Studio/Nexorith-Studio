"use client";

import { CinematicHero } from "@/components/ui/cinematic-hero";
import { CompleteHeroSection } from "@/components/ui/CompleteHeroSection";
import { LuxuryAmbient } from "./LuxuryAmbient";
import { CursorGlow } from "./CursorGlow";
import { Navbar } from "./Navbar";
import { VisionSection } from "./VisionSection";
import { ServicesSection } from "./ServicesSection";
import { TechStackSection } from "./TechStackSection";
import { ProcessSection } from "./ProcessSection";
import { StatusSection } from "./StatusSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

export function ClientHomeCinematic() {
  return (
    <div className="relative min-h-screen bg-[#030306]">
      <LuxuryAmbient />
      <CursorGlow />
      <div className="relative z-10">
        <Navbar />
        <main>
          <CinematicHero
            brandName="Nexorith"
            tagline1="Build the future,"
            tagline2="not just websites."
            cardHeading="AI-driven, hyper-scale."
            cardDescription={
              <>
                <span className="text-white font-semibold">Nexorith Studio</span>{" "}
                crafts AI-driven ecosystems and hyper-scale web applications with
                bold, massive, and intelligent solutions.
              </>
            }
            metricValue={100}
            metricLabel="Projects Delivered"
          />
          
          {/* Complete Hero Section with Left Content + Stats + Marquee */}
          <CompleteHeroSection />

          <VisionSection />
          <ServicesSection />
          <TechStackSection />
          <ProcessSection />
          <StatusSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
