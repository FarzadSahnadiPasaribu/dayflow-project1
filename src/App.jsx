import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Planner } from "./components/planner/Planner";
import { DaySimulation } from "./components/simulation/DaySimulation";
import { DayTimeline } from "./components/timeline/DayTimeline";
import { TimeScrubber } from "./components/timeline/TimeScrubber";
import { Button } from "./components/ui/Button";
import { SkyScene } from "./components/scene/SkyScene";
import { useStoredPlan } from "./hooks/useStoredPlan";
import { timeToMinutes, windDownToAbsoluteMinutes } from "./utils/time";

const DEFAULT_PLAN = {
  wakeTime: "07:00",
  mission: "",
  category: "",
  energy: "okay",
  moments: [
    { period: "morning", time: "08:00", activity: "" },
    { period: "afternoon", time: "14:00", activity: "" },
    { period: "evening", time: "19:00", activity: "" },
  ],
  windDownTime: "22:30",
};

function App() {
  const storage = useStoredPlan(DEFAULT_PLAN);
  const [plan, setPlan] = useState(storage.initialPlan);
  const [appState, setAppState] = useState("intro");
  const [previewMinutes, setPreviewMinutes] = useState(timeToMinutes(storage.initialPlan.wakeTime));
  const [scrubMinutes, setScrubMinutes] = useState(timeToMinutes(storage.initialPlan.wakeTime));

  const sceneTime = useMemo(() => {
    if (appState === "timeline") return scrubMinutes;
    if (appState === "complete") return windDownToAbsoluteMinutes(plan.windDownTime);
    if (appState === "intro") return 360;
    return previewMinutes;
  }, [appState, plan.windDownTime, previewMinutes, scrubMinutes]);

  function updatePlan(patch) {
    setPlan((current) => ({ ...current, ...patch }));
  }

  function startFreshPlan() {
    storage.clearPlan();
    setPlan(DEFAULT_PLAN);
    setPreviewMinutes(timeToMinutes(DEFAULT_PLAN.wakeTime));
    setScrubMinutes(timeToMinutes(DEFAULT_PLAN.wakeTime));
    setAppState("planner");
  }

  function startSimulation() {
    storage.savePlan(plan);
    setPreviewMinutes(timeToMinutes(plan.wakeTime));
    setAppState("simulation");
  }

  function editPlan() {
    setPreviewMinutes(timeToMinutes(plan.wakeTime));
    setAppState("planner");
  }

  return (
    <main className={`app app--${appState}`}>
      <SkyScene
        timeMinutes={sceneTime}
        energy={plan.energy}
        plan={plan}
        showMissionNote={appState === "planner" && Boolean(plan.mission.trim())}
      />

      <AnimatePresence mode="wait">
        {appState === "intro" ? (
          <motion.section
            key="intro"
            className="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <header className="brand">
              <strong>DAYFLOW</strong>
              <span>Design your day. Live your rhythm.</span>
            </header>
            <div className="intro__copy">
              <p>GOOD MORNING.</p>
              <h1>
                What kind of day
                <br />
                are we creating?
              </h1>
            </div>
            <div className="intro__actions">
              {storage.storedPlan ? (
                <Button
                  type="button"
                  onClick={() => {
                    setPlan(storage.storedPlan ?? DEFAULT_PLAN);
                    setPreviewMinutes(timeToMinutes((storage.storedPlan ?? DEFAULT_PLAN).wakeTime));
                    setAppState("planner");
                  }}
                >
                  CONTINUE MY DAY →
                </Button>
              ) : null}
              <Button type="button" variant={storage.storedPlan ? "secondary" : "primary"} onClick={startFreshPlan}>
                {storage.storedPlan ? "PLAN A NEW DAY" : "PLAN MY DAY →"}
              </Button>
            </div>
          </motion.section>
        ) : null}

        {appState === "planner" ? (
          <motion.section key="planner" className="planner-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Planner plan={plan} updatePlan={updatePlan} onTimePreview={setPreviewMinutes} onStartSimulation={startSimulation} />
          </motion.section>
        ) : null}

        {appState === "simulation" ? (
          <DaySimulation
            key="simulation"
            plan={plan}
            onTimeChange={setPreviewMinutes}
            onComplete={() => {
              setScrubMinutes(windDownToAbsoluteMinutes(plan.windDownTime));
              setAppState("complete");
            }}
          />
        ) : null}

        {appState === "complete" ? (
          <motion.section
            key="complete"
            className="complete"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="kicker">DAY COMPLETE.</p>
            <h1>
              You planned it.
              <br />
              Now make it happen.
            </h1>
            <div className="mission-finale">
              <span>TODAY'S MISSION</span>
              <strong>{plan.mission}</strong>
            </div>
            <div className="complete__actions">
              <Button
                type="button"
                onClick={() => {
                  setScrubMinutes(timeToMinutes(plan.wakeTime));
                  setAppState("timeline");
                }}
              >
                VIEW MY DAY
              </Button>
              <Button type="button" variant="secondary" onClick={editPlan}>
                EDIT PLAN
              </Button>
              <Button type="button" variant="quiet" onClick={startFreshPlan}>
                PLAN AGAIN
              </Button>
            </div>
          </motion.section>
        ) : null}

        {appState === "timeline" ? (
          <motion.section
            key="timeline"
            className="final-view"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="final-view__top">
              <p className="kicker">DAYFLOW</p>
              <h1>{plan.mission}</h1>
            </div>
            <TimeScrubber plan={plan} currentMinutes={scrubMinutes} onChange={setScrubMinutes} />
            <DayTimeline plan={plan} currentMinutes={scrubMinutes} />
            <div className="complete__actions">
              <Button type="button" variant="secondary" onClick={editPlan}>
                EDIT PLAN
              </Button>
              <Button type="button" variant="quiet" onClick={() => setAppState("complete")}>
                BACK
              </Button>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

export default App;
