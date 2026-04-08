"use client";

import { LuxuryAmbient } from "./LuxuryAmbient";
import { CursorGlow } from "./CursorGlow";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { VisionSection } from "./VisionSection";
import { ServicesSection } from "./ServicesSection";
import { TechStackSection } from "./TechStackSection";
import { ProcessSection } from "./ProcessSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

export function ClientHome() {
  return (
    <div className="relative min-h-screen bg-[#030306]">
      <LuxuryAmbient />
      <CursorGlow />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <VisionSection />
          <ServicesSection />
          <TechStackSection />
          <ProcessSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
