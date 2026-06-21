"use client";
import { useState } from "react";
import { ScreenHeader, Card, Pill } from "../components/ui";
import { useRates } from "../lib/live";
import { ArrowDownUp } from "lucide-react";

export default function Currency({ onBack }: { onBack: () => void }) {
  const rates = useRates();
  const [amount, setAmount] = useState("100");
  const [base, setBase] = useState<"THB" | "ILS">("THB"); // איזה מטבע מקלידים
  const n = parseFloat(amount) || 0;

  // המרות
  const ilsFromThb = (thb: number) => thb * rates.ILS;
  const usdFromThb = (thb: number) => thb * rates.USD;
  const thbFromIls = (ils: number) => (rates.ILS ? ils / rates.ILS : 0);

  const inThb = base === "THB" ? n : thbFromIls(n);
  const ils = ilsFromThb(inThb);
  const usd = usdFromThb(inThb);

  const quickTHB = [20, 50, 100, 500, 1000];
  const quickILS = [10, 25, 50, 100, 200];
  const quick = base === "THB" ? quickTHB : quickILS;

  return (
    <div className="pb-6">
      <ScreenHeader
        title="מחשבון המרה"
        subtitle={rates.offline ? "שערים מקורבים (אופליין)" : "שערים חיים · בָּאט ↔ שקל"}
        onBack={onBack}
      />
      <div className="px-4 pt-3">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <label className="text-xs text-ink/50">
              {base === "THB" ? "כמה בָּאט?" : "כמה שקלים?"}
            </label>
            <button
              onClick={() => { setBase((b) => (b === "THB" ? "ILS" : "THB")); setAmount(amount); }}
              className="flex items-center gap-1 text-xs text-pink-700 bg-pink-50 rounded-full px-2.5 py-1 active:scale-95"
            >
              <ArrowDownUp className="w-3.5 h-3.5" /> החלף כיוון
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl">{base === "THB" ? "฿" : "₪"}</span>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              inputMode="decimal"
              className="flex-1 font-display text-4xl text-ink bg-transparent outline-none w-full"
            />
          </div>

          {base === "THB" ? (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-pink-50 rounded-xl p-3 text-center">
                <div className="text-xs text-pink-700/70">שקלים ₪</div>
                <div className="font-display text-2xl text-pink-700">₪{ils.toFixed(1)}</div>
              </div>
              <div className="bg-sky-50 rounded-xl p-3 text-center">
                <div className="text-xs text-sky-700/70">דולרים $</div>
                <div className="font-display text-2xl text-sky-700">${usd.toFixed(2)}</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-pink-50 rounded-xl p-3 text-center">
                <div className="text-xs text-pink-700/70">בָּאט ฿</div>
                <div className="font-display text-2xl text-pink-700">฿{inThb.toFixed(0)}</div>
              </div>
              <div className="bg-sky-50 rounded-xl p-3 text-center">
                <div className="text-xs text-sky-700/70">דולרים $</div>
                <div className="font-display text-2xl text-sky-700">${usd.toFixed(2)}</div>
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-3 flex-wrap">
            {quick.map((q) => (
              <button
                key={q}
                onClick={() => setAmount(String(q))}
                className="px-3 py-1 rounded-full bg-ink/5 text-sm text-ink/70 active:scale-95"
              >
                {base === "THB" ? "฿" : "₪"}{q}
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
