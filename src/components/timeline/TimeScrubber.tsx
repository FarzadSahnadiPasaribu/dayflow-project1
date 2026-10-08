import type { CSSProperties } from "react";
import type { DayPlan } from "../../types/dayPlan";
import { minutesToTime, planTimeRange } from "../../utils/time";

type TimeScrubberProps = {
  plan: DayPlan;
  currentMinutes: number;
  onChange: (minutes: number) => void;
};

export function TimeScrubber({ plan, currentMinutes, onChange }: TimeScrubberProps) {
  const { start, end } = planTimeRange(plan.wakeTime, plan.windDownTime);
  const percent = ((currentMinutes - start) / (end - start)) * 100;

  return (
    <div className="scrubber">
      <output>{minutesToTime(currentMinutes)}</output>
      <div className="scrubber__row">
        <span aria-hidden="true">SUN</span>
        <input
          aria-label="Scrub through the planned day"
          type="range"
          min={start}
          max={end}
          step={5}
          value={currentMinutes}
          style={{ "--slider-progress": `${percent}%` } as CSSProperties}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <span aria-hidden="true">MOON</span>
      </div>
    </div>
  );
}
