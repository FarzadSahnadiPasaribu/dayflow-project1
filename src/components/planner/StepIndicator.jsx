export function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="step-indicator" aria-label={`Step ${currentStep + 1} of ${totalSteps}`}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <span key={index} className={index === currentStep ? "is-active" : ""} />
      ))}
    </div>
  );
}
