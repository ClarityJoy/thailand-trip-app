"use client";
import { useState } from "react";
import {
  TRIP,
  DIVE_COURSE,
  DIVE_DAYS,
  DIVE_SIGNALS,
  DIVE_RULES,
  SEA_LIFE,
} from "../data/trip";
import { ScreenHeader, Card, Pill } from "../components/ui";
import { useLocal } from "../lib/store";
import { hebDate } from "../lib/dates";
import { Plus, Trash2, ShieldAlert, Hand, Fish, GraduationCap } from "lucide-react";

type DiveLog = { id: string; site: string; depth: string; notes: string };

export default function Diving({ onBack }: { onBack: () => void }) {
  const [seen, setSeen] = useLocal<Record<string, boolean>>("sealife", {});
  const [logs, setLogs] = useLocal<DiveLog[]>("divelog", []);
  const [showForm, setShowForm] = useState(false);
  const [site, setSite] = useState("");
  const [depth, setDepth] = useState("");
  const [notes, setNotes] = useState("");

  const seenCount = SEA_LIFE.filter((c) => seen[c.name]).length;

  const addLog = () => {
    if (!site.trim()) return;
    setLogs((p) => [{ id: "dl" + Date.now(), site: site.trim(), depth: depth.trim(), notes: notes.trim() }, ...p]);
    setSite(""); setDepth(""); setNotes(""); setShowForm(false);
  };

  return (
    <div className="pb-8">
      <ScreenHeader title={`הקורס של ${TRIP.kidName} 🤿`} subtitle={`${DIVE_COURSE.title} · ${DIVE_COURSE.agency}`} onBack={onBack} />
      <div className="px-4 pt-3 space-y-4">
        {/* Hero */}
        <Card className="p-5 bg-gradient-to-br from-fuchsia-600 to-pink-700 text-white">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5" />
            <span className="font-display text-lg">{DIVE_COURSE.title}</span>
          </div>
          <p className="text-white/85 text-sm leading-relaxed">{DIVE_COURSE.intro}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="bg-white/15 rounded-lg px-2.5 py-1 text-xs">🏫 {DIVE_COURSE.shop}</span>
            <span className="bg-white/15 rounded-lg px-2.5 py-1 text-xs">📍 קו טאו</span>
            <span className="bg-white/15 rounded-lg px-2.5 py-1 text-xs">⬇️ עד {DIVE_COURSE.maxDepth}</span>
          </div>
        </Card>

        {/* תוכנית הקורס */}
        <div>
          <h2 className="font-display text-base text-ink/80 px-1 mb-2">תוכנית הקורס</h2>
          <div className="space-y-2">
            {DIVE_DAYS.map((d, i) => (
              <Card key={d.date} className="p-3 flex gap-3">
                <div className="w-9 h-9 rounded-full bg-fuchsia-50 text-fuchsia-700 flex items-center justify-center font-display shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-ink text-sm">{d.title}</p>
                    <span className="text-[11px] text-ink/40 shrink-0">{hebDate(d.date)}</span>
                  </div>
                  <p className="text-xs text-ink/60 mt-0.5 leading-relaxed">{d.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* סימני ידיים */}
        <div>
          <h2 className="font-display text-base text-ink/80 px-1 mb-2 flex items-center gap-1.5">
            <Hand className="w-4 h-4" /> סימני ידיים מתחת למים
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {DIVE_SIGNALS.map((s) => (
              <Card key={s.name} className="p-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="font-medium text-ink text-sm">{s.name}</span>
                </div>
                <p className="text-[11px] text-ink/55 mt-1 leading-snug">{s.meaning}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* כללי זהב */}
        <div>
          <h2 className="font-display text-base text-ink/80 px-1 mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" /> כללי הזהב לבטיחות
          </h2>
          <Card className="p-4 space-y-2">
            {DIVE_RULES.map((r, i) => (
              <div key={i} className="flex gap-2 text-sm text-ink/75">
                <span className="text-fuchsia-600 font-display">{i + 1}</span> {r}
              </div>
            ))}
          </Card>
        </div>

        {/* מה ראיתי */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <h2 className="font-display text-base text-ink/80 flex items-center gap-1.5">
              <Fish className="w-4 h-4" /> מה ראיתי בים
            </h2>
            <Pill tone="sky">{seenCount}/{SEA_LIFE.length}</Pill>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SEA_LIFE.map((c) => {
              const on = !!seen[c.name];
              return (
                <button
                  key={c.name}
                  onClick={() => setSeen((p) => ({ ...p, [c.name]: !p[c.name] }))}
                  className={`flex items-center gap-2 p-3 rounded-2xl text-sm transition ${
                    on ? "bg-fuchsia-500 text-white shadow-sm" : "bg-white text-ink/70 shadow-sm"
                  }`}
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className={on ? "" : ""}>{c.name}</span>
                  {on && <span className="ms-auto">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* יומן צלילות */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <h2 className="font-display text-base text-ink/80">יומן הצלילות שלי</h2>
            <button onClick={() => setShowForm((s) => !s)} className="flex items-center gap-1 text-sm text-fuchsia-700">
              <Plus className="w-4 h-4" /> צלילה חדשה
            </button>
          </div>

          {showForm && (
            <Card className="p-3 mb-3 space-y-2">
              <input value={site} onChange={(e) => setSite(e.target.value)} placeholder="אתר הצלילה (לדוגמה: Japanese Gardens)" className="w-full bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none" />
              <input value={depth} onChange={(e) => setDepth(e.target.value)} placeholder="עומק מקסימלי (מטר)" inputMode="decimal" className="w-full bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none" />
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="מה ראיתי / איך הרגשתי?" rows={2} className="w-full bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none resize-none" />
              <button onClick={addLog} className="w-full py-2 rounded-xl bg-fuchsia-600 text-white text-sm font-medium">שמירה ביומן</button>
            </Card>
          )}

          {logs.length === 0 ? (
            <p className="text-center text-sm text-ink/40 py-6">עוד לא נרשמו צלילות. אחרי כל צלילה — מוסיפים אותה כאן! 🐠</p>
          ) : (
            <div className="space-y-2">
              {logs.map((l, i) => (
                <Card key={l.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-fuchsia-50 text-fuchsia-700 flex items-center justify-center text-xs font-display">#{logs.length - i}</span>
                      <span className="font-medium text-ink text-sm">{l.site}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {l.depth && <Pill tone="sky">⬇️ {l.depth} מ'</Pill>}
                      <button onClick={() => setLogs((p) => p.filter((x) => x.id !== l.id))} aria-label="מחק">
                        <Trash2 className="w-4 h-4 text-ink/25" />
                      </button>
                    </div>
                  </div>
                  {l.notes && <p className="text-xs text-ink/60 mt-1.5">{l.notes}</p>}
                </Card>
              ))}
            </div>
          )}
        </div>
        <p className="text-[11px] text-ink/40 text-center">היומן והסימונים נשמרים במכשיר ועובדים בלי אינטרנט.</p>
      </div>
    </div>
  );
}
