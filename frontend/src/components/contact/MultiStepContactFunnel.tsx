"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedFeatureCard } from "@/components/ui/animated-feature-card";
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
  ArrowLeft,
  Calendar,
  Clock,
  Search,
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
        imageSrc: "/startup.png",
        color: "orange" as const,
      },
      { 
        id: "growing", 
        label: "Growing Business", 
        icon: TrendingUp,
        imageSrc: "/growing.png",
        color: "blue" as const,
      },
      { 
        id: "enterprise", 
        label: "Enterprise", 
        icon: Building2,
        imageSrc: "/enterprise.png",
        color: "purple" as const,
      },
      { 
        id: "agency", 
        label: "Agency", 
        icon: Users,
        imageSrc: "/agency.png",
        color: "white" as const,
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
        imageSrc: "/ai.png",
        color: "purple" as const,
      },
      { 
        id: "website", 
        label: "Website", 
        icon: Globe,
        imageSrc: "/website.png",
        color: "blue" as const,
      },
      { 
        id: "application", 
        label: "Application", 
        icon: Smartphone,
        imageSrc: "/application.png",
        color: "orange" as const,
      },
      { 
        id: "brand", 
        label: "Brand System", 
        icon: Palette,
        imageSrc: "/brand.png",
        color: "white" as const,
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
        imageSrc: "/placeholder-efficiency.png",
        color: "orange" as const,
      },
      { 
        id: "leads", 
        label: "Generate Leads", 
        icon: Target,
        imageSrc: "/placeholder-leads.png",
        color: "blue" as const,
      },
      { 
        id: "scale", 
        label: "Scale Operations", 
        icon: TrendingUpIcon,
        imageSrc: "/placeholder-scale.png",
        color: "purple" as const,
      },
      { 
        id: "experience", 
        label: "Improve Experience", 
        icon: Heart,
        imageSrc: "/placeholder-experience.png",
        color: "white" as const,
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
        imageSrc: "/placeholder-immediate.png",
        color: "orange" as const,
      },
      { 
        id: "1-2weeks", 
        label: "1-2 Weeks", 
        icon: Calendar,
        imageSrc: "/placeholder-weeks.png",
        color: "blue" as const,
      },
      { 
        id: "1-2months", 
        label: "1-2 Months", 
        icon: Clock,
        imageSrc: "/placeholder-months.png",
        color: "purple" as const,
      },
      { 
        id: "exploring", 
        label: "Just Exploring", 
        icon: Search,
        imageSrc: "/placeholder-explore.png",
        color: "white" as const,
      },
    ],
  },
];

interface UserSelections {
  [key: string]: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  details: string;
}

export function MultiStepContactFunnel() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userSelections, setUserSelections] = useState<UserSelections>({});
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    details: "",
  });
  const [isClient, setIsClient] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [collectedCards, setCollectedCards] = useState<Array<{step: number; label: string}>>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Zigzag flight animation
  const animatePlaneJourney = () => {
    const plane = planeRef.current;
    const overlay = overlayRef.current;
    
    if (!plane || !overlay) {
      console.log('Missing plane or overlay, going to review');
      setCurrentStep(5);
      return;
    }
    
    console.log('Starting plane journey');
    
    // Show overlay
    gsap.set(overlay, { display: 'block', opacity: 0, backgroundColor: 'rgba(244, 241, 234, 0)' });
    gsap.to(overlay, { opacity: 1, backgroundColor: 'rgba(244, 241, 234, 0.95)', duration: 0.5 });
    
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    
    // Start position - top right
    gsap.set(plane, {
      x: screenWidth - 100,
      y: 50,
      rotation: -20,
      scale: 1,
      opacity: 1,
    });
    
    // Zigzag waypoints
    const waypoints = [
      { x: screenWidth * 0.75, y: screenHeight * 0.2, rotation: -15 },
      { x: screenWidth * 0.25, y: screenHeight * 0.4, rotation: 15 },
      { x: screenWidth * 0.65, y: screenHeight * 0.6, rotation: -10 },
      { x: screenWidth * 0.35, y: screenHeight * 0.8, rotation: 20 },
      { x: screenWidth * 0.5, y: screenHeight * 1.2, rotation: 0, scale: 2 },
    ];
    
    const tl = gsap.timeline({
      onComplete: () => {
        console.log('Journey complete');
        // Unfold on review page
        setTimeout(() => {
          setCurrentStep(5);
          unfoldReviewPage();
        }, 100);
      }
    });
    
    waypoints.forEach((point, idx) => {
      tl.to(plane, {
        x: point.x,
        y: point.y,
        rotation: point.rotation,
        scale: point.scale || 1,
        duration: 1.0,
        ease: idx === waypoints.length - 1 ? "power2.in" : "power1.inOut",
      });
    });
  };
  
  // Unfold animation
  const unfoldReviewPage = () => {
    const overlay = overlayRef.current;
    const plane = planeRef.current;
    
    if (!overlay) return;
    
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      onComplete: () => {
        gsap.set(overlay, { display: 'none' });
        if (plane) gsap.set(plane, { opacity: 0 });
      }
    });
  };

  // Card fold animation
  const animateCardFold = (cardEl: HTMLElement, optionData: any) => {
    if (animating) return;
    
    console.log('Folding card:', optionData.label);
    setAnimating(true);
    
    const plane = planeRef.current;
    const allCards = cardsRef.current?.querySelectorAll('.animated-card') || [];
    const otherCards = Array.from(allCards).filter(c => c !== cardEl);
    
    if (!plane) {
      // Fallback - just go to next step
      console.log('No plane, using fallback');
      setTimeout(() => {
        if (currentStep === 4) {
          setCurrentStep(5);
        } else {
          setCurrentStep(prev => prev + 1);
        }
        setAnimating(false);
      }, 600);
      return;
    }
    
    const cardRect = cardEl.getBoundingClientRect();
    const planeX = window.innerWidth - 100;
    const planeY = 50;
    
    // Show plane
    gsap.set(plane, {
      x: planeX,
      y: planeY,
      rotation: -20,
      scale: 0.8,
      opacity: 1,
    });
    
    const tl = gsap.timeline({
      onComplete: () => {
        setCollectedCards(prev => [...prev, { step: currentStep, label: optionData.label }]);
        
        if (currentStep === 4) {
          // Start journey after final card
          setTimeout(() => animatePlaneJourney(), 300);
        } else {
          setCurrentStep(prev => prev + 1);
        }
        
        setAnimating(false);
      }
    });
    
    // Fade other cards
    if (otherCards.length) {
      tl.to(otherCards, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        stagger: 0.03,
      }, 0);
    }
    
    // Fold and fly selected card
    tl.to(cardEl, {
      x: planeX - (cardRect.left + cardRect.width / 2),
      y: planeY - (cardRect.top + cardRect.height / 2),
      scale: 0.1,
      rotation: 720,
      rotateY: 180,
      duration: 1.2,
      ease: "power2.inOut",
    }, 0.2)
    .to(cardEl, {
      opacity: 0,
      duration: 0.2,
    }, "-=0.2")
    
    // Plane wobble
    .to(plane, {
      scale: 0.95,
      rotation: -30,
      duration: 0.15,
    }, "-=0.2")
    .to(plane, {
      scale: 0.8,
      rotation: -20,
      duration: 0.15,
    });
  };

  // Card entrance animation
  useEffect(() => {
    if (currentStep === 5 || typeof window === "undefined") return;
    
    const ctx = gsap.context(() => {
      const container = cardsRef.current;
      if (!container) return;

      const cards = Array.from(container.querySelectorAll(".animated-card"));
      if (!cards.length) return;

      gsap.fromTo(cards, 
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.08,
        }
      );

      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [currentStep]);

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Save/load state
  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;
    
    try {
      const savedStep = sessionStorage.getItem('nexorith_contact_step');
      const savedSelections = sessionStorage.getItem('nexorith_contact_selections');
      const savedFormData = sessionStorage.getItem('nexorith_contact_formdata');
      
      if (savedStep) setCurrentStep(parseInt(savedStep, 10));
      if (savedSelections) setUserSelections(JSON.parse(savedSelections));
      if (savedFormData) setFormData(JSON.parse(savedFormData));
    } catch (error) {
      console.error('Error loading state:', error);
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    try {
      sessionStorage.setItem('nexorith_contact_step', currentStep.toString());
      sessionStorage.setItem('nexorith_contact_selections', JSON.stringify(userSelections));
      sessionStorage.setItem('nexorith_contact_formdata', JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }, [currentStep, userSelections, formData, isClient]);

  const handleCardClick = (optionId: string, optionLabel: string, optionData: any, e: React.MouseEvent) => {
    if (animating) return;
    
    const cardEl = e.currentTarget as HTMLElement;
    
    setUserSelections((prev) => ({
      ...prev,
      [`step${currentStep}`]: optionLabel,
    }));

    animateCardFold(cardEl, optionData);
  };

  const goBack = () => {
    if (animating || currentStep === 1) return;
    
    if (currentStep === 5) {
      setCurrentStep(4);
      setCollectedCards([]);
    } else {
      setCurrentStep(prev => prev - 1);
      setCollectedCards(prev => prev.slice(0, -1));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selections: userSelections, formData });
    alert("Form submitted!");
  };

  const slideVariants = {
    enter: { x: 1000, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -1000, opacity: 0 },
  };

  return (
    <>
      {currentStep === 5 ? (
        <LightReviewStep
          userSelections={userSelections}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onBack={goBack}
        />
      ) : (
        <div ref={containerRef} className="relative min-h-screen bg-[#f4f1ea] py-16 px-4">
          {/* Grain Overlay */}
          <div 
            className="fixed inset-0 pointer-events-none z-[1] opacity-[0.12] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px'
            }}
          />

          {/* Paper Plane */}
          <div
            ref={planeRef}
            className="fixed pointer-events-none z-[100] opacity-0"
            style={{ transformOrigin: "50% 50%" }}
          >
            <svg width="80" height="80" viewBox="0 0 68 68" fill="none">
              <path
                d="M2 34L66 2L50 34L66 66L2 34Z"
                fill="#1f2937"
                stroke="#374151"
                strokeWidth="2"
                strokeLinejoin="round"
                fillOpacity="0.95"
              />
              <path
                d="M2 34L50 34"
                stroke="#374151"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Cargo counter */}
            {collectedCards.length > 0 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-black shadow-lg">
                {collectedCards.length}
              </div>
            )}
          </div>

          {/* Overlay for journey */}
          <div
            ref={overlayRef}
            className="fixed inset-0 z-[99] pointer-events-none hidden"
          />

          {/* Ambient effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gray-300/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gray-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {currentStep <= 4 && (
                <motion.div
                  key={currentStep}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 150, damping: 20 },
                    opacity: { duration: 0.3 },
                  }}
                >
                  <div ref={headingRef} className="mb-16">
                    <TextEffect
                      per="word"
                      preset="blur"
                      delay={0.1}
                      className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-black text-center leading-tight px-4"
                    >
                      {STEPS_DATA[currentStep - 1].question}
                    </TextEffect>
                  </div>

                  <div 
                    ref={cardsRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
                  >
                    {STEPS_DATA[currentStep - 1].options.map((option, idx) => (
                      <motion.div
                        key={option.id}
                        onClick={(e) => handleCardClick(option.id, option.label, option, e)}
                        className="cursor-pointer animated-card"
                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.98 }}
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
                            "hover:!border-gray-400 hover:!shadow-2xl"
                          )}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back Button */}
            {currentStep > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 flex justify-center"
              >
                <button
                  onClick={goBack}
                  disabled={animating}
                  className="flex items-center gap-2 px-8 py-3 rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-black hover:text-black transition-all duration-300 shadow-lg font-sans font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
