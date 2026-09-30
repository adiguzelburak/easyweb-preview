import { useId } from "react";
import { polar } from "@/lib/geometry";

const WHEELS = [58, 184];
const WHEEL_Y = 71;
const BOLTS = Array.from({ length: 5 }, (_, index) => ((index * 72 - 90) * Math.PI) / 180);

const BODY =
  "M16 76C13 76 12 74 12 71V60C12 53 13 48 18 46L38 43C60 36 82 29 99 28H114C122 28 128 33 140 43C170 45 200 47 222 50C229 51 232 56 232 62V71C232 74 230 76 227 76H202.33A19 19 0 1 0 165.67 76H76.33A19 19 0 1 0 39.67 76Z";

export function CarArt({ className }: { className?: string }) {
  const id = useId();

  return (
    <svg viewBox="0 0 240 96" fill="none" className={className}>
      <defs>
        <linearGradient id={`${id}paint`} x1="0" y1="28" x2="0" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff6a55" />
          <stop offset="0.45" stopColor="#e3261b" />
          <stop offset="1" stopColor="#7d0d08" />
        </linearGradient>
        <linearGradient id={`${id}glass`} x1="0" y1="30" x2="0" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5b6470" />
          <stop offset="1" stopColor="#101418" />
        </linearGradient>
        <radialGradient id={`${id}rim`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#f4f4f4" />
          <stop offset="1" stopColor="#6d7075" />
        </radialGradient>
        <filter id={`${id}shadow`} x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      <ellipse cx="121" cy="87" rx="108" ry="4" fill="#000" opacity="0.7" filter={`url(#${id}shadow)`} />
      <path d={BODY} fill={`url(#${id}paint)`} />
      <path d="M60 42C76 35 90 31 101 31H112C118 31 123 35 132 42.5Z" fill={`url(#${id}glass)`} />
      <path d="M104 31L106 43" stroke="#e3261b" strokeWidth="2.4" />
      <path
        d="M40 44.5C62 38 84 31 99 30M141 45C172 47 200 49 221 52"
        stroke="#fff"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
      <path d="M150 47V73M104 44V73M18 56L231 58" stroke="#000" strokeOpacity="0.35" strokeWidth="0.8" />
      <rect x="226" y="53" width="6" height="5" rx="2" fill="#fff4cc" />
      <rect x="12" y="50" width="4" height="6" rx="1.5" fill="#ff2d1f" />
      <path d="M213 72H231M13 71H30" stroke="#c9ccd1" strokeWidth="2" strokeLinecap="round" />

      {WHEELS.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={WHEEL_Y} r="15" fill="#0b0b0b" />
          <circle cx={cx} cy={WHEEL_Y} r="9.5" fill={`url(#${id}rim)`} />
          {BOLTS.map((angle) => {
            const bolt = polar(cx, WHEEL_Y, 5.6, angle);
            return <circle key={angle} cx={bolt.x} cy={bolt.y} r="1.9" fill="#3a3d42" />;
          })}
          <circle cx={cx} cy={WHEEL_Y} r="2.2" fill="#2a2c30" />
        </g>
      ))}
    </svg>
  );
}
