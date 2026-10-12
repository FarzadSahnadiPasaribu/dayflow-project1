import { sliderMinutesToTime, timeToMinutes } from "../../utils/time";
import { TimeSlider } from "../ui/TimeSlider";

export function WakeUpStep({ plan, updatePlan }) {
  return (
    <div className="question-block">
      <p className="step-label">01 / WAKE UP</p>
      <h1>
        WHAT TIME DOES
        <br />
        YOUR DAY START?
      </h1>
      <TimeSlider
        id="wake-time"
        label="Wake up time"
        min={300}
        max={600}
        value={timeToMinutes(plan.wakeTime)}
        minLabel="05:00"
        maxLabel="10:00"
        onChange={(value) => updatePlan({ wakeTime: sliderMinutesToTime(value) })}
      />
    </div>
  );
}
