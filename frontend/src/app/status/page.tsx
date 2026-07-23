/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/#vision", label: "Vision" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/status", label: "Status", active: true },
  { href: "/contact", label: "Contact" },
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

type ProjectMember = {
  role: string;
  name: string;
  avatar: string;
};

type ProjectMilestone = {
  title: string;
  status: 'completed' | 'current' | 'future';
  description: string;
  subTasks?: { text: string; done: boolean }[];
};

type ProjectActivity = {
  date: string;
  description: string;
};

type ProjectResource = {
  title: string;
  href: string;
  type: 'document' | 'figma' | 'pdf' | 'link' | 'other';
  isDownloadable?: boolean;
};

type ProjectData = {
  projectId: string;
  title: string;
  status: string;
  subStatus: string;
  inquiryDate: string;
  lastUpdated: string;
  estimatedCompletion: string;
  team: ProjectMember[];
  milestones: ProjectMilestone[];
  resources: ProjectResource[];
  activity: ProjectActivity[];
};

const MOCK_PROJECT_DB: Record<string, ProjectData> = {
  "NX-0BD2B367": {
    projectId: "PRJ-2024-892",
    title: "Sahil Khemnar - Web Development",
    status: "ON TRACK",
    subStatus: "IN REVIEW",
    inquiryDate: "July 10, 2024",
    lastUpdated: "July 16, 2024",
    estimatedCompletion: "August 25, 2024",
    team: [
      {
        role: "Lead Architect",
        name: "Sarah Jenkins",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgyMzwc4ploXiFBdhk8h3Aj86OfkyPDfhJ7ixvKxhn-XVXsdbkLdkqboYX0aY0YH9VwrM2mb8ORPxmVHqZ6WZGZwpCcdWYcS0_v0s7PBlGQ3diAl7a1Jd3WklFhkfPT8joh5v3mEsx3LwrBer-IJ9eeX1ykLIp5B2T6GoEjRuulDjAeYlsRqVSSH-sOiuwuS2dGL7VgN5_mYJ3-Je1_aMsuuc96TLZOapWmrmSAdDUBq29Xqd3o7Q3BA",
      },
      {
        role: "Project Manager",
        name: "David Chen",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbnhadal9Jm73LHYJkV72sUGt4nHjaykXzClTee_CQWP9s8LpIK7JmJZ9RcLklm2I5wvTnMoPyrisCOZ5g7w51Wxq0tT9YPMYgXl2hMJcc4hQAzMQuD7813Pc4exw4WVV7XYTCCiA7-CDbaKsuxipad_97CIHc3mnYIVCCs4SBkeSZyAaRE-0_R-dGbzL0DUiMPpxo6MwzbVdchR0st9tl0rbTCw12VT_DgDLzopq-wPZx-wPzwdbvOA",
      },
      {
        role: "Frontend Lead",
        name: "Elena Rodriguez",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDdHonDTgX_ZH5iIflrZx2iZwm85aonAmHLz22GSiIQdaxVuFvHoJdsZhjR1aMAOcLQlOMT0m-sNJNGHWnPwKdzdoHoPJvpUp69DNCpxkUAV9Hk6Z-RtqfZAsshAIoxtAGqVLxAhSIgKRuM2KNkWu1Et7DhODRiALcaoMNFRPzL0ukXjPj5Vt9zKhZEXMQjue7AzsEbbGYnPcyymD4GmAHHS-lu6KJfoDCxQhLyzUfcdC080Tc6zpLwQ",
      }
    ],
    milestones: [
      {
        title: "Inquiry Received",
        status: "completed",
        description: "Initial request and comprehensive requirements document submitted via client portal. Basic feasibility assessment completed.",
      },
      {
        title: "Initial Architecture & Design Review",
        status: "current",
        description: "Technical team is analyzing requirements, establishing the core tech stack, and drafting system architecture proposals.",
        subTasks: [
          { text: "Review design assets and establish UI component library baseline", done: true },
          { text: "Finalize API specifications and database schema", done: false }
        ]
      },
      {
        title: "Development & Integration",
        status: "future",
        description: "Core engineering phase encompassing frontend implementation, backend services, and third-party integrations.",
      },
      {
        title: "QA & Security Testing",
        status: "future",
        description: "Comprehensive quality assurance, automated testing, vulnerability scanning, and performance optimization.",
      },
      {
        title: "Final Delivery",
        status: "future",
        description: "Production deployment, final client sign-off, and project handover documentation.",
      }
    ],
    resources: [
      { title: "Project PRD", href: "/example-prd.pdf", type: "document", isDownloadable: true },
      { title: "Figma Design", href: "https://figma.com", type: "figma", isDownloadable: false },
      { title: "API Documentation", href: "/api-docs.pdf", type: "pdf", isDownloadable: true },
      { title: "Brand Assets", href: "/brand-assets.zip", type: "other", isDownloadable: true }
    ],
    activity: [
      { date: "July 17, 2024 - 10:30 AM", description: "Initial UI Shell deployed to staging environment for preliminary review." },
      { date: "July 16, 2024 - 14:15 PM", description: "Authentication flow and basic user management module implementation completed." },
      { date: "July 16, 2024 - 09:00 AM", description: "Backend API infrastructure provisioned; database schema migrations applied to dev servers." },
      { date: "July 15, 2024 - 16:45 PM", description: "Figma design system synchronized with frontend component library." }
    ]
  }
};

export default function StatusPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [trackingError, setTrackingError] = useState("");

  const handleTrack = () => {
    setTrackingError("");
    const project = MOCK_PROJECT_DB[trackingId.trim()];
    if (project) {
      setActiveProject(project);
    } else {
      setTrackingError("Invalid Tracking ID. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setActiveProject(null);
      setTrackingId("");
      setTrackingError("");
    }, 300); // reset after animation
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show nav if at the top (handles Safari bounce)
          if (currentScrollY <= 0) {
            setShowNav(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            // Scrolling down
            setShowNav(false);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            setShowNav(true);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-sys-background text-on-surface font-body-md antialiased flex flex-col min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .scroll-content-left {
          display: flex;
          animation: scroll-left 25s linear infinite;
        }
        .scroll-content-right {
          display: flex;
          animation: scroll-right 25s linear infinite;
        }
        .hover-pause:hover .scroll-content-left,
        .hover-pause:hover .scroll-content-right {
          animation-play-state: paused;
        }
        .scroll-container {
          overflow: hidden;
        }
        .tracking-bar {
            background: #ffffff;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
        }
        .btn-hover-effect {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        .btn-hover-effect:hover {
            transform: scale(1.02);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        .btn-hover-effect:active {
            transform: scale(0.98);
        }
        .btn-hover-effect::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
            transform: rotate(30deg);
            animation: shimmer 3s infinite linear;
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%) rotate(30deg); }
            100% { transform: translateX(100%) rotate(30deg); }
        }
        .input-glow-focus:focus {
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
        }
      ` }} />
      {/* ── Header from Contact Page ──────────────────────────────────────────────────────── */}
      <header className={`w-full px-6 py-6 flex justify-between items-center fixed top-0 bg-white/90 backdrop-blur-sm z-50 border-b border-black/5 transition-transform duration-300 ease-in-out ${showNav ? "translate-y-0" : "-translate-y-full"}`}>
        <Link href="/" className="flex items-center gap-3">
          <span
            className="text-3xl font-bold tracking-tight text-black"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nexorith
          </span>
          <span className="border border-black/20 rounded-full px-3 py-1 text-xs font-medium tracking-widest uppercase mt-1 text-black">
            Studio
          </span>
        </Link>

        <nav className="hidden md:flex gap-10 font-serif text-[18px] md:text-[20px] text-black">
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

      {/* ── Main content (Strictly copied from User HTML) ────────────────────────────────────────── */}
      <main className="flex-grow flex flex-col pt-[88px]">
        {/* 1. Top Section: Hero Image */}
        <section className="w-full px-margin-mobile md:px-margin-desktop py-md bg-sys-background">
          <div className="relative overflow-hidden rounded-3xl min-h-[400px] md:min-h-[500px] flex items-center">
            {/* Background Image */}
            <img 
              src="/status1.png" 
              alt="Brand Growth" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none"></div>

            {/* Content overlay */}
            <div className="relative z-10 w-full max-w-2xl px-xl py-xl md:py-24 flex flex-col justify-center text-left">
              <h1 className="font-headline-display text-5xl md:text-7xl mb-lg text-white leading-[1.1] font-bold tracking-tighter drop-shadow-lg">
                Let&apos;s grow your<br/>brand together!
              </h1>
              <div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-xl py-sm bg-white text-black rounded-full font-label-md text-label-md hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-lg"
                >
                  STATUS
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* 2. Split Section */}
        <section className="w-full px-margin-mobile md:px-margin-desktop py-xl max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
            <div className="space-y-md">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Commitment to Quality</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                At Nexorith, we believe that robust engineering is the foundation of every successful enterprise. Our systems are designed with fault tolerance, high availability, and scalability at their core. We don&apos;t just build software; we architect resilient solutions that adapt to your evolving business needs.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Our dedicated teams of architects and engineers work tirelessly to ensure that our infrastructure meets the highest standards of performance and security, providing you with the peace of mind to focus on what matters most—growing your business.
              </p>
            </div>
            <div className="overflow-hidden h-[400px]">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6q5vxQgHcb-3PM0CrflTSplCE_xMbYd1o8mX30jvNQYuHa_qLGVGq1MngNbet4YZ9v_HZvh56KU7FspVttUkMLSt9v84wBck0mE_g40gRuWmbzan906352c2XfkCS8Y531hCqjyuey1s4eHdpSOPXHDOR7q-xb8G7pN3dJqTv78ug-APt9VurXzA0AKg6oOuCuNJ7a9HTmnVRbeV0oPKAznrSL-LBH-9JXSdT6xuNoWcwnUq5hYRW5QN-9ENm54beWoA" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
        
        {/* 3. Animation Section: Scrolling Cards */}
        <section className="w-full py-xl overflow-hidden" style={{ backgroundColor: "rgb(242, 242, 242)" }}>
          <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop mb-lg text-center">
            <h3 className="font-headline-md text-headline-md text-primary">Meet Our Experts</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">The minds behind our resilient infrastructure.</p>
          </div>
          <div className="hover-pause flex flex-col gap-lg">
            <div className="scroll-container w-full">
              <div className="scroll-content-left w-[200%] gap-md">
                <div className="flex gap-md shrink-0">
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC1FLcp0K-CH1Kl9JxsV8rCNEnmyQHuYGEvS22kLGWOMMeWfFzNUfD6doht_fkHRWJuLNsHRAZmgtlDz92kkeSt9LQzwUCrIGWfi1hQbL9MmOo4Rg0f1K0qwHZ26v7e_ucai7HdG8udq8TXuSZ3ZouLQ2QEBRawRYGD0VMezxqRPn6im7tiy-B6P1aDRDt7t4DNVq_IE7-m5826BiQAS08H5lkx6SMUFeRzPMeobEy7wq_JFZLn88y7Q" alt="Sarah Jenkins" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Sarah Jenkins</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Lead Architect</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Specializes in distributed systems and high-availability cloud infrastructure with 15+ years experience.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFw005KDIAn9E70m3gbygsA_OP0XGbiBflEtRVYUIMThRFe_GmKwxJpMerU9k025xrD4PIf3U-DMSdaEscvZnLeluG9EW36S2IynCCd6wmOAiHm5mRAUzoG5GLgBMa-FV-LZggwa7E8u8hSax0wcSyBk3kSanu06eBpqmklvLM7oXz9E4QIPL3JZxoqCjKVnlax4dciBYXWrmetO6P5HuXvXV4ZhCTfOiQn7lE1hKAo0xBpk47kM0ZLA" alt="David Chen" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">David Chen</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Head of DevOps</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Pioneering our CI/CD pipelines and ensuring zero-downtime deployments across all enterprise services.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtspOIiPatw32Zf2kk5Mx5RAiTUZP_c8RLSMbABNYBcdxIw58PjpW0uNRi-O7O0eTkXd2eEnCXJ8c6SO1gSYAuVNPLTJAVGgUiEyrU5l3M-XlTPj1gDvKKBJWKHR5PtiPnGOj0Hmv7RdZlv9r5C1PE6BKWgKW4V6eVxRAA2ER1QtCTd4NIFaw3tqp3p3JudvU9SZMn1Xdy2IptUG3HdHcmno9frvEcghRjwWZnhiCvNxjchDoy_RsYhw" alt="Elena Rostova" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Elena Rostova</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Security Lead</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Dedicated to maintaining SOC2 compliance and fortifying our perimeter against emerging threats.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHul393bDmYrVH61Mu2cHame_zactCcWq9aAez9j4F1BIvquBC0Zpw7R44h9-VDkY4OKqSISCzt9N3g6Keqg0a9GfU0PRasTYZdFEuLroSmloQCoD_ZX9KAyfHh-dEmp6tf8id9r9Pkn44tgQNEbnjt3HDlEHk-oka9L54liqy2PfBic6dnLe4D0Q18IF1olMzYJl6Fkag19yxbjhQfEeIi4PlmfNC9shklDE1g3j1aYHBajN7GQ2IPg" alt="Marcus Thorne" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Marcus Thorne</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Principal DBA</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Ensuring data integrity and microsecond latency for our global multi-region database clusters.</p>
                  </div>
                </div>
                <div className="flex gap-md shrink-0">
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKkbf6r1N143w9Vi3SP880PornFm5eFO5jP7yLQvOJAvKxbQD90GNZmOfDs3-gCiC7TDLe_3aieczitYGxwteaYM99KwV7qoA4BuZdIE_FofANMB5QmnowIncLe28ZphgxmET6cVtEaEZ2K4XysErZVZc5wfeppoIWWjllxT772QN8pjwxc8nze-VQkN5-3oRcacZJwNwgrrv1oLFyTfDdH754bwdpDCgtb3v-buMgGOQwIIis2EmyXA" alt="Sarah Jenkins" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Sarah Jenkins</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Lead Architect</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Specializes in distributed systems and high-availability cloud infrastructure with 15+ years experience.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKXKD21Wid8aUNvze5e-ERtN1uU7UdIoBatyAiT9M9FqnWIe-lGczeIG-6ad6t0dX1OoEbdQdiAswHPymNhzvpIWj2i2rr4zVZXlQZgdpdvFAnb-89V0T4ivrl2kK56LZr4Jg467EWg8SyBsGsFRMsBH4UK_rKUKwe7M86rbqoq7V3NA82gmyc7dSTHt1E4c48aN3mS3UoioqmcO-bdRiQ_y6DBy_MxaJWGnAujC_UzayfO4ANkoL6eg" alt="David Chen" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">David Chen</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Head of DevOps</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Pioneering our CI/CD pipelines and ensuring zero-downtime deployments across all enterprise services.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWCv6ulAxaYSArwbz0BLOaUOw9yz9GBmKce4lbdajHOMW5bQb2TyAgErwIvGTUhg8Mprz7VO4BIyUgzwxBlOfY678ZtmULy8UozGJrnjp2hrocEGnFs0ZILAsjUXxluDF10sX-mtEx95DAhbUZ7xk8gIfoXiS9CrDd78pSGM7WHmNLcRcop0UQTkEshLKmiXKoiLuZWjZKd9DQ_oQAhRhr00827yh7u-rg2ryWLWdCWSdKYhHdwIgR4w" alt="Elena Rostova" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Elena Rostova</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Security Lead</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Dedicated to maintaining SOC2 compliance and fortifying our perimeter against emerging threats.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0FpuQzvRFlWh-GiBvmNueqO39S0CHblpMbkGysODzyanx5oRUV2edOXUqy52T55j_Xj-SPdnd18JsedQi8ZaX5VWHidHCmYhfi9dbLWD0aRlVh19ZSd2W7g4YJNcaDk_e_M9KIq0me6WyvetqKQs7NsQEONAeIeQDZJ4bwvOZPZNmSJ9P48ux7IpLAQm1Jb34pLpbDdrJvFnBVVjHUBdby55sXAP4vtpHQ8JZa3xoVDRDjc6TJEEYhA" alt="Marcus Thorne" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Marcus Thorne</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Principal DBA</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Ensuring data integrity and microsecond latency for our global multi-region database clusters.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="scroll-container w-full">
              <div className="scroll-content-right w-[200%] gap-md">
                <div className="flex gap-md shrink-0">
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5CbMnDCb9vqDwDi003NW51VmNvUgwzLqjxjVgafzG3p-QhaOniwZNggEcyOX2rxCojzwJuVddolJkYU5H6za67WzeoWtEo-twudsY1Q482RSZ37YAc_umjpvF0EXd0686kZCy_dIsl-ZAV0LG8sH7q8MTzSpo2muGmF9yqH6l9ls2OC53cvbiV5DdfSFYjfkPfltNIpKtDsDtmeY3Uv6KzT9BE8iLw-a8gdRBAHeocnQbLtqpzTiXfA" alt="Liam Davies" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Liam Davies</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Sr. UI Engineer</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Crafting accessible, performant, and delightful user interfaces for our core product suite.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLfkOJZftIV7JIWiaQhEhFoigy84vm9ub1Br-RRAilFFh2uYryF1l3dlRX-Sz9CiEfkvWmhMNyb4xaN8CUZzHO_3WZ0L0vYm4vlp1QN5E6cD2SIqDVzZHOM4LPXGVWpzL-4xdDiZcuHh3o6S2wGAye5gzImMo2kUctfrQDu-SfM6AdlmEd-MD6g7gRaK9X_vuHRnzxu90zcv3KG6W3UGQLgRpCw_rBl9JfzaklaLyGAgAm9_hKcFxmWA" alt="Aisha Ndiaye" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Aisha Ndiaye</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Data Scientist</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Leveraging machine learning to predict system anomalies before they impact our customers.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9BhAgTShlmia4ajqOWW02MRBKf0wD5yBLyyqU-JvJWxxwA4xuG71JNwZ7Z6duA5Eq2YMgJFkNmNz3wNRNKs62oRQLRkioV6A4cds_hLrQXUx70jFKuHHa6VI_eGcRPji33FDEsAxfOWfX-ZeL5eJ_KSswZp8scYqMZ7Jay3GMeTOI9S-Ilk7cxGTwdL16HMDcgbFEcC9wQlL8QErTs3KmnGvzMJCGSCLA42Bmv03Yn83glkg5GHrY1A" alt="Carlos Gomez" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Carlos Gomez</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">SRE</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">First responder for critical incidents, building self-healing systems for maximum uptime.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-oLhdvV8A4BsriqADXzR19pELOgJ3546lL7LwCi-zWiokYcAx78Lha5g2Li2D7cHtsfSwbt8mYsNDabaU2ldMXfyDgxDJWA2Xcu2SuKQADrakFR_EBcUbNZJHUMyTZQ1kqf0ooLtgOU0QwF4axsbi3cpSqeIfdjs4oYnTNZk10n6GKkEwEEyAEevd0EkULUauNUnZ0tP_pENL3ptGQ9TH68aRatapW_6_TQZkn1mvuJCCS4yOX5pqg" alt="Rachel Kraft" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Rachel Kraft</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Product VP</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Aligning engineering efforts with enterprise customer needs and long-term strategic vision.</p>
                  </div>
                </div>
                <div className="flex gap-md shrink-0">
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbBTeSyrkFM6p3CbsQX69hlmnZXKvRS3tonGpcaRUDjcqZel_KDO_vYo0V8l7CAIgEO0k3N9OB1oUPtZddXkqBtaIi0l5N2hGKA9F5SzcN_2-kgba6gZSC18YKxuDGTV2EdJ8EFKYhztMfWpdzd8y3VXph2DwGaqKlSsW1chBYu-oBWfzkjxaxP1fYG9_x63AGDEqDCp8Mj5Hc-gmPrDOpu0P9zinPyaRTpQcfg3LJa8sY8CVhGvFdJw" alt="Liam Davies" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Liam Davies</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Sr. UI Engineer</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Crafting accessible, performant, and delightful user interfaces for our core product suite.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYj1_lUhJUNggmpciOyEifIKHHwYhHC05uu-1COObVb-9eZDMN3RvrwR3WFgGQ84GYShGH-Dw5nStSjlAM476KVz9-5qkJqGw1fCMM4nA7vUdDv95Pd2g4Q8MwCrjTSFzPi0OSGSQvTIfM1vpcL5RwIDxP9zGBnCKJoA31aJ4iVzEJzWo0ifT0HFLu6yEi_Gs8u6rJx70T_E_b9rcDfMQja09X2z7BDunVzHOlm_6PBVgV6OC3yQrQlg" alt="Aisha Ndiaye" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Aisha Ndiaye</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Data Scientist</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Leveraging machine learning to predict system anomalies before they impact our customers.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQD_78ccoJdqRkGTWnCE2VfLqBtE6CYQzIu0aDHOLd7-vhzjfaQrVEcgfEBWEtST2xZCwXCLAxrwvC9MIktnn1_BY5PSTTdCPqz1UJ9_jxoX7ppGF5A5JQxPVg0nc4xs0kmXvXUURY3EPB8YvAXBlP6OhW4ttk5IWNTdE1RS1gixtEVK9q0fODZuFh7c_TLHwvgEBVzuinZZWb1aBJizxmvy__lOCHdeNiMB3cTPeSIXn--iLlLouu2w" alt="Carlos Gomez" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Carlos Gomez</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">SRE</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">First responder for critical incidents, building self-healing systems for maximum uptime.</p>
                  </div>
                  <div className="w-[300px] bg-surface-container-lowest p-md border border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col shrink-0 rounded-3xl">
                    <div className="flex items-center gap-sm mb-sm">
                      <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_5LDk6GcyWiNjYPc3QgSbm809unHupMjIe8eB_XyV490Q9uHgGqtDavbRiupKRFgMlYVoKAkgPy4q8jqyMTO0hkKOdR2P6pAZ9cQzWUh5dddgFHGl0KVQvjwCE7PMrw-v7Ga5YZYlRlz1DJyZZzRvbm3_VIefgzdm7xa2iHyyOeA1ottwJod8zWYHqaC94Z7y-tcLtyALLkqDMD82_j9uL3vpMk6-0lhtXhqjjM8JqU38SeZfqg-oxQ" alt="Rachel Kraft" />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Rachel Kraft</h4>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Product VP</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant whitespace-normal">Aligning engineering efforts with enterprise customer needs and long-term strategic vision.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer from Contact Page ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#0f0f0f] text-white pt-24 pb-12 px-6 md:px-12 mt-auto w-full">
        <div className="max-w-[1440px] mx-auto w-full">
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

      {/* ── Status Modal ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/40 backdrop-blur-md"
            onClick={handleCloseModal}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="h-[100dvh] flex items-center justify-center p-4 sm:p-8 w-full" onWheel={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                onWheel={(e) => e.stopPropagation()}
              className={`bg-white rounded-xl shadow-lg w-full flex flex-col hide-scrollbar ${activeProject ? 'max-w-[900px] max-h-[85dvh] overflow-y-auto' : 'max-w-[420px] p-6 pt-10 pb-6 gap-4 items-center relative'}`}
            >
              {!activeProject ? (
                <>
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 transition-colors p-1.5"
                    aria-label="Close modal"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div 
                    className={`tracking-bar w-full rounded-full border p-1.5 flex items-center justify-between transition-all duration-300 ${
                      isInputFocused ? 'scale-[1.02] border-black/20 shadow-md' : 'border-black/10'
                    }`}
                  >
                    <div className="flex-1 px-3 group">
                      <input 
                        className="w-full bg-transparent border-none text-black font-mono text-[14px] focus:ring-0 outline-none placeholder:text-gray-400 tracking-wider input-glow-focus rounded-lg py-1.5 px-2 transition-shadow" 
                        id="tracking-id" 
                        placeholder="Enter Tracking ID" 
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleTrack();
                        }}
                      />
                    </div>
                    <button 
                      onClick={handleTrack}
                      className="btn-hover-effect shrink-0 bg-black text-white h-9 px-5 rounded-full font-sans font-semibold text-[14px] flex items-center justify-center">
                      Track
                    </button>
                  </div>
                  {trackingError && (
                    <p className="text-red-500 text-xs mt-[-4px] w-full text-center">{trackingError}</p>
                  )}
                </>
              ) : (
                <div className="w-full bg-white rounded-xl overflow-y-auto hide-scrollbar p-6 sm:p-8 text-gray-900 relative" onWheel={(e) => e.stopPropagation()}>
                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    aria-label="Close modal"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <header className="flex justify-between items-start mb-10 pb-6 border-b border-gray-100">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">Project ID: {activeProject.projectId}</p>
                      <h1 className="text-3xl font-bold text-gray-900">{activeProject.title}</h1>
                    </div>
                    <div className="flex gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        <svg className="mr-1.5 h-3.5 w-3.5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        {activeProject.status}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5"></span>
                        {activeProject.subStatus}
                      </span>
                    </div>
                  </header>

                  {/* Key Metrics */}
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#F8F9FA] rounded-lg p-5 border border-gray-100">
                      <p className="text-sm font-medium text-gray-500 mb-1">Inquiry Date</p>
                      <p className="text-lg font-bold text-gray-900">{activeProject.inquiryDate}</p>
                    </div>
                    <div className="bg-[#F8F9FA] rounded-lg p-5 border border-gray-100">
                      <p className="text-sm font-medium text-gray-500 mb-1">Last Updated</p>
                      <p className="text-lg font-bold text-gray-900">{activeProject.lastUpdated}</p>
                    </div>
                    <div className="bg-[#F8F9FA] rounded-lg p-5 border border-gray-100">
                      <p className="text-sm font-medium text-gray-500 mb-1">Estimated Completion</p>
                      <p className="text-lg font-bold text-gray-900">{activeProject.estimatedCompletion}</p>
                    </div>
                  </section>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-12">
                      {/* Project Team */}
                      <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-5">Project Team</h2>
                        <div className="flex flex-wrap gap-4">
                          {activeProject.team.map((member, i) => (
                            <div key={i} className="flex items-center bg-[#F8F9FA] rounded-lg p-3 border border-gray-100 min-w-[220px]">
                              <img alt={member.name} className="w-10 h-10 rounded-full mr-3 object-cover shadow-sm" src={member.avatar} />
                              <div>
                                <p className="text-xs font-medium text-gray-500">{member.role}</p>
                                <p className="text-sm font-bold text-gray-900">{member.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Project Milestones */}
                      <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Project Milestones</h2>
                        <div className="relative ml-3 border-l-2 border-gray-200 space-y-10 pb-4">
                          {activeProject.milestones.map((m, i) => (
                            <div key={i} className="relative pl-8">
                              {m.status === 'completed' && (
                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center ring-4 ring-white">
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </div>
                              )}
                              {m.status === 'current' && (
                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500 ring-4 ring-white"></div>
                              )}
                              {m.status === 'future' && (
                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-200 ring-4 ring-white"></div>
                              )}
                              
                              <h3 className={`text-lg font-bold ${m.status === 'future' ? 'text-gray-400' : 'text-gray-900'}`}>{m.title}</h3>
                              <p className={`text-sm mt-2 leading-relaxed max-w-2xl ${m.status === 'future' ? 'text-gray-400' : (m.status === 'completed' ? 'text-gray-500' : 'text-gray-600')}`}>
                                {m.description}
                              </p>

                              {m.subTasks && m.subTasks.length > 0 && (
                                <div className="mt-4 bg-[#F8F9FA] rounded-lg p-4 border border-gray-100 max-w-2xl space-y-3">
                                  {m.subTasks.map((st, j) => (
                                    <div key={j} className="flex items-start">
                                      {st.done ? (
                                        <svg className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                      ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-gray-300 mt-0.5 mr-3 flex-shrink-0"></div>
                                      )}
                                      <span className={`text-sm font-medium ${st.done ? 'text-gray-700' : 'text-gray-500'}`}>{st.text}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-10">
                      {/* Resources */}
                      <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-5">Resources</h2>
                        <div className="bg-[#F8F9FA] rounded-lg border border-gray-100 p-3 space-y-1">
                          {activeProject.resources.map((r, i) => (
                            <a 
                              key={i} 
                              className="flex items-center px-3 py-2.5 rounded hover:bg-gray-100 transition-colors group" 
                              href={r.href}
                              target={r.isDownloadable ? "_self" : "_blank"}
                              rel={r.isDownloadable ? "" : "noopener noreferrer"}
                              download={r.isDownloadable}
                            >
                              <svg className="w-5 h-5 text-gray-500 mr-3 group-hover:text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                {r.type === 'document' && <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"></path>}
                                {r.type === 'figma' && (
                                  <>
                                    <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </>
                                )}
                                {r.type === 'pdf' && <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round"></path>}
                                {r.type === 'link' && <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round"></path>}
                                {r.type === 'other' && <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round"></path>}
                              </svg>
                              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{r.title}</span>
                              {r.isDownloadable && (
                                <svg className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                              )}
                            </a>
                          ))}
                        </div>
                      </section>

                      {/* Recent Activity */}
                      <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-5">Recent Activity</h2>
                        <div className="bg-[#F8F9FA] rounded-lg border border-gray-100 p-5 shadow-sm">
                          <div className="space-y-6">
                            {activeProject.activity.map((a, i) => (
                              <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">{a.date}</p>
                                <p className="text-sm text-gray-800 leading-relaxed font-medium">{a.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>

                      {/* Request Changes */}
                      <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-5">Request Changes</h2>
                        <div className="bg-[#F8F9FA] rounded-lg border border-gray-100 p-5 shadow-sm">
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            Need to adjust project scope or details? Submit your request here for review.
                          </p>
                          <div className="space-y-4">
                            <textarea className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white" placeholder="Describe your requested changes..." rows={3}></textarea>
                            <button className="w-full bg-blue-600 text-white text-sm font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm" type="button">
                              Submit Request
                            </button>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
