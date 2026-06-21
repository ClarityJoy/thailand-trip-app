"use client";

import { useEffect, useState } from "react";
import { Home as HomeIcon, CalendarDays, Map as MapIcon, BookOpen, LayoutGrid } from "lucide-react";
import Home from "./screens/Home";
import Itinerary from "./screens/Itinerary";
import MapScreen from "./screens/MapScreen";
import Guides from "./screens/Guides";
import More from "./screens/More";
import HotelsFlights from "./screens/HotelsFlights";
import Attractions from "./screens/Attractions";
import Budget from "./screens/Budget";
import Currency from "./screens/Currency";
import Weather from "./screens/Weather";
import Documents from "./screens/Documents";
import Emergency from "./screens/Emergency";
import Games from "./screens/Games";
import Packing from "./screens/Packing";
import Diving from "./screens/Diving";
import Memories from "./screens/Memories";

type Tab = "home" | "itinerary" | "map" | "guides" | "more";
const TABS: { id: Tab; label: string; Icon: any }[] = [
  { id: "home", label: "בית", Icon: HomeIcon },
  { id: "itinerary", label: "מסלול", Icon: CalendarDays },
  { id: "map", label: "מפה", Icon: MapIcon },
  { id: "guides", label: "מדריכים", Icon: BookOpen },
  { id: "more", label: "עוד", Icon: LayoutGrid },
];
const SUBS = ["hotels", "attractions", "budget", "currency", "weather", "documents", "emergency", "games", "packing", "diving", "memories"];

const PHONE_W = 390;
const PHONE_H = 844;

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [sub, setSub] = useState<string | null>(null);

  // רישום Service Worker ל-PWA אופליין
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  const go = (target: string) => {
    if (TABS.some((t) => t.id === target)) {
      setSub(null);
      setTab(target as Tab);
    } else if (SUBS.includes(target)) {
      setSub(target);
    }
  };
  const back = () => setSub(null);

  const renderTab = () => {
    switch (tab) {
      case "home": return <Home go={go} />;
      case "itinerary": return <Itinerary go={go} />;
      case "map": return <MapScreen />;
      case "guides": return <Guides go={go} />;
      case "more": return <More go={go} />;
    }
  };

  const renderSub = () => {
    switch (sub) {
      case "hotels": return <HotelsFlights onBack={back} />;
      case "attractions": return <Attractions onBack={back} />;
      case "budget": return <Budget onBack={back} />;
      case "currency": return <Currency onBack={back} />;
      case "weather": return <Weather onBack={back} />;
      case "documents": return <Documents onBack={back} />;
      case "emergency": return <Emergency onBack={back} />;
      case "games": return <Games onBack={back} />;
      case "packing": return <Packing onBack={back} />;
      case "diving": return <Diving onBack={back} />;
      case "memories": return <Memories onBack={back} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-pink-900 to-pink-950 py-0 sm:py-6">
      <InstallHint />
      <div
        className="relative bg-black sm:rounded-[44px] sm:p-2 sm:shadow-2xl w-full sm:w-auto"
        style={{ maxWidth: PHONE_W + 16 }}
      >
        <div
          className="relative bg-sand sm:rounded-[36px] overflow-hidden w-full mx-auto h-[100dvh] sm:h-[844px]"
          style={{ maxWidth: PHONE_W }}
        >
          {/* תוכן */}
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {sub ? renderSub() : renderTab()}
            </div>

            {/* ניווט תחתון */}
            {!sub && (
              <nav className="shrink-0 bg-white border-t border-ink/5 px-2 pb-[env(safe-area-inset-bottom)]">
                <div className="flex">
                  {TABS.map((t) => {
                    const active = tab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => go(t.id)}
                        className="flex-1 flex flex-col items-center gap-0.5 py-2"
                      >
                        <t.Icon className={`w-5 h-5 ${active ? "text-pink-600" : "text-ink/35"}`} />
                        <span className={`text-[10px] ${active ? "text-pink-600 font-medium" : "text-ink/40"}`}>
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InstallHint() {
  const [evt, setEvt] = useState<any>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = (e: any) => {
      e.preventDefault();
      setEvt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", h);
    return () => window.removeEventListener("beforeinstallprompt", h);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed top-2 inset-x-2 z-50 sm:max-w-sm sm:mx-auto bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3">
      <span className="text-2xl">📲</span>
      <p className="flex-1 text-xs text-ink/70">התקינו את האפליקציה למסך הבית — עובדת גם בלי אינטרנט.</p>
      <button
        onClick={async () => { await evt?.prompt(); setShow(false); }}
        className="px-3 py-1.5 rounded-xl bg-pink-600 text-white text-sm"
      >
        התקן
      </button>
      <button onClick={() => setShow(false)} className="text-ink/30 text-lg px-1">×</button>
    </div>
  );
}
