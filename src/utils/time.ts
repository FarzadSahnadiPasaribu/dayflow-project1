export const DAY_START_MINUTES = 300;
export const DAY_END_MINUTES = 1440;

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function timeToMinutes(time: string) {
  const [hours = "0", minutes = "0"] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
}

export function minutesToTime(totalMinutes: number) {
  const rounded = Math.round(totalMinutes);
  const normalized = ((rounded % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function sliderMinutesToTime(minutes: number) {
  return minutes >= DAY_END_MINUTES ? "00:00" : minutesToTime(minutes);
}

export function windDownToAbsoluteMinutes(time: string) {
  const minutes = timeToMinutes(time);
  return minutes === 0 ? DAY_END_MINUTES : minutes;
}

export function planTimeRange(wakeTime: string, windDownTime: string) {
  return {
    start: timeToMinutes(wakeTime),
    end: windDownToAbsoluteMinutes(windDownTime),
  };
}

export function getPlanMomentMinutes(time: string) {
  const minutes = timeToMinutes(time);
  return minutes === 0 ? DAY_END_MINUTES : minutes;
}

export function progressBetween(value: number, start: number, end: number) {
  if (end <= start) return 0;
  return clamp((value - start) / (end - start), 0, 1);
}
