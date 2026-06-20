"use client";
import { useState } from "react";
import { SEED_EXPENSES, EXPENSE_CATS, BUDGET_TARGET_ILS, ExpenseCat } from "../data/trip";
import { ScreenHeader, Card } from "../components/ui";
import { useLocal } from "../lib/store";
import { Plus, Trash2 } from "lucide-react";

type Exp = { id: string; label: string; cat: ExpenseCat; amountILS: number };

export default function Budget({ onBack }: { onBack: () => void }) {
  const [extra, setExtra] = useLocal<Exp[]>("expenses", []);
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [cat, setCat] = useState<ExpenseCat>("food");

  const all: Exp[] = [...SEED_EXPENSES, ...extra];
  const total = all.reduce((s, e) => s + e.amountILS, 0);
  const remaining = BUDGET_TARGET_ILS - total;

  const byCat = EXPENSE_CATS.map((c) => ({
    ...c,
    sum: all.filter((e) => e.cat === c.id).reduce((s, e) => s + e.amountILS, 0),
  })).filter((c) => c.sum > 0);

  const add = () => {
    const amt = parseFloat(amount);
    if (!label.trim() || !amt) return;
    setExtra((p) => [{ id: "u" + Date.now(), label: label.trim(), cat, amountILS: amt }, ...p]);
    setLabel("");
    setAmount("");
    setShowForm(false);
  };

  return (
    <div className="pb-6">
      <ScreenHeader title="תקציב והוצאות" subtitle={`יעד: ₪${BUDGET_TARGET_ILS.toLocaleString()}`} onBack={onBack} />
      <div className="px-4 pt-3">
        <Card className="p-5 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
          <p className="text-white/70 text-sm">סה"כ הוצאנו</p>
          <p className="font-display text-4xl">₪{total.toLocaleString()}</p>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-amber-300 rounded-full"
              style={{ width: `${Math.min(100, (total / BUDGET_TARGET_ILS) * 100)}%` }}
            />
          </div>
          <p className="text-white/80 text-sm mt-2">
            {remaining >= 0 ? `נשארו ₪${remaining.toLocaleString()}` : `חריגה של ₪${Math.abs(remaining).toLocaleString()}`}
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {byCat.map((c) => (
            <Card key={c.id} className="p-3">
              <div className="text-xl">{c.emoji}</div>
              <div className="text-xs text-ink/50 mt-1">{c.label}</div>
              <div className="font-display text-lg text-ink">₪{c.sum.toLocaleString()}</div>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between px-1 mt-5 mb-2">
          <h2 className="font-display text-base text-ink/80">הוצאות</h2>
          <button onClick={() => setShowForm((s) => !s)} className="flex items-center gap-1 text-sm text-teal-700">
            <Plus className="w-4 h-4" /> הוסף
          </button>
        </div>

        {showForm && (
          <Card className="p-3 mb-3 space-y-2">
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="על מה? (לדוגמה: ארוחת ערב)"
              className="w-full bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none"
            />
            <div className="flex gap-2">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="decimal"
                placeholder="₪ סכום"
                className="w-28 bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none"
              />
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value as ExpenseCat)}
                className="flex-1 bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none"
              >
                {EXPENSE_CATS.map((c) => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                ))}
              </select>
            </div>
            <button onClick={add} className="w-full py-2 rounded-xl bg-teal-600 text-white text-sm font-medium">
              שמור הוצאה
            </button>
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
        <p className="text-[11px] text-ink/40 text-center mt-3">הנתונים נשמרים במכשיר ועובדים גם בלי אינטרנט.</p>
      </div>
    </div>
  );
}
