"use client";

import React from "react";
import { MultiStepContactFunnel } from "@/components/contact/MultiStepContactFunnel";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="relative z-10">
        <Navbar />
        <MultiStepContactFunnel />
        <Footer />
      </div>
    </div>
  );
}
