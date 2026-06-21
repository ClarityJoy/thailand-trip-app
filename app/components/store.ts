"use client";
import { useEffect, useState } from "react";

// Hook קטן לשמירה מתמשכת ב-localStorage (עובד אופליין)
export function useLocal<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("thai26:" + key);
      if (raw != null) setValue(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("thai26:" + key, JSON.stringify(value));
    } catch {}
  }, [key, value, ready]);

  return [value, setValue, ready] as const;
}
