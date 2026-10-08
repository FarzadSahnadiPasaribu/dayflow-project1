import type { DayPlan } from "../../types/dayPlan";
import { sliderMinutesToTime, windDownToAbsoluteMinutes } from "../../utils/time";
import { TimeSlider } from "../ui/TimeSlider";

type WindDownStepProps = {
  plan: DayPlan;
  error?: string;
  updatePlan: (patch: Partial<DayPlan>) => void;
};

export function WindDownStep({ plan, error, updatePlan }: WindDownStepProps) {
  return (
    <div className="question-block">
      <p className="step-label">05 / WIND DOWN</p>
      <h1>
        WHEN DO WE
        <br />
        CALL IT A DAY?
      </h1>
      <TimeSlider
        id="wind-down-time"
        label="Wind down time"
        min={1200}
        max={1440}
        value={windDownToAbsoluteMinutes(plan.windDownTime)}
        minLabel="20:00"
        maxLabel="00:00"
        onChange={(value) => updatePlan({ windDownTime: sliderMinutesToTime(value) })}
      />
      <dl className="summary-list">
        <div>
          <dt>Start</dt>
          <dd>{plan.wakeTime}</dd>
        </div>
        <div>
          <dt>End</dt>
          <dd>{plan.windDownTime}</dd>
        </div>
        <div>
          <dt>Moments</dt>
          <dd>3</dd>
        </div>
        <div>
          <dt>Mission</dt>
          <dd>{plan.mission || "Waiting for your mission"}</dd>
        </div>
      </dl>
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
