import { useEffect, useMemo, useState } from "react";
import type { DayPlan } from "../types/dayPlan";

const STORAGE_KEY = "dayflow.completedPlan";

export function useStoredPlan(defaultPlan: DayPlan) {
  const [storedPlan, setStoredPlan] = useState<DayPlan | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as DayPlan) : null;
    } catch {
      return null;
    }
  });

  const initialPlan = useMemo(() => storedPlan ?? defaultPlan, [defaultPlan, storedPlan]);

  useEffect(() => {
    if (!storedPlan) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedPlan));
  }, [storedPlan]);

  function savePlan(plan: DayPlan) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    setStoredPlan(plan);
  }

  function clearPlan() {
    localStorage.removeItem(STORAGE_KEY);
    setStoredPlan(null);
  }

  return { storedPlan, initialPlan, savePlan, clearPlan };
}
