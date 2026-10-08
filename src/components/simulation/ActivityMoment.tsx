import { motion } from "motion/react";
import type { DayMoment } from "../../types/dayPlan";

type ActivityMomentProps = {
  moment: DayMoment;
};

export function ActivityMoment({ moment }: ActivityMomentProps) {
  return (
    <motion.div
      className="activity-moment"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <span>{moment.period.toUpperCase()}</span>
      <strong>{moment.activity}</strong>
      <em>{moment.time}</em>
    </motion.div>
  );
}
