import { motion } from "motion/react";
import type { EnvironmentState } from "../../utils/environment";

type CloudsProps = {
  environment: EnvironmentState;
};

const CLOUDS = [
  { top: "16%", left: "-14%", width: 210, duration: 80, delay: 0 },
  { top: "28%", left: "44%", width: 160, duration: 96, delay: -32 },
  { top: "10%", left: "72%", width: 120, duration: 112, delay: -57 },
];

export function Clouds({ environment }: CloudsProps) {
  return (
    <div className="cloud-layer" style={{ opacity: environment.cloudOpacity }} aria-hidden="true">
      {CLOUDS.map((cloud) => (
        <motion.div
          key={`${cloud.top}-${cloud.left}`}
          className="cloud"
          style={{ top: cloud.top, left: cloud.left, width: cloud.width }}
          animate={{ x: ["0vw", "126vw"] }}
          transition={{
            duration: cloud.duration / environment.cloudSpeed,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span />
          <span />
          <span />
        </motion.div>
      ))}
    </div>
  );
}
