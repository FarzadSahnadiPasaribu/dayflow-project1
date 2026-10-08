import type { DayPlan, EnergyLevel } from "../../types/dayPlan";
import { ChoiceButton } from "../ui/ChoiceButton";

type EnergyStepProps = {
  plan: DayPlan;
  error?: string;
  updatePlan: (patch: Partial<DayPlan>) => void;
};

const ENERGY_OPTIONS: { value: EnergyLevel; label: string; marker: string }[] = [
  { value: "low", label: "LOW", marker: "REST" },
  { value: "okay", label: "OKAY", marker: "STEADY" },
  { value: "good", label: "GOOD", marker: "BRIGHT" },
  { value: "great", label: "GREAT", marker: "FULL" },
];

export function EnergyStep({ plan, error, updatePlan }: EnergyStepProps) {
  return (
    <div className="question-block">
      <p className="step-label">03 / ENERGY</p>
      <h1>
        HOW ARE YOU
        <br />
        FEELING TODAY?
      </h1>
      <div className="energy-grid" role="group" aria-label="Energy level">
        {ENERGY_OPTIONS.map((option) => (
          <ChoiceButton
            key={option.value}
            active={plan.energy === option.value}
            onClick={() => updatePlan({ energy: option.value })}
          >
            <span>{option.marker}</span>
            {option.label}
          </ChoiceButton>
        ))}
      </div>
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
