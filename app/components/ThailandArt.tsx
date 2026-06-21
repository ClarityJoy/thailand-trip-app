"use client";

// איור נוף תאילנד לכרטיס הראשי — שקיעה ורודה, ים, דקלים, סירת לונגטייל ומקדש
export function ThailandArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 260" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="thaiSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9A8D4" />
          <stop offset="0.55" stopColor="#FBA7C0" />
          <stop offset="1" stopColor="#FDD0A8" />
        </linearGradient>
        <linearGradient id="thaiSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#67C7D6" />
          <stop offset="1" stopColor="#3FA8C0" />
        </linearGradient>
      </defs>

      {/* שמיים */}
      <rect width="400" height="260" fill="url(#thaiSky)" />
      {/* שמש */}
      <circle cx="300" cy="92" r="40" fill="#FFE3B0" opacity="0.95" />
      <circle cx="300" cy="92" r="40" fill="#FFF2D6" opacity="0.5" />

      {/* הרים/איים רחוקים */}
      <path d="M0 150 Q70 110 150 150 T320 145 T400 150 L400 175 L0 175 Z" fill="#E892B6" opacity="0.55" />

      {/* ים */}
      <rect y="165" width="400" height="95" fill="url(#thaiSea)" />
      <path d="M0 178 Q60 170 120 178 T240 178 T360 178 T480 178 L480 260 L0 260 Z" fill="#4FB3C7" opacity="0.7" />
      {/* השתקפות שמש */}
      <ellipse cx="300" cy="185" rx="34" ry="6" fill="#FFE3B0" opacity="0.6" />

      {/* מקדש על האי משמאל */}
      <g fill="#C76591" opacity="0.9">
        <polygon points="60,150 74,120 88,150" />
        <rect x="66" y="148" width="16" height="20" />
      </g>

      {/* סירת לונגטייל */}
      <g>
        <path d="M150 205 q30 14 70 0 l-8 10 q-27 9 -54 0 Z" fill="#D14D8B" />
        <rect x="182" y="186" width="4" height="22" fill="#8a3d63" />
        <path d="M186 190 l26 -8 -2 8 Z" fill="#FFC857" />
      </g>

      {/* דקל ימני */}
      <g>
        <path d="M356 200 Q352 150 372 120" stroke="#7a3b56" strokeWidth="6" fill="none" />
        <g fill="#149e86">
          <path d="M372 120 Q344 108 326 120 Q350 118 372 126 Z" />
          <path d="M372 120 Q400 106 418 120 Q392 118 372 126 Z" />
          <path d="M372 120 Q362 96 378 84 Q378 108 376 124 Z" />
        </g>
      </g>
      {/* דקל שמאלי קטן */}
      <g opacity="0.9">
        <path d="M28 210 Q26 175 40 156" stroke="#7a3b56" strokeWidth="5" fill="none" />
        <g fill="#16a98f">
          <path d="M40 156 Q18 148 4 158 Q24 156 40 162 Z" />
          <path d="M40 156 Q62 146 78 156 Q56 156 40 162 Z" />
        </g>
      </g>

      {/* ציפורים */}
      <g stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.8">
        <path d="M120 70 q6 -6 12 0 q6 -6 12 0" />
        <path d="M150 56 q5 -5 10 0 q5 -5 10 0" />
      </g>
    </svg>
  );
}
