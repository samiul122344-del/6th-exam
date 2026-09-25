'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlan } from '@/context/PlanContext';

export default function MyPlanPage() {
  const { todayPlan = [], savedWorkouts = [], removeFromPlan, toggleSaveWorkout } = usePlan();
  const [activeTab, setActiveTab] = useState('today');

  const currentList = activeTab === 'today' ? todayPlan : savedWorkouts;

  // Stats calculation
  const totalExercises = todayPlan.length;
  const totalSets = todayPlan.reduce((acc, curr) => acc + (curr.sets || 3), 0);
  const totalTime = totalExercises * 15;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-black uppercase italic tracking-wider">
          MY PLAN
        </h1>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-3 gap-4 mb-8 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
        <div className="text-center border-r border-slate-800">
          <p className="text-2xl font-black text-[#ccff00]">{totalExercises}</p>
          <p className="text-xs text-slate-400 font-bold uppercase">Exercises</p>
        </div>
        <div className="text-center border-r border-slate-800">
          <p className="text-2xl font-black text-white">{totalSets}</p>
          <p className="text-xs text-slate-400 font-bold uppercase">Total Sets</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-white">{totalTime}m</p>
          <p className="text-xs text-slate-400 font-bold uppercase">Est. Time</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-6 border-b border-slate-800 mb-6 pb-2">
        <button
          onClick={() => setActiveTab('today')}
          className={`text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors ${
            activeTab === 'today'
              ? 'border-[#ccff00] text-[#ccff00]'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Today&apos;s Plan ({todayPlan.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors ${
            activeTab === 'saved'
              ? 'border-[#ccff00] text-[#ccff00]'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Saved Workouts ({savedWorkouts.length})
        </button>
      </div>

      {/* Item List or Empty State */}
      {currentList.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 border border-dashed border-slate-800 rounded-xl">
          <p className="text-slate-400 text-sm font-semibold mb-4">
            {activeTab === 'today'
              ? "No workouts added to today's plan yet."
              : 'No saved workouts found.'}
          </p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] text-black font-extrabold text-xs px-5 py-2.5 rounded-lg uppercase tracking-wider hover:bg-yellow-300 transition-colors"
          >
            Browse Workouts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentList.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 items-center relative group hover:border-slate-700 transition-colors"
            >
              {item.image ? (
                <div className="relative w-20 h-20 bg-slate-950 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title || item.name || 'Workout'}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-500 font-bold shrink-0">
                  NO IMG
                </div>
              )}

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded">
                  {item.category || item.target || 'Workout'}
                </span>
                <h3 className="text-base font-bold text-white truncate mt-1">
                  {item.title || item.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  {item.sets || 3} Sets × {item.reps || '10-12'} Reps
                </p>
              </div>

              <button
                onClick={() =>
                  activeTab === 'today'
                    ? removeFromPlan?.(item.id)
                    : toggleSaveWorkout?.(item)
                }
                className="text-slate-500 hover:text-red-400 p-2 text-xs font-bold transition-colors"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}