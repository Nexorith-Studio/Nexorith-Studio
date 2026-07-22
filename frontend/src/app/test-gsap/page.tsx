"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function TestGSAP() {
  const boxRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    console.log("GSAP Test Page Loaded");
    console.log("GSAP version:", gsap.version);
    console.log("MotionPathPlugin available:", typeof MotionPathPlugin !== "undefined");
    console.log("ScrollTrigger available:", typeof ScrollTrigger !== "undefined");

    // Test 1: Simple animation
    if (boxRef.current) {
      console.log("Starting simple box animation");
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, y: -50, rotation: -180 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          onStart: () => console.log("Box animation started"),
          onComplete: () => console.log("Box animation completed"),
        }
      );
    }

    // Test 2: Paper plane with MotionPath
    setTimeout(() => {
      if (planeRef.current && trailPathRef.current) {
        console.log("Starting paper plane animation");
        
        const path = trailPathRef.current;
        const pathLen = path.getTotalLength();

        // Setup trail
        gsap.set(path, {
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
          opacity: 1,
        });

        const tl = gsap.timeline();

        // Show plane
        tl.set(planeRef.current, {
          x: 100,
          y: 100,
          opacity: 1,
          scale: 1,
        });

        // Try MotionPath
        try {
          tl.to(planeRef.current, {
            motionPath: {
              path: path,
              align: path,
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
            },
            duration: 2,
            ease: "power2.inOut",
            onStart: () => console.log("MotionPath animation started"),
            onComplete: () => console.log("MotionPath animation completed"),
          }, 0);
        } catch (error) {
          console.error("MotionPath error:", error);
        }

        // Draw trail
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
          },
          0
        );
      }
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">GSAP Animation Test</h1>

      <div className="mb-12">
        <h2 className="text-2xl mb-4">Test 1: Simple Animation</h2>
        <div
          ref={boxRef}
          className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center font-bold"
        >
          Box
        </div>
      </div>

      <div className="mb-12 relative">
        <h2 className="text-2xl mb-4">Test 2: Paper Plane with MotionPath</h2>
        <div className="relative w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
          {/* Paper Plane */}
          <div
            ref={planeRef}
            className="absolute pointer-events-none opacity-0"
            style={{ transformOrigin: "50% 50%" }}
          >
            <svg width="40" height="40" viewBox="0 0 68 68" fill="none">
              <path
                d="M2 34L66 2L50 34L66 66L2 34Z"
                fill="#3b82f6"
                stroke="#60a5fa"
                strokeWidth="2"
                strokeLinejoin="round"
                fillOpacity="0.9"
              />
              <path
                d="M2 34L50 34"
                stroke="#60a5fa"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Flight Trail */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
          >
            <path
              ref={trailPathRef}
              d="M 100 100 C 150 50, 350 80, 500 200"
              stroke="#3b82f6"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="0"
              strokeDashoffset="0"
              opacity="0"
            />
          </svg>
        </div>
      </div>

      <div className="mt-12 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl mb-4">Debug Info</h2>
        <div className="font-mono text-sm space-y-2">
          <p>Open Browser Console (F12) to see detailed logs</p>
          <p>GSAP Version: Check console</p>
          <p>MotionPath Available: Check console</p>
          <p>
            Expected: Box should fade in and rotate, plane should fly along path after 1.5s
          </p>
        </div>
      </div>
    </div>
  );
}
