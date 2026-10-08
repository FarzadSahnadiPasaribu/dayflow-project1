import { motion } from "motion/react";
import type { EnvironmentState } from "../../utils/environment";

type SunProps = {
  environment: EnvironmentState;
};

export function Sun({ environment }: SunProps) {
  return (
    <motion.div
      className="sun"
      style={{
        left: `${environment.sunX}%`,
        top: `${environment.sunY}%`,
        opacity: environment.sunOpacity,
      }}
      animate={{
        left: `${environment.sunX}%`,
        top: `${environment.sunY}%`,
        opacity: environment.sunOpacity,
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      aria-hidden="true"
    />
  );
}
