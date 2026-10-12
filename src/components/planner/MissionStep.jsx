import { ChoiceButton } from "../ui/ChoiceButton";

const CATEGORIES = [
  { value: "study", label: "STUDY" },
  { value: "work", label: "WORK" },
  { value: "health", label: "HEALTH" },
  { value: "personal", label: "PERSONAL" },
];

export function MissionStep({ plan, error, updatePlan }) {
  return (
    <div className="question-block">
      <p className="step-label">02 / MAIN MISSION</p>
      <h1>
        WHAT MATTERS
        <br />
        MOST TODAY?
      </h1>
      <label className="field-label" htmlFor="mission">
        Today's mission
      </label>
      <input
        id="mission"
        className="text-input text-input--large"
        value={plan.mission}
        maxLength={60}
        placeholder="Finish my React project"
        onChange={(event) => updatePlan({ mission: event.target.value })}
        aria-describedby={error ? "mission-error" : undefined}
      />
      <div className="choice-row" role="group" aria-label="Mission category">
        {CATEGORIES.map((category) => (
          <ChoiceButton
            key={category.value}
            active={plan.category === category.value}
            onClick={() => updatePlan({ category: category.value })}
          >
            {category.label}
          </ChoiceButton>
        ))}
      </div>
      {error ? (
        <p id="mission-error" className="form-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
