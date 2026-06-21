"use client";
import { PACKING } from "../data/trip";
import { ScreenHeader, Card } from "../components/ui";
import { useLocal } from "../lib/store";
import { Check } from "lucide-react";

export default function Packing({ onBack }: { onBack: () => void }) {
  const [done, setDone] = useLocal<Record<string, boolean>>("packing", {});
  const allItems = PACKING.flatMap((c) => c.items.map((it) => `${c.id}:${it}`));
  const count = allItems.filter((k) => done[k]).length;
  const total = allItems.length;

  return (
    <div className="pb-6">
      <ScreenHeader title="רשימת אריזה" subtitle="מה לוקחים לתאילנד" onBack={onBack} />
      <div className="px-4 pt-3">
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display text-ink">ארזנו {count} מתוך {total}</span>
            <span className="text-2xl">{count === total ? "🧳✨" : "🧳"}</span>
          </div>
          <div className="h-2.5 bg-ink/5 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 rounded-full transition-all" style={{ width: `${(count / total) * 100}%` }} />
          </div>
        </Card>

        {PACKING.map((c) => (
          <div key={c.id} className="mb-4">
            <h2 className="font-display text-base text-ink/80 px-1 mb-2">{c.emoji} {c.label}</h2>
            <Card className="overflow-hidden">
              {c.items.map((it, i) => {
                const key = `${c.id}:${it}`;
                const isDone = !!done[key];
                return (
                  <button
                    key={key}
                    onClick={() => setDone((p) => ({ ...p, [key]: !p[key] }))}
                    className={`w-full flex items-center gap-3 p-3 text-right ${i > 0 ? "border-t border-ink/5" : ""}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isDone ? "bg-pink-500 text-white" : "border-2 border-ink/15"}`}>
                      {isDone && <Check className="w-4 h-4" />}
                    </span>
                    <span className={`flex-1 text-sm ${isDone ? "line-through text-ink/35" : "text-ink"}`}>{it}</span>
                  </button>
                );
              })}
            </Card>
          </div>
        ))}
        <p className="text-[11px] text-ink/40 text-center mt-2">הסימונים נשמרים במכשיר ועובדים בלי אינטרנט.</p>
      </div>
    </div>
  );
}
