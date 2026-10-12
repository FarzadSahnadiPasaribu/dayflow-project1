import { motion } from "motion/react";
export function ChoiceButton({ active, children, className = "", ...props }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      animate={{ scale: active ? 1.03 : 1 }}
      className={`choice-button ${active ? "is-active" : ""} ${className}`}
      aria-pressed={active}
      {...props}
    >
      {children}
    </motion.button>
  );
}
