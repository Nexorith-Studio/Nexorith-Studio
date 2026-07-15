"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { submitLead } from "@/lib/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { rotateX: -90, opacity: 0 },
  visible: { 
    rotateX: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const SERVICES = [
  "Web Development",
  "AI Solutions",
  "SaaS Platform",
  "Startup MVP",
  "Automation",
  "UI/UX Design",
  "Digital Transformation",
  "Website Maintenance / Redesign",
  "Other",
];

const UPCOMING_SERVICES = ["Social Media Marketing (Upcoming)"];

const BUDGETS = ["< 10k", "10-25k", "25-50k", "50-100k", "> 100k"];

const NAV_LINKS = [
  { href: "/#vision", label: "Vision" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/status", label: "Status" },
  { href: "/contact", label: "Contact", active: true },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20">
        <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Globe",
    href: "#",
    icon: (
      <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    ),
  },
];

export function ContactFormNew() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleAttachment = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) setAttachment(file);
    };
    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitLead({
        name,
        email,
        phone: "", // New design has no phone field
        projectType: selectedServices.join(", "),
        budgetRange: selectedBudget,
        message: project || "Inquiry from new contact form",
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="w-full px-6 py-6 flex justify-between items-center fixed top-0 bg-white/90 backdrop-blur-sm z-50 border-b border-black/5">
        <Link href="/" className="flex items-center gap-3">
          <span
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nexorith
          </span>
          <span className="border border-black/20 rounded-full px-3 py-1 text-xs font-medium tracking-widest uppercase mt-1">
            Studio
          </span>
        </Link>

        <nav className="hidden md:flex gap-10 font-serif text-[18px] md:text-[20px]">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative transition-opacity hover:opacity-60 ${
                l.active
                  ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-black"
                  : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-grow pt-40 pb-32 w-full px-6 md:px-12"
      >
        {/* Hero Title */}
        <section className="mb-20 md:mb-32 mt-8 md:mt-12 flex justify-center">
          <motion.h1
            variants={itemVariants}
            className="text-[4rem] md:text-[8rem] leading-[1.05] font-medium tracking-tighter origin-center text-center max-w-4xl"
          >
            Hey! Tell us all
            <br />
            the things
          </motion.h1>
        </section>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl">
            {/* Services */}
            <div className="mb-20 md:mb-28">
              <motion.h2 variants={itemVariants} className="text-2xl md:text-[32px] font-medium mb-8 md:mb-10 origin-center">I&apos;m interested in...</motion.h2>
              <div className="flex flex-wrap gap-4 md:gap-5">
                {SERVICES.map((service) => {
                  const isSelected = selectedServices.includes(service);
                  return (
                    <motion.div
                      key={service}
                      variants={itemVariants}
                      className="origin-center drop-shadow-sm flex"
                    >
                      <TextReveal
                        as="button"
                        type="button"
                        text={service}
                        onClick={() => toggleService(service)}
                        fontSize="inherit"
                        color={isSelected ? "white" : "black"}
                        hoverColor="white"
                        className={`!font-normal !normal-case !tracking-normal border border-black rounded-full transition-colors duration-300 text-lg md:text-[20px] ${
                          isSelected ? "bg-black" : "bg-transparent hover:bg-black"
                        }`}
                        style={{ padding: "16px 28px", lineHeight: "1.2" }}
                      />
                    </motion.div>
                  );
                })}
                {UPCOMING_SERVICES.map((service) => (
                  <motion.div
                    key={service}
                    variants={itemVariants}
                    className="origin-center drop-shadow-sm flex"
                  >
                    <TextReveal
                      as="button"
                      type="button"
                      text={service}
                      disabled
                      fontSize="inherit"
                      color="#9ca3af" // text-gray-400
                      hoverColor="#9ca3af"
                      className="!font-normal !normal-case !tracking-normal border border-gray-300 rounded-full text-lg md:text-[20px] opacity-50 cursor-not-allowed"
                      style={{ padding: "16px 28px", lineHeight: "1.2" }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Text Inputs */}
            <div className="space-y-12 md:space-y-16 mb-20 md:mb-28">
              <motion.div variants={itemVariants} className="relative origin-center">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 text-3xl md:text-5xl py-4 md:py-6 placeholder-gray-400 transition-colors duration-300"
                  placeholder="Your name"
                  type="text"
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants} className="relative origin-center">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 text-3xl md:text-5xl py-4 md:py-6 placeholder-gray-400 transition-colors duration-300"
                  placeholder="Email"
                  type="email"
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants} className="relative origin-center">
                <input
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 text-3xl md:text-5xl py-4 md:py-6 placeholder-gray-400 transition-colors duration-300"
                  placeholder="Tell us about your project"
                  type="text"
                />
              </motion.div>
            </div>


            {/* Budget */}
            <div className="mb-20 md:mb-28">
              <motion.h2 variants={itemVariants} className="text-2xl md:text-[32px] font-medium mb-8 md:mb-10 origin-center">Project budget (USD)</motion.h2>
              <div className="flex flex-wrap gap-4 md:gap-5">
                {BUDGETS.map((budget) => {
                  const isSelected = selectedBudget === budget;
                  return (
                    <motion.div
                      key={budget}
                      variants={itemVariants}
                      className="origin-center drop-shadow-sm flex"
                    >
                      <TextReveal
                        as="button"
                        type="button"
                        text={budget}
                        onClick={() =>
                          setSelectedBudget(budget === selectedBudget ? "" : budget)
                        }
                        fontSize="inherit"
                        color={isSelected ? "white" : "black"}
                        hoverColor="white"
                        className={`!font-normal !normal-case !tracking-normal border border-black rounded-full transition-colors duration-300 text-lg md:text-[20px] ${
                          isSelected ? "bg-black" : "bg-transparent hover:bg-black"
                        }`}
                        style={{ padding: "16px 28px", lineHeight: "1.2" }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Attachment + Submit */}
            <div className="mb-16 md:mb-24 flex flex-col items-start">
              <motion.button
                variants={itemVariants}
                type="button"
                onClick={handleAttachment}
                className="origin-center flex items-center gap-4 text-2xl md:text-3xl font-medium pb-2 hover:opacity-70 transition-opacity mb-12 md:mb-16"
              >
                <svg fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
                {attachment ? (
                  <span className="truncate max-w-[260px] md:max-w-[400px]">
                    {attachment.name}
                  </span>
                ) : (
                  <span className="border-b border-black">Add attachment</span>
                )}
              </motion.button>

              <motion.div
                variants={itemVariants}
                className="origin-center drop-shadow-sm flex w-full md:w-auto"
              >
                <TextReveal
                  as="button"
                  type="submit"
                  text={isSubmitting ? "Sending your inquiry..." : "Send request"}
                  disabled={isSubmitting}
                  fontSize="inherit"
                  color="white"
                  hoverColor="black"
                  className="!font-normal !normal-case !tracking-normal border border-black bg-black text-white hover:bg-white rounded-full transition-colors duration-300 text-3xl md:text-5xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ padding: "0.8em 1.5em" }}
                />
              </motion.div>
            </div>

            {/* Legal */}
            <motion.div variants={itemVariants} className="mt-20 md:mt-32 pt-8 border-t border-gray-200 origin-center">
              <p className="text-gray-500 text-sm md:text-base max-w-2xl">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="#" className="underline hover:text-black">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-black">
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </motion.div>
          </form>
      </motion.main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#0f0f0f] text-white pt-24 pb-12 px-6 md:px-12 rounded-t-[3rem] mt-12 w-full">
        <div className="w-full">
          {/* Top */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
            <div className="flex flex-col gap-12 lg:w-1/2">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:info@nexorith.com"
                  className="border border-white/30 rounded-full px-8 py-4 text-xl hover:bg-white hover:text-black transition-colors w-fit"
                >
                  info@nexorith.com
                </a>
                <a
                  href="tel:+13015499309"
                  className="border border-white/30 rounded-full px-8 py-4 text-xl hover:bg-white hover:text-black transition-colors w-fit"
                >
                  +1 301 549 9309
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-12">
                <div>
                  <p className="text-white/50 text-xs tracking-wider mb-2 uppercase">
                    Main Office
                  </p>
                  <p className="text-lg">
                    901 N Pitt Street
                    <br />
                    Alexandria VA, 22314
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Nav */}
            <div className="grid grid-cols-2 gap-x-24 gap-y-6 text-xl lg:w-1/3">
              {[
                { href: "/#services", label: "Services" },
                { href: "#", label: "Projects" },
                { href: "#", label: "Company" },
                { href: "#", label: "Blog" },
                { href: "/status", label: "Status" },
              ].map((l) => (
                <Link key={l.label} href={l.href} className="hover:opacity-70 transition-opacity">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
            <div className="flex gap-6 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span>2026, Nexorith</span>
            </div>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating Contact Badge ───────────────────────────────────────── */}
      <div
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 w-32 h-32 z-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
        id="animated-contact-badge"
        aria-hidden="true"
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              id="circlePath"
            />
          </defs>
          <style>{`
            .rotating-text {
              font-family: 'Inter', sans-serif;
              font-size: 8.5px;
              text-transform: uppercase;
              letter-spacing: 2.2px;
              fill: #000;
              font-weight: 500;
            }
            @keyframes contact-badge-rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .rotating-group {
              transform-origin: 50px 50px;
              animation: contact-badge-rotate 12s linear infinite;
            }
          `}</style>
          <g className="rotating-group">
            <text className="rotating-text">
              <textPath href="#circlePath">
                contact - contact - contact - contact -
              </textPath>
            </text>
          </g>
          {/* Inner circle with Memoji */}
          <circle cx="50" cy="50" r="26" fill="#f5f5f5" />
          <image href="/memoji.jpg" x="24" y="24" width="52" height="52" clipPath="url(#memojiClip)" />
          <defs>
            <clipPath id="memojiClip">
              <circle cx="50" cy="50" r="26" />
            </clipPath>
          </defs>
        </svg>
      </div>
      
      <SuccessModal 
        isOpen={submitted} 
        onClose={() => setSubmitted(false)} 
        redirectUrl="/status"
        countdownSeconds={15}
      />
    </div>
  );
}
