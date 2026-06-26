"use client";
import { useState } from "react";
import {
  SEED_EXPENSES, EXPENSE_CATS, BUDGET_TARGET_ILS, ExpenseCat,
  PLANNER_DAILY, PLANNER_SHOPPING, PRICE_SURVEY,
} from "../data/trip";
import { ScreenHeader, Card } from "../components/ui";
import { useLocal } from "../lib/store";
import { useRates } from "../lib/live";
import { Plus, Trash2, SlidersHorizontal, Users, Tag, Minus } from "lucide-react";

type Exp = { id: string; label: string; cat: ExpenseCat; amountILS: number };
type Lvl = "low" | "mid" | "high";

export default function Budget({ onBack }: { onBack: () => void }) {
  const rates = useRates();
  const rate = rates.ILS || 0.1;
  const [extra, setExtra] = useLocal<Exp[]>("expenses", []);
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [cat, setCat] = useState<ExpenseCat>("food");

  // מתכנן
  const [people, setPeople] = useLocal<number>("plannerPeople", 2);
  const [pdays, setPdays] = useLocal<string>("plannerDays", "14");
  const [levels, setLevels] = useLocal<Record<string, Lvl>>("plannerLevels", {
    food: "mid", transport: "mid", treats: "mid", extra: "mid", shopping: "mid",
  });
  const [showSurvey, setShowSurvey] = useState(false);

  const all: Exp[] = [...SEED_EXPENSES, ...extra];
  const total = all.reduce((s, e) => s + e.amountILS, 0);
  const seedTotal = SEED_EXPENSES.reduce((s, e) => s + e.amountILS, 0);
  const remaining = BUDGET_TARGET_ILS - total;

  const byCat = EXPENSE_CATS.map((c) => ({
    ...c,
    sum: all.filter((e) => e.cat === c.id).reduce((s, e) => s + e.amountILS, 0),
  })).filter((c) => c.sum > 0);

  // חישוב המתכנן
  const d = Math.max(1, parseInt(pdays) || 1);
  const dailyPP = PLANNER_DAILY.reduce((s, c) => s + (c.levels.find((l) => l.key === levels[c.id])?.thb || 0), 0);
  const shopThb = PLANNER_SHOPPING.levels.find((l) => l.key === levels.shopping)?.thb || 0;
  const onGroundThb = dailyPP * people * d + shopThb;
  const onGroundIls = onGroundThb * rate;
  const projected = seedTotal + onGroundIls;
  const leftover = BUDGET_TARGET_ILS - projected;

  const add = () => {
    const amt = parseFloat(amount);
    if (!label.trim() || !amt) return;
    setExtra((p) => [{ id: "u" + Date.now(), label: label.trim(), cat, amountILS: amt }, ...p]);
    setLabel(""); setAmount(""); setShowForm(false);
  };

  const ils = (thb: number) => Math.round(thb * rate);

  const LevelPicker = ({ id, cat: c }: { id: string; cat: typeof PLANNER_DAILY[number] }) => (
    <Card className="p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{c.emoji}</span>
        <span className="font-medium text-ink text-sm flex-1">{c.label}</span>
        <span className="text-[11px] text-ink/40">{c.perPerson ? "לאדם/יום" : "לכל הטיול"}</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {c.levels.map((l) => {
          const on = levels[id] === l.key;
          return (
            <button
              key={l.key}
              onClick={() => setLevels((p) => ({ ...p, [id]: l.key }))}
              className={`rounded-xl p-2 text-center transition ${on ? "bg-pink-600 text-white" : "bg-ink/5 text-ink/70"}`}
            >
              <div className="text-[11px] leading-tight">{l.label}</div>
              <div className="font-display text-sm mt-0.5">฿{l.thb}</div>
            </button>
          );
        })}
      </div>
    </Card>
  );

  return (
    <div className="pb-6">
      <ScreenHeader title="תקציב והוצאות" subtitle={`תקציב כולל: ₪${BUDGET_TARGET_ILS.toLocaleString()}`} onBack={onBack} />
      <div className="px-4 pt-3">
        {/* סטטוס בפועל */}
        <Card className="p-5 bg-gradient-to-br from-pink-600 to-pink-700 text-white">
          <p className="text-white/70 text-sm">הוצאנו בפועל (מתוך ₪{BUDGET_TARGET_ILS.toLocaleString()})</p>
          <p className="font-display text-4xl">₪{Math.round(total).toLocaleString()}</p>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-amber-300 rounded-full" style={{ width: `${Math.min(100, (total / BUDGET_TARGET_ILS) * 100)}%` }} />
          </div>
          <p className="text-white/80 text-sm mt-2">
            {remaining >= 0 ? `נשארו ₪${Math.round(remaining).toLocaleString()}` : `חריגה של ₪${Math.abs(Math.round(remaining)).toLocaleString()}`}
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {byCat.map((c) => (
            <Card key={c.id} className="p-3">
              <div className="text-xl">{c.emoji}</div>
              <div className="text-xs text-ink/50 mt-1">{c.label}</div>
              <div className="font-display text-lg text-ink">₪{Math.round(c.sum).toLocaleString()}</div>
            </Card>
          ))}
        </div>

        {/* מתכנן תקציב */}
        <h2 className="font-display text-base text-ink/80 px-1 mt-6 mb-2 flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4" /> מתכנן תקציב — כמה צריך?
        </h2>

        <Card className="p-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Users className="w-4 h-4 text-ink/40" />
              <span className="text-sm text-ink/70">אנשים</span>
              <div className="flex items-center gap-2 ms-auto">
                <button onClick={() => setPeople((p) => Math.max(1, p - 1))} className="w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center"><Minus className="w-3.5 h-3.5" /></button>
                <span className="font-display text-lg w-5 text-center">{people}</span>
                <button onClick={() => setPeople((p) => p + 1)} className="w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center"><Plus className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="w-px h-8 bg-ink/10" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink/70">ימים</span>
              <input value={pdays} onChange={(e) => setPdays(e.target.value.replace(/[^\d]/g, ""))} inputMode="numeric" className="w-14 text-center bg-ink/5 rounded-xl px-2 py-1.5 font-display text-lg outline-none" />
            </div>
          </div>
        </Card>

        <div className="space-y-2">
          {PLANNER_DAILY.map((c) => <LevelPicker key={c.id} id={c.id} cat={c} />)}
          <LevelPicker id="shopping" cat={PLANNER_SHOPPING} />
        </div>

        {/* תוצאת המתכנן */}
        <Card className="p-4 mt-3 bg-gradient-to-br from-fuchsia-600 to-pink-700 text-white">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm">הוצאה יומית משוערת</span>
            <span className="font-display text-lg">₪{ils(dailyPP * people)}/יום</span>
          </div>
          <div className="flex items-center justify-between text-white/80 text-xs mt-1">
            <span>לאדם ליום</span><span>₪{ils(dailyPP)} · ฿{dailyPP}</span>
          </div>
          <div className="border-t border-white/20 my-3" />
          <div className="space-y-1 text-sm">
            <Row k="מוזמן מראש (טיסות/מלונות/פעילויות)" v={`₪${Math.round(seedTotal).toLocaleString()}`} />
            <Row k={`הוצאות בשטח (${people} אנשים × ${d} ימים + קניות)`} v={`₪${Math.round(onGroundIls).toLocaleString()}`} />
            <Row k="סה״כ צפוי לטיול" v={`₪${Math.round(projected).toLocaleString()}`} bold />
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden mt-3">
            <div className={`h-full rounded-full ${projected > BUDGET_TARGET_ILS ? "bg-red-300" : "bg-amber-300"}`} style={{ width: `${Math.min(100, (projected / BUDGET_TARGET_ILS) * 100)}%` }} />
          </div>
          <p className="text-sm mt-2 font-medium">
            {leftover >= 0
              ? `✅ נכנסים בתקציב — נשאר מרווח של ₪${Math.round(leftover).toLocaleString()}`
              : `⚠️ חריגה של ₪${Math.abs(Math.round(leftover)).toLocaleString()} מהתקציב`}
          </p>
        </Card>

        {/* סקר מחירים */}
        <button onClick={() => setShowSurvey((s) => !s)} className="w-full flex items-center gap-2 px-1 mt-6 mb-2 text-ink/80">
          <Tag className="w-4 h-4" />
          <h2 className="font-display text-base">סקר מחירים בתאילנד (₪≈฿)</h2>
          <span className="ms-auto text-pink-700 text-sm">{showSurvey ? "הסתר" : "הצג"}</span>
        </button>
        {showSurvey && (
          <div className="space-y-3">
            {PRICE_SURVEY.map((g) => (
              <Card key={g.cat} className="overflow-hidden">
                <div className="px-3 py-2 bg-pink-50 font-display text-sm text-pink-800">{g.emoji} {g.cat}</div>
                {g.rows.map((r, i) => (
                  <div key={i} className={`flex items-center gap-2 p-3 ${i > 0 ? "border-t border-ink/5" : ""}`}>
                    <span className="flex-1 text-sm text-ink">{r.n}</span>
                    <span className="text-sm text-ink/70">฿{r.lo}{r.hi !== r.lo ? `–${r.hi}` : ""}</span>
                    <span className="text-xs text-ink/40 w-16 text-left">≈₪{ils(r.lo)}{r.hi !== r.lo ? `–${ils(r.hi)}` : ""}</span>
                  </div>
                ))}
              </Card>
            ))}
            <p className="text-[11px] text-ink/40 text-center">מחירים מקורבים לפי סקר 2025 (אוכל רחוב, שווקים, תחבורה ופעילויות). באיים המחירים גבוהים ב-25–50% מהיבשת.</p>
          </div>
        )}

        {/* הוצאות בפועל */}
        <div className="flex items-center justify-between px-1 mt-6 mb-2">
          <h2 className="font-display text-base text-ink/80">הוצאות בפועל</h2>
          <button onClick={() => setShowForm((s) => !s)} className="flex items-center gap-1 text-sm text-pink-700">
            <Plus className="w-4 h-4" /> הוסף
          </button>
        </div>

        {showForm && (
          <Card className="p-3 mb-3 space-y-2">
            <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="על מה? (לדוגמה: ארוחת ערב)" className="w-full bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none" />
            <div className="flex gap-2">
              <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" placeholder="₪ סכום" className="w-28 bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none" />
              <select value={cat} onChange={(e) => setCat(e.target.value as ExpenseCat)} className="flex-1 bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none">
                {EXPENSE_CATS.map((c) => (<option key={c.id} value={c.id}>{c.emoji} {c.label}</option>))}
              </select>
            </div>
            <button onClick={add} className="w-full py-2 rounded-xl bg-pink-600 text-white text-sm font-medium">שמור הוצאה</button>
          </Card>
        )}

        <Card className="overflow-hidden">
          {all.map((e, i) => {
            const c = EXPENSE_CATS.find((x) => x.id === e.cat)!;
            const isUser = e.id.startsWith("u");
            return (
              <div key={e.id} className={`flex items-center gap-3 p-3 ${i > 0 ? "border-t border-ink/5" : ""}`}>
                <span className="text-xl">{c.emoji}</span>
                <span className="flex-1 text-sm text-ink">{e.label}</span>
                <span className="font-medium text-ink">₪{e.amountILS.toLocaleString()}</span>
                {isUser && (
                  <button onClick={() => setExtra((p) => p.filter((x) => x.id !== e.id))} aria-label="מחק">
                    <Trash2 className="w-4 h-4 text-ink/30" />
                  </button>
                )}
              </div>
            );
          })}
        </Card>
        <p className="text-[11px] text-ink/40 text-center mt-3">בחירות המתכנן וההוצאות נשמרות במכשיר ועובדות גם בלי אינטרנט.</p>
      </div>
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "font-display text-base" : "text-white/85"}`}>
      <span>{k}</span><span>{v}</span>
    </div>
  );
}
