import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { getPlanMomentMinutes, planTimeRange } from "../../utils/time";
import { Button } from "../ui/Button";
import { EnergyStep } from "./EnergyStep";
import { MissionStep } from "./MissionStep";
import { MomentsStep } from "./MomentsStep";
import { StepIndicator } from "./StepIndicator";
import { WakeUpStep } from "./WakeUpStep";
import { WindDownStep } from "./WindDownStep";

const TOTAL_STEPS = 5;

function validateStep(step, plan) {
  if (step === 1) {
    if (!plan.mission.trim()) return "Give the day one clear mission.";
    if (!plan.category) return "Choose the kind of day this mission belongs to.";
  }

  if (step === 2 && !plan.energy) return "Pick the energy you are working with today.";

  if (step === 3) {
    if (plan.moments.some((moment) => !moment.activity.trim())) return "Each moment needs one small activity.";
    const [morning, afternoon, evening] = plan.moments.map((moment) => getPlanMomentMinutes(moment.time));
    const { start } = planTimeRange(plan.wakeTime, plan.windDownTime);
    if (morning <= start) return "Your morning moment should come after you wake up.";
    if (afternoon <= morning) return "Your afternoon should come after your morning.";
    if (evening <= afternoon) return "Your evening should come after your afternoon.";
  }

  if (step === 4) {
    const { start, end } = planTimeRange(plan.wakeTime, plan.windDownTime);
    const moments = plan.moments.map((moment) => getPlanMomentMinutes(moment.time));
    if (end <= start) return "Your day needs room between waking and winding down.";
    if (moments.some((moment) => moment <= start || moment >= end)) {
      return "Keep all three moments between your wake-up and wind-down times.";
    }
  }

  return "";
}

export function Planner({ plan, updatePlan, onTimePreview, onStartSimulation }) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  function continueStep() {
    const validation = validateStep(step, plan);
    setError(validation);
    if (validation) return;

    if (step === TOTAL_STEPS - 1) {
      onStartSimulation();
      return;
    }

    setStep(step + 1);
  }

  function goBack() {
    setError("");
    setStep(Math.max(step - 1, 0));
  }

  function renderStep() {
    if (step === 0) {
      return (
        <WakeUpStep
          plan={plan}
          updatePlan={(patch) => {
            updatePlan(patch);
            onTimePreview(getPlanMomentMinutes(patch.wakeTime ?? plan.wakeTime));
          }}
        />
      );
    }
    if (step === 1) return <MissionStep plan={plan} updatePlan={updatePlan} error={error} />;
    if (step === 2) return <EnergyStep plan={plan} updatePlan={updatePlan} error={error} />;
    if (step === 3) return <MomentsStep plan={plan} updatePlan={updatePlan} error={error} />;
    return (
      <WindDownStep
        plan={plan}
        updatePlan={(patch) => {
          updatePlan(patch);
          if (patch.windDownTime) onTimePreview(getPlanMomentMinutes(patch.windDownTime));
        }}
        error={error}
      />
    );
  }

  return (
    <div className="planner-shell">
      <div className="planner-topline">
        <span>DAYFLOW</span>
        <span>{String(step + 1).padStart(2, "0")} / 05</span>
      </div>
      <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.36, ease: "easeOut" }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
      <div className="planner-actions">
        {step > 0 ? (
          <Button type="button" variant="quiet" onClick={goBack}>
            BACK
          </Button>
        ) : null}
        <Button type="button" onClick={continueStep}>
          {step === TOTAL_STEPS - 1 ? "START MY DAY →" : "CONTINUE →"}
        </Button>
      </div>
    </div>
  );
}
