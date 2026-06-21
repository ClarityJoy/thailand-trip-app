"use client";
import { useRef, useEffect, useState } from "react";
import { ITINERARY, DESTINATIONS, ItineraryItem } from "../data/trip";
import { hebDate, currentDayIndex } from "../lib/dates";
import { ScreenHeader, Card, Pill } from "../components/ui";
import { itemIcon, mapsUrl, geoUrl } from "./itemIcon";
import { useLocal } from "../lib/store";
import { Check, MapPin, Plus, X, Navigation, ExternalLink, Camera } from "lucide-react";

const CHEERS = [
  "איזה כיף! צברנו עוד זיכרון 🎉",
  "וואו, עוד הרפתקה בכיס! 🌟",
  "מדהים! עוד נקודה על המפה ✨",
  "יש! עוד רגע ששווה לזכור 💛",
  "כל הכבוד, מטיילת אלופה! 🐘",
];

type Custom = { id: string; title: string; time?: string; address?: string };

export default function Itinerary({ go }: { go: (t: string, p?: any) => void }) {
  const todayIdx = currentDayIndex();
  const todayRef = useRef<HTMLDivElement>(null);

  const [visited, setVisited] = useLocal<Record<string, boolean>>("visited", {});
  const [custom, setCustom] = useLocal<Record<string, Custom[]>>("customStops", {});

  const [popup, setPopup] = useState<ItineraryItem | null>(null);
  const [cheer, setCheer] = useState<string | null>(null);
  const [addDay, setAddDay] = useState<string | null>(null);
  const [nTitle, setNTitle] = useState("");
  const [nTime, setNTime] = useState("");
  const [nAddr, setNAddr] = useState("");

  useEffect(() => {
    todayRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const toggleVisited = (id: string) => {
    const turningOn = !visited[id];
    setVisited((p) => ({ ...p, [id]: !p[id] }));
    if (turningOn) setCheer(CHEERS[Math.floor(Math.random() * CHEERS.length)]);
  };

  const saveCustom = () => {
    if (!addDay || !nTitle.trim()) return;
    const item: Custom = { id: "c" + Date.now(), title: nTitle.trim(), time: nTime.trim() || undefined, address: nAddr.trim() || undefined };
    setCustom((p) => ({ ...p, [addDay]: [...(p[addDay] || []), item] }));
    setNTitle(""); setNTime(""); setNAddr(""); setAddDay(null);
  };

  const dayItems = (date: string, base: ItineraryItem[]): ItineraryItem[] => {
    const extra = (custom[date] || []).map((c) => ({ id: c.id, title: c.title, time: c.time, address: c.address, type: "free" as const, place: c.address }));
    return [...base, ...extra];
  };

  return (
    <div className="pb-6">
      <ScreenHeader title="המסלול" subtitle="סמני ✓ איפה שכבר היינו" />
      <div className="px-4 pt-3 space-y-5">
        {ITINERARY.map((day, di) => {
          const dest = DESTINATIONS.find((d) => d.id === day.cityId)!;
          const isToday = di === todayIdx;
          const items = dayItems(day.date, day.items);
          return (
            <div key={day.date} ref={isToday ? todayRef : null}>
              <div className="flex items-center gap-2 px-1 mb-2">
                <div className={`w-12 shrink-0 text-center rounded-xl py-1 ${isToday ? "bg-coral text-white" : "bg-white text-ink shadow-sm"}`}>
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
                {items.map((it, ii) => {
                  const Icon = itemIcon(it.type);
                  const done = !!visited[it.id];
                  return (
                    <div key={it.id} className={`flex items-center gap-2 p-3 ${ii > 0 ? "border-t border-ink/5" : ""}`}>
                      {/* צ'ק היינו פה */}
                      <button
                        onClick={() => toggleVisited(it.id)}
                        aria-label="סמן שהיינו"
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${done ? "bg-pink-500 text-white" : "border-2 border-ink/15"}`}
                      >
                        {done && <Check className="w-4 h-4" />}
                      </button>
                      {/* תוכן — פתיחת פופאפ */}
                      <button onClick={() => setPopup(it)} className="flex items-center gap-3 flex-1 min-w-0 text-right">
                        <div className="w-9 h-9 rounded-lg bg-pink-50 text-pink-700 flex items-center justify-center shrink-0">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${done ? "text-ink/40 line-through" : "text-ink"}`}>{it.title}</p>
                          <div className="flex items-center gap-2 flex-wrap mt-0.5">
                            {it.place && <span className="text-xs text-ink/50 truncate">{it.place}</span>}
                            {it.note && <span className="text-[11px] text-ink/40">· {it.note}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          {it.time && <span className="text-sm font-semibold text-ink/70">{it.time}</span>}
                          <MapPin className="w-3.5 h-3.5 text-pink-600" />
                        </div>
                      </button>
                    </div>
                  );
                })}
                {/* הוספת מקום */}
                <button onClick={() => { setAddDay(day.date); setNTitle(""); setNTime(""); setNAddr(""); }} className="w-full flex items-center gap-2 p-3 border-t border-ink/5 text-pink-700 text-sm active:bg-ink/[0.02]">
                  <Plus className="w-4 h-4" /> הוסף מקום ליום זה
                </button>
              </Card>
            </div>
          );
        })}
        <button onClick={() => go("map")} className="w-full py-3 rounded-2xl bg-pink-600 text-white font-medium active:scale-[0.99] transition">
          הצג את כל המסלול על המפה 🗺️
        </button>
      </div>

      {/* פופאפ מקום */}
      {popup && (
        <Overlay onClose={() => setPopup(null)}>
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center shrink-0 text-xl">📍</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg text-ink">{popup.title}</h3>
              {popup.place && <p className="text-sm text-ink/60">{popup.place}</p>}
              {popup.address && <p className="text-xs text-ink/50 mt-1">{popup.address}</p>}
              {popup.time && <p className="text-xs text-ink/50 mt-1">🕒 {popup.time}</p>}
              {popup.note && <p className="text-xs text-ink/50 mt-1">{popup.note}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <a href={mapsUrl(popup.coords?.lat, popup.coords?.lng, popup.address || popup.place || popup.title)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-pink-600 text-white text-sm">
              <ExternalLink className="w-4 h-4" /> Google Maps
            </a>
            <a href={geoUrl(popup.coords?.lat, popup.coords?.lng, popup.title)} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-ink/5 text-ink text-sm">
              <Navigation className="w-4 h-4" /> מפה במכשיר
            </a>
          </div>
          <button
            onClick={() => { toggleVisited(popup.id); setPopup(null); }}
            className={`w-full mt-2 py-2.5 rounded-xl text-sm font-medium ${visited[popup.id] ? "bg-ink/5 text-ink/60" : "bg-pink-50 text-pink-700"}`}
          >
            {visited[popup.id] ? "✓ כבר היינו פה" : "סמני שהיינו פה ✓"}
          </button>
        </Overlay>
      )}

      {/* חלון חגיגה */}
      {cheer && (
        <Overlay onClose={() => setCheer(null)}>
          <div className="text-center">
            <div className="text-6xl">🎉</div>
            <p className="font-display text-xl text-ink mt-3">{cheer}</p>
            <p className="text-sm text-ink/55 mt-1">רוצה להוסיף תמונה ליומן הזיכרונות?</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={() => { setCheer(null); go("memories"); }} className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-pink-600 text-white text-sm">
                <Camera className="w-4 h-4" /> הוסף זיכרון
              </button>
              <button onClick={() => setCheer(null)} className="py-2.5 rounded-xl bg-ink/5 text-ink text-sm">המשך</button>
            </div>
          </div>
        </Overlay>
      )}

      {/* הוספת מקום */}
      {addDay && (
        <Overlay onClose={() => setAddDay(null)}>
          <h3 className="font-display text-lg text-ink mb-3">הוספת מקום · {hebDate(addDay)}</h3>
          <div className="space-y-2">
            <input value={nTitle} onChange={(e) => setNTitle(e.target.value)} placeholder="שם המקום (לדוגמה: שוק לילה)" className="w-full bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none" />
            <div className="flex gap-2">
              <input value={nTime} onChange={(e) => setNTime(e.target.value)} placeholder="שעה (לא חובה)" className="w-28 bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none" />
              <input value={nAddr} onChange={(e) => setNAddr(e.target.value)} placeholder="כתובת / איזור (לא חובה)" className="flex-1 bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none" />
            </div>
            <button onClick={saveCustom} className="w-full py-2.5 rounded-xl bg-pink-600 text-white text-sm font-medium">הוסף למסלול</button>
          </div>
        </Overlay>
      )}
    </div>
  );
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-5 bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl p-4 w-full max-w-sm shadow-xl relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="סגור" className="absolute top-2 left-2 w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center">
          <X className="w-4 h-4 text-ink/50" />
        </button>
        {children}
      </div>
    </div>
  );
}
