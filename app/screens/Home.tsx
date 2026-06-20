"use client";
import { TRIP, DESTINATIONS, ITINERARY } from "../data/trip";
import {
  daysUntilTrip,
  tripPhase,
  todayPlan,
  currentHotel,
  currentDayIndex,
  hebDate,
} from "../lib/dates";
import { useWeather, weatherInfo } from "../lib/live";
import { Card, Pill } from "../components/ui";
import { itemIcon } from "./itemIcon";
import { MapPin, Plane, CalendarDays, Hotel as HotelIcon } from "lucide-react";

export default function Home({ go }: { go: (t: string, p?: any) => void }) {
  const phase = tripPhase();
  const plan = todayPlan();
  const hotel = currentHotel();
  const dayIdx = currentDayIndex();
  const cityId = plan?.cityId ?? "bangkok";
  const dest = DESTINATIONS.find((d) => d.id === cityId)!;
  const { data: weather } = useWeather(dest.coords);
  const wi = weather ? weatherInfo(weather.code) : null;

  return (
    <div className="pb-6">
      {/* כותרת מלון/גיבור */}
      <div className="relative bg-gradient-to-b from-teal-600 to-teal-700 text-white px-5 pt-6 pb-16 rounded-b-[32px] overflow-hidden">
        <div className="absolute -top-6 -left-6 text-[120px] opacity-10 select-none">{dest.emoji}</div>
        <p className="text-white/70 text-sm">{TRIP.title} · {TRIP.travelers}</p>

        {phase === "before" && (
          <div className="mt-6">
            <p className="text-white/80">עוד</p>
            <div className="flex items-end gap-2">
              <span className="font-display text-7xl leading-none">{daysUntilTrip()}</span>
              <span className="text-2xl mb-2">ימים</span>
            </div>
            <p className="text-white/80 mt-1">עד הטיסה לבנגקוק ✈️</p>
            <p className="text-white/60 text-sm mt-1">{hebDate(TRIP.startDate)} · טיסה EY 600, 01:20</p>
          </div>
        )}

        {phase === "during" && (
          <div className="mt-5">
            <p className="text-white/80 text-sm">יום {(dayIdx ?? 0) + 1} מתוך {TRIP.totalDays} · היום ב{dest.name}</p>
            <h1 className="font-display text-4xl mt-1">{dest.name} {dest.emoji}</h1>
            {hotel && (
              <div className="flex items-center gap-1.5 mt-2 text-white/85 text-sm">
                <HotelIcon className="w-4 h-4" /> {hotel.name}
              </div>
            )}
          </div>
        )}

        {phase === "after" && (
          <div className="mt-6">
            <h1 className="font-display text-4xl">ברוכים השבים! 🇮🇱</h1>
            <p className="text-white/80 mt-2">מקווים שנהניתם בתאילנד. הזיכרונות נשארים כאן.</p>
          </div>
        )}
      </div>

      {/* כרטיס מזג אוויר צף */}
      <div className="px-4 -mt-10">
        <Card className="p-4 flex items-center justify-between" onClick={() => go("weather")}>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{wi?.emoji ?? "🌡️"}</span>
            <div>
              <p className="font-display text-2xl text-ink">{weather ? `${weather.tempC}°` : "—"}</p>
              <p className="text-xs text-ink/50">{wi?.label ?? "טוען מזג אוויר…"} · {dest.name}</p>
            </div>
          </div>
          <Pill tone="teal"><MapPin className="w-3 h-3" /> {dest.nameEn}</Pill>
        </Card>
      </div>

      {/* לוז היום */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between px-1 mb-2">
          <h2 className="font-display text-base text-ink/80 flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" /> {phase === "before" ? "מתחילים בקרוב" : "התוכנית להיום"}
          </h2>
          <button className="text-xs text-teal-700" onClick={() => go("itinerary")}>כל המסלול ›</button>
        </div>

        {phase === "during" && plan ? (
          <div className="space-y-2">
            {plan.items.map((it) => {
              const Icon = itemIcon(it.type);
              return (
                <Card key={it.id} className="p-3 flex items-center gap-3" onClick={() => go("itinerary")}>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink font-medium truncate">{it.title}</p>
                    {it.place && <p className="text-xs text-ink/50 truncate">{it.place}</p>}
                  </div>
                  {it.time && <span className="text-sm font-semibold text-ink/70">{it.time}</span>}
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-4" onClick={() => go("itinerary")}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink">{ITINERARY[0].label}</p>
                <p className="text-xs text-ink/50">{hebDate(ITINERARY[0].date)} · ראו את כל המסלול</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* קיצורי דרך */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-4 gap-3">
          {[
            { t: "מדריכים", e: "📖", go: "guides" },
            { t: "מפה", e: "🗺️", go: "map" },
            { t: "משחקים", e: "🎮", go: "games" },
            { t: "מטבע", e: "💰", go: "currency" },
            { t: "אטרקציות", e: "✅", go: "attractions" },
            { t: "תקציב", e: "📊", go: "budget" },
            { t: "מסמכים", e: "🗂️", go: "documents" },
            { t: "חירום", e: "🆘", go: "emergency" },
          ].map((s) => (
            <button
              key={s.go}
              onClick={() => go(s.go)}
              className="flex flex-col items-center gap-1 active:scale-95 transition"
            >
              <span className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">
                {s.e}
              </span>
              <span className="text-[11px] text-ink/70">{s.t}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
