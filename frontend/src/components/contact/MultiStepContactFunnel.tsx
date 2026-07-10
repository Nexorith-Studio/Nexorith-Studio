"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedFeatureCard } from "@/components/ui/animated-feature-card";
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
  ArrowRight,
  ArrowLeft,
  Check,
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
  const [direction, setDirection] = useState(1);
  const [userSelections, setUserSelections] = useState<UserSelections>({});
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    details: "",
  });
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Load saved state from sessionStorage on mount (client-side only)
  React.useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;
    
    try {
      const savedStep = sessionStorage.getItem('nexorith_contact_step');
      const savedSelections = sessionStorage.getItem('nexorith_contact_selections');
      const savedFormData = sessionStorage.getItem('nexorith_contact_formdata');
      
      if (savedStep) {
        const step = parseInt(savedStep, 10);
        if (step >= 1 && step <= 5) setCurrentStep(step);
      }
      if (savedSelections) {
        setUserSelections(JSON.parse(savedSelections));
      }
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
  }, [isClient]);

  // Save state to sessionStorage whenever it changes (client-side only)
  React.useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;
    
    try {
      sessionStorage.setItem('nexorith_contact_step', currentStep.toString());
      sessionStorage.setItem('nexorith_contact_selections', JSON.stringify(userSelections));
      sessionStorage.setItem('nexorith_contact_formdata', JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }, [currentStep, userSelections, formData, isClient]);

  const handleCardClick = (stepNumber: number, optionId: string, optionLabel: string) => {
    setUserSelections((prev) => ({
      ...prev,
      [`step${stepNumber}`]: optionLabel,
    }));

    // Wait 800ms for visual feedback, then advance
    setTimeout(() => {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }, 800);
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      selections: userSelections,
      formData,
    });
    alert("Form submitted! (Connect to your backend API)");
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative min-h-screen bg-black py-20 px-4">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5].map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300 ${
                      step < currentStep
                        ? "bg-white text-black shadow-lg shadow-white/30"
                        : step === currentStep
                        ? "bg-white/20 text-white ring-2 ring-white shadow-lg shadow-white/20"
                        : "bg-zinc-800/50 text-zinc-600"
                    }`}
                    animate={
                      step === currentStep
                        ? { scale: [1, 1.1, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </motion.div>
                  <span className="mt-2 text-xs text-zinc-500 hidden sm:block">
                    {step === 5 ? "Review" : `Step ${step}`}
                  </span>
                </div>
                {idx < 4 && (
                  <div
                    className={`h-[2px] w-12 sm:w-20 border-t-2 border-dashed transition-colors duration-300 ${
                      step < currentStep ? "border-white" : "border-zinc-700"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait" custom={direction}>
            {currentStep <= 4 ? (
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.4 },
                }}
              >
                <SelectionStep
                  stepData={STEPS_DATA[currentStep - 1]}
                  onSelect={(optionId, optionLabel) =>
                    handleCardClick(currentStep, optionId, optionLabel)
                  }
                />
              </motion.div>
            ) : (
              <motion.div
                key={5}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.4 },
                }}
              >
                <FinalStep
                  userSelections={userSelections}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back Button */}
        {currentStep > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={goBack}
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900 hover:border-white hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Selection Step Component (Steps 1-4)
function SelectionStep({
  stepData,
  onSelect,
}: {
  stepData: (typeof STEPS_DATA)[0];
  onSelect: (id: string, label: string) => void;
  selectedValue?: string;
}) {
  const [clickedCard, setClickedCard] = useState<string | null>(null);

  const handleClick = (optionId: string, optionLabel: string) => {
    setClickedCard(optionId);
    onSelect(optionId, optionLabel);
  };

  return (
    <div className="text-center">
      <TextEffect
        per="word"
        preset="blur"
        delay={0.2}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12 sm:mb-16"
      >
        {stepData.question}
      </TextEffect>

      <div className="group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stepData.options.map((option, idx) => {
          const isSelected = clickedCard === option.id;

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.8 }}
              onClick={() => handleClick(option.id, option.label)}
              className="cursor-pointer"
            >
              <AnimatedFeatureCard
                index={`00${idx + 1}`}
                tag={option.id.toUpperCase()}
                title={option.label}
                imageSrc={option.imageSrc}
                color={option.color}
                className={`h-[320px] sm:h-[380px] ${
                  isSelected
                    ? "!border-white !shadow-lg !shadow-white/30 !scale-105"
                    : ""
                }`}
              />
              {/* Checkmark Badge for selected state */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/30 z-30"
                >
                  <Check className="w-4 h-4 text-black" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Final Step Component (Step 5)
function FinalStep({
  userSelections,
  formData,
  setFormData,
  onSubmit,
}: {
  userSelections: UserSelections;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const selectionLabels = [
    { key: "step1", label: "Business Type" },
    { key: "step2", label: "Project Focus" },
    { key: "step3", label: "Primary Goal" },
    { key: "step4", label: "Timeline" },
  ];

  return (
    <div>
      <TextEffect
        per="word"
        preset="blur"
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4"
      >
        Great. We&apos;ve got the context.
      </TextEffect>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl text-zinc-400 text-center mb-12"
      >
        Now let&apos;s connect.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Summary */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Selected Options Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/50 border border-zinc-700">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Check className="w-5 h-5 text-white" />
              Your Selected Options
            </h3>
            <div className="space-y-4">
              {selectionLabels.map((item) => (
                <div key={item.key} className="flex justify-between items-center py-2 border-b border-zinc-700/50">
                  <span className="text-zinc-400 text-sm">{item.label}</span>
                  <span className="text-white font-medium">
                    {userSelections[item.key] || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* What Happens Next */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              What happens next
            </h3>
            <ul className="space-y-3">
              {[
                "We'll review your requirements within 24 hours",
                "Schedule a discovery call at your convenience",
                "Receive a tailored proposal and timeline",
                "Start building your solution together",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Additional Details
              </label>
              <textarea
                rows={4}
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Tell us more about your project..."
              />
            </div>

            <button
              type="submit"
              className="group w-full py-4 px-6 rounded-xl bg-white text-black font-semibold text-lg flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all duration-300 shadow-lg shadow-white/30 hover:shadow-white/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              Submit & Connect
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
