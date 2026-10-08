import { motion } from "motion/react";

const STARS = [
  [9, 21, 0.7],
  [15, 35, 0.4],
  [21, 14, 0.8],
  [29, 28, 0.5],
  [37, 18, 0.9],
  [45, 33, 0.4],
  [52, 13, 0.7],
  [58, 26, 0.5],
  [65, 18, 0.8],
  [72, 35, 0.45],
  [79, 12, 0.75],
  [86, 24, 0.5],
  [92, 39, 0.35],
  [33, 43, 0.35],
  [68, 46, 0.3],
  [12, 51, 0.28],
  [49, 49, 0.32],
  [82, 52, 0.3],
];

type StarsProps = {
  opacity: number;
};

export function Stars({ opacity }: StarsProps) {
  return (
    <motion.div className="stars" style={{ opacity }} animate={{ opacity }} transition={{ duration: 0.8 }} aria-hidden="true">
      {STARS.map(([left, top, scale], index) => (
        <span
          key={`${left}-${top}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            transform: `scale(${scale})`,
            animationDelay: `${index * 0.37}s`,
          }}
        />
      ))}
    </motion.div>
  );
}
