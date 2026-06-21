"use client";
import { useEffect, useState } from "react";
import { Play, Square, Headphones } from "lucide-react";

export function PodcastCard({ title, script }: { title: string; script: string[] }) {
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      try { window.speechSynthesis?.cancel(); } catch {}
    };
  }, []);

  const toggle = () => {
    if (!supported) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(script.join("\n"));
    u.lang = "he-IL";
    u.rate = 0.95;
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(u);
    setPlaying(true);
  };

  return (
    <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(28,43,42,0.06)]">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          aria-label={playing ? "עצור" : "נגן"}
          className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 active:scale-95 transition"
        >
          {playing ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5 -scale-x-100" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-white/80 text-xs">
            <Headphones className="w-3.5 h-3.5" /> פודקאסט לילדים
          </div>
          <p className="font-display text-lg leading-tight">{title}</p>
        </div>
      </div>

      <div className="mt-3 space-y-2 bg-white/10 rounded-xl p-3">
        {script.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-white/95">{p}</p>
        ))}
      </div>

      {!supported && (
        <p className="text-[11px] text-white/70 mt-2">ההקראה בקול לא נתמכת בדפדפן הזה — אפשר לקרוא את הטקסט למעלה.</p>
      )}
    </div>
  );
}
