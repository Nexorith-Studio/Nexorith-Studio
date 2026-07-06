"use client";

import { Target, Crown } from "lucide-react";

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">
      {label}
    </span>
  </div>
);

export function StatsCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
      {/* Card Glow Effect */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight text-white">150+</div>
            <div className="text-sm text-zinc-400">Projects Delivered</div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Client Satisfaction</span>
            <span className="text-white font-medium">98%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
            <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-white to-zinc-400" />
          </div>
        </div>

        <div className="h-px w-full bg-white/10 mb-6" />

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <StatItem value="5+" label="Years" />
          <div className="w-px h-full bg-white/10 mx-auto" />
          <StatItem value="24/7" label="Support" />
          <div className="w-px h-full bg-white/10 mx-auto" />
          <StatItem value="100%" label="Quality" />
        </div>

        {/* Tag Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            ACTIVE
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
            <Crown className="w-3 h-3 text-yellow-500" />
            PREMIUM
          </div>
        </div>
      </div>
    </div>
  );
}
