'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';
import { Clock, Flame, Star, Plus, Check, Bookmark } from 'lucide-react';

export default function Home() {
  const { todayPlan = [], savedWorkouts = [], addToPlan, removeFromPlan, toggleSaveWorkout } = usePlan();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error('Failed to fetch workouts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-16">
      {/* HERO BANNER SECTION */}
      <section className="px-4 sm:px-8 pt-6 pb-12">
        <div className="max-w-350 mx-auto bg-[#0a0f1d] border border-slate-800/80 rounded-2xl relative overflow-hidden min-h-105 lg:min-h-120 flex items-center p-8 sm:p-12 lg:p-16">
          
          {/* Left Text Content */}
          <div className="max-w-2xl z-20 space-y-5">
            <span className="text-[11px] font-black tracking-widest text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20 px-3 py-1 rounded-full uppercase inline-block">
              WORKOUT LIBRARY
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-wider leading-[1.05] text-white">
              TRAIN WITH INTENT. <br />
              <span className="text-white">LOG EVERY SET.</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base font-medium max-w-lg leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <div className="pt-2">
              <a
                href="#workout-library"
                className="inline-block bg-[#ccff00] text-black font-extrabold text-xs sm:text-sm px-8 py-4 rounded-xl uppercase tracking-wider hover:bg-[#b8e600] transition-all transform hover:scale-105 shadow-lg shadow-[#ccff00]/20"
              >
                BROWSE WORKOUTS
              </a>
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 lg:w-3/5 h-full pointer-events-none z-10 flex items-center justify-end overflow-hidden">
            <div className="absolute right-10 w-80 h-80 bg-[#ccff00]/10 blur-[100px] rounded-full" />

            <div className="relative w-full h-full max-h-105 mr-0 sm:mr-6 lg:mr-12 opacity-40 sm:opacity-100">
              <Image
                src="./banner.png"
                alt="FitLog Hero Banner"
                fill
                className="object-contain object-right"
                priority
              />
            </div>
          </div>

          {/* Background Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0f1d] via-[#0a0f1d]/90 to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* WORKOUT LIBRARY SECTION */}
      <section id="workout-library" className="max-w-350 mx-auto px-6 pt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black uppercase italic tracking-wider">
            WORKOUT LIBRARY
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#ccff00] font-bold text-sm">
            Loading Workouts...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((item) => {
              const isAdded = todayPlan.some((p) => String(p.id) === String(item.id));
              const isSaved = savedWorkouts.some((s) => String(s.id) === String(item.id));

              return (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
                >
                  <Link href={`/workout/${item.id}`} className="block relative aspect-video w-full bg-slate-950 overflow-hidden">
                    <Image
                      src={item.image || item.imageUrl || '/banner.png'}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="bg-slate-950/80 backdrop-blur-md text-[#ccff00] text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase">
                        {item.category || 'WORKOUT'}
                      </span>
                    </div>
                  </Link>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <Link href={`/workout/${item.id}`}>
                        <h3 className="text-base font-bold text-white hover:text-[#ccff00] transition-colors truncate">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {item.duration || 15} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-orange-400" /> {item.caloriesBurned || 120} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {item.rating || '4.8'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() => (isAdded ? removeFromPlan(item.id) : addToPlan(item))}
                        className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold uppercase py-2.5 px-3 rounded-lg transition-all ${
                          isAdded
                            ? 'bg-slate-800 text-white border border-slate-700'
                            : 'bg-[#ccff00] text-black hover:bg-yellow-300'
                        }`}
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        {isAdded ? 'In Plan' : 'Add to Plan'}
                      </button>

                      <button
                        onClick={() => toggleSaveWorkout(item)}
                        className={`p-2.5 rounded-lg border transition-all ${
                          isSaved
                            ? 'bg-slate-800 text-[#ccff00] border-[#ccff00]'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                        title={isSaved ? 'Unsave' : 'Save'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#ccff00]' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}