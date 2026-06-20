"use client";
import { DOCS, DocItem } from "../data/trip";
import { ScreenHeader, Card, Pill } from "../components/ui";
import { useLocal } from "../lib/store";
import { ShieldCheck, Check } from "lucide-react";

const CAT_LABEL: Record<DocItem["category"], { t: string; e: string }> = {
  passport: { t: "דרכונים", e: "🛂" },
  visa: { t: "ויזה", e: "📄" },
  insurance: { t: "ביטוח", e: "🛡️" },
  booking: { t: "הזמנות", e: "🎫" },
  health: { t: "בריאות", e: "💉" },
  other: { t: "שונות", e: "🗂️" },
};

export default function Documents({ onBack }: { onBack: () => void }) {
  const [ready, setReady] = useLocal<Record<string, boolean>>("docs", {});
  const cats = Array.from(new Set(DOCS.map((d) => d.category)));

  return (
    <div className="pb-6">
      <ScreenHeader title="כספת מסמכים" subtitle="זמין גם בלי רשת — סמנו מה מוכן" onBack={onBack} />
      <div className="px-4 pt-3">
        <Card className="p-3 mb-4 flex items-center gap-2 bg-teal-50">
          <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
          <p className="text-xs text-teal-800">
            רשימת הצ'ק של כל המסמכים החשובים. מומלץ לצלם כל מסמך ולשמור גם בענן.
          </p>
        </Card>

        {cats.map((cat) => (
          <div key={cat} className="mb-4">
            <h2 className="font-display text-base text-ink/80 px-1 mb-2">
              {CAT_LABEL[cat].e} {CAT_LABEL[cat].t}
            </h2>
            <Card className="overflow-hidden">
              {DOCS.filter((d) => d.category === cat).map((d, i) => {
                const isReady = !!ready[d.id];
                return (
                  <button
                    key={d.id}
                    onClick={() => setReady((p) => ({ ...p, [d.id]: !p[d.id] }))}
                    className={`w-full flex items-center gap-3 p-3 text-right ${i > 0 ? "border-t border-ink/5" : ""}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isReady ? "bg-teal-500 text-white" : "border-2 border-ink/15"
                      }`}
                    >
                      {isReady && <Check className="w-4 h-4" />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${isReady ? "text-ink/40" : "text-ink"}`}>{d.title}</p>
                      <p className="text-[11px] text-ink/40">{d.hint}</p>
                    </div>
                    {d.ref && <Pill tone="sky">{d.ref}</Pill>}
                  </button>
                );
              })}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
