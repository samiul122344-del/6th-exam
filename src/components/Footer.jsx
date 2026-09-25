'use client';
import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-[#ccff00] font-black text-lg tracking-wider">
            <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            <span>FITLOG</span>
          </Link>
          <span className="text-slate-600 text-xs">•</span>
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Workouts
          </Link>
          <Link href="/my-plan" className="hover:text-white transition-colors">
            My Plan
          </Link>
        </div>
      </div>
    </footer>
  );
}