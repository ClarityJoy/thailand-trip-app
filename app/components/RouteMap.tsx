"use client";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { HOTELS, ITINERARY, DESTINATIONS } from "../data/trip";
import { mapsUrl } from "../screens/itemIcon";

function pin(emoji: string, color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50% 50% 50% 0;background:${color};transform:rotate(45deg);box-shadow:0 2px 6px rgba(0,0,0,.3);border:2px solid #fff;">
             <span style="transform:rotate(-45deg);font-size:16px;line-height:1;">${emoji}</span>
           </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  });
}

export default function RouteMap() {
  // נקודות מלון (לפי סדר הטיול) לקו המסלול
  const routeStops = [
    HOTELS[0], // Park Nine - בנגקוק
    HOTELS[1], // Koh Tao
    HOTELS[2], // Koh Samui
    HOTELS[3], // Radisson - בנגקוק
  ];
  const line: [number, number][] = routeStops.map((h) => [h.coords.lat, h.coords.lng]);

  // אטרקציות עם קואורדינטות
  const activities = ITINERARY.flatMap((d) =>
    d.items
      .filter((i) => i.coords && (i.type === "activity" || i.type === "free"))
      .map((i) => ({ ...i, date: d.date }))
  );

  return (
    <MapContainer
      center={[11.5, 100.0]}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={line} pathOptions={{ color: "#F4623A", weight: 3, dashArray: "6 8" }} />

      {HOTELS.map((h) => (
        <Marker key={h.id} position={[h.coords.lat, h.coords.lng]} icon={pin("🏨", "#0F766E")}>
          <Popup>
            <div style={{ direction: "rtl", textAlign: "right", minWidth: 160 }}>
              <strong>{h.name}</strong>
              <div style={{ fontSize: 12, color: "#666" }}>{h.region}</div>
              <div style={{ fontSize: 12 }}>{h.nights} לילות</div>
              <a href={mapsUrl(h.coords.lat, h.coords.lng)} target="_blank" rel="noreferrer" style={{ color: "#0F766E" }}>
                פתח ב-Google Maps ›
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      {activities.map((a) => (
        <Marker key={a.id} position={[a.coords!.lat, a.coords!.lng]} icon={pin("⭐", "#1E9BD7")}>
          <Popup>
            <div style={{ direction: "rtl", textAlign: "right", minWidth: 160 }}>
              <strong>{a.title}</strong>
              <div style={{ fontSize: 12, color: "#666" }}>{a.place}</div>
              <a href={mapsUrl(a.coords!.lat, a.coords!.lng)} target="_blank" rel="noreferrer" style={{ color: "#0F766E" }}>
                פתח ב-Google Maps ›
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      {DESTINATIONS.map((d) => (
        <Marker key={d.id} position={[d.coords.lat, d.coords.lng]} icon={pin(d.emoji, "#FFC857")} />
      ))}
    </MapContainer>
  );
}
