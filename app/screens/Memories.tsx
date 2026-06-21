"use client";
import { useState, useRef } from "react";
import { ScreenHeader, Card } from "../components/ui";
import { useLocal } from "../lib/store";
import { hebDate } from "../lib/dates";
import { Plus, Trash2, Camera, X } from "lucide-react";

type Memory = {
  id: string;
  date: string;
  mood: string;
  title: string;
  note: string;
  photo?: string;
};

const MOODS = ["😍", "🤩", "🤿", "🐘", "🏖️", "🍜", "😄", "😴"];

export default function Memories({ onBack }: { onBack: () => void }) {
  const [mems, setMems] = useLocal<Memory[]>("memories", []);
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState("😍");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState<string | undefined>();
  const [quotaErr, setQuotaErr] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().slice(0, 10);

  const onPhoto = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 720;
        let { width, height } = img;
        if (width > height && width > max) { height = (height * max) / width; width = max; }
        else if (height > max) { width = (width * max) / height; height = max; }
        const c = document.createElement("canvas");
        c.width = width; c.height = height;
        c.getContext("2d")?.drawImage(img, 0, 0, width, height);
        setPhoto(c.toDataURL("image/jpeg", 0.6));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const reset = () => { setMood("😍"); setTitle(""); setNote(""); setPhoto(undefined); setOpen(false); setQuotaErr(false); };

  const save = () => {
    if (!title.trim() && !note.trim() && !photo) return;
    const entry: Memory = { id: "m" + Date.now(), date: today, mood, title: title.trim(), note: note.trim(), photo };
    try {
      setMems((p) => [entry, ...p]);
      reset();
    } catch {
      setQuotaErr(true);
    }
  };

  return (
    <div className="pb-8">
      <ScreenHeader
        title="זיכרונות"
        subtitle="הרגעים הכי יפים מהטיול"
        onBack={onBack}
        right={
          <button onClick={() => setOpen((s) => !s)} className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-sm">
            <Plus className="w-5 h-5" />
          </button>
        }
      />
      <div className="px-4 pt-3">
        {open && (
          <Card className="p-4 mb-4 space-y-3">
            <div className="flex gap-1.5 justify-between">
              {MOODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`text-2xl w-9 h-9 rounded-full flex items-center justify-center transition ${mood === m ? "bg-teal-100 scale-110" : ""}`}
                >
                  {m}
                </button>
              ))}
            </div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="כותרת (לדוגמה: הצלילה הראשונה!)" className="w-full bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none" />
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="מה קרה? מה הרגשת?" rows={3} className="w-full bg-ink/5 rounded-xl px-3 py-2 text-sm outline-none resize-none" />

            {photo ? (
              <div className="relative">
                <img src={photo} alt="" className="w-full rounded-xl" />
                <button onClick={() => setPhoto(undefined)} className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={() => fileRef.current?.click()} className="w-full py-2.5 rounded-xl bg-ink/5 text-ink/60 text-sm flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" /> הוסף תמונה (לא חובה)
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />

            {quotaErr && <p className="text-xs text-coral">אין מספיק מקום לשמירת התמונה — נסה בלי תמונה או מחק זיכרונות ישנים.</p>}
            <button onClick={save} className="w-full py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium">שמירת הזיכרון</button>
          </Card>
        )}

        {mems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl">📸</div>
            <p className="text-ink/50 text-sm mt-3">עוד אין זיכרונות.<br />בכל יום מיוחד — הוסיפו רגע לזכור! 💛</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mems.map((m) => (
              <Card key={m.id} className="overflow-hidden">
                {m.photo && <img src={m.photo} alt="" className="w-full" />}
                <div className="p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">{m.mood}</span>
                    <div className="flex-1 min-w-0">
                      {m.title && <p className="font-display text-ink">{m.title}</p>}
                      <p className="text-[11px] text-ink/40">{hebDate(m.date)}</p>
                    </div>
                    <button onClick={() => setMems((p) => p.filter((x) => x.id !== m.id))} aria-label="מחק">
                      <Trash2 className="w-4 h-4 text-ink/25" />
                    </button>
                  </div>
                  {m.note && <p className="text-sm text-ink/70 mt-1.5 whitespace-pre-wrap">{m.note}</p>}
                </div>
              </Card>
            ))}
          </div>
        )}
        <p className="text-[11px] text-ink/40 text-center mt-4">הזיכרונות נשמרים במכשיר ועובדים בלי אינטרנט. תמונות נשמרות בקטן כדי לחסוך מקום.</p>
      </div>
    </div>
  );
}
