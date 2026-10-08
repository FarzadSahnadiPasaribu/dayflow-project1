import { motion } from "motion/react";
import type { EnvironmentState } from "../../utils/environment";

type MoonProps = {
  environment: EnvironmentState;
};

export function Moon({ environment }: MoonProps) {
  return (
    <motion.div
      className="moon"
      style={{
        left: `${environment.moonX}%`,
        top: `${environment.moonY}%`,
        opacity: environment.moonOpacity,
      }}
      animate={{
        left: `${environment.moonX}%`,
        top: `${environment.moonY}%`,
        opacity: environment.moonOpacity,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-hidden="true"
    >
      <span />
    </motion.div>
  );
}
