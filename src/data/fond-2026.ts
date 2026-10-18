import type { FondKategoriaRok } from './fond-oprav-historia';

export const FOND_2026_ZDROJ = 'https://docs.google.com/spreadsheets/d/1lMdZeK62U2ezP5Ckc1kPVYaHCkFtSuTAU7gO_y0RXkE/edit';
export const FOND_2026_DATUM = '2026-09-30';
// Výpis: január–máj a júl–september. Júnový predpis nie je uvedený.
export const FOND_2026_PREDPIS = 7747.60;
export const FOND_2026_SIPO = 13.95; // deväť doložených kreditov po 1,55 €
export const FOND_2026_TVORBA = FOND_2026_PREDPIS + FOND_2026_SIPO;

export const FOND_2026_KATEGORIE: FondKategoriaRok[] = [
  { kategoria: 'Výťahy — opravy', typ: 'jednorazove', suma: -1475, polozky: [
    { popis: 'vyčistenie a dezinfekcia výťahovej šachty, J.8', suma: -1475, datum: '6/11/2026' },
  ] },
  { kategoria: 'Elektro / osvetlenie', typ: 'jednorazove', suma: -300, polozky: [
    { popis: 'OP a OS elektroinštalácie', suma: -300, datum: '6/19/2026' },
  ] },
  { kategoria: 'Bankové poplatky', typ: 'pravidelne', suma: -162.35, polozky: [
    ...[
      ['1/30/2026', -17.90], ['2/27/2026', -17.65], ['3/31/2026', -16.90],
      ['4/30/2026', -17.65], ['5/29/2026', -17.15], ['6/30/2026', -22.15],
      ['7/31/2026', -18.40], ['8/31/2026', -17.65], ['9/30/2026', -16.90],
    ].map(([datum, suma]) => ({ popis: 'Servisné poplatky /bankové poplatky/', suma: Number(suma), datum: String(datum) })),
  ] },
  { kategoria: 'Vchod / DDZ / kľúče', typ: 'jednorazove', suma: -688.20, polozky: [
    { popis: 'oprava vchodových brán, J. 6-8', suma: -90, datum: '4/1/2026' },
    { popis: 'dodanie a naprogramovanie 4ks DESFire kľúčov (Vacula Pavol) — faktúra, mimo výpisu fondu', suma: -49.20, datum: '7/13/2026' },
    { popis: 'dodanie a montáž dverí — dátum zaúčtovania vo výpise fondu', suma: -549, datum: '8/17/2026' },
  ] },
  { kategoria: 'Požiarna ochrana', typ: 'pravidelne', suma: -80.80, polozky: [
    { popis: 'Preventívna protipožiarna prehliadka vrátane hydrantov (KM protect s.r.o.) — dátum zaúčtovania vo výpise; vykonaná 17. 7. 2026', suma: -80.80, datum: '7/14/2026' },
  ] },
  { kategoria: 'Inkasné poplatky', typ: 'pravidelne', suma: -22.22, polozky: [
    ...[
      ['1/15/2026', -1.56], ['2/16/2026', -1.56], ['3/16/2026', -1.56],
      ['4/15/2026', -1.56], ['5/15/2026', -1.56], ['6/15/2026', -1.56],
      ['6/19/2026', -9], ['7/15/2026', -1.56], ['8/17/2026', -2.30],
    ].map(([datum, suma]) => ({ popis: 'Inkasné poplatky', suma: Number(suma), datum: String(datum) })),
  ] },
  { kategoria: 'Administratíva/mzdy', typ: 'pravidelne', suma: -5, polozky: [
    { popis: 'vystavenie faktúry', suma: -5, datum: '3/31/2026' },
  ] },
];
export const FOND_2026_CERPANIE = Math.round(-FOND_2026_KATEGORIE.reduce((sum, k) => sum + k.suma, 0) * 100) / 100;
// Vypočítané saldo z potvrdených pohybov, nie nový bankový výpis.
export const FOND_2026_ZOSTATOK = Math.round((98292.92 + FOND_2026_TVORBA - FOND_2026_CERPANIE) * 100) / 100;
