import { useEffect, useMemo, useState } from "react";
const STORAGE_KEY = "dayflow.completedPlan";

export function useStoredPlan(defaultPlan) {
  const [storedPlan, setStoredPlan] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const initialPlan = useMemo(() => storedPlan ?? defaultPlan, [defaultPlan, storedPlan]);

  useEffect(() => {
    if (!storedPlan) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedPlan));
  }, [storedPlan]);

  function savePlan(plan) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    setStoredPlan(plan);
  }

  function clearPlan() {
    localStorage.removeItem(STORAGE_KEY);
    setStoredPlan(null);
  }

  return { storedPlan, initialPlan, savePlan, clearPlan };
}
