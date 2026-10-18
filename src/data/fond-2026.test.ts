import { test, expect } from 'bun:test';
import { FOND_2026_KATEGORIE, FOND_2026_TVORBA, FOND_2026_CERPANIE, FOND_2026_ZOSTATOK, FOND_2026_PREDPIS, FOND_2026_SIPO } from './fond-2026';
import { FOND_BY_YEAR, FOND_SUMMARY } from './fond-oprav-historia';
import { ROKY } from './dom-data';

test('uses only eight recorded months of contributions, not an estimated June', () => {
  expect(FOND_2026_PREDPIS).toBe(7747.60);
  expect(FOND_2026_SIPO).toBe(13.95);
  expect(FOND_2026_TVORBA).toBeCloseTo(7761.55, 2);
});
test('includes invoice-only keys once and does not duplicate doors or inspection', () => {
  expect(FOND_2026_CERPANIE).toBe(2733.57);
  const rows = FOND_2026_KATEGORIE.flatMap(k => k.polozky);
  for (const amount of [-49.20, -549, -80.80]) expect(rows.filter(p => p.suma === amount)).toHaveLength(1);
});
test('calculated balance uses only confirmed movements', () => {
  expect(FOND_2026_ZOSTATOK).toBe(103320.90);
  const year = ROKY.find(r => r.rok === 2026);
  expect(year?.fondZostatok).toBe(103320.90);
  expect(year?.partialny).toBe(true);
  expect(year?.ytdDoDna).toBe('2026-09-30');
});
test('category totals match line items, summaries and annual spending', () => {
  for (const category of FOND_BY_YEAR['2026']) {
    expect(category.polozky.reduce((s, p) => s + p.suma, 0)).toBeCloseTo(category.suma, 2);
    expect(FOND_SUMMARY.find(s => s.kategoria === category.kategoria)?.roky['2026']).toBe(category.suma);
  }
  expect(ROKY.find(r => r.rok === 2026)?.cerpaniaFondu.reduce((s,p) => s+p.suma,0)).toBeCloseTo(2733.57,2);
});
