const WINDOWS = [
  [61.7, 75.6],
  [63.2, 70.4],
  [67.8, 73.1],
  [72.1, 77.8],
  [76.9, 72.5],
  [81.6, 78.2],
  [85.4, 73.4],
  [89.1, 80.1],
];

export function Landscape({ environment }) {
  return (
    <svg className="landscape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path
        className="hills hills--far"
        d="M0 76 C13 63 24 69 35 60 C48 49 61 65 73 56 C85 47 93 57 100 50 L100 100 L0 100 Z"
        fill={environment.landscapeTone}
        opacity="0.58"
      />
      <path
        className="hills hills--near"
        d="M0 83 C12 72 26 80 39 68 C51 57 65 77 78 64 C88 55 94 62 100 60 L100 100 L0 100 Z"
        fill={environment.landscapeTone}
        opacity="0.88"
      />
      <g className="city" fill={environment.foregroundTone}>
        <rect x="59" y="66" width="5" height="24" rx="0.4" />
        <rect x="65" y="61" width="6" height="29" rx="0.4" />
        <rect x="72" y="69" width="4.5" height="21" rx="0.4" />
        <rect x="78" y="63" width="7" height="27" rx="0.4" />
        <rect x="87" y="70" width="4.8" height="20" rx="0.4" />
      </g>
      <g className="windows" opacity={environment.buildingLights}>
        {WINDOWS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="0.8" height="1.1" rx="0.1" fill="#ffe0a2" />
        ))}
      </g>
      <path d="M0 91 C18 86 30 92 46 87 C67 80 83 89 100 83 L100 100 L0 100 Z" fill={environment.foregroundTone} />
      <path d="M0 96 C22 93 37 96 56 92 C74 89 87 94 100 90 L100 100 L0 100 Z" fill="#0b1527" opacity="0.35" />
    </svg>
  );
}
