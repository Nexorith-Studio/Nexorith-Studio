"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedFeatureCard } from "@/components/ui/animated-feature-card";
import { TextEffect } from "@/components/ui/text-effect";
import { LightReviewStep } from "./LightReviewStep";
import { cn } from "@/lib/utils";
import {
  Rocket,
  TrendingUp,
  Building2,
  Users,
  Sparkles,
  Globe,
  Smartphone,
  Palette,
  Zap,
  Target,
  TrendingUpIcon,
  Heart,
  Calendar,
  Clock,
  Search,
  ArrowLeft,
} from "lucide-react";

// Step data configuration
const STEPS_DATA = [
  {
    step: 1,
    question: "What best describes your business?",
    options: [
      {
        id: "startup",
        label: "Startup",
        icon: Rocket,
        color: "orange" as const,
        imageSrc: "/startup.png",
      },
      {
        id: "growing",
        label: "Growing Business",
        icon: TrendingUp,
        color: "blue" as const,
        imageSrc: "/growing.png",
      },
      {
        id: "enterprise",
        label: "Enterprise",
        icon: Building2,
        color: "purple" as const,
        imageSrc: "/enterprise.png",
      },
      {
        id: "agency",
        label: "Agency",
        icon: Users,
        color: "white" as const,
        imageSrc: "/agency.png",
      },
    ],
  },
  {
    step: 2,
    question: "What best describes your project?",
    options: [
      {
        id: "ai",
        label: "AI Automation",
        icon: Sparkles,
        color: "purple" as const,
        imageSrc: "/ai.png",
      },
      {
        id: "website",
        label: "Website",
        icon: Globe,
        color: "blue" as const,
        imageSrc: "/website.png",
      },
      {
        id: "application",
        label: "Application",
        icon: Smartphone,
        color: "orange" as const,
        imageSrc: "/application.png",
      },
      {
        id: "brand",
        label: "Brand System",
        icon: Palette,
        color: "white" as const,
        imageSrc: "/brand.png",
      },
    ],
  },
  {
    step: 3,
    question: "What is your primary goal?",
    options: [
      {
        id: "efficiency",
        label: "Increase Efficiency",
        icon: Zap,
        color: "orange" as const,
        imageSrc: "/placeholder-efficiency.png",
      },
      {
        id: "leads",
        label: "Generate Leads",
        icon: Target,
        color: "blue" as const,
        imageSrc: "/placeholder-leads.png",
      },
      {
        id: "scale",
        label: "Scale Operations",
        icon: TrendingUpIcon,
        color: "purple" as const,
        imageSrc: "/placeholder-scale.png",
      },
      {
        id: "experience",
        label: "Improve Experience",
        icon: Heart,
        color: "white" as const,
        imageSrc: "/placeholder-experience.png",
      },
    ],
  },
  {
    step: 4,
    question: "How soon do you want to start?",
    options: [
      {
        id: "immediately",
        label: "Immediately",
        icon: Zap,
        color: "orange" as const,
        imageSrc: "/placeholder-immediate.png",
      },
      {
        id: "1-2weeks",
        label: "1-2 Weeks",
        icon: Calendar,
        color: "blue" as const,
        imageSrc: "/placeholder-weeks.png",
      },
      {
        id: "1-2months",
        label: "1-2 Months",
        icon: Clock,
        color: "purple" as const,
        imageSrc: "/placeholder-months.png",
      },
      {
        id: "exploring",
        label: "Just Exploring",
        icon: Search,
        color: "white" as const,
        imageSrc: "/placeholder-explore.png",
      },
    ],
  },
];

interface Selections {
  [key: number]: {
    id: string;
    label: string;
  };
}

export function ZoomThroughContact() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selections, setSelections] = useState<Selections>({});
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    details: "",
  });

  // Handle card selection with delayed state transition
  const handleCardSelect = (option: any) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnimatingCard(option.id);

    // Save selection
    setSelections({
      ...selections,
      [currentStep]: { id: option.id, label: option.label },
    });

    // DO NOT change currentStep yet - wait for zoom animation to complete
    setTimeout(() => {
      setDirection(1); // Forward
      setCurrentStep(currentStep + 1);
      setAnimatingCard(null);
      setIsAnimating(false);
    }, 1200); // Duration of zoom animation + overlap
  };

  // Handle back button with delayed state transition
  const handleBack = () => {
    if (isAnimating || currentStep === 1) return;

    setIsAnimating(true);
    setDirection(-1); // Backward

    // Get the previously selected card ID
    const previousStep = currentStep - 1;
    const previousSelection = selections[previousStep];
    if (previousSelection) {
      setAnimatingCard(previousSelection.id);
    }

    // Wait for rewind animation, then change step
    setTimeout(() => {
      setCurrentStep(previousStep);

      // Remove the selection
      const newSelections = { ...selections };
      delete newSelections[previousStep];
      setSelections(newSelections);

      setAnimatingCard(null);
      setIsAnimating(false);
    }, 1200);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { selections, formData });
  };

  // Convert selections to format for LightReviewStep
  const userSelections = Object.entries(selections).reduce(
    (acc, [step, data]) => {
      acc[`step${step}`] = data.label;
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <div className="relative min-h-screen bg-[#f4f1ea] overflow-hidden">
      {/* Grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          mixBlendMode: "multiply",
        }}
      />

      {/* Main content - Relative container for absolute positioned steps */}
      <div className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          {currentStep <= 4 ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0 flex items-center justify-center px-6 py-20"
            >
              <div className="w-full max-w-7xl space-y-16">
                {/* Question heading */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <TextEffect
                    per="word"
                    preset="blur"
                    delay={0.1}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-center text-black leading-tight px-4"
                  >
                    {STEPS_DATA[currentStep - 1].question}
                  </TextEffect>
                </motion.div>

                {/* Cards grid - Relative container for absolute animating card */}
                <div className="relative group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                  {STEPS_DATA[currentStep - 1].options.map((option, idx) => {
                    const isAnimating = animatingCard === option.id;
                    const isUnselected = animatingCard && animatingCard !== option.id;

                    return (
                      <motion.div
                        key={`${currentStep}-${option.id}`}
                        onClick={() => !animatingCard && handleCardSelect(option)}
                        className={`
                          cursor-pointer animated-card
                          ${animatingCard ? "pointer-events-none" : ""}
                          ${isAnimating ? "opacity-0" : ""}
                        `}
                        style={{
                          position: isAnimating ? "fixed" : "relative",
                          zIndex: isAnimating ? 50 : 1,
                          top: isAnimating ? "50%" : "auto",
                          left: isAnimating ? "50%" : "auto",
                          transform: isAnimating ? "translate(-50%, -50%)" : "none",
                          transformOrigin: "center center",
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                          opacity: isUnselected ? 0 : 1,
                          scale: isAnimating
                            ? direction === 1
                              ? 20  // Zoom in massively
                              : 0.5 // Zoom out from massive
                            : isUnselected
                            ? 0.85
                            : 1,
                          filter: isAnimating
                            ? "blur(20px)"
                            : isUnselected
                            ? "blur(4px)"
                            : "blur(0px)",
                        }}
                        transition={{
                          duration: isAnimating ? 1.2 : 0.5,
                          ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                        whileHover={!animatingCard ? { y: -8, scale: 1.02 } : {}}
                        whileTap={!animatingCard ? { scale: 0.98 } : {}}
                      >
                        <AnimatedFeatureCard
                          index={`00${idx + 1}`}
                          tag={option.id.toUpperCase()}
                          title={option.label}
                          imageSrc={option.imageSrc}
                          color={option.color}
                          className={cn(
                            "h-[300px] sm:h-[340px]",
                            "!bg-white !border-gray-200/60 !shadow-lg",
                            "[&_.card-index]:!text-gray-400",
                            "[&_.card-tag]:!text-gray-600",
                            "[&_.card-title]:!text-black",
                            "[&_.card-content]:!bg-white/95 [&_.card-content]:!border-gray-200",
                            "hover:!border-gray-400 hover:!shadow-2xl",
                            "md:group-hover:scale-[0.97] md:group-hover:opacity-60 md:group-hover:blur-[2px]",
                            "md:hover:!scale-105 md:hover:!opacity-100 md:hover:!blur-none"
                          )}
                          style={{
                            "--feature-color":
                              option.color === "orange"
                                ? "hsl(35, 91%, 55%)"
                                : option.color === "purple"
                                ? "hsl(262, 85%, 60%)"
                                : option.color === "blue"
                                ? "hsl(211, 100%, 60%)"
                                : "hsl(0, 0%, 20%)",
                            "--feature-color-light":
                              option.color === "orange"
                                ? "hsl(41, 100%, 95%)"
                                : option.color === "purple"
                                ? "hsl(261, 100%, 95%)"
                                : option.color === "blue"
                                ? "hsl(210, 100%, 95%)"
                                : "hsl(0, 0%, 95%)",
                            "--feature-color-dark":
                              option.color === "orange"
                                ? "hsl(35, 91%, 90%)"
                                : option.color === "purple"
                                ? "hsl(262, 85%, 90%)"
                                : option.color === "blue"
                                ? "hsl(211, 100%, 90%)"
                                : "hsl(0, 0%, 90%)",
                          } as React.CSSProperties}
                        />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Back button */}
                {currentStep > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center pt-8"
                  >
                    <button
                      onClick={handleBack}
                      disabled={isAnimating}
                      className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 hover:border-black hover:text-black transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            // Step 5: Review page
            <motion.div
              key="review"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0"
            >
              <LightReviewStep
                userSelections={userSelections}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onBack={handleBack}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 -z-10">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gray-300/40 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gray-400/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  );
}
