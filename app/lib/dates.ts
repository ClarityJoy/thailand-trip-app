import { TRIP, ITINERARY, HOTELS, TripDay, Hotel } from "../data/trip";

// תאריך "היום" — אפשר לדרוס לצורך בדיקות דרך ?date=YYYY-MM-DD
export function today(): Date {
  if (typeof window !== "undefined") {
    const p = new URLSearchParams(window.location.search).get("date");
    if (p) return new Date(p + "T09:00:00");
  }
  return new Date();
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function daysUntilTrip(now = today()): number {
  const start = new Date(TRIP.startDate + "T00:00:00");
  const t = new Date(ymd(now) + "T00:00:00");
  return Math.round((start.getTime() - t.getTime()) / 86400000);
}

export type TripPhase = "before" | "during" | "after";

export function tripPhase(now = today()): TripPhase {
  const d = ymd(now);
  if (d < TRIP.startDate) return "before";
  if (d > TRIP.endDate) return "after";
  return "during";
}

// אינדקס היום בטיול (0-based) או null אם לא בטיול
export function currentDayIndex(now = today()): number | null {
  const d = ymd(now);
  const idx = ITINERARY.findIndex((day) => day.date === d);
  return idx >= 0 ? idx : null;
}

export function todayPlan(now = today()): TripDay | null {
  const i = currentDayIndex(now);
  return i === null ? null : ITINERARY[i];
}

// המלון הפעיל בתאריך נתון
export function currentHotel(now = today()): Hotel | null {
  const d = ymd(now);
  return (
    HOTELS.find((h) => d >= h.checkIn && d < h.checkOut) ??
    (tripPhase(now) === "before" ? null : null)
  );
}

export function hebDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("he-IL", { day: "numeric", month: "long" });
}

export function shortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()}.${d.getMonth() + 1}`;
}
