'use client';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';
import { Clock, Flame, Star, ArrowLeft, Bookmark, Check } from 'lucide-react';

export default function WorkoutDetails({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;

  const { todayPlan = [], savedWorkouts = [], addToPlan, removeFromPlan, toggleSaveWorkout } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        const data = await res.json();
        const found = data.find((w) => String(w.id) === String(id));
        setWorkout(found || null);
      } catch (err) {
        console.error('Failed to fetch workout details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-[#ccff00] font-bold">
        Loading Workout Details...
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">Workout not found.</p>
        <Link href="/" className="bg-[#ccff00] text-black px-4 py-2 rounded-lg font-bold text-xs uppercase">
          Back to Library
        </Link>
      </div>
    );
  }

  const isAddedToPlan = todayPlan.some((item) => String(item.id) === String(workout.id));
  const isSaved = savedWorkouts.some((item) => String(item.id) === String(workout.id));

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8 text-white">
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider">
        <ArrowLeft className="w-4 h-4" /> Back to Workouts
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Workout Image */}
        <div className="relative aspect-4/3 w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
          <Image
            src={workout.image || workout.imageUrl || '/banner.png'}
            alt={workout.name}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Workout Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="bg-[#ccff00] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                {workout.category || 'CHEST'}
              </span>
              <span className="bg-[#ccff00] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                {workout.muscleGroup || 'ARMS'}
              </span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-wide">{workout.name}</h1>
            <p className="text-slate-400 text-xs">{workout.equipment || 'Equipment required'}</p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-300 py-3 border-y border-slate-800">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" /> {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {workout.rating}
            </span>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed">
            {workout.description || 'Focus on controlled movements and maintain proper form throughout each rep to maximize muscle engagement.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => (isAddedToPlan ? removeFromPlan(workout.id) : addToPlan(workout))}
              className={`flex-1 flex items-center justify-center gap-2 text-xs font-bold uppercase py-3 px-4 rounded-xl transition-all ${
                isAddedToPlan
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'bg-[#ccff00] text-black hover:bg-yellow-300'
              }`}
            >
              {isAddedToPlan ? <Check className="w-4 h-4" /> : null}
              {isAddedToPlan ? 'In Today\'s Plan' : 'Add to Today\'s Plan'}
            </button>

            <button
              onClick={() => toggleSaveWorkout(workout)}
              className={`flex items-center justify-center gap-2 text-xs font-bold uppercase py-3 px-4 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-slate-800 text-[#ccff00] border-[#ccff00]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#ccff00]' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}