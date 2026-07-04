"use client";

import { Hexagon, Triangle, Command, Ghost, Gem, Cpu } from "lucide-react";

const CLIENTS = [
  { name: "Acme Corp", icon: Hexagon },
  { name: "Quantum", icon: Triangle },
  { name: "Command+Z", icon: Command },
  { name: "Phantom", icon: Ghost },
  { name: "Ruby", icon: Gem },
  { name: "Chipset", icon: Cpu },
];

export function ClientMarquee() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-8 backdrop-blur-xl">
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
      
      <h3 className="mb-6 px-8 text-sm font-medium text-zinc-400">
        Trusted by Industry Leaders
      </h3>
      
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
              className="flex items-center gap-2 opacity-50 transition-all hover:opacity-100 hover:scale-105 cursor-default grayscale hover:grayscale-0"
            >
              <client.icon className="h-6 w-6 text-white fill-current" />
              <span className="text-lg font-bold text-white tracking-tight">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
