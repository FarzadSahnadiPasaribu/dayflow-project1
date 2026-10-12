import { sliderMinutesToTime } from "../../utils/time";

export function TimeSlider({
  id,
  label,
  value,
  min,
  max,
  step = 15,
  minLabel,
  maxLabel,
  onChange,
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="time-slider">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <output className="time-slider__value" htmlFor={id}>
        {sliderMinutesToTime(value)}
      </output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        style={{ "--slider-progress": `${percent}%` }}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="time-slider__labels" aria-hidden="true">
        <span>{minLabel ?? sliderMinutesToTime(min)}</span>
        <span>{maxLabel ?? sliderMinutesToTime(max)}</span>
      </div>
    </div>
  );
}
