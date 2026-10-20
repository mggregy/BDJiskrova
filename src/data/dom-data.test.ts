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

test("bubinkaSpotrebyPouzijeNajblizsiRokSTeplo", () => {
  expect(poslednyRokSTeplo.rok).toBe(2025);
  expect(predoslyRokSTeplo?.rok).toBe(2024);
});

test("spotrebaTeplaJeSucetUKaTUV", () => {
  expect(spotrebaTeplaKwh(poslednyRokSTeplo)).toBe(198246); // 153 470 ÚK + 44 776 TÚV
  expect(spotrebaTeplaKwh(predoslyRokSTeplo!)).toBe(180460); // 137 170 ÚK + 43 290 TÚV
});

test("popisekSezony", () => {
  expect(teploSezona(poslednyRokSTeplo.rok)).toBe("2025/2026");
});

test("vsetkyRokyS TeplomMajuKladnuSpotrebu", () => {
  for (const r of ROKY) {
    if (r.teploCelkomKwh) expect(spotrebaTeplaKwh(r)).toBeGreaterThan(0);
  }
});
