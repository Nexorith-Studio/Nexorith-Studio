"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, Send } from "lucide-react";

const INTEREST_OPTIONS = [
  "Site from scratch",
  "UX/UI design",
  "Product design",
  "Webflow site",
  "Motion design",
  "Branding",
  "Mobile development",
];

const BUDGET_OPTIONS = [
  "10-20k",
  "30-40k",
  "40-50k",
  "50-100k",
  "> 100k",
];

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

function MagneticButton({ children, onClick, isActive }: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const button = buttonRef.current;
    const text = textRef.current;

    if (!wrapper || !button || !text) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(text, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([button, text], {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="magnetic-wrap"
      style={{ padding: "10px", margin: "-10px" }}
    >
      <button
        ref={buttonRef}
        onClick={onClick}
        className={`
          relative rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300
          ${
            isActive
              ? "bg-black text-white border-transparent"
              : "border border-black bg-transparent text-black hover:border-gray-700"
          }
        `}
      >
        <span ref={textRef} className="block">
          {children}
        </span>
      </button>
    </div>
  );
}

export function PremiumContactForm() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement form submission
    console.log({
      ...formData,
      interests: selectedInterests,
      budget: selectedBudget,
    });

    alert("Form submitted! (Connect to your backend API)");
  };

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black mix-blend-difference"
        style={{ cursor: "none" }}
      />

      <style jsx global>{`
        .contact-page-wrapper * {
          cursor: none !important;
        }
      `}</style>

      <div className="contact-page-wrapper relative min-h-screen py-20 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          {/* Hero Heading */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-6xl font-bold leading-tight tracking-tighter text-black sm:text-7xl lg:text-8xl">
              Hey! Tell us all
              <br />
              the things
            </h1>
            <p className="text-xl text-gray-600">
              Let&apos;s build something extraordinary together
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-16">
            {/* Interests Section */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-black">
                I&apos;m interested in...
              </h2>
              <div className="flex flex-wrap gap-4">
                {INTEREST_OPTIONS.map((interest) => (
                  <MagneticButton
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    isActive={selectedInterests.includes(interest)}
                  >
                    {interest}
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-8">
              <div className="group">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full border-0 border-b border-gray-300 bg-transparent pb-4 text-xl text-black placeholder-gray-400 outline-none transition-colors focus:border-black"
                />
              </div>

              <div className="group">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full border-0 border-b border-gray-300 bg-transparent pb-4 text-xl text-black placeholder-gray-400 outline-none transition-colors focus:border-black"
                />
              </div>

              <div className="group">
                <input
                  type="text"
                  placeholder="Tell us about your project"
                  value={formData.project}
                  onChange={(e) =>
                    setFormData({ ...formData, project: e.target.value })
                  }
                  required
                  className="w-full border-0 border-b border-gray-300 bg-transparent pb-4 text-xl text-black placeholder-gray-400 outline-none transition-colors focus:border-black"
                />
              </div>
            </div>

            {/* Budget Section */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-black">
                Project budget (USD)
              </h2>
              <div className="flex flex-wrap gap-4">
                {BUDGET_OPTIONS.map((budget) => (
                  <MagneticButton
                    key={budget}
                    onClick={() => setSelectedBudget(budget)}
                    isActive={selectedBudget === budget}
                  >
                    {budget}
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-black px-12 py-5 text-lg font-semibold text-white transition-all hover:scale-[1.05] active:scale-[0.98]"
              >
                <Send className="h-5 w-5" />
                Send Message
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-20 rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Email
                </h3>
                <a
                  href="mailto:hello@nexorith.com"
                  className="text-gray-600 transition-colors hover:text-black"
                >
                  hello@nexorith.com
                </a>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Response Time
                </h3>
                <p className="text-gray-600">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
