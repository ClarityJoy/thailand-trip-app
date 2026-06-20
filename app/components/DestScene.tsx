"use client";
import { DestId } from "../data/trip";

// איורי-רקע בסגנון "ספר ילדים" לכל יעד — וקטוריים, עובדים אופליין
export function DestScene({ id, className = "" }: { id: DestId; className?: string }) {
  if (id === "bangkok") return <Bangkok className={className} />;
  if (id === "kohtao") return <KohTao className={className} />;
  return <KohSamui className={className} />;
}

function Bangkok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bkkSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#a7f3d0" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#bkkSky)" />
      <circle cx="330" cy="50" r="26" fill="#FFE08A" />
      <path d="M0 175 Q200 150 400 175 L400 200 L0 200 Z" fill="#5eead4" opacity="0.7" />
      <g fill="#0f766e">
        <polygon points="200,40 230,120 170,120" />
        <polygon points="200,70 245,140 155,140" />
        <rect x="178" y="135" width="44" height="45" />
        <polygon points="200,118 212,135 188,135" fill="#FFC857" />
      </g>
      <rect x="195" y="20" width="10" height="24" fill="#FFC857" />
      <g fill="#14b8a6">
        <polygon points="110,90 128,150 92,150" />
        <polygon points="290,95 308,150 272,150" />
      </g>
    </svg>
  );
}

function KohTao({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="taoSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#0e7490" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#taoSky)" />
      <rect y="90" width="400" height="110" fill="#0891b2" />
      <path d="M0 120 Q100 105 200 120 T400 120 L400 200 L0 200 Z" fill="#0e7490" />
      <ellipse cx="120" cy="92" rx="70" ry="22" fill="#15803d" />
      <ellipse cx="300" cy="96" rx="55" ry="18" fill="#166534" />
      <g>
        <ellipse cx="200" cy="160" rx="34" ry="22" fill="#16a34a" />
        <circle cx="200" cy="160" r="13" fill="#22c55e" />
        <circle cx="236" cy="156" r="9" fill="#16a34a" />
        <ellipse cx="172" cy="150" rx="8" ry="5" fill="#16a34a" />
        <ellipse cx="172" cy="172" rx="8" ry="5" fill="#16a34a" />
        <circle cx="240" cy="153" r="1.6" fill="#000" />
      </g>
      <circle cx="60" cy="45" r="20" fill="#FFE08A" />
    </svg>
  );
}

function KohSamui({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="samuiSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fcd34d" />
          <stop offset="1" stopColor="#fb923c" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#samuiSky)" />
      <circle cx="200" cy="70" r="34" fill="#fff7ed" opacity="0.85" />
      <rect y="140" width="400" height="60" fill="#38bdf8" />
      <path d="M0 165 Q200 150 400 165 L400 200 L0 200 Z" fill="#fde68a" />
      <g>
        <path d="M70 165 Q66 120 80 95" stroke="#92400e" strokeWidth="7" fill="none" />
        <g fill="#15803d">
          <path d="M80 95 Q50 80 30 92 Q55 92 80 100 Z" />
          <path d="M80 95 Q110 78 132 90 Q104 92 80 100 Z" />
          <path d="M80 95 Q70 70 86 56 Q86 80 84 98 Z" />
        </g>
        <circle cx="80" cy="100" r="4" fill="#a16207" />
      </g>
      <circle cx="300" cy="178" r="9" fill="#78350f" />
      <circle cx="318" cy="182" r="7" fill="#92400e" />
    </svg>
  );
}
