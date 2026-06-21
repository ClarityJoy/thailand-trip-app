"use client";
import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

// כותרת מסך עם כפתור חזרה (RTL — החץ מצביע ימינה לחזרה)
export function ScreenHeader({
  title,
  subtitle,
  onBack,
  right,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: ReactNode;
}) {
  return (
    <div className="sticky top-0 z-20 bg-sand/95 backdrop-blur border-b border-ink/5 px-4 pt-3 pb-3">
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="חזרה"
            className="shrink-0 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center active:scale-95 transition"
          >
            <ChevronLeft className="w-5 h-5 -scale-x-100 text-ink" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-xl text-ink leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-xs text-ink/50 truncate">{subtitle}</p>}
        </div>
        {right}
      </div>
    </div>
  );
}

export function Card({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-[0_2px_12px_rgba(28,43,42,0.06)] ${
        onClick ? "active:scale-[0.99] transition cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  tone = "teal",
}: {
  children: ReactNode;
  tone?: "teal" | "coral" | "amber" | "gray" | "sky";
}) {
  const tones: Record<string, string> = {
    teal: "bg-pink-50 text-pink-700",
    coral: "bg-coral/10 text-coral",
    amber: "bg-amber-50 text-amber-700",
    gray: "bg-ink/5 text-ink/60",
    sky: "bg-sky-50 text-sky-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-base text-ink/80 px-1 mt-5 mb-2">{children}</h2>;
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return <p className="text-center text-sm text-ink/40 py-8">{children}</p>;
}
