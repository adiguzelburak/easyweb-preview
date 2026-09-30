const ALERTS = [
  { label: "M5.8 · Japan", left: "6%", top: "13%" },
  { label: "Flood · Brazil", left: "24%", top: "20%" },
  { label: "Wildfire · Canada", left: "36%", top: "9%" },
];

const BLIPS = [
  { left: "58%", top: "30%", delay: "0s" },
  { left: "72%", top: "52%", delay: "0.8s" },
  { left: "40%", top: "44%", delay: "1.6s" },
  { left: "63%", top: "68%", delay: "2.4s" },
];

// GlobeAlert's left half: live alert pins up top and a sweeping radar in the corner.
export function AlertSignals() {
  return (
    <div aria-hidden className="absolute inset-0 hidden lg:block">
      {ALERTS.map((alert, index) => (
        <div
          key={alert.label}
          className="absolute flex animate-float items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-paper/85 ring-1 ring-white/12 backdrop-blur-md motion-reduce:animate-none"
          style={{ left: alert.left, top: alert.top, animationDelay: `${index * -2}s` }}
        >
          <span className="relative grid size-2.5 place-items-center">
            <span className="absolute size-full animate-ping rounded-full bg-alert/70 motion-reduce:animate-none" />
            <span className="size-2.5 rounded-full bg-alert" />
          </span>
          {alert.label}
        </div>
      ))}

      <div className="absolute -bottom-[34svh] -left-[20svh] aspect-square w-[72svh] overflow-hidden rounded-full">
        <svg viewBox="0 0 200 200" fill="none" stroke="#f6f1e9" strokeOpacity="0.12" className="absolute inset-0 size-full">
          {[96, 72, 48, 24].map((radius) => (
            <circle key={radius} cx="100" cy="100" r={radius} />
          ))}
          <path d="M100 4v192M4 100h192" />
        </svg>
        <div className="absolute inset-0 animate-sweep rounded-full bg-[conic-gradient(from_0deg,rgba(255,59,48,0.35),transparent_22%)] motion-reduce:animate-none" />
        {BLIPS.map((blip) => (
          <span key={blip.left + blip.top} className="absolute size-2 rounded-full bg-alert" style={{ left: blip.left, top: blip.top }}>
            <span
              className="absolute inset-0 animate-ping rounded-full bg-alert motion-reduce:animate-none"
              style={{ animationDelay: blip.delay }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
