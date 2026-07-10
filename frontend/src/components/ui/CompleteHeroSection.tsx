"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Target,
  Crown,
  Star,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CLIENTS = [
  { name: "React", label: "⚛" },
  { name: "Next.js", label: "N" },
  { name: "Node.js", label: "JS" },
  { name: "Python", label: "Py" },
  { name: "AI / ML", label: "🤖" },
  { name: "Cloud", label: "☁" },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">
      {label}
    </span>
  </div>
);

export function CompleteHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const card3dRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin section briefly
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=800",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 3D card tilt on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        if (!card3dRef.current) return;
        const rect = card3dRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card3dRef.current, {
          rotationY: x * 10,
          rotationX: -y * 10,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        if (!card3dRef.current) return;
        gsap.to(card3dRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      if (card3dRef.current) {
        card3dRef.current.addEventListener("mousemove", handleMouseMove);
        card3dRef.current.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (card3dRef.current) {
          card3dRef.current.removeEventListener("mousemove", handleMouseMove);
          card3dRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="relative w-full text-white overflow-hidden font-sans"
      style={{ 
        marginTop: '-100vh',
        background: 'linear-gradient(180deg, #0A101D 0%, #162C6D 50%, #0A101D 100%)',
      }}
    >
      {/* Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: 'linear-gradient(to right, rgba(110, 231, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(110, 231, 255, 0.1) 1px, transparent 1px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-32 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">
            {/* Badge */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 backdrop-blur-md">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                  Next-Generation Solutions{" "}
                  <Star className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                </span>
              </div>
            </div>

            {/* Heading with 3D effect */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9]"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #6ee7ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(110, 231, 255, 0.3)',
              }}
            >
              AI-Driven
              <br />
              <span style={{
                background: 'linear-gradient(180deg, #a78bfa 0%, #6ee7ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Ecosystems
              </span>
              <br />
              & Hyper-Scale Web
            </h1>

            {/* Description */}
            <p className="max-w-xl text-lg text-blue-100/70 leading-relaxed">
              Nexorith Studio crafts bold, massive, and intelligent solutions. 
              We build AI-powered applications and scalable web platforms that 
              transform industries and drive innovation.
            </p>

            {/* CTA Button with 3D effect */}
            <div>
              <button className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(110,231,255,0.6)] active:scale-[0.98]"
                style={{
                  boxShadow: '0 10px 40px rgba(110, 231, 255, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="lg:col-span-5 space-y-6 lg:mt-12" style={{ perspective: '1500px' }}>
            {/* Stats Card with 3D hover */}
            <div 
              ref={card3dRef}
              className="relative overflow-hidden rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, rgba(22, 44, 109, 0.6) 0%, rgba(10, 16, 29, 0.8) 100%)',
                border: '1px solid rgba(110, 231, 255, 0.2)',
                boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.9), inset 0 1px 2px rgba(110, 231, 255, 0.2)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Card Glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/20 ring-1 ring-cyan-400/30">
                    <Target className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white">
                      100+
                    </div>
                    <div className="text-sm text-blue-200/60">
                      Projects Delivered
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200/60">Client Satisfaction</span>
                    <span className="text-white font-medium">98%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-blue-950/50">
                    <div 
                      className="h-full w-[98%] rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #6ee7ff 0%, #a78bfa 100%)',
                        boxShadow: '0 0 20px rgba(110, 231, 255, 0.5)',
                      }}
                    />
                  </div>
                </div>

                <div className="h-px w-full bg-cyan-400/20 mb-6" />

                {/* Mini Stats Grid */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatItem value="5+" label="Years" />
                  <div className="w-px h-full bg-cyan-400/20 mx-auto" />
                  <StatItem value="24/7" label="Support" />
                  <div className="w-px h-full bg-cyan-400/20 mx-auto" />
                  <StatItem value="100%" label="Quality" />
                </div>

                {/* Tag Pills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-medium tracking-wide text-cyan-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    ACTIVE
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-[10px] font-medium tracking-wide text-yellow-300">
                    <Crown className="w-3 h-3 text-yellow-400" />
                    PREMIUM
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Marquee */}
            <div 
              className="relative overflow-hidden rounded-3xl py-8 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(145deg, rgba(22, 44, 109, 0.6) 0%, rgba(10, 16, 29, 0.8) 100%)',
                border: '1px solid rgba(110, 231, 255, 0.2)',
              }}
            >
              <style>{`
                @keyframes marquee {
                  from { transform: translateX(0); }
                  to { transform: translateX(-50%); }
                }
                .animate-marquee {
                  animation: marquee 40s linear infinite;
                }
              `}</style>
              
              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                }}
              >
                <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 opacity-70 transition-all hover:opacity-100 hover:scale-105 cursor-default"
                    >
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(145deg, rgba(110, 231, 255, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%)',
                          border: '1px solid rgba(110, 231, 255, 0.2)',
                          boxShadow: '0 4px 20px rgba(110, 231, 255, 0.1)',
                        }}
                      >
                        <span className="text-2xl font-bold text-cyan-300">
                          {client.label}
                        </span>
                      </div>
                      <span className="text-base text-blue-100 font-medium tracking-tight">
                        {client.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
