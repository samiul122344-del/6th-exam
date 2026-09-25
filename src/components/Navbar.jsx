'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlan } from '@/context/PlanContext';

export default function Navbar() {
  const { todayPlan = [], savedWorkouts = [] } = usePlan();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const planCount = todayPlan?.length || 0;
  const savedCount = savedWorkouts?.length || 0;

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Image + Text Link */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Image
              src="./logo.png"
              alt="FitLog Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-white text-xl font-black italic tracking-wider uppercase group-hover:text-[#ccff00] transition-colors">
            FITLOG
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider"
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider"
          >
            My Plan
          </Link>
        </nav>

        {/* Clickable Counts & Links for Plan & Saved */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
              {mounted ? planCount : 0}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Saved</span>
            <span className="bg-slate-800 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border border-slate-700">
              {mounted ? savedCount : 0}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}