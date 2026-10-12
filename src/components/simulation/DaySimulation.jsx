import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getPlanMomentMinutes, minutesToTime, planTimeRange } from "../../utils/time";
import { DayTimeline } from "../timeline/DayTimeline";
import { ActivityMoment } from "./ActivityMoment";

const SIMULATION_DURATION = 12500;

export function DaySimulation({ plan, onTimeChange, onComplete }) {
  const { start, end } = planTimeRange(plan.wakeTime, plan.windDownTime);
  const [currentMinutes, setCurrentMinutes] = useState(start);
  const [activeMoment, setActiveMoment] = useState(null);
  const completed = useRef(false);
  const lastUpdate = useRef(0);
  const onTimeChangeRef = useRef(onTimeChange);
  const onCompleteRef = useRef(onComplete);

  const timedMoments = useMemo(
    () => plan.moments.map((moment) => ({ ...moment, minute: getPlanMomentMinutes(moment.time) })),
    [plan.moments],
  );

  useEffect(() => {
    onTimeChangeRef.current = onTimeChange;
    onCompleteRef.current = onComplete;
  }, [onComplete, onTimeChange]);

  useEffect(() => {
    let frame = 0;
    let startedAt = 0;

    function tick(timestamp) {
      if (!startedAt) startedAt = timestamp;
      const elapsed = timestamp - startedAt;
      const progress = Math.min(elapsed / SIMULATION_DURATION, 1);
      const easedProgress = progress < 0.86 ? progress * 0.96 : 0.8256 + (progress - 0.86) * 1.246;
      const nextMinutes = start + (end - start) * Math.min(easedProgress, 1);

      if (timestamp - lastUpdate.current > 55 || progress === 1) {
        lastUpdate.current = timestamp;
        setCurrentMinutes(nextMinutes);
        onTimeChangeRef.current(nextMinutes);

        const moment = timedMoments.find((item) => Math.abs(item.minute - nextMinutes) < 26) ?? null;
        setActiveMoment(moment);
      }

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!completed.current) {
        completed.current = true;
        setCurrentMinutes(end);
        onTimeChangeRef.current(end);
        setTimeout(() => onCompleteRef.current(), 780);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, start, timedMoments]);

  return (
    <motion.div
      className="simulation-stage"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <p className="kicker">YOUR DAY,</p>
      <h1>IN MOTION.</h1>
      <div className="simulation-clock" aria-live="polite">
        {minutesToTime(currentMinutes)}
      </div>
      <AnimatePresence>{activeMoment ? <ActivityMoment key={activeMoment.period} moment={activeMoment} /> : null}</AnimatePresence>
      <DayTimeline plan={plan} currentMinutes={currentMinutes} />
    </motion.div>
  );
}
