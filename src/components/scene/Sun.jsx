import { motion } from "motion/react";
export function Sun({ environment }) {
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
