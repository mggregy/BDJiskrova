// Údaje pre Bytový dom Jiskrova 6,8 — Bratislava
// Zdroj: ročné správy správcu NOVBYT, s.r.o. + ročné rozpočítania Techem
// Roky 2019–2024 sú z reálnych PDF dokumentov; staršie roky možno doplniť.

export const DOM_INFO = {
  nazov: "Bytový dom Jiskrova 6,8",
  mesto: "831 04 Bratislava",
  spravca: "NOVBYT, s.r.o.",
  cisloDomu: "0007",
  pocetBytov: 20,
  pocetNebytovychPriestorov: 1,
  podlahovaPlocha: 1224.09, // m²
  ucet: "SK23 0200 0000 0013 3270 7656",
};

export type FinancnaPolozka = {
  nazov: string;
  predpis: number | null;
  vyuctovanie: number;
};

export type RocnyZaznam = {
  rok: number;
  zostatokUctu: number; // €
  polozky: FinancnaPolozka[];
  spoluPredpis: number;
  spoluVyuctovanie: number;
  fondStavZaciatok: number;
  fondTvorba: number;
  fondCerpanie: number;
  fondZostatok: number;
  cerpaniaFondu: Array<{ popis: string; suma: number }>;
  // Spotreba tepla pre celý objekt (z Techem rozpočítania)
  teploCelkomKwh?: number;
  teploNaM2?: number;
  vyhotovil?: string;
};

export const ROKY: RocnyZaznam[] = [
  {
    rok: 2019,
    zostatokUctu: 54875.47,
    spoluPredpis: 45802.85,
    spoluVyuctovanie: 44243.04,
    fondStavZaciatok: 55749.06,
    fondTvorba: 12287.51,
    fondCerpanie: 14371.38,
    fondZostatok: 53665.19,
    teploCelkomKwh: 144930,
    teploNaM2: 118.4,
    vyhotovil: "Richard Lehotai",
    polozky: [
      { nazov: "Ústredné kúrenie", predpis: 16847.53, vyuctovanie: 16468.88 },
      { nazov: "Ohrev teplej vody", predpis: 5676.24, vyuctovanie: 5265.28 },
      { nazov: "Vodné a stočné", predpis: 3616.52, vyuctovanie: 3517.16 },
      { nazov: "Upratovanie spoločných priestorov", predpis: 1742.69, vyuctovanie: 1253.0 },
      { nazov: "Osvetlenie spoločných priestorov", predpis: 309.22, vyuctovanie: 313.78 },
      { nazov: "Výťah", predpis: 1241.64, vyuctovanie: 1088.42 },
      { nazov: "Odvoz odpadu", predpis: 1852.67, vyuctovanie: 1741.95 },
      { nazov: "Odvod dažďovej vody", predpis: 271.2, vyuctovanie: 239.98 },
      { nazov: "Fond opráv", predpis: 11621.4, vyuctovanie: 11621.4 },
      { nazov: "Poplatok za správu", predpis: 1578.78, vyuctovanie: 1578.78 },
      { nazov: "Poistenie", predpis: 667.56, vyuctovanie: 667.58 },
      { nazov: "Poplatok za rozúčtovanie", predpis: 296.76, vyuctovanie: 275.33 },
      { nazov: "Poštovné", predpis: null, vyuctovanie: 53.3 },
      { nazov: "Deratizácia", predpis: 80.64, vyuctovanie: 120.0 },
      { nazov: "Spracovanie vodomerov", predpis: null, vyuctovanie: 34.6 },
    ],
    cerpaniaFondu: [
      { popis: "Montáž prístupového systému DEK", suma: 4536.19 },
      { popis: "Likvidácia AZC krytiny z povaly", suma: 3000.0 },
      { popis: "Montáž rádiových PRT (Techem)", suma: 2016.0 },
      { popis: "Betonárske práce", suma: 1650.0 },
      { popis: "Úradná skúška výťahov s technickou inšpekciou", suma: 811.92 },
      { popis: "Kosačka, drevené oplotenie, farba, brúska", suma: 387.62 },
      { popis: "Montáž kovania + záslepky", suma: 376.0 },
      { popis: "Prerábka stúpačky v CO kryte (Jiskrova 6)", suma: 292.98 },
      { popis: "Oprava osvetlenia spoločných priestorov", suma: 173.28 },
      { popis: "Zemina, komponenty do predzáhradky, farba", suma: 132.1 },
      { popis: "Ostatné", suma: 995.29 },
    ],
  },
  {
    rok: 2020,
    zostatokUctu: 60023.96,
    spoluPredpis: 47893.56,
    spoluVyuctovanie: 44907.69,
    fondStavZaciatok: 53665.19,
    fondTvorba: 11673.35,
    fondCerpanie: 7815.33,
    fondZostatok: 57523.21,
    teploCelkomKwh: 148930,
    teploNaM2: 121.67,
    vyhotovil: "Adriana Končická",
    polozky: [
      { nazov: "Ústredné kúrenie", predpis: 18077.44, vyuctovanie: 16723.53 },
      { nazov: "Ohrev teplej vody", predpis: 6492.28, vyuctovanie: 5475.49 },
      { nazov: "Vodné a stočné", predpis: 3533.52, vyuctovanie: 3519.44 },
      { nazov: "Upratovanie spoločných priestorov", predpis: 1711.32, vyuctovanie: 1340.0 },
      { nazov: "Osvetlenie spoločných priestorov", predpis: 329.32, vyuctovanie: 330.56 },
      { nazov: "Výťah", predpis: 1305.24, vyuctovanie: 1118.85 },
      { nazov: "Odvoz odpadu", predpis: 1816.36, vyuctovanie: 1725.31 },
      { nazov: "Odvod dažďovej vody", predpis: 271.2, vyuctovanie: 233.9 },
      { nazov: "Fond opráv", predpis: 11621.4, vyuctovanie: 11621.4 },
      { nazov: "Poplatok za správu", predpis: 1620.78, vyuctovanie: 1620.78 },
      { nazov: "Poistenie", predpis: 667.56, vyuctovanie: 608.65 },
      { nazov: "SIPO Pošta", predpis: 19.22, vyuctovanie: 19.22 },
      { nazov: "Poplatok za SIPO", predpis: 44.4, vyuctovanie: 44.4 },
      { nazov: "Poplatok za rozúčtovanie", predpis: 302.88, vyuctovanie: 282.28 },
      { nazov: "Poplatok za odpočty z Techemu", predpis: null, vyuctovanie: 23.78 },
      { nazov: "Poštovné", predpis: null, vyuctovanie: 60.5 },
      { nazov: "Deratizácia", predpis: 80.64, vyuctovanie: 120.0 },
      { nazov: "Spracovanie vodomerov", predpis: null, vyuctovanie: 36.0 },
    ],
    cerpaniaFondu: [
      { popis: "Odstránenie vlhkosti v CO kryte + okapové chodníky", suma: 2700.0 },
      { popis: "Dodávka a aktivácia rádiových vodomerov", suma: 811.8 },
      { popis: "Lokálne kontroly a opravy strechy", suma: 690.0 },
      { popis: "Odstránenie závad po OP a OS plynoinštalácie", suma: 611.54 },
      { popis: "Dodávka a aktivácia rádiových vodomerov", suma: 442.8 },
      { popis: "Odstránenie závad po OP a OS plynoinštalácie", suma: 423.22 },
      { popis: "Výmena vodomerov", suma: 422.5 },
      { popis: "Betónová sedacia súprava (park)", suma: 310.8 },
      { popis: "Oprava osvetlenia spoločných priestorov", suma: 173.28 },
      { popis: "Výmena guľových uzáverov", suma: 122.24 },
      { popis: "Ostatné", suma: 1107.15 },
    ],
  },
  {
    rok: 2021,
    zostatokUctu: 69027.43,
    spoluPredpis: 46850.8,
    spoluVyuctovanie: 43202.93,
    fondStavZaciatok: 57523.21,
    fondTvorba: 11643.38,
    fondCerpanie: 3462.76,
    fondZostatok: 65703.83,
    teploCelkomKwh: 167830,
    teploNaM2: 137.11,
    vyhotovil: "Adriana Končická",
    polozky: [
      { nazov: "Ústredné kúrenie", predpis: 18026.1, vyuctovanie: 15788.02 },
      { nazov: "Ohrev teplej vody", predpis: 6051.17, vyuctovanie: 4809.53 },
      { nazov: "Vodné a stočné", predpis: 3431.57, vyuctovanie: 3506.68 },
      { nazov: "Upratovanie spoločných priestorov", predpis: 1561.43, vyuctovanie: 1200.0 },
      { nazov: "Osvetlenie spoločných priestorov", predpis: 306.52, vyuctovanie: 328.7 },
      { nazov: "Výťah", predpis: 1155.22, vyuctovanie: 1102.12 },
      { nazov: "Odvoz odpadu", predpis: 1660.19, vyuctovanie: 1725.36 },
      { nazov: "Odvod dažďovej vody", predpis: 271.2, vyuctovanie: 252.82 },
      { nazov: "Fond opráv", predpis: 11621.4, vyuctovanie: 11621.4 },
      { nazov: "Poplatok za správu", predpis: 1653.12, vyuctovanie: 1653.12 },
      { nazov: "Poistenie", predpis: 667.56, vyuctovanie: 608.65 },
      { nazov: "SIPO Pošta", predpis: 18.6, vyuctovanie: 18.6 },
      { nazov: "Poplatok za SIPO", predpis: 43.2, vyuctovanie: 43.2 },
      { nazov: "Poplatok za rozúčtovanie", predpis: 302.88, vyuctovanie: 282.55 },
      { nazov: "Export, import dát SV, TV, ÚK", predpis: null, vyuctovanie: 20.0 },
      { nazov: "Poštovné", predpis: null, vyuctovanie: 79.38 },
      { nazov: "Deratizácia", predpis: 80.64, vyuctovanie: 120.0 },
      { nazov: "Spracovanie vodomerov", predpis: null, vyuctovanie: 41.0 },
    ],
    cerpaniaFondu: [
      { popis: "Oprava strešnej krytiny", suma: 598.32 },
      { popis: "Upratovanie — povala", suma: 575.0 },
      { popis: "OP a OS elektroinštalácie", suma: 450.0 },
      { popis: "Odstránenie závad po OP a OS elektroinštalácie", suma: 370.2 },
      { popis: "Odstránenie závad po OP a OS elektroinštalácie", suma: 367.62 },
      { popis: "Prečistenie hlavnej kanalizácie el. špirálou", suma: 248.5 },
      { popis: "Výmena vodomerov", suma: 97.62 },
      { popis: "Ostatné", suma: 755.5 },
    ],
  },
  {
    rok: 2022,
    zostatokUctu: 75709.7,
    spoluPredpis: 48648.74,
    spoluVyuctovanie: 45855.04,
    fondStavZaciatok: 65703.83,
    fondTvorba: 11644.09,
    fondCerpanie: 4803.96,
    fondZostatok: 72543.96,
    teploCelkomKwh: 154230,
    teploNaM2: 126.0,
    vyhotovil: "Adriana Končická",
    polozky: [
      { nazov: "Ústredné kúrenie", predpis: 18956.88, vyuctovanie: 17502.93 },
      { nazov: "Ohrev teplej vody", predpis: 6664.12, vyuctovanie: 5502.01 },
      { nazov: "Vodné a stočné", predpis: 3405.32, vyuctovanie: 3310.73 },
      { nazov: "Upratovanie spoločných priestorov", predpis: 1508.08, vyuctovanie: 1200.0 },
      { nazov: "Osvetlenie spoločných priestorov", predpis: 425.06, vyuctovanie: 440.66 },
      { nazov: "Výťah", predpis: 1225.0, vyuctovanie: 1258.48 },
      { nazov: "Odvoz odpadu", predpis: 1756.54, vyuctovanie: 1741.95 },
      { nazov: "Odvod dažďovej vody", predpis: 271.2, vyuctovanie: 242.54 },
      { nazov: "Fond opráv", predpis: 11621.4, vyuctovanie: 11621.4 },
      { nazov: "Poplatok za správu", predpis: 1702.26, vyuctovanie: 1702.26 },
      { nazov: "Poistenie", predpis: 667.56, vyuctovanie: 608.65 },
      { nazov: "SIPO Pošta", predpis: 18.6, vyuctovanie: 18.6 },
      { nazov: "Poplatok za SIPO", predpis: 43.2, vyuctovanie: 43.2 },
      { nazov: "Poplatok za rozúčtovanie", predpis: 302.88, vyuctovanie: 319.38 },
      { nazov: "Export, import dát SV, TV, ÚK", predpis: null, vyuctovanie: 20.0 },
      { nazov: "Poplatok za odpočty z Techemu", predpis: null, vyuctovanie: 47.5 },
      { nazov: "Poštovné", predpis: null, vyuctovanie: 76.95 },
      { nazov: "Deratizácia", predpis: 80.64, vyuctovanie: 144.0 },
      { nazov: "Spracovanie vodomerov", predpis: null, vyuctovanie: 49.0 },
    ],
    cerpaniaFondu: [
      { popis: "Prvomontáž vodomeru", suma: 672.86 },
      { popis: "Búracie a murárske práce, výmena odpadovej stúpačky J8", suma: 599.26 },
      { popis: "Prvomontáž vodomeru", suma: 584.1 },
      { popis: "Prvomontáž vodomeru", suma: 529.34 },
      { popis: "Vyčistenie žľabov", suma: 429.6 },
      { popis: "Prvomontáž vodomeru", suma: 342.56 },
      { popis: "Prvomontáž vodomeru", suma: 263.36 },
      { popis: "Prvomontáž vodomeru", suma: 178.8 },
      { popis: "Odborná skúška", suma: 326.4 },
      { popis: "Ostatné", suma: 877.68 },
    ],
  },
  {
    rok: 2023,
    zostatokUctu: 87233.97,
    spoluPredpis: 55734.1,
    spoluVyuctovanie: 50890.49,
    fondStavZaciatok: 72543.96,
    fondTvorba: 11642.12,
    fondCerpanie: 1285.17,
    fondZostatok: 82900.91,
    teploCelkomKwh: 142350,
    teploNaM2: 116.29,
    vyhotovil: "Marek Baláž",
    polozky: [
      { nazov: "Ústredné kúrenie", predpis: 23412.52, vyuctovanie: 21572.45 },
      { nazov: "Ohrev teplej vody", predpis: 7916.32, vyuctovanie: 6396.98 },
      { nazov: "Vodné a stočné", predpis: 4215.56, vyuctovanie: 3941.37 },
      { nazov: "Upratovanie spoločných priestorov", predpis: 1524.36, vyuctovanie: 1200.0 },
      { nazov: "Osvetlenie spoločných priestorov", predpis: 496.08, vyuctovanie: 201.12 },
      { nazov: "Výťah", predpis: 1369.06, vyuctovanie: 688.44 },
      { nazov: "Odvoz odpadu", predpis: 1807.64, vyuctovanie: 1725.36 },
      { nazov: "Odvod dažďovej vody", predpis: 285.4, vyuctovanie: 272.1 },
      { nazov: "Fond opráv", predpis: 11621.4, vyuctovanie: 11621.4 },
      { nazov: "Poplatok za správu", predpis: 1893.78, vyuctovanie: 1893.78 },
      { nazov: "Poistenie", predpis: 667.56, vyuctovanie: 608.65 },
      { nazov: "SIPO Pošta", predpis: 18.6, vyuctovanie: 18.6 },
      { nazov: "Poplatok za SIPO", predpis: 43.2, vyuctovanie: 43.2 },
      { nazov: "Poplatok za rozúčtovanie", predpis: 348.38, vyuctovanie: 350.16 },
      { nazov: "Export, import dát SV, TV, ÚK", predpis: null, vyuctovanie: 20.0 },
      { nazov: "Poplatok za odpočty z Techemu", predpis: null, vyuctovanie: 50.4 },
      { nazov: "Poštovné", predpis: null, vyuctovanie: 75.48 },
      { nazov: "Deratizácia", predpis: 114.24, vyuctovanie: 158.4 },
      { nazov: "Spracovanie vodomerov", predpis: null, vyuctovanie: 49.0 },
    ],
    cerpaniaFondu: [
      { popis: "Opravy bleskozvodov", suma: 565.35 },
      { popis: "Výrub a odvoz stromov", suma: 420.0 },
      { popis: "Preventívna protipožiarna prehliadka", suma: 75.8 },
      { popis: "Servisné / bankové poplatky", suma: 50.14 },
      { popis: "Ostatné", suma: 173.88 },
    ],
  },
  {
    rok: 2024,
    zostatokUctu: 101097.78,
    spoluPredpis: 58164.63,
    spoluVyuctovanie: 52370.67,
    fondStavZaciatok: 82900.91,
    fondTvorba: 11640.0,
    fondCerpanie: 1272.72,
    fondZostatok: 93268.19,
    teploCelkomKwh: 137170,
    teploNaM2: 112.06,
    vyhotovil: "Marek Baláž",
    polozky: [
      { nazov: "Ústredné kúrenie", predpis: 24253.45, vyuctovanie: 21565.52 },
      { nazov: "Ohrev teplej vody", predpis: 8249.01, vyuctovanie: 6773.98 },
      { nazov: "Vodné a stočné", predpis: 4488.58, vyuctovanie: 4229.46 },
      { nazov: "Upratovanie spoločných priestorov", predpis: 1573.93, vyuctovanie: 1200.0 },
      { nazov: "Osvetlenie spoločných priestorov", predpis: 519.71, vyuctovanie: 213.48 },
      { nazov: "Výťah", predpis: 1446.8, vyuctovanie: 661.72 },
      { nazov: "Odvoz odpadu", predpis: 2360.89, vyuctovanie: 2264.96 },
      { nazov: "Odvod dažďovej vody", predpis: 288.24, vyuctovanie: 295.07 },
      { nazov: "Fond opráv", predpis: 11621.4, vyuctovanie: 11621.4 },
      { nazov: "Poplatok za správu", predpis: 2098.32, vyuctovanie: 2098.32 },
      { nazov: "Poistenie", predpis: 667.56, vyuctovanie: 608.65 },
      { nazov: "SIPO Pošta", predpis: 18.6, vyuctovanie: 18.6 },
      { nazov: "Poplatok za SIPO", predpis: 43.2, vyuctovanie: 43.2 },
      { nazov: "Poplatok za rozúčtovanie", predpis: 413.98, vyuctovanie: 375.0 },
      { nazov: "Export, import dát SV, TV, ÚK", predpis: null, vyuctovanie: 21.0 },
      { nazov: "Poplatok za odpočty z Techemu", predpis: null, vyuctovanie: 55.0 },
      { nazov: "Poštovné", predpis: null, vyuctovanie: 95.58 },
      { nazov: "Deratizácia", predpis: 120.96, vyuctovanie: 158.4 },
      { nazov: "Oprava roku 2023", predpis: null, vyuctovanie: 16.73 },
      { nazov: "Spracovanie vodomerov", predpis: null, vyuctovanie: 51.0 },
    ],
    cerpaniaFondu: [
      { popis: "Montáž ochranných líšt na vchodové dvere", suma: 200.0 },
      { popis: "Oprava osvetlenia J8", suma: 178.08 },
      { popis: "Vystredenie motora výťahu, namazanie vodítok J6", suma: 120.6 },
      { popis: "Nastavenie senzorov osvetlenia J6", suma: 105.0 },
      { popis: "Vyčistenie, namazanie bŕzd výťahu J8", suma: 98.5 },
      { popis: "Dodanie a výmena zámku na bráne", suma: 95.0 },
      { popis: "Oprava osvetlenia J6", suma: 82.8 },
      { popis: "Oprava výťahu J8", suma: 77.7 },
      { popis: "Preventívna protipožiarna prehliadka", suma: 75.8 },
      { popis: "Servisné / bankové poplatky", suma: 9.24 },
      { popis: "Ostatné", suma: 230.0 },
    ],
  },
  {
    rok: 2025,
    zostatokUctu: 107673.64,
    spoluPredpis: 59325.82,
    spoluVyuctovanie: 51371.38,
    fondStavZaciatok: 93268.19,
    fondTvorba: 11640.0,
    fondCerpanie: 6615.27,
    fondZostatok: 98292.92,
    teploCelkomKwh: 153470,
    teploNaM2: 125.37,
    vyhotovil: "Csomor Peter",
    polozky: [
      { nazov: "Ústredné kúrenie", predpis: 24355.95, vyuctovanie: 20570.34 },
      { nazov: "Ohrev teplej vody", predpis: 8314.77, vyuctovanie: 6001.49 },
      { nazov: "Vodné a stočné", predpis: 5248.22, vyuctovanie: 4920.28 },
      { nazov: "Upratovanie spoločných priestorov", predpis: 1584.56, vyuctovanie: 1200.0 },
      { nazov: "Osvetlenie spoločných priestorov", predpis: 524.73, vyuctovanie: 213.61 },
      { nazov: "Výťah", predpis: 1463.73, vyuctovanie: 660.61 },
      { nazov: "Odvoz odpadu", predpis: 2387.18, vyuctovanie: 2243.38 },
      { nazov: "Odvod dažďovej vody", predpis: 309.04, vyuctovanie: 337.74 },
      { nazov: "Fond opráv", predpis: 11621.4, vyuctovanie: 11621.4 },
      { nazov: "Poplatok za správu", predpis: 2235.24, vyuctovanie: 2235.24 },
      { nazov: "Poistenie", predpis: 667.56, vyuctovanie: 608.65 },
      { nazov: "SIPO Pošta", predpis: 18.6, vyuctovanie: 18.6 },
      { nazov: "Poplatok za SIPO", predpis: 43.2, vyuctovanie: 43.2 },
      { nazov: "Poplatok za rozúčtovanie", predpis: 430.68, vyuctovanie: 388.61 },
      { nazov: "Export, import dát SV, TV, ÚK", predpis: null, vyuctovanie: 24.2 },
      { nazov: "Poplatok za odpočty z Techemu", predpis: null, vyuctovanie: 54.05 },
      { nazov: "Poštovné", predpis: null, vyuctovanie: 5.72 },
      { nazov: "Označenie poschodí", predpis: null, vyuctovanie: 3.6 },
      { nazov: "Deratizácia", predpis: 120.96, vyuctovanie: 162.36 },
      { nazov: "Spracovanie vodomerov", predpis: null, vyuctovanie: 58.3 },
    ],
    cerpaniaFondu: [
      { popis: "Výmena vodomerov", suma: 1540.48 },
      { popis: "Úradná 6-ročná skúška výťahu", suma: 1205.4 },
      { popis: "Dodávka vodomerov", suma: 968.63 },
      { popis: "Výmena vodomerov", suma: 382.04 },
      { popis: "OP a OS plynového zariadenia", suma: 344.4 },
      { popis: "Oprava DEK — výmena čítačky J8", suma: 323.12 },
      { popis: "Oprava DEK", suma: 313.65 },
      { popis: "Prepláchnutie cirkulačného potrubia", suma: 263.22 },
      { popis: "Kamery pre bytový dom", suma: 235.9 },
      { popis: "Výmena spínača pod kabínou výťahu", suma: 235.19 },
      { popis: "Ostatné", suma: 803.24 },
    ],
  },
];

// === REVÍZIE — aktuálny stav (z poslednej správy 2024) ===

export type Revizia = {
  id: string;
  nazov: string;
  kategoria: "Elektro" | "Plyn" | "Požiarna ochrana" | "Výťahy" | "Hygiena" | "Stavebné";
  poslednaRevizia: string; // YYYY-MM-DD
  platnaDo: string;        // YYYY-MM-DD
  frekvencia: string;
  zakon: string;
  vykonavatel?: string;
  rozsah: string;
  popis: string;
  poznamka?: string;
  historia?: Array<{ datum: string; popis: string }>;
};

export const REVIZIE: Revizia[] = [
  {
    id: "bleskozvod",
    nazov: "Revízia bleskozvodov",
    kategoria: "Elektro",
    poslednaRevizia: "2022-11-23",
    platnaDo: "2026-11-23",
    frekvencia: "každé 4 roky",
    zakon: "Vyhláška MPSVR SR č. 508/2009 Z. z., STN EN 62305",
    vykonavatel: "Revízny technik s osvedčením podľa § 24 vyhl. 508/2009",
    rozsah:
      "Vizuálna a meracia kontrola zvodov, uzemnení, prepojení a aktívnej hlavice (ak je inštalovaná). Meranie odporu uzemňovacej sústavy.",
    popis:
      "Pravidelná odborná prehliadka a skúška systému ochrany pred bleskom (LPS). Cieľom je zabezpečiť funkčnú ochranu domu pred priamym úderom blesku a prepätím.",
    historia: [
      { datum: "2023", popis: "Opravy bleskozvodov v rámci čerpania fondu opráv (565,35 €)" },
      { datum: "2022-11-23", popis: "Posledná odborná prehliadka — bez závažných závad" },
    ],
  },
  {
    id: "elektro",
    nazov: "Revízia elektroinštalácie",
    kategoria: "Elektro",
    poslednaRevizia: "2021-03-30",
    platnaDo: "2026-03-30",
    frekvencia: "každých 5 rokov (spoločné priestory bytového domu)",
    zakon: "Vyhláška č. 508/2009 Z. z., STN 33 1500, STN 33 2000-6",
    vykonavatel: "Revízny technik elektro s osvedčením podľa § 24",
    rozsah:
      "Kontrola hlavných rozvádzačov, spoločných rozvodov vo vchodoch a pivniciach, osvetlenia spoločných priestorov, núdzového osvetlenia, ističov a uzemnenia.",
    popis:
      "Odborná prehliadka a odborná skúška elektrickej inštalácie spoločných priestorov bytového domu. Týka sa rozvodov v pivnici, na schodisku a v technických miestnostiach — nie elektriny v bytoch.",
    poznamka: "V roku 2021 boli po revízii odstránené zistené závady (cca 738 €).",
    historia: [
      { datum: "2021", popis: "OP a OS elektroinštalácie + odstránenie závad (737,82 €)" },
      { datum: "2016", popis: "Výmena rozvodov elektroinštalácie" },
    ],
  },
  {
    id: "plyn",
    nazov: "Revízia plynového rozvodu",
    kategoria: "Plyn",
    poslednaRevizia: "2025-05-07",
    platnaDo: "2028-05-07",
    frekvencia: "každé 3 roky (OP), 6 rokov (OS)",
    zakon: "Vyhláška č. 508/2009 Z. z., STN 38 6405, STN EN 1775",
    vykonavatel: "Revízny technik plynových zariadení",
    rozsah:
      "Skúška tesnosti plynovodu vo vchodoch a pivnici, kontrola uzáverov, regulátora a tlakových skúšok stúpačiek.",
    popis:
      "Odborná prehliadka spoločného rozvodu plynu v bytovom dome. Týka sa stúpačiek a hlavného uzáveru, nie spotrebičov v bytoch.",
    historia: [
      { datum: "2020", popis: "Odstránenie závad po OP a OS plynoinštalácie (1 034,76 €)" },
    ],
  },
  {
    id: "hydranty",
    nazov: "Kontrola požiarnych hydrantov",
    kategoria: "Požiarna ochrana",
    poslednaRevizia: "2025-07-15",
    platnaDo: "2026-07-15",
    frekvencia: "každoročne",
    zakon: "Vyhláška MV SR č. 169/2006 Z. z., STN 92 0202-1",
    vykonavatel: "Špecialista požiarnej ochrany / odborná firma",
    rozsah:
      "Vizuálna kontrola hadicových zariadení, kontrola tlaku, prietoku vody, kompletnosti vybavenia a štítkov.",
    popis:
      "Pravidelná ročná kontrola funkčnosti nástenných požiarnych hydrantov rozmiestnených v spoločných priestoroch domu.",
    poznamka: "Ročná kontrola — povinná každý kalendárny rok.",
  },
  {
    id: "vytahy-6r",
    nazov: "Úradná skúška výťahov (6-ročná)",
    kategoria: "Výťahy",
    poslednaRevizia: "2025-03-15",
    platnaDo: "2031-03-15",
    frekvencia: "každých 6 rokov",
    zakon: "Vyhláška č. 508/2009 Z. z., STN 27 4002, STN 27 4007",
    vykonavatel: "Technická inšpekcia, a. s. (TI SR)",
    rozsah:
      "Komplexná úradná skúška oboch výťahov v J6 a J8 — mechanická, elektrická a bezpečnostná časť vrátane statického a dynamického zaťaženia.",
    popis:
      "Najdôležitejšia periodická skúška výťahov, ktorá overuje bezpečnosť prevádzky. Bez platnej úradnej skúšky nesmú byť výťahy prevádzkované.",
    historia: [
      { datum: "2019", popis: "Úradná skúška výťahov s technickou inšpekciou (811,92 €)" },
    ],
  },
  {
    id: "vytahy-3r",
    nazov: "Odborná skúška výťahov (3-ročná)",
    kategoria: "Výťahy",
    poslednaRevizia: "2022-01-31",
    platnaDo: "2028-03-15",
    frekvencia: "každé 3 roky",
    zakon: "Vyhláška č. 508/2009 Z. z., STN 27 4002",
    vykonavatel: "Odborný pracovník výťahovej firmy",
    rozsah:
      "Funkčná skúška bezpečnostných prvkov výťahov — zachytávač, obmedzovač rýchlosti, brzdy, dvere, signalizácia.",
    popis:
      "Pravidelná odborná skúška oboch výťahov medzi úradnými skúškami. Doplnená odbornými prehliadkami v kratších intervaloch (každé 3 mesiace) a mesačnou údržbou.",
    historia: [
      { datum: "2024", popis: "Vystredenie motora, vyčistenie a namazanie bŕzd, oprava výťahu J8" },
      { datum: "2022", popis: "Odborná skúška (326,40 €)" },
    ],
  },
  {
    id: "deratizacia",
    nazov: "Deratizácia spoločných priestorov",
    kategoria: "Hygiena",
    poslednaRevizia: "2024-10-01",
    platnaDo: "2025-10-01",
    frekvencia: "2× ročne (jar / jeseň)",
    zakon: "Zákon č. 355/2007 Z. z. o ochrane verejného zdravia, VZN hl. m. Bratislavy",
    vykonavatel: "Odborná firma s oprávnením na DDD činnosť",
    rozsah:
      "Položenie nástrah v pivničných priestoroch, kontrola po 2–3 týždňoch, evidencia stavu.",
    popis:
      "Pravidelná deratizácia spoločných priestorov bytového domu — povinnosť správcu, hradená z prevádzkových nákladov.",
    poznamka: "Vykonávaná každoročne.",
    historia: [
      { datum: "2024", popis: "Vyúčtované 158,40 € v ročnom vyúčtovaní" },
      { datum: "2023", popis: "Vyúčtované 158,40 €" },
    ],
  },
  {
    id: "pp-prehliadka",
    nazov: "Preventívna protipožiarna prehliadka",
    kategoria: "Požiarna ochrana",
    poslednaRevizia: "2024-06-01",
    platnaDo: "2025-06-01",
    frekvencia: "každoročne",
    zakon: "Zákon č. 314/2001 Z. z. o ochrane pred požiarmi, vyhl. č. 121/2002 Z. z.",
    vykonavatel: "Technik požiarnej ochrany",
    rozsah:
      "Kontrola únikových ciest, požiarnych dverí, hasiacich prístrojov, voľnosti pivničných chodieb a označení.",
    popis:
      "Ročná preventívna prehliadka bytového domu z hľadiska požiarnej bezpečnosti. Výstupom je zápisnica s prípadnými zistenými nedostatkami.",
    historia: [
      { datum: "2024", popis: "Preventívna protipožiarna prehliadka (75,80 €)" },
      { datum: "2023", popis: "Preventívna protipožiarna prehliadka (75,80 €)" },
    ],
  },
];

// === STAV KONŠTRUKČNÝCH PRVKOV (z poslednej správy 2024) ===

export type StavPrvku = {
  prvok: string;
  stav: "v norme" | "nové" | "rekonštruované" | "opotrebované vekom" | "nutná oprava-výmena" | "požadovaná montáž";
  poznamka?: string;
};

export const KONSTRUKCNE_PRVKY: StavPrvku[] = [
  { prvok: "Balkóny, lodžie, terasy", stav: "opotrebované vekom", poznamka: "Odporúčaná oprava zábradlí a izolácie balkónov z ulice" },
  { prvok: "Domáce dorozumievacie zariadenie", stav: "nové", poznamka: "Výmena 2019 — firma Vacula (DDZ, vchodové brány)" },
  { prvok: "Hydraulické vyregulovanie TV a ÚK", stav: "v norme", poznamka: "Vyregulovanie ÚK 2014" },
  { prvok: "Okapový chodník", stav: "nové", poznamka: "Opravený prepadnutý okapový chodník" },
  { prvok: "Okná schodiskové", stav: "v norme", poznamka: "Výmena 2006 — firma Aniroll" },
  { prvok: "Oplotenie predzáhradky", stav: "v norme" },
  { prvok: "Pomerový rozdeľovač vykurovacích nákladov", stav: "v norme", poznamka: "Výmena 2019 — firma Techem" },
  { prvok: "Pozemok", stav: "v norme", poznamka: "2019 zabetónovanie výťahovej šachty v predzáhradke" },
  { prvok: "Rozvody elektroinštalácie", stav: "v norme", poznamka: "Výmena 2016" },
  { prvok: "Rozvody zvislé TV, SV, kanalizácia, plyn", stav: "nutná oprava-výmena", poznamka: "Odporúčaná výmena zvislých rozvodov" },
  { prvok: "Schodiská", stav: "opotrebované vekom", poznamka: "Vymaľované 2009 — firma Czanner" },
  { prvok: "Strešná konštrukcia", stav: "rekonštruované", poznamka: "Odporúčaná výmena strešnej krytiny" },
  { prvok: "Tepelná izolácia rozvodov", stav: "opotrebované vekom" },
  { prvok: "Vchodová brána", stav: "v norme", poznamka: "Bezkontaktný prístup DEK SIET 2019" },
  { prvok: "Výťahy", stav: "opotrebované vekom", poznamka: "Odporúčaná výmena" },
  { prvok: "Základy", stav: "v norme" },
];

// === HELPERY ===

export const fmtEur = (n: number) =>
  new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export const fmtEurFull = (n: number) =>
  new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR" }).format(n);

export const fmtNum = (n: number) =>
  new Intl.NumberFormat("sk-SK", { maximumFractionDigits: 0 }).format(n);

export const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${parseInt(d, 10)}. ${parseInt(m, 10)}. ${y}`;
};

export type RevizioStatus = "platna" | "blizi-sa" | "po-termine";

export const statusRevizie = (platnaDo: string, today = new Date()): { status: RevizioStatus; dniDoExpiracie: number } => {
  const exp = new Date(platnaDo);
  const dni = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (dni < 0) return { status: "po-termine", dniDoExpiracie: dni };
  if (dni <= 90) return { status: "blizi-sa", dniDoExpiracie: dni };
  return { status: "platna", dniDoExpiracie: dni };
};

export const poslednyRok = ROKY[ROKY.length - 1];

// === HISTÓRIA NÁKLADOV NA ÚK (Ústredné kúrenie) ===
// Zdroj: 2025_Jiskrova_naklady_teplo_Zhrnutie.pdf (sumár od dodávateľa tepla)
// Rozpad len pre ÚK objektu (bez ohrevu TÚV). Hodnoty v EUR a kWh.

export type TeploUkRok = {
  rok: number;
  spotrebaKwh: number;          // variabilné kWh za objekt
  cenaVariabilna: number;       // €/kWh
  variabilneEur: number;        // €
  regulacnyPrikonKw: number;    // kW
  fixnaSadzba: number;          // €/kW/rok
  fixneEur: number;             // €
  spoluEur: number;             // €
};

export const TEPLO_UK_HISTORIA: TeploUkRok[] = [
  { rok: 2012, spotrebaKwh: 166600, cenaVariabilna: 0.052788, variabilneEur: 8794, regulacnyPrikonKw: 35.134, fixnaSadzba: 228.2, fixneEur: 8019, spoluEur: 16814 },
  { rok: 2013, spotrebaKwh: 162300, cenaVariabilna: 0.051108, variabilneEur: 8295, regulacnyPrikonKw: 32.281, fixnaSadzba: 255.5, fixneEur: 8247, spoluEur: 16542 },
  { rok: 2014, spotrebaKwh: 131260, cenaVariabilna: 0.061800, variabilneEur: 8112, regulacnyPrikonKw: 29.603, fixnaSadzba: 208.5, fixneEur: 6172, spoluEur: 14284 },
  { rok: 2015, spotrebaKwh: 143860, cenaVariabilna: 0.061320, variabilneEur: 8821, regulacnyPrikonKw: 30.684, fixnaSadzba: 211.9, fixneEur: 6501, spoluEur: 15323 },
  { rok: 2016, spotrebaKwh: 156070, cenaVariabilna: 0.054708, variabilneEur: 8538, regulacnyPrikonKw: 32.439, fixnaSadzba: 223.5, fixneEur: 7249, spoluEur: 15787 },
  { rok: 2017, spotrebaKwh: 164410, cenaVariabilna: 0.042564, variabilneEur: 6998, regulacnyPrikonKw: 32.736, fixnaSadzba: 277.4, fixneEur: 9082, spoluEur: 16080 },
  { rok: 2018, spotrebaKwh: 151480, cenaVariabilna: 0.046380, variabilneEur: 7026, regulacnyPrikonKw: 33.111, fixnaSadzba: 277.9, fixneEur: 9202, spoluEur: 16228 },
  { rok: 2019, spotrebaKwh: 144930, cenaVariabilna: 0.052977, variabilneEur: 7678, regulacnyPrikonKw: 30.150, fixnaSadzba: 290.8, fixneEur: 8766, spoluEur: 16444 },
  { rok: 2020, spotrebaKwh: 148930, cenaVariabilna: 0.053640, variabilneEur: 7989, regulacnyPrikonKw: 31.395, fixnaSadzba: 276.5, fixneEur: 8680, spoluEur: 16668 },
  { rok: 2021, spotrebaKwh: 167830, cenaVariabilna: 0.046080, variabilneEur: 7734, regulacnyPrikonKw: 29.276, fixnaSadzba: 275.1, fixneEur: 8054, spoluEur: 15788 },
  { rok: 2022, spotrebaKwh: 154230, cenaVariabilna: 0.058920, variabilneEur: 9087, regulacnyPrikonKw: 29.577, fixnaSadzba: 284.5, fixneEur: 8416, spoluEur: 17503 },
  { rok: 2023, spotrebaKwh: 142350, cenaVariabilna: 0.078582, variabilneEur: 11186, regulacnyPrikonKw: 32.499, fixnaSadzba: 319.6, fixneEur: 10386, spoluEur: 21572 },
  { rok: 2024, spotrebaKwh: 137182, cenaVariabilna: 0.078582, variabilneEur: 10780, regulacnyPrikonKw: 32.182, fixnaSadzba: 335.2, fixneEur: 10786, spoluEur: 21566 },
  { rok: 2025, spotrebaKwh: 153470, cenaVariabilna: 0.055354, variabilneEur: 8495, regulacnyPrikonKw: 32.897, fixnaSadzba: 367.1, fixneEur: 12075, spoluEur: 20570 },
];

