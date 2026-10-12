import { motion } from "motion/react";
export function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`button button--${variant} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
