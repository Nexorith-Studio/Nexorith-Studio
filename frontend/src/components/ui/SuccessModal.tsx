"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
  countdownSeconds?: number;
}

export function SuccessModal({
  isOpen,
  onClose,
  redirectUrl = "/status",
  countdownSeconds = 8,
}: SuccessModalProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);
  const modalRef = useRef<HTMLDivElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeLeft(countdownSeconds);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, countdownSeconds]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Countdown and Redirect
  useEffect(() => {
    if (!isOpen) return;

    if (timeLeft <= 0) {
      router.push(redirectUrl);
      onClose();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft, router, redirectUrl, onClose]);

  // Focus trap and restore
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const previousFocus = document.activeElement as HTMLElement;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      
      if (firstElement) {
          setTimeout(() => firstElement.focus(), 100);
      }
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
        if (previousFocus) {
          previousFocus.focus();
        }
      };
    }
  }, [isOpen]);


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center sm:px-4 bg-[#f9f9f8]/60 backdrop-blur-sm text-[#1a1c1c] antialiased">
          {/* Include Material Symbols just for this modal if it's active */}
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
          `}</style>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.45 }}
            className="relative w-full max-w-[480px] bg-[#f9f9f8] h-[100dvh] sm:h-auto sm:min-h-0 flex flex-col sm:rounded-[32px] rounded-t-[32px] sm:border border-[#c5c6cb] shadow-2xl overflow-hidden mt-4 sm:mt-0 z-10"
          >
            {/* TopAppBar */}
            <header className="flex items-center justify-between px-[20px] h-16 w-full bg-[#f9f9f8] shrink-0">
              <button 
                onClick={onClose}
                className="text-[#000000] hover:opacity-80 transition-opacity flex items-center justify-center w-10 h-10 rounded-full active:scale-95 duration-200"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
              </button>
              <h1 id="modal-title" className="font-serif text-[24px] font-semibold leading-[1.3] text-[#000000]">Inquiry Confirmation</h1>
              <div className="w-10"></div> {/* Spacer for balance */}
            </header>

            {/* Main Content Canvas */}
            <main className="flex-1 flex flex-col px-[20px] pt-[48px] pb-[80px] overflow-y-auto">
              {/* Hero Section */}
              <section className="flex flex-col items-center text-center mb-10">
                <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-6 shadow-[0_4px_40px_rgba(16,185,129,0.1)] relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-100/50 animate-ping opacity-75"></div>
                  <span className="material-symbols-outlined text-4xl text-emerald-500 font-bold relative z-10">check</span>
                </div>
                <h2 className="font-serif text-[48px] font-bold leading-[1.1] text-[#000000] mb-4 tracking-tight">Thank You!</h2>
                <p className="font-sans text-[18px] font-normal leading-[1.6] text-[#45474b] mb-4">Your inquiry has been successfully submitted.</p>
                <p className="font-sans text-[16px] font-normal leading-[1.6] text-[#45474b]/80 max-w-sm">
                  Our team has received your project details and will carefully review your requirements. You can expect a response within 24 business hours.
                </p>
              </section>

              {/* Status Timeline */}
              <section className="flex flex-col gap-4 mb-10">
                <div className="bg-[#ffffff] rounded-xl p-[24px] flex items-center shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-[#e2e2e2]">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mr-[12px] shrink-0">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">check</span>
                  </div>
                  <span className="font-sans text-[14px] font-medium leading-[1.4] tracking-[0.02em] text-[#1a1c1c]">Inquiry Received</span>
                </div>
                
                <div className="bg-[#ffffff] rounded-xl p-[24px] flex items-center shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-[#e2e2e2]">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mr-[12px] shrink-0">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">check</span>
                  </div>
                  <span className="font-sans text-[14px] font-medium leading-[1.4] tracking-[0.02em] text-[#1a1c1c]">Team Notified</span>
                </div>

                <div className="bg-[#ffffff] rounded-xl p-[24px] flex items-center shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-[#e2e2e2]">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mr-[12px] shrink-0">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">check</span>
                  </div>
                  <span className="font-sans text-[14px] font-medium leading-[1.4] tracking-[0.02em] text-[#1a1c1c]">Response within 24 Hours</span>
                </div>
              </section>

              {/* Footer Message & Actions */}
              <section className="flex flex-col items-center mt-auto">
                <p className="font-sans text-[16px] font-normal leading-[1.6] text-[#45474b]/70 italic mb-8 text-center">We appreciate your interest in working with us.</p>
                <button 
                  onClick={() => {
                    router.push('/');
                    onClose();
                  }}
                  className="w-full bg-[#000000] text-[#ffffff] font-sans text-[14px] font-medium leading-[1.4] tracking-[0.02em] rounded-full py-4 px-6 shadow-md hover:shadow-lg hover:bg-black/90 transition-all active:scale-95 mb-4 border border-black ring-2 ring-transparent focus:ring-black/20"
                >
                  Continue Browsing
                </button>
                <button 
                  onClick={onClose}
                  className="font-sans text-[14px] font-medium leading-[1.4] tracking-[0.02em] text-[#45474b] hover:text-[#000000] transition-colors py-2 px-4 rounded-full active:bg-[#f3f4f3]"
                >
                  Close
                </button>
                
                <AnimatePresence mode="wait">
                  <motion.p
                    key={timeLeft}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="font-sans text-[12px] font-semibold leading-[1.2] tracking-[0.05em] text-[#45474b]/50 mt-8"
                  >
                    Redirecting to our status page in {timeLeft} seconds...
                  </motion.p>
                </AnimatePresence>
              </section>
            </main>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
