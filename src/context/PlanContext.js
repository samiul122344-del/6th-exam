'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const PlanContext = createContext();

export function PlanProvider({ children }) {
  // Lazy initializer to avoid setState in useEffect
  const [todayPlan, setTodayPlan] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('todayPlan');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error('Failed to parse todayPlan:', e);
      }
    }
    return [];
  });

  const [savedWorkouts, setSavedWorkouts] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('savedWorkouts');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error('Failed to parse savedWorkouts:', e);
      }
    }
    return [];
  });

  // LocalStorage update sync
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todayPlan', JSON.stringify(todayPlan));
    }
  }, [todayPlan]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
    }
  }, [savedWorkouts]);

  const addToPlan = (workout) => {
    if (!todayPlan.some((item) => String(item.id) === String(workout.id))) {
      setTodayPlan((prev) => [...prev, workout]);
    }
  };

  const removeFromPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const toggleSaveWorkout = (workout) => {
    if (savedWorkouts.some((item) => String(item.id) === String(workout.id))) {
      setSavedWorkouts((prev) => prev.filter((item) => String(item.id) !== String(workout.id)));
    } else {
      setSavedWorkouts((prev) => [...prev, workout]);
    }
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        toggleSaveWorkout,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}