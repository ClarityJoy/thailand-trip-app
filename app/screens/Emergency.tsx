"use client";
import { EMERGENCY, EmergencyContact } from "../data/trip";
import { ScreenHeader, Card } from "../components/ui";
import { Phone, AlertTriangle } from "lucide-react";

const GROUPS: { id: EmergencyContact["group"]; t: string; e: string }[] = [
  { id: "thai", t: "חירום בתאילנד", e: "🚨" },
  { id: "embassy", t: "ישראל / שגרירות", e: "🇮🇱" },
  { id: "diving", t: "צלילה", e: "🤿" },
  { id: "hotel", t: "מלונות", e: "🏨" },
  { id: "family", t: "משפחה", e: "👨‍👩‍👧" },
];

export default function Emergency({ onBack }: { onBack: () => void }) {
  return (
    <div className="pb-6">
      <ScreenHeader title="חירום" subtitle="הקש על מספר כדי להתקשר" onBack={onBack} />
      <div className="px-4 pt-3">
        <Card className="p-4 mb-4 bg-coral/10 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-coral shrink-0" />
          <div>
            <p className="font-display text-coral text-lg">191 / 1669</p>
            <p className="text-xs text-ink/60">משטרה · אמבולנס — חירום מיידי בתאילנד</p>
          </div>
        </Card>

        {GROUPS.map((g) => {
          const items = EMERGENCY.filter((e) => e.group === g.id);
          if (!items.length) return null;
          return (
            <div key={g.id} className="mb-4">
              <h2 className="font-display text-base text-ink/80 px-1 mb-2">{g.e} {g.t}</h2>
              <Card className="overflow-hidden">
                {items.map((c, i) => {
                  const callable = !!c.phone;
                  const Inner = (
                    <div className={`flex items-center gap-3 p-3 ${i > 0 ? "border-t border-ink/5" : ""}`}>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${callable ? "bg-pink-50 text-pink-700" : "bg-ink/5 text-ink/30"}`}>
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ink">{c.label}</p>
                        {c.note && <p className="text-[11px] text-ink/40">{c.note}</p>}
                      </div>
                      <span className={`text-sm font-medium ${callable ? "text-pink-700" : "text-ink/30"}`} dir="ltr">
                        {c.phone || "—"}
                      </span>
                    </div>
                  );
                  return callable ? (
                    <a key={c.id} href={`tel:${c.phone}`} className="block active:bg-ink/[0.02]">
                      {Inner}
                    </a>
                  ) : (
                    <div key={c.id}>{Inner}</div>
                  );
                })}
              </Card>
            </div>
          );
        })}
        <p className="text-[11px] text-ink/40 text-center mt-2">
          מספרי המלונות הריקים — להשלים מאישורי ההזמנה לפני הטיסה.
        </p>
      </div>
    </div>
  );
}
