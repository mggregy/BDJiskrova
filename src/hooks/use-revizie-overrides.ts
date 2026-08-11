import { useCallback, useEffect, useState } from "react";
import { REVIZIE, type Revizia } from "@/data/dom-data";

export type ReviziaOverride = Partial<
  Pick<
    Revizia,
    "poslednaRevizia" | "platnaDo" | "frekvencia" | "vykonavatel" | "rozsah" | "poznamka"
  >
>;

export type OverrideMap = Record<string, ReviziaOverride>;

const STORAGE_KEY = "jiskrova:revizie-overrides:v1";

function readStorage(): OverrideMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OverrideMap) : {};
  } catch {
    return {};
  }
}

export function useRevizieOverrides() {
  const [overrides, setOverrides] = useState<OverrideMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOverrides(readStorage());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: OverrideMap) => {
    setOverrides(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage nedostupné */
    }
  }, []);

  const saveOverride = useCallback(
    (id: string, patch: ReviziaOverride) => {
      const cleaned: ReviziaOverride = {};
      const base = REVIZIE.find((r) => r.id === id);
      (Object.keys(patch) as Array<keyof ReviziaOverride>).forEach((k) => {
        const v = patch[k];
        if (v == null || v === "") return;
        if (base && (base[k] ?? "") === v) return; // rovnaké ako originál → neukladať
        cleaned[k] = v;
      });
      const next = { ...readStorage() };
      if (Object.keys(cleaned).length === 0) delete next[id];
      else next[id] = cleaned;
      persist(next);
    },
    [persist],
  );

  const resetOverride = useCallback(
    (id: string) => {
      const next = { ...readStorage() };
      delete next[id];
      persist(next);
    },
    [persist],
  );

  const revizie: Revizia[] = REVIZIE.map((r) => ({ ...r, ...(overrides[r.id] ?? {}) }));

  return { revizie, overrides, hydrated, saveOverride, resetOverride };
}
