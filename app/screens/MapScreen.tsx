"use client";
import dynamic from "next/dynamic";
import { ScreenHeader } from "../components/ui";

const RouteMap = dynamic(() => import("../components/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center text-ink/40 text-sm">טוען מפה… 🗺️</div>
  ),
});

export default function MapScreen() {
  return (
    <div className="flex flex-col h-full">
      <ScreenHeader title="מפת המסלול" subtitle="🏨 מלונות · ⭐ פעילויות · הקו הוא מסלול הטיול" />
      <div className="flex-1 relative">
        <RouteMap />
      </div>
    </div>
  );
}
