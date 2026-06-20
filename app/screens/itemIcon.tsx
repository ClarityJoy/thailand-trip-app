import { Plane, Ship, BedDouble, Ticket, Car, Sparkles } from "lucide-react";
import { ItemType } from "../data/trip";

export function itemIcon(type: ItemType) {
  switch (type) {
    case "flight":
      return Plane;
    case "ferry":
      return Ship;
    case "hotel":
      return BedDouble;
    case "activity":
      return Ticket;
    case "transfer":
      return Car;
    default:
      return Sparkles;
  }
}

export function mapsUrl(lat?: number, lng?: number, q?: string) {
  if (lat != null && lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q ?? "Thailand")}`;
}
