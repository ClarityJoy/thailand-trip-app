"use client";
import { useState } from "react";
import { DESTINATIONS, Destination } from "../data/trip";
import { ScreenHeader, Card, SectionTitle } from "../components/ui";
import { DestScene } from "../components/DestScene";
import { PodcastCard } from "../components/PodcastCard";
import { mapsUrl } from "./itemIcon";
import { Lightbulb, Info, ListChecks, MapPin, ChevronLeft } from "lucide-react";

export default function Guides({ go }: { go: (t: string, p?: any) => void }) {
  const [open, setOpen] = useState<Destination | null>(null);

  if (open) {
    return (
      <div className="pb-8">
        <ScreenHeader title={`${open.name} ${open.emoji}`} subtitle={open.tagline} onBack={() => setOpen(null)} />
        <div className="px-4 pt-3 space-y-4">
          <div className="relative h-36 rounded-2xl overflow-hidden">
            <DestScene id={open.id} className="absolute inset-0 w-full h-full" />
            <span className="absolute bottom-2 left-3 text-5xl drop-shadow">{open.emoji}</span>
          </div>

          {open.id === "kohtao" && (
            <Card
              className="p-4 bg-gradient-to-br from-cyan-600 to-teal-700 text-white flex items-center gap-3"
              onClick={() => go("diving")}
            >
              <span className="text-3xl">🤿</span>
              <div className="flex-1">
                <p className="font-display">הקורס של שירה</p>
                <p className="text-xs text-white/85">Open Water SSI — תוכנית, סימני ידיים, בטיחות ויומן צלילות</p>
              </div>
              <ChevronLeft className="w-5 h-5 text-white/80" />
            </Card>
          )}

          <Card className="p-4">
            <div className="flex items-center gap-2 text-ink/80 font-display mb-1">
              <Info className="w-4 h-4" /> קצת היסטוריה
            </div>
            <p className="text-sm text-ink/70 leading-relaxed">{open.history}</p>
          </Card>

          <PodcastCard title={open.podcast.title} script={open.podcast.script} />

          <SectionTitle>
            <span className="flex items-center gap-1.5"><Lightbulb className="w-4 h-4" /> ידעת ש…?</span>
          </SectionTitle>
          <div className="space-y-2">
            {open.funFacts.map((f, i) => (
              <Card key={i} className="p-3 flex gap-2">
                <span className="text-lg">💡</span>
                <p className="text-sm text-ink/75">{f}</p>
              </Card>
            ))}
          </div>

          <SectionTitle>
            <span className="flex items-center gap-1.5"><ListChecks className="w-4 h-4" /> טיפים חשובים</span>
          </SectionTitle>
          <Card className="p-4 space-y-2">
            {open.tips.map((t, i) => (
              <div key={i} className="flex gap-2 text-sm text-ink/75">
                <span className="text-teal-600">✓</span> {t}
              </div>
            ))}
          </Card>

          <SectionTitle>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> מה עושים</span>
          </SectionTitle>
          <div className="space-y-2">
            {open.thingsToDo.map((t, i) => (
              <Card key={i} className="p-3 text-sm text-ink/80">
                {t}
              </Card>
            ))}
          </div>

          <a
            href={mapsUrl(open.coords.lat, open.coords.lng, open.nameEn)}
            target="_blank"
            rel="noreferrer"
            className="block text-center py-3 rounded-2xl bg-teal-600 text-white font-medium"
          >
            פתח את {open.name} ב-Google Maps
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <ScreenHeader title="מדריכי יעד" subtitle="כל מקום שאנחנו מבקרים בו" />
      <div className="px-4 pt-3 space-y-3">
        {DESTINATIONS.map((d) => (
          <Card key={d.id} className="overflow-hidden" onClick={() => setOpen(d)}>
            <div className="flex">
              <div className="relative w-28 shrink-0">
                <DestScene id={d.id} className="absolute inset-0 w-full h-full" />
                <span className="absolute bottom-1 left-2 text-3xl drop-shadow">{d.emoji}</span>
              </div>
              <div className="p-3 flex-1 min-w-0">
                <h3 className="font-display text-lg text-ink">{d.name}</h3>
                <p className="text-xs text-ink/50 mb-1">{d.nameEn}</p>
                <p className="text-sm text-ink/70 line-clamp-2">{d.tagline}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
