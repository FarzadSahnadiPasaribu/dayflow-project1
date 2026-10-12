import { clamp } from "./time";

const STOPS = [
  {
    minute: 300,
    top: [18, 28, 58],
    mid: [50, 55, 94],
    bottom: [139, 104, 112],
    horizon: [227, 148, 126],
    landscape: [37, 49, 73],
    foreground: [25, 35, 55],
  },
  {
    minute: 390,
    top: [142, 176, 207],
    mid: [240, 192, 168],
    bottom: [254, 229, 194],
    horizon: [255, 203, 158],
    landscape: [82, 103, 118],
    foreground: [48, 71, 83],
  },
  {
    minute: 540,
    top: [126, 183, 219],
    mid: [205, 227, 231],
    bottom: [250, 241, 216],
    horizon: [255, 231, 191],
    landscape: [99, 132, 139],
    foreground: [64, 92, 95],
  },
  {
    minute: 720,
    top: [90, 162, 217],
    mid: [178, 218, 232],
    bottom: [255, 246, 216],
    horizon: [255, 238, 200],
    landscape: [90, 131, 128],
    foreground: [53, 85, 82],
  },
  {
    minute: 990,
    top: [92, 135, 187],
    mid: [238, 160, 132],
    bottom: [255, 210, 166],
    horizon: [244, 145, 111],
    landscape: [85, 88, 104],
    foreground: [47, 55, 72],
  },
  {
    minute: 1140,
    top: [55, 60, 112],
    mid: [137, 104, 159],
    bottom: [224, 166, 153],
    horizon: [202, 136, 145],
    landscape: [55, 60, 86],
    foreground: [31, 38, 60],
  },
  {
    minute: 1320,
    top: [12, 20, 46],
    mid: [28, 34, 75],
    bottom: [69, 62, 105],
    horizon: [95, 73, 113],
    landscape: [28, 38, 63],
    foreground: [15, 23, 42],
  },
  {
    minute: 1440,
    top: [9, 17, 40],
    mid: [20, 27, 62],
    bottom: [48, 49, 90],
    horizon: [65, 57, 100],
    landscape: [22, 31, 55],
    foreground: [11, 18, 34],
  },
];

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function mixColor(start, end, amount) {
  const color = start.map((channel, index) => Math.round(lerp(channel, end[index], amount)));
  return `rgb(${color[0]} ${color[1]} ${color[2]})`;
}

function findStops(minutes) {
  const current = clamp(minutes, STOPS[0].minute, STOPS[STOPS.length - 1].minute);
  for (let index = 0; index < STOPS.length - 1; index += 1) {
    const start = STOPS[index];
    const end = STOPS[index + 1];
    if (current >= start.minute && current <= end.minute) {
      return {
        start,
        end,
        amount: (current - start.minute) / (end.minute - start.minute),
      };
    }
  }

  return { start: STOPS[0], end: STOPS[0], amount: 0 };
}

function getSun(minutes) {
  const daylightStart = 330;
  const daylightEnd = 1170;
  const daylightProgress = clamp((minutes - daylightStart) / (daylightEnd - daylightStart), 0, 1);
  const x = lerp(11, 89, daylightProgress);
  const y = 79 - Math.sin(daylightProgress * Math.PI) * 58;
  const rise = clamp((minutes - 310) / 95, 0, 1);
  const set = 1 - clamp((minutes - 1080) / 140, 0, 1);

  return {
    x,
    y,
    opacity: clamp(Math.min(rise, set), 0, 1),
  };
}

function getMoon(minutes) {
  const nightProgress =
    minutes >= 1110 ? clamp((minutes - 1110) / 330, 0, 1) : clamp((minutes + 330) / 660, 0, 1);
  return {
    x: lerp(83, 55, nightProgress),
    y: lerp(28, 15, nightProgress),
    opacity: clamp((minutes - 1080) / 180, 0, 1),
  };
}

function energyModifiers(energy) {
  switch (energy) {
    case "low":
      return { brightness: 0.88, cloudOpacity: 0.86, cloudSpeed: 0.76 };
    case "good":
      return { brightness: 1.06, cloudOpacity: 0.66, cloudSpeed: 1.12 };
    case "great":
      return { brightness: 1.12, cloudOpacity: 0.55, cloudSpeed: 1.24 };
    default:
      return { brightness: 1, cloudOpacity: 0.72, cloudSpeed: 1 };
  }
}

export function getEnvironmentForTime(minutes, energy = "") {
  const { start, end, amount } = findStops(minutes);
  const sun = getSun(minutes);
  const moon = getMoon(minutes);
  const energyState = energyModifiers(energy);
  const starOpacity = clamp((minutes - 1110) / 190, 0, 1);
  const buildingLights = clamp((minutes - 1050) / 190, 0, 1);

  return {
    skyTop: mixColor(start.top, end.top, amount),
    skyMid: mixColor(start.mid, end.mid, amount),
    skyBottom: mixColor(start.bottom, end.bottom, amount),
    horizon: mixColor(start.horizon, end.horizon, amount),
    sunX: sun.x,
    sunY: sun.y,
    sunOpacity: sun.opacity,
    moonX: moon.x,
    moonY: moon.y,
    moonOpacity: moon.opacity,
    starOpacity,
    landscapeTone: mixColor(start.landscape, end.landscape, amount),
    foregroundTone: mixColor(start.foreground, end.foreground, amount),
    buildingLights,
    cloudOpacity: energyState.cloudOpacity,
    cloudSpeed: energyState.cloudSpeed,
    brightness: energyState.brightness,
  };
}
