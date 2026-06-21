"use client";
import { useState } from "react";
import { DESTINATIONS } from "../data/trip";
import { ScreenHeader, Card, Pill } from "../components/ui";
import { useWeather, weatherInfo } from "../lib/live";

export default function Weather({ onBack }: { onBack: () => void }) {
  const [cid, setCid] = useState(DESTINATIONS[0].id);
  const dest = DESTINATIONS.find((d) => d.id === cid)!;
  const { data, loading } = useWeather(dest.coords);
  const wi = data ? weatherInfo(data.code) : null;

  const dayName = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("he-IL", { weekday: "short" });

  return (
    <div className="pb-6">
      <ScreenHeader title="מזג אוויר" subtitle="תחזית 5 ימים" onBack={onBack} />
      <div className="px-4 pt-3">
        <div className="flex gap-2 mb-4">
          {DESTINATIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setCid(d.id)}
              className={`flex-1 py-2 rounded-xl text-sm transition ${
                d.id === cid ? "bg-pink-600 text-white" : "bg-white text-ink/70 shadow-sm"
              }`}
            >
              {d.emoji} {d.name}
            </button>
          ))}
        </div>

        <Card className="p-6 text-center bg-gradient-to-br from-sky-400 to-pink-500 text-white">
          {loading ? (
            <p>טוען…</p>
          ) : (
            <>
              <div className="text-7xl">{wi?.emoji}</div>
              <div className="font-display text-6xl mt-2">{data?.tempC}°</div>
              <p className="text-white/90 mt-1">{wi?.label}</p>
              <p className="text-white/70 text-sm mt-1">רוח {data?.windKph} קמ"ש</p>
              {data?.offline && (
                <div className="mt-2 inline-block"><Pill tone="gray">לא מחובר — נתון מקורב</Pill></div>
              )}
            </>
          )}
        </Card>

        {data && data.daily.length > 0 && (
          <Card className="mt-4 p-2 flex justify-between">
            {data.daily.map((d) => {
              const i = weatherInfo(d.code);
              return (
                <div key={d.date} className="flex-1 text-center py-2">
                  <div className="text-xs text-ink/50">{dayName(d.date)}</div>
                  <div className="text-2xl my-1">{i.emoji}</div>
                  <div className="text-sm text-ink font-medium">{d.max}°</div>
                  <div className="text-xs text-ink/40">{d.min}°</div>
                </div>
              );
            })}
          </Card>
        )}

        <p className="text-[11px] text-ink/40 text-center mt-4">
          יולי בתאילנד = עונת הגשמים. בדרך כלל חם ולח עם ממטרים קצרים אחה"צ. ☔
        </p>
      </div>
    </div>
  );
}
