import { getEnvironmentForTime } from "../../utils/environment";
import { Clouds } from "./Clouds";
import { Landscape } from "./Landscape";
import { Moon } from "./Moon";
import { Stars } from "./Stars";
import { Sun } from "./Sun";

export function SkyScene({ timeMinutes, energy = "", plan, showMissionNote = false }) {
  const environment = getEnvironmentForTime(timeMinutes, energy);
  const mission = plan?.mission.trim();

  return (
    <section
      className="sky-scene"
      aria-label="Animated day landscape"
      style={
        {
          "--sky-top": environment.skyTop,
          "--sky-mid": environment.skyMid,
          "--sky-bottom": environment.skyBottom,
          "--horizon": environment.horizon,
          "--scene-brightness": environment.brightness,
        }
      }
    >
      <div className="sky-gradient" />
      <Stars opacity={environment.starOpacity} />
      <Moon environment={environment} />
      <Sun environment={environment} />
      <Clouds environment={environment} />
      {showMissionNote && mission ? (
        <div className="mission-note" aria-live="polite">
          <span>TODAY</span>
          <strong>{mission}</strong>
        </div>
      ) : null}
      {energy === "great" && environment.sunOpacity > 0.2 ? <div className="birds" aria-hidden="true"><span /><span /></div> : null}
      <Landscape environment={environment} />
    </section>
  );
}
