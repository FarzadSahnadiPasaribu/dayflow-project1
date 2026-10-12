import { motion } from "motion/react";
export function Moon({ environment }) {
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
