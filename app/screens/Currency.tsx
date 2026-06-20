"use client";
import { useState } from "react";
import { ScreenHeader, Card, Pill } from "../components/ui";
import { useRates } from "../lib/live";

export default function Currency({ onBack }: { onBack: () => void }) {
  const rates = useRates();
  const [baht, setBaht] = useState("100");
  const n = parseFloat(baht) || 0;

  const quick = [20, 50, 100, 500, 1000];

  return (
    <div className="pb-6">
      <ScreenHeader
        title="מטבע — בָּאט ฿"
        subtitle={rates.offline ? "שערים מקורבים (אופליין)" : "שערים חיים"}
        onBack={onBack}
      />
      <div className="px-4 pt-3">
        <Card className="p-5">
          <label className="text-xs text-ink/50">כמה בָּאט?</label>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl">฿</span>
            <input
              value={baht}
              onChange={(e) => setBaht(e.target.value.replace(/[^\d.]/g, ""))}
              inputMode="decimal"
              className="flex-1 font-display text-4xl text-ink bg-transparent outline-none w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-teal-50 rounded-xl p-3 text-center">
              <div className="text-xs text-teal-700/70">שקלים ₪</div>
              <div className="font-display text-2xl text-teal-700">₪{(n * rates.ILS).toFixed(1)}</div>
            </div>
            <div className="bg-sky-50 rounded-xl p-3 text-center">
              <div className="text-xs text-sky-700/70">דולרים $</div>
              <div className="font-display text-2xl text-sky-700">${(n * rates.USD).toFixed(2)}</div>
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {quick.map((q) => (
              <button
                key={q}
                onClick={() => setBaht(String(q))}
                className="px-3 py-1 rounded-full bg-ink/5 text-sm text-ink/70 active:scale-95"
              >
                ฿{q}
              </button>
            ))}
          </div>
        </Card>

        <h2 className="font-display text-base text-ink/80 px-1 mt-5 mb-2">כמה דברים עולים בערך?</h2>
        <Card className="overflow-hidden">
          {[
            { e: "🧴", t: "בקבוק מים", b: 10 },
            { e: "🍜", t: "פאד תאי ברחוב", b: 60 },
            { e: "🥭", t: "מנגו עם אורז דביק", b: 80 },
            { e: "🛺", t: "נסיעת טוק-טוק קצרה", b: 100 },
            { e: "🥥", t: "קוקוס קר", b: 40 },
          ].map((it, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 ${i > 0 ? "border-t border-ink/5" : ""}`}>
              <span className="text-xl">{it.e}</span>
              <span className="flex-1 text-sm text-ink">{it.t}</span>
              <span className="text-sm text-ink/60">฿{it.b} ≈ ₪{(it.b * rates.ILS).toFixed(0)}</span>
            </div>
          ))}
        </Card>

        <h2 className="font-display text-base text-ink/80 px-1 mt-5 mb-2">ידעת? 🇹🇭</h2>
        <Card className="p-4 space-y-2 text-sm text-ink/75">
          <p>💰 המטבע נקרא <b>בָּאט</b> (฿), ומחולק ל-100 <b>סָטָאנְג</b>.</p>
          <p>👑 על כל השטרות והמטבעות מופיע דיוקן <b>המלך</b> — אסור לדרוך על כסף שנפל, כי זה נחשב חוסר כבוד למלך!</p>
          <p>🎨 לכל שטר יש צבע אחר: 20 ירוק, 50 כחול, 100 אדום, 500 סגול, 1000 חום.</p>
        </Card>
      </div>
    </div>
  );
}
