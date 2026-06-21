"use client";
import { Plane } from "lucide-react";
import { hebDate } from "../lib/dates";

export function BoardingPass({
  fromCode, fromCity, toCode, toCity, date, depart, arrive, number, airline,
}: {
  fromCode: string; fromCity: string; toCode: string; toCity: string;
  date: string; depart: string; arrive: string; number: string; airline: string;
}) {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_18px_rgba(28,43,42,0.12)]">
      {/* כותרת */}
      <div className="bg-gradient-to-l from-pink-600 to-pink-700 text-white px-4 py-2.5 flex items-center justify-between">
        <span className="font-display tracking-wide text-sm">כרטיס עלייה למטוס ✦</span>
        <Plane className="w-4 h-4 -scale-x-100" />
      </div>

      {/* גוף */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="font-display text-3xl text-ink leading-none">{fromCode}</div>
            <div className="text-[11px] text-ink/50 mt-1">{fromCity}</div>
            <div className="text-sm text-ink/70 mt-0.5">{depart}</div>
          </div>
          <div className="flex-1 px-2 flex flex-col items-center">
            <div className="w-full flex items-center text-pink-600">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-600" />
              <span className="flex-1 border-t border-dashed border-pink-300" />
              <Plane className="w-5 h-5 -scale-x-100" />
              <span className="flex-1 border-t border-dashed border-pink-300" />
              <span className="h-1.5 w-1.5 rounded-full bg-pink-600" />
            </div>
            <div className="text-[10px] text-ink/40 mt-1">{hebDate(date)}</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl text-ink leading-none">{toCode}</div>
            <div className="text-[11px] text-ink/50 mt-1">{toCity}</div>
            <div className="text-sm text-ink/70 mt-0.5">{arrive}</div>
          </div>
        </div>
      </div>

      {/* קו ניתוק עם חורי ניקוב */}
      <div className="relative">
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-sand" />
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-sand" />
        <div className="border-t border-dashed border-ink/15 mx-3" />
      </div>

      {/* ספח */}
      <div className="px-4 py-2.5 flex items-center justify-between text-xs">
        <div>
          <div className="text-ink/40">טיסה</div>
          <div className="font-display text-ink">{number}</div>
        </div>
        <div className="text-center">
          <div className="text-ink/40">נוסעת</div>
          <div className="font-display text-ink">SHIRA ✿</div>
        </div>
        <div className="text-left">
          <div className="text-ink/40">חברה</div>
          <div className="text-ink/70 truncate max-w-[110px]">{airline}</div>
        </div>
      </div>
    </div>
  );
}
