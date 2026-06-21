"use client";
import { ATTRACTIONS, DESTINATIONS, DestId } from "../data/trip";
import { ScreenHeader, Card } from "../components/ui";
import { useLocal } from "../lib/store";
import { Check } from "lucide-react";

export default function Attractions({ onBack }: { onBack: () => void }) {
  const [done, setDone] = useLocal<Record<string, boolean>>("attractions", {});
  const total = ATTRACTIONS.length;
  const count = ATTRACTIONS.filter((a) => done[a.id]).length;

  const toggle = (id: string) => setDone((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="pb-6">
      <ScreenHeader title="אטרקציות" subtitle="לסמן ✓ ככל שמסיימים" onBack={onBack} />
      <div className="px-4 pt-3">
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display text-ink">סימנו {count} מתוך {total}</span>
            <span className="text-2xl">{count === total ? "🏆" : "🎯"}</span>
          </div>
          <div className="h-2.5 bg-ink/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-pink-500 rounded-full transition-all"
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
        </Card>

        {(["kohtao", "kohsamui", "bangkok"] as DestId[]).map((cid) => {
          const dest = DESTINATIONS.find((d) => d.id === cid)!;
          const items = ATTRACTIONS.filter((a) => a.cityId === cid);
          return (
            <div key={cid} className="mb-4">
              <h2 className="font-display text-base text-ink/80 px-1 mb-2">{dest.name} {dest.emoji}</h2>
              <Card className="overflow-hidden">
                {items.map((a, i) => {
                  const isDone = !!done[a.id];
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggle(a.id)}
                      className={`w-full flex items-center gap-3 p-3 text-right ${i > 0 ? "border-t border-ink/5" : ""}`}
                    >
                      <span className="text-2xl shrink-0">{a.emoji}</span>
                      <span className={`flex-1 text-sm ${isDone ? "line-through text-ink/35" : "text-ink"}`}>
                        {a.title}
                      </span>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          isDone ? "bg-pink-500 text-white" : "border-2 border-ink/15"
                        }`}
                      >
                        {isDone && <Check className="w-4 h-4" />}
                      </span>
                    </button>
                  );
                })}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
