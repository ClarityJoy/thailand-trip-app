"use client";
import { useRef, useEffect } from "react";
import { ITINERARY, DESTINATIONS } from "../data/trip";
import { hebDate, currentDayIndex } from "../lib/dates";
import { ScreenHeader, Card, Pill } from "../components/ui";
import { itemIcon, mapsUrl } from "./itemIcon";
import { ExternalLink } from "lucide-react";

export default function Itinerary({ go }: { go: (t: string, p?: any) => void }) {
  const todayIdx = currentDayIndex();
  const todayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    todayRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="pb-6">
      <ScreenHeader title="המסלול" subtitle="15 ימים · בנגקוק → קו טאו → קו סמוי → בנגקוק" />
      <div className="px-4 pt-3 space-y-5">
        {ITINERARY.map((day, di) => {
          const dest = DESTINATIONS.find((d) => d.id === day.cityId)!;
          const isToday = di === todayIdx;
          return (
            <div key={day.date} ref={isToday ? todayRef : null}>
              <div className="flex items-center gap-2 px-1 mb-2">
                <div
                  className={`w-12 shrink-0 text-center rounded-xl py-1 ${
                    isToday ? "bg-coral text-white" : "bg-white text-ink shadow-sm"
                  }`}
                >
                  <div className="text-[10px] leading-none opacity-70">{day.weekday}</div>
                  <div className="font-display text-lg leading-tight">{day.date.slice(8)}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base text-ink truncate">{day.label}</p>
                  <p className="text-xs text-ink/50">{hebDate(day.date)} · {dest.name} {dest.emoji}</p>
                </div>
                {isToday && <Pill tone="coral">היום</Pill>}
              </div>

              <Card className="overflow-hidden">
                {day.items.map((it, ii) => {
                  const Icon = itemIcon(it.type);
                  const hasMap = !!it.coords || !!it.place;
                  return (
                    <a
                      key={it.id}
                      href={hasMap ? mapsUrl(it.coords?.lat, it.coords?.lng, it.place) : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 ${
                        ii > 0 ? "border-t border-ink/5" : ""
                      } ${hasMap ? "active:bg-ink/[0.02]" : ""}`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ink font-medium">{it.title}</p>
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                          {it.place && <span className="text-xs text-ink/50">{it.place}</span>}
                          {it.note && <span className="text-[11px] text-ink/40">· {it.note}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        {it.time && <span className="text-sm font-semibold text-ink/70">{it.time}</span>}
                        {hasMap && <ExternalLink className="w-3.5 h-3.5 text-teal-600" />}
                      </div>
                    </a>
                  );
                })}
              </Card>
            </div>
          );
        })}
        <button
          onClick={() => go("map")}
          className="w-full py-3 rounded-2xl bg-teal-600 text-white font-medium active:scale-[0.99] transition"
        >
          הצג את כל המסלול על המפה 🗺️
        </button>
      </div>
    </div>
  );
}
