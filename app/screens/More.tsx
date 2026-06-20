"use client";
import { ScreenHeader, Card } from "../components/ui";
import { TRIP } from "../data/trip";
import { ChevronLeft } from "lucide-react";

const ITEMS = [
  { go: "hotels", e: "✈️", t: "טיסות ומלונות", d: "כל ההזמנות במקום אחד" },
  { go: "attractions", e: "✅", t: "אטרקציות", d: "צ'ק-ליסט של מה שעושים" },
  { go: "packing", e: "🧳", t: "רשימת אריזה", d: "מה לוקחים לתאילנד" },
  { go: "budget", e: "📊", t: "תקציב והוצאות", d: "מעקב הוצאות והמרה" },
  { go: "currency", e: "💰", t: "מטבע", d: "המרת בָּאט לשקלים ודולרים" },
  { go: "weather", e: "🌤️", t: "מזג אוויר", d: "תחזית לכל יעד" },
  { go: "documents", e: "🗂️", t: "כספת מסמכים", d: "דרכונים, ביטוח, הזמנות" },
  { go: "emergency", e: "🆘", t: "חירום", d: "מספרים חשובים לחיוג מהיר" },
  { go: "games", e: "🎮", t: "משחקים", d: "טריוויה, מילון ומשחק זיכרון" },
];

export default function More({ go }: { go: (t: string) => void }) {
  return (
    <div className="pb-6">
      <ScreenHeader title="עוד" subtitle={`${TRIP.title} · ${TRIP.travelers}`} />
      <div className="px-4 pt-3 space-y-2.5">
        {ITEMS.map((it) => (
          <Card key={it.go} className="p-3.5 flex items-center gap-3" onClick={() => go(it.go)}>
            <span className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-2xl shrink-0">
              {it.e}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-display text-ink">{it.t}</p>
              <p className="text-xs text-ink/50">{it.d}</p>
            </div>
            <ChevronLeft className="w-5 h-5 text-ink/25" />
          </Card>
        ))}
        <p className="text-[11px] text-ink/40 text-center pt-3">
          נבנה באהבה לטיול שלנו 💛 · עובד גם בלי אינטרנט · ניתן להתקנה כאפליקציה
        </p>
      </div>
    </div>
  );
}
