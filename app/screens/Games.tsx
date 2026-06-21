"use client";
import { useState } from "react";
import { TRIVIA, DIVE_TRIVIA, PHRASES, MEMORY_ICONS, TRIP, TriviaQ } from "../data/trip";
import { ScreenHeader, Card, Pill } from "../components/ui";
import { useLocal } from "../lib/store";
import { Star, Volume2, RotateCcw } from "lucide-react";

type Game = "menu" | "trivia" | "dive" | "phrases" | "memory";

export default function Games({ onBack }: { onBack: () => void }) {
  const [game, setGame] = useState<Game>("menu");
  const [stamps, setStamps] = useLocal<Record<string, number>>("stamps", {});

  const award = (key: string, val: number) =>
    setStamps((p) => ({ ...p, [key]: Math.max(p[key] ?? 0, val) }));

  if (game === "trivia") return <Trivia title="טריוויה תאילנד" questions={TRIVIA} onBack={() => setGame("menu")} onWin={(s) => award("trivia", s)} />;
  if (game === "dive") return <Trivia title="טריוויית צלילה" questions={DIVE_TRIVIA} onBack={() => setGame("menu")} onWin={(s) => award("dive", s)} />;
  if (game === "phrases") return <Phrases onBack={() => setGame("menu")} onWin={() => award("phrases", 1)} />;
  if (game === "memory") return <Memory onBack={() => setGame("menu")} onWin={() => award("memory", 1)} />;

  const totalStamps = Object.values(stamps).reduce((a, b) => a + b, 0);

  return (
    <div className="pb-6">
      <ScreenHeader title="משחקים" subtitle="לאסוף בולים ⭐ בדרך" onBack={onBack} />
      <div className="px-4 pt-3">
        <Card className="p-4 mb-4 bg-gradient-to-br from-amber-400 to-coral text-white flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm">הבולים של {TRIP.kidName}</p>
            <p className="font-display text-3xl">{totalStamps} בולים</p>
          </div>
          <span className="text-5xl">🏆</span>
        </Card>

        {[
          { id: "trivia", e: "❓", t: "טריוויה תאילנד", d: "שאלות עם עובדה מפתיעה אחרי כל תשובה", got: stamps.trivia ?? 0, max: TRIVIA.length },
          { id: "dive", e: "🤿", t: "טריוויית צלילה", d: "כל מה שלמדת על הים והשונית", got: stamps.dive ?? 0, max: DIVE_TRIVIA.length },
          { id: "phrases", e: "🗣️", t: "איך אומרים…?", d: "מילון תאי קטן עם הגייה", got: stamps.phrases ?? 0, max: 1 },
          { id: "memory", e: "🃏", t: "זיכרון תאי", d: "מצאו את כל הזוגות", got: stamps.memory ?? 0, max: 1 },
        ].map((g) => (
          <Card key={g.id} className="p-4 mb-3 flex items-center gap-3" onClick={() => setGame(g.id as Game)}>
            <span className="text-4xl">{g.e}</span>
            <div className="flex-1">
              <p className="font-display text-ink">{g.t}</p>
              <p className="text-xs text-ink/50">{g.d}</p>
            </div>
            {g.got > 0 ? <Pill tone="amber"><Star className="w-3 h-3" /> {g.got}</Pill> : <Pill tone="gray">שחק</Pill>}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------- טריוויה ----------
function Trivia({ title, questions, onBack, onWin }: { title: string; questions: TriviaQ[]; onBack: () => void; onWin: (s: number) => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = questions[i];
  const done = i >= questions.length;
  const passMark = Math.ceil(questions.length * 0.75);

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= questions.length) onWin(score);
    setPicked(null);
    setI((x) => x + 1);
  };

  if (done) {
    return (
      <div className="pb-6">
        <ScreenHeader title={title} onBack={onBack} />
        <div className="px-4 pt-10 text-center">
          <div className="text-7xl">{score >= passMark ? "🏆" : "🎉"}</div>
          <p className="font-display text-3xl text-ink mt-3">{score} / {questions.length}</p>
          <p className="text-ink/60 mt-1">{score >= passMark ? "מדהים!" : "כל הכבוד!"}</p>
          <button onClick={() => { setI(0); setScore(0); setPicked(null); }} className="mt-6 px-5 py-2.5 rounded-xl bg-teal-600 text-white inline-flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> שחק שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <ScreenHeader title={title} subtitle={`שאלה ${i + 1} מתוך ${questions.length}`} onBack={onBack} />
      <div className="px-4 pt-4">
        <div className="h-1.5 bg-ink/5 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-coral rounded-full transition-all" style={{ width: `${(i / questions.length) * 100}%` }} />
        </div>
        <Card className="p-5">
          <p className="font-display text-lg text-ink mb-4">{q.q}</p>
          <div className="space-y-2">
            {q.options.map((o, idx) => {
              let cls = "bg-ink/5 text-ink";
              if (picked !== null) {
                if (idx === q.answer) cls = "bg-teal-500 text-white";
                else if (idx === picked) cls = "bg-coral/80 text-white";
                else cls = "bg-ink/5 text-ink/40";
              }
              return (
                <button key={idx} onClick={() => choose(idx)} className={`w-full text-right p-3 rounded-xl text-sm transition ${cls}`}>
                  {o}
                </button>
              );
            })}
          </div>
        </Card>
        {picked !== null && (
          <>
            <Card className="p-4 mt-3 bg-amber-50">
              <p className="text-sm text-amber-900">💡 {q.fact}</p>
            </Card>
            <button onClick={next} className="w-full mt-3 py-3 rounded-2xl bg-teal-600 text-white font-medium">
              {i + 1 >= questions.length ? "סיום" : "הבא ›"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ---------- איך אומרים ----------
function Phrases({ onBack, onWin }: { onBack: () => void; onWin: () => void }) {
  const speak = (text: string) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "th-TH";
      speechSynthesis.speak(u);
    } catch {}
  };
  return (
    <div className="pb-6">
      <ScreenHeader title="איך אומרים…?" subtitle="הקש 🔊 לשמוע" onBack={onBack} />
      <div className="px-4 pt-3 space-y-2" onTouchStart={onWin} onMouseDown={onWin}>
        {PHRASES.map((p, i) => (
          <Card key={i} className="p-4 flex items-center gap-3">
            <button
              onClick={() => speak(p.thai)}
              className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <p className="font-display text-ink">{p.he}</p>
              <p className="text-sm text-ink/50" dir="ltr">{p.roman}</p>
            </div>
            <p className="text-2xl text-ink/80" dir="ltr">{p.thai}</p>
          </Card>
        ))}
        <p className="text-[11px] text-ink/40 text-center pt-2">ההגייה נשמעת רק כשיש חיבור / קול במכשיר.</p>
      </div>
    </div>
  );
}

// ---------- זיכרון ----------
function Memory({ onBack, onWin }: { onBack: () => void; onWin: () => void }) {
  const build = () => {
    const deck = [...MEMORY_ICONS, ...MEMORY_ICONS]
      .map((e, idx) => ({ id: idx, e }))
      .sort(() => Math.random() - 0.5);
    return deck;
  };
  const [cards, setCards] = useState(build);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const won = matched.length === MEMORY_ICONS.length;

  const flip = (id: number, e: string) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(e)) return;
    const nf = [...flipped, id];
    setFlipped(nf);
    if (nf.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nf;
      const ea = cards.find((c) => c.id === a)!.e;
      const eb = cards.find((c) => c.id === b)!.e;
      setTimeout(() => {
        if (ea === eb) {
          setMatched((m) => {
            const nm = [...m, ea];
            if (nm.length === MEMORY_ICONS.length) onWin();
            return nm;
          });
        }
        setFlipped([]);
      }, 700);
    }
  };

  const reset = () => {
    setCards(build());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div className="pb-6">
      <ScreenHeader
        title="זיכרון תאי"
        subtitle={won ? "ניצחת! 🎉" : `מהלכים: ${moves}`}
        onBack={onBack}
        right={
          <button onClick={reset} className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">
            <RotateCcw className="w-4 h-4 text-ink" />
          </button>
        }
      />
      <div className="px-4 pt-4">
        {won && (
          <Card className="p-4 mb-4 text-center bg-teal-50">
            <p className="font-display text-xl text-teal-800">🏆 כל הזוגות נמצאו ב-{moves} מהלכים!</p>
          </Card>
        )}
        <div className="grid grid-cols-4 gap-3">
          {cards.map((c) => {
            const isUp = flipped.includes(c.id) || matched.includes(c.e);
            return (
              <button
                key={c.id}
                onClick={() => flip(c.id, c.e)}
                className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all ${
                  isUp ? "bg-white shadow-sm" : "bg-teal-600"
                }`}
              >
                {isUp ? c.e : ""}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
