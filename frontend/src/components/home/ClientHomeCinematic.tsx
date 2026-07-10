"use client";

import { CinematicHero } from "@/components/ui/cinematic-hero";
import ZentryHero from "@/components/ui/ZentryHero";
import ZentryAbout from "@/components/ui/ZentryAbout";
import ZentryFeatures from "@/components/ui/ZentryFeatures";
import ZentryStory from "@/components/ui/ZentryStory";
import ZentryContact from "@/components/ui/ZentryContact";
import { LuxuryAmbient } from "./LuxuryAmbient";
import { Navbar } from "./Navbar";
import { VisionSection } from "./VisionSection";
import { ServicesSection } from "./ServicesSection";
import { TechStackSection } from "./TechStackSection";
import { ProcessSection } from "./ProcessSection";
import { StatusSection } from "./StatusSection";
import { Footer } from "./Footer";

export function ClientHomeCinematic() {
  return (
    <div className="relative min-h-screen bg-[#030306]">
      <LuxuryAmbient />
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
          
          {/* Zentry Hero Section */}
          <ZentryHero />
          
          {/* Zentry About Section */}
          <ZentryAbout />
          
          {/* Zentry Features Section */}
          <ZentryFeatures />
          
          {/* Zentry Story Section */}
          <ZentryStory />
          
          {/* Zentry Contact Section */}
          <ZentryContact />

          <VisionSection />
          <ServicesSection />
          <TechStackSection />
          <ProcessSection />
          <StatusSection />
          {/* <ContactSection /> */}
        </main>
        <Footer />
      </div>
    </div>
  );
}
