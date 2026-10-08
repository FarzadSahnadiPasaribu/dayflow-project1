import type { DayMoment, DayPlan } from "../../types/dayPlan";
import { DayTimeline } from "../timeline/DayTimeline";

type MomentsStepProps = {
  plan: DayPlan;
  error?: string;
  updatePlan: (patch: Partial<DayPlan>) => void;
};

function updateMoment(moments: DayMoment[], index: number, patch: Partial<DayMoment>) {
  return moments.map((moment, momentIndex) => (momentIndex === index ? { ...moment, ...patch } : moment));
}

export function MomentsStep({ plan, error, updatePlan }: MomentsStepProps) {
  return (
    <div className="question-block question-block--wide">
      <p className="step-label">04 / MY DAY</p>
      <h1>
        THREE MOMENTS.
        <br />
        THAT'S ENOUGH.
      </h1>
      <div className="moments-grid">
        {plan.moments.map((moment, index) => (
          <div className="moment-field" key={moment.period}>
            <label htmlFor={`${moment.period}-activity`}>{moment.period.toUpperCase()}</label>
            <input
              className="time-input"
              type="time"
              value={moment.time}
              onChange={(event) => updatePlan({ moments: updateMoment(plan.moments, index, { time: event.target.value }) })}
              aria-label={`${moment.period} time`}
            />
            <input
              id={`${moment.period}-activity`}
              className="text-input"
              value={moment.activity}
              maxLength={42}
              placeholder={index === 0 ? "Attend class" : index === 1 ? "Work on project" : "Go to the gym"}
              onChange={(event) => updatePlan({ moments: updateMoment(plan.moments, index, { activity: event.target.value }) })}
            />
          </div>
        ))}
      </div>
      <DayTimeline plan={plan} compact />
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
