import { expect, test } from "bun:test";
import {
  ROKY,
  poslednyRok,
  poslednyRokSTeplo,
  predoslyRokSTeplo,
  spotrebaTeplaKwh,
  teploSezona,
} from "./dom-data";

// Aktuálny rok (2026) nemá potvrdené vyúčtovanie tepla → bubinka padá na najbližší rok s dátami.
test("aktuálny rok nemá spotrebu tepla", () => {
  expect(poslednyRok.rok).toBe(2026);
  expect(poslednyRok.teploCelkomKwh ?? 0).toBe(0);
});

test("spotreba tepla sa zobrazí za najbližší rok s dátami", () => {
  expect(poslednyRokSTeplo.rok).toBe(2025);
  expect(predoslyRokSTeplo?.rok).toBe(2024);
});

test("spotreba tepla je súčet ÚK a TÚV", () => {
  expect(spotrebaTeplaKwh(poslednyRokSTeplo)).toBe(198246); // 153 470 ÚK + 44 776 TÚV
  expect(spotrebaTeplaKwh(predoslyRokSTeplo!)).toBe(180460); // 137 170 ÚK + 43 290 TÚV
});

test("popisek vykurovacej sezóny", () => {
  expect(teploSezona(poslednyRokSTeplo.rok)).toBe("2025/2026");
});

test("každý rok s teplom má kladnú spotrebu", () => {
  for (const r of ROKY) {
    if (r.teploCelkomKwh) expect(spotrebaTeplaKwh(r)).toBeGreaterThan(0);
  }
});
