import { getPlanMomentMinutes, planTimeRange, progressBetween } from "../../utils/time";

export function DayTimeline({ plan, currentMinutes, compact = false }) {
  const { start, end } = planTimeRange(plan.wakeTime, plan.windDownTime);
  const playhead = currentMinutes === undefined ? 0 : progressBetween(currentMinutes, start, end) * 100;

  return (
    <div className={`day-timeline ${compact ? "day-timeline--compact" : ""}`}>
      <div className="day-timeline__rail">
        <span className="day-timeline__endpoint">SUN</span>
        {plan.moments.map((moment) => {
          const position = progressBetween(getPlanMomentMinutes(moment.time), start, end) * 100;
          return (
            <span
              className="day-timeline__marker"
              key={moment.period}
              style={{ left: `${position}%` }}
              aria-label={`${moment.period} at ${moment.time}`}
            />
          );
        })}
        {currentMinutes !== undefined ? <span className="day-timeline__playhead" style={{ left: `${playhead}%` }} /> : null}
        <span className="day-timeline__endpoint">MOON</span>
      </div>
      <div className="day-timeline__items">
        {plan.moments.map((moment) => (
          <div key={moment.period}>
            <span>{moment.time}</span>
            <strong>{moment.activity || moment.period}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
