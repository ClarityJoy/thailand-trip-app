"use client";
import { HOTELS, FLIGHTS } from "../data/trip";
import { ScreenHeader, Card, Pill, SectionTitle } from "../components/ui";
import { shortDate } from "../lib/dates";
import { mapsUrl } from "./itemIcon";
import { Plane, BedDouble, MapPin } from "lucide-react";

export default function HotelsFlights({ onBack }: { onBack: () => void }) {
  return (
    <div className="pb-6">
      <ScreenHeader title="טיסות ומלונות" subtitle="כל ההזמנות במקום אחד" onBack={onBack} />
      <div className="px-4 pt-2">
        <SectionTitle><span className="flex items-center gap-1.5"><Plane className="w-4 h-4" /> טיסות</span></SectionTitle>
        <div className="space-y-3">
          {FLIGHTS.map((f) => (
            <Card key={f.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-base text-ink">{f.number}</span>
                {f.status === "booked" ? (
                  <Pill tone="teal">מוזמן ✓</Pill>
                ) : (
                  <Pill tone="amber">לסגור</Pill>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="font-display text-xl text-ink">{f.fromCode}</div>
                  <div className="text-xs text-ink/50">{f.fromCity}</div>
                  <div className="text-sm text-ink/70 mt-0.5">{f.depart}</div>
                </div>
                <div className="flex-1 px-2 flex flex-col items-center">
                  <Plane className="w-4 h-4 text-pink-600 -scale-x-100" />
                  <div className="w-full border-t border-dashed border-ink/20 mt-1" />
                  <div className="text-[10px] text-ink/40 mt-1">{shortDate(f.date)}</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-xl text-ink">{f.toCode}</div>
                  <div className="text-xs text-ink/50">{f.toCity}</div>
                  <div className="text-sm text-ink/70 mt-0.5">{f.arrive}</div>
                </div>
              </div>
              <div className="text-xs text-ink/40 mt-2 text-center">
                {f.airline}{f.note ? ` · ${f.note}` : ""}
              </div>
            </Card>
          ))}
        </div>

        <SectionTitle><span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> מלונות</span></SectionTitle>
        <div className="space-y-3">
          {HOTELS.map((h) => (
            <a
              key={h.id}
              href={mapsUrl(h.coords.lat, h.coords.lng)}
              target="_blank"
              rel="noreferrer"
            >
              <Card className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-display text-base text-ink truncate">{h.name}</h3>
                    <p className="text-xs text-ink/50">{h.region}</p>
                  </div>
                  <Pill tone="teal">{h.nights} לילות</Pill>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span className="text-ink/70">{shortDate(h.checkIn)} – {shortDate(h.checkOut)}</span>
                  <span className="flex items-center gap-1 text-pink-700 text-xs"><MapPin className="w-3 h-3" /> מפה</span>
                </div>
                {h.note && <p className="text-[11px] text-ink/40 mt-1">{h.note}</p>}
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
