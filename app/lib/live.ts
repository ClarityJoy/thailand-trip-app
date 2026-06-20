"use client";
import { useEffect, useState } from "react";
import { LatLng } from "../data/trip";

// ------------------------------------------------------------
// מזג אוויר — Open-Meteo (חינם, ללא מפתח) + fallback אופליין
// ------------------------------------------------------------
export type Weather = {
  tempC: number;
  code: number;
  windKph: number;
  daily: { date: string; min: number; max: number; code: number }[];
  offline: boolean;
};

const WMO: Record<number, { label: string; emoji: string }> = {
  0: { label: "שמיים בהירים", emoji: "☀️" },
  1: { label: "בהיר בעיקר", emoji: "🌤️" },
  2: { label: "מעונן חלקית", emoji: "⛅" },
  3: { label: "מעונן", emoji: "☁️" },
  45: { label: "ערפל", emoji: "🌫️" },
  48: { label: "ערפל", emoji: "🌫️" },
  51: { label: "טפטוף קל", emoji: "🌦️" },
  61: { label: "גשם", emoji: "🌧️" },
  63: { label: "גשם", emoji: "🌧️" },
  65: { label: "גשם חזק", emoji: "🌧️" },
  80: { label: "ממטרים", emoji: "🌦️" },
  95: { label: "סופת רעמים", emoji: "⛈️" },
};

export function weatherInfo(code: number) {
  return WMO[code] ?? { label: "—", emoji: "🌡️" };
}

export function useWeather(coords: LatLng) {
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Bangkok&forecast_days=5`;
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        const daily = (j.daily?.time ?? []).map((d: string, i: number) => ({
          date: d,
          min: Math.round(j.daily.temperature_2m_min[i]),
          max: Math.round(j.daily.temperature_2m_max[i]),
          code: j.daily.weather_code[i],
        }));
        setData({
          tempC: Math.round(j.current?.temperature_2m ?? 31),
          code: j.current?.weather_code ?? 2,
          windKph: Math.round(j.current?.wind_speed_10m ?? 10),
          daily,
          offline: false,
        });
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setData({ tempC: 31, code: 2, windKph: 12, daily: [], offline: true });
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [coords.lat, coords.lng]);

  return { data, loading };
}

// ------------------------------------------------------------
// שערי מטבע — open.er-api.com (חינם) + fallback
// ------------------------------------------------------------
export type Rates = { ILS: number; USD: number; offline: boolean };
const FALLBACK_RATES: Rates = { ILS: 0.1, USD: 0.028, offline: true }; // 1 THB ≈

export function useRates() {
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES);
  useEffect(() => {
    let alive = true;
    fetch("https://open.er-api.com/v6/latest/THB")
      .then((r) => r.json())
      .then((j) => {
        if (!alive || !j?.rates) return;
        setRates({ ILS: j.rates.ILS, USD: j.rates.USD, offline: false });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return rates;
}
