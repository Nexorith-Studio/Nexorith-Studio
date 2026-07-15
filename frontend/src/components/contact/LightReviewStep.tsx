"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ArrowRight, Star, ArrowLeft } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

interface LightReviewStepProps {
  userSelections: UserSelections;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function LightReviewStep({
  userSelections,
  formData,
  setFormData,
  onSubmit,
  onBack,
}: LightReviewStepProps) {
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'expanding' | 'success'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const selectionLabels = [
    { key: "step1", label: "Business Type" },
    { key: "step2", label: "Project Focus" },
    { key: "step3", label: "Primary Goal" },
    { key: "step4", label: "Timeline" },
  ];

  const trustedCompanies = [
    "Microsoft", "Google", "Apple", "Amazon", "Meta", "Tesla", 
    "Netflix", "Spotify", "Adobe", "Salesforce", "Shopify", "Stripe"
  ];

  // Enhanced GSAP Animations for Review Step
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Master timeline for coordinated animations
      const masterTL = gsap.timeline();

      // Progress bar entrance with morphing effect
      if (progressRef.current) {
        const progressElements = progressRef.current.querySelectorAll('.progress-step');
        masterTL.fromTo(progressRef.current,
          { opacity: 0, y: -60, rotationX: -90 },
          { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: "power3.out" }
        )
        .fromTo(progressElements,
          { scale: 0, rotation: -360 },
          { 
            scale: 1, 
            rotation: 0, 
            duration: 0.8, 
            ease: "back.out(2)",
            stagger: 0.1
          }, "-=0.5"
        );
      }

      // Heading with spectacular entrance
      if (headingRef.current) {
        masterTL.fromTo(headingRef.current,
          { 
            opacity: 0, 
            y: 100, 
            rotationX: -90,
            transformOrigin: "50% 50% -200px",
            filter: "blur(20px)"
          },
          { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            filter: "blur(0px)",
            duration: 1.5, 
            ease: "power3.out" 
          }, "-=0.8"
        );
        
        // Continuous floating with subtle rotation
        gsap.to(headingRef.current, {
          y: "random(-12, 12)",
          rotation: "random(-0.5, 0.5)",
          duration: "random(6, 10)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 3
        });
      }

      // Left column cards with staggered 3D entrance
      if (leftColumnRef.current) {
        const cards = leftColumnRef.current.querySelectorAll('.summary-card');
        masterTL.fromTo(cards,
          { 
            opacity: 0, 
            x: -100, 
            rotationY: -45,
            transformOrigin: "right center"
          },
          { 
            opacity: 1, 
            x: 0, 
            rotationY: 0,
            duration: 1, 
            ease: "power2.out",
            stagger: 0.2
          }, "-=1.2"
        );

        // Floating animation for cards
        gsap.to(cards, {
          y: "random(-6, 6)",
          rotation: "random(-1, 1)",
          scale: "random(0.99, 1.01)",
          duration: "random(5, 8)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 1
        });
      }

      // Right column form with morphing entrance
      if (rightColumnRef.current) {
        masterTL.fromTo(rightColumnRef.current,
          { 
            opacity: 0, 
            x: 100, 
            rotationY: 45,
            transformOrigin: "left center"
          },
          { 
            opacity: 1, 
            x: 0, 
            rotationY: 0,
            duration: 1, 
            ease: "power2.out" 
          }, "-=1.0"
        );

        // Animate form inputs individually
        const inputs = rightColumnRef.current.querySelectorAll('input, textarea');
        gsap.fromTo(inputs,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 1.5
          }
        );

        // Input focus animations
        inputs.forEach((input) => {
          input.addEventListener('focus', () => {
            gsap.to(input, {
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              duration: 0.3,
              ease: "power2.out"
            });
          });

          input.addEventListener('blur', () => {
            gsap.to(input, {
              scale: 1,
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

      // Marquee with enhanced animation
      if (marqueeRef.current) {
        const marqueeContent = marqueeRef.current.querySelector('.marquee-content');
        if (marqueeContent) {
          // Initial entrance
          gsap.fromTo(marqueeRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 2 }
          );

          // Continuous scroll with easing variations
          gsap.to(marqueeContent, {
            x: "-100%",
            duration: 25,
            ease: "none",
            repeat: -1
          });

          // Add subtle wave motion to individual items
          const marqueeItems = marqueeContent.querySelectorAll('div');
          gsap.to(marqueeItems, {
            y: "random(-3, 3)",
            duration: "random(2, 4)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.3
          });
        }
      }

      // Background particle system
      const createAdvancedParticles = () => {
        for (let i = 0; i < 15; i++) {
          const particle = document.createElement('div');
          particle.style.cssText = `
            position: absolute;
            width: ${gsap.utils.random(3, 8)}px;
            height: ${gsap.utils.random(3, 8)}px;
            background: linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            filter: blur(1px);
          `;
          
          if (containerRef.current) {
            containerRef.current.appendChild(particle);
            
            gsap.set(particle, {
              x: gsap.utils.random(-100, window.innerWidth + 100),
              y: gsap.utils.random(-100, window.innerHeight + 100),
            });
            
            gsap.to(particle, {
              x: `+=${gsap.utils.random(-300, 300)}`,
              y: `+=${gsap.utils.random(-400, 400)}`,
              rotation: gsap.utils.random(0, 720),
              scale: gsap.utils.random(0.5, 2),
              opacity: gsap.utils.random(0.1, 0.6),
              duration: gsap.utils.random(15, 25),
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true
            });
          }
        }
      };

      setTimeout(createAdvancedParticles, 1000);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Phase 1: Shrink to circle with loading
    setSubmissionState('loading');
    
    // Phase 2: After 1 second, expand
    setTimeout(() => {
      setSubmissionState('expanding');
      
      // Phase 3: After expansion animation, show success
      setTimeout(() => {
        setSubmissionState('success');
        onSubmit(e);
      }, 800);
    }, 1000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f4f1ea] relative overflow-hidden">
      {/* Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />

      <div ref={mainContentRef} className="relative z-10">
        {/* Progress Bar */}
        <div ref={progressRef} className="pt-6 pb-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              {[1, 2, 3, 4].map((step, idx) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center progress-step">
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-gray-200"
                      whileHover={{
                        scale: 1.1,
                        rotate: 10,
                        boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </motion.div>
                    <span className="mt-2 text-xs text-gray-500 font-medium font-sans">Step {step}</span>
                  </div>
                  {idx < 3 && (
                    <motion.div 
                      className="h-[2px] w-12 sm:w-16 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded-full"
                      whileHover={{
                        scaleY: 3,
                        transition: { duration: 0.3 }
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
              <motion.div 
                className="h-[2px] w-12 sm:w-16 bg-gradient-to-r from-gray-500 to-black rounded-full"
                whileHover={{
                  scaleY: 3,
                  transition: { duration: 0.3 }
                }}
              />
              <div className="flex flex-col items-center progress-step">
                <motion.div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shadow-lg"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                    boxShadow: [
                      "0 10px 25px rgba(0,0,0,0.3)",
                      "0 15px 35px rgba(0,0,0,0.4)",
                      "0 10px 25px rgba(0,0,0,0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: 15,
                    transition: { duration: 0.3 }
                  }}
                >
                  5
                </motion.div>
                <span className="mt-2 text-xs text-gray-700 font-medium font-sans">Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          {/* Heading */}
          <div ref={headingRef} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-4 leading-tight">
              Great. We&apos;ve got the context.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-sans font-light">
              Now let&apos;s connect.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column - 40% */}
            <div ref={leftColumnRef} className="lg:col-span-2 space-y-6">
              {/* Your Selected Options Card */}
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/60 backdrop-blur-sm summary-card"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="font-sans font-semibold text-black text-base">Your Selected Options</h3>
                </div>
                <div className="space-y-4">
                  {selectionLabels.map((item, idx) => (
                    <div key={item.key}>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-sans text-sm font-medium">{item.label}</span>
                        <span className="text-black font-sans font-semibold text-sm">
                          {userSelections[item.key] || "Enterprise"}
                        </span>
                      </div>
                      {idx < selectionLabels.length - 1 && (
                        <div className="border-b border-dotted border-gray-300" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What Happens Next Card */}
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/60 backdrop-blur-sm summary-card"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                <h3 className="font-sans font-semibold text-black mb-4 text-base">What happens next</h3>
                <ul className="space-y-3">
                  {[
                    "We'll review your requirements within 24 hours",
                    "Schedule a discovery call at your convenience", 
                    "Receive a tailored proposal and timeline",
                    "Start building your solution together",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-sans text-sm leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right Column - 60% */}
            <div ref={rightColumnRef} className="lg:col-span-3 relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/60 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-sans font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 font-sans"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-sans font-semibold text-gray-700 mb-2">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 font-sans"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-sans font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 font-sans"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-sans font-semibold text-gray-700 mb-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 font-sans"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-sans font-semibold text-gray-700 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 resize-none font-sans"
                      placeholder="Tell us more about your project..."
                    />
                  </div>

                  {/* Animated Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={submissionState !== 'idle'}
                      className="relative w-full py-4 px-6 bg-black text-white font-sans font-bold rounded-full transition-all duration-300 hover:bg-gray-900 hover:shadow-xl disabled:cursor-not-allowed overflow-hidden text-base"
                      animate={{
                        width: submissionState === 'loading' ? '64px' : '100%',
                        height: submissionState === 'loading' ? '64px' : '56px',
                        borderRadius: submissionState === 'loading' ? '50%' : '9999px',
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {submissionState === 'idle' && (
                          <motion.span
                            key="submit-text"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-center gap-2"
                          >
                            Submit & Connect 
                            <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        )}
                        {submissionState === 'loading' && (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center"
                          >
                            <Loader2 className="w-5 h-5 animate-spin" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Companies Marquee */}
        <div ref={marqueeRef} className="py-12 border-t border-gray-200/60 bg-white/40">
          <div className="text-center mb-6">
            <p className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-wide">
              Trusted by teams at
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div className="marquee-content flex gap-8 whitespace-nowrap">
              {[...trustedCompanies, ...trustedCompanies].map((company, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-base">
                  <Star className="w-3 h-3 text-yellow-400" />
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={onBack}
            className="group flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-black hover:text-black transition-all duration-300 shadow-lg font-sans font-medium"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              transition: { duration: 0.2 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Previous Step
          </motion.button>
        </div>
      </div>

      {/* Liquid Expansion Animation */}
      <AnimatePresence>
        {submissionState === 'expanding' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 100 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="fixed inset-0 bg-black rounded-full z-[100]"
            style={{
              transformOrigin: "center center",
            }}
          />
        )}
      </AnimatePresence>

      {/* Success State */}
      <AnimatePresence>
        {submissionState === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="fixed inset-0 bg-black z-[110] flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                  ease: "backOut"
                }}
                className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <Check className="w-16 h-16 text-black" />
              </motion.div>
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className="text-5xl font-serif font-bold text-white"
              >
                Done
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 1.0,
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className="text-white/80 font-sans text-lg mt-4"
              >
                We&apos;ll be in touch soon!
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}