export type MissionCategory = "study" | "work" | "health" | "personal";

export type EnergyLevel = "low" | "okay" | "good" | "great";

export type MomentPeriod = "morning" | "afternoon" | "evening";

export type DayMoment = {
  period: MomentPeriod;
  time: string;
  activity: string;
};

export type DayPlan = {
  wakeTime: string;
  mission: string;
  category: MissionCategory | "";
  energy: EnergyLevel | "";
  moments: DayMoment[];
  windDownTime: string;
};
