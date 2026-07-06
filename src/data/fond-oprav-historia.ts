// Auto-generated from Fond opráv CSV (2022–2025)
export type FondTyp = "pravidelne" | "jednorazove";
export interface FondKategoriaSummary { kategoria: string; typ: FondTyp; roky: Record<string, number>; spolu: number; }
export interface FondPolozka { popis: string; suma: number; datum: string; }
export interface FondKategoriaRok { kategoria: string; typ: FondTyp; suma: number; polozky: FondPolozka[]; }

export const FOND_SUMMARY: FondKategoriaSummary[] = [
  {
    "kategoria": "Vodomery (cyklická výmena)",
    "typ": "jednorazove",
    "roky": {
      "2022": -2633.26,
      "2023": 0,
      "2024": 0,
      "2025": -2891.15
    },
    "spolu": -5524.41
  },
  {
    "kategoria": "Výťahy — opravy",
    "typ": "jednorazove",
    "roky": {
      "2022": -96.64,
      "2023": 0,
      "2024": -296.8,
      "2025": -1578.03
    },
    "spolu": -1971.47
  },
  {
    "kategoria": "Vchod / DDZ / kľúče",
    "typ": "jednorazove",
    "roky": {
      "2022": -30.0,
      "2023": 0,
      "2024": -295.0,
      "2025": -799.6
    },
    "spolu": -1124.6
  },
  {
    "kategoria": "Bankové poplatky",
    "typ": "pravidelne",
    "roky": {
      "2022": -186.32,
      "2023": -191.7,
      "2024": -208.37,
      "2025": -213.8
    },
    "spolu": -800.19
  },
  {
    "kategoria": "Bleskozvody",
    "typ": "pravidelne",
    "roky": {
      "2022": -90.0,
      "2023": -565.35,
      "2024": 0,
      "2025": 0
    },
    "spolu": -655.35
  },
  {
    "kategoria": "Stúpačky / murárske opravy",
    "typ": "jednorazove",
    "roky": {
      "2022": -599.26,
      "2023": 0,
      "2024": 0,
      "2025": 0
    },
    "spolu": -599.26
  },
  {
    "kategoria": "Elektro / osvetlenie",
    "typ": "jednorazove",
    "roky": {
      "2022": -78.0,
      "2023": 0,
      "2024": -365.88,
      "2025": -84.87
    },
    "spolu": -528.75
  },
  {
    "kategoria": "Strecha / žľaby",
    "typ": "jednorazove",
    "roky": {
      "2022": -429.6,
      "2023": 0,
      "2024": 0,
      "2025": 0
    },
    "spolu": -429.6
  },
  {
    "kategoria": "Zeleň / stromy",
    "typ": "jednorazove",
    "roky": {
      "2022": 0,
      "2023": -420.0,
      "2024": 0,
      "2025": 0
    },
    "spolu": -420.0
  },
  {
    "kategoria": "Plyn — opravy",
    "typ": "jednorazove",
    "roky": {
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": -344.4
    },
    "spolu": -344.4
  },
  {
    "kategoria": "Ostatné",
    "typ": "jednorazove",
    "roky": {
      "2022": -326.4,
      "2023": 0,
      "2024": 0,
      "2025": 0
    },
    "spolu": -326.4
  },
  {
    "kategoria": "Požiarna ochrana",
    "typ": "pravidelne",
    "roky": {
      "2022": -60.8,
      "2023": -75.8,
      "2024": -75.8,
      "2025": -75.8
    },
    "spolu": -288.2
  },
  {
    "kategoria": "Teplo / ÚK / TÚV",
    "typ": "jednorazove",
    "roky": {
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": -263.22
    },
    "spolu": -263.22
  },
  {
    "kategoria": "Kamery / bezpečnosť",
    "typ": "jednorazove",
    "roky": {
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": -235.9
    },
    "spolu": -235.9
  },
  {
    "kategoria": "Zimná údržba",
    "typ": "jednorazove",
    "roky": {
      "2022": -168.97,
      "2023": 0,
      "2024": 0,
      "2025": 0
    },
    "spolu": -168.97
  },
  {
    "kategoria": "Inkasné poplatky",
    "typ": "pravidelne",
    "roky": {
      "2022": -27.44,
      "2023": -27.64,
      "2024": -28.44,
      "2025": -28.05
    },
    "spolu": -111.57
  },
  {
    "kategoria": "Madlá / zábradlia",
    "typ": "jednorazove",
    "roky": {
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": -80.0
    },
    "spolu": -80.0
  },
  {
    "kategoria": "Motor / technika",
    "typ": "jednorazove",
    "roky": {
      "2022": -53.58,
      "2023": 0,
      "2024": 0,
      "2025": 0
    },
    "spolu": -53.58
  },
  {
    "kategoria": "Administratíva/mzdy",
    "typ": "pravidelne",
    "roky": {
      "2022": -23.0,
      "2023": -3.85,
      "2024": -2.0,
      "2025": -2.0
    },
    "spolu": -30.85
  },
  {
    "kategoria": "Revízie a doklady",
    "typ": "pravidelne",
    "roky": {
      "2022": 0,
      "2023": 0,
      "2024": 0,
      "2025": -18.45
    },
    "spolu": -18.45
  },
  {
    "kategoria": "Daň zo zostatku",
    "typ": "pravidelne",
    "roky": {
      "2022": -0.69,
      "2023": -0.83,
      "2024": -0.43,
      "2025": 0
    },
    "spolu": -1.95
  }
];

export const FOND_BY_YEAR: Record<string, FondKategoriaRok[]> = {
  "2022": [
    {
      "kategoria": "Vodomery (cyklická výmena)",
      "typ": "jednorazove",
      "suma": -2633.26,
      "polozky": [
        {
          "popis": "Prvomontáž vodomeru / výmena — spolu 7 ks",
          "suma": -2633.26,
          "datum": "2022"
        }
      ]
    },
    {
      "kategoria": "Stúpačky / murárske opravy",
      "typ": "jednorazove",
      "suma": -599.26,
      "polozky": [
        {
          "popis": "búracie a murárske práce, výmena odpadovej stúpačky, Jis.8",
          "suma": -599.26,
          "datum": "2/20/2022"
        }
      ]
    },
    {
      "kategoria": "Strecha / žľaby",
      "typ": "jednorazove",
      "suma": -429.6,
      "polozky": [
        {
          "popis": "vyčistenie žľabov",
          "suma": -429.6,
          "datum": "3/27/2022"
        }
      ]
    },
    {
      "kategoria": "Ostatné",
      "typ": "jednorazove",
      "suma": -326.4,
      "polozky": [
        {
          "popis": "OS",
          "suma": -163.2,
          "datum": "1/31/2022"
        },
        {
          "popis": "OS",
          "suma": -163.2,
          "datum": "1/31/2022"
        }
      ]
    },
    {
      "kategoria": "Bankové poplatky",
      "typ": "pravidelne",
      "suma": -186.32,
      "polozky": [
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "12/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.0,
          "datum": "12/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "12/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "11/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.5,
          "datum": "11/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "11/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "10/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.44,
          "datum": "10/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "10/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "9/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.18,
          "datum": "9/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "9/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "8/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -4.34,
          "datum": "8/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "8/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "7/29/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.86,
          "datum": "7/29/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "7/29/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "6/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.0,
          "datum": "6/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -9.04,
          "datum": "6/30/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "5/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.0,
          "datum": "5/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.6,
          "datum": "5/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "4/29/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.0,
          "datum": "4/29/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.94,
          "datum": "4/29/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "3/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.0,
          "datum": "3/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -8.22,
          "datum": "3/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "2/28/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.84,
          "datum": "2/28/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.0,
          "datum": "2/28/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "1/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.0,
          "datum": "1/31/2022"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.56,
          "datum": "1/31/2022"
        }
      ]
    },
    {
      "kategoria": "Zimná údržba",
      "typ": "jednorazove",
      "suma": -168.97,
      "polozky": [
        {
          "popis": "zimná údržba",
          "suma": -33.79,
          "datum": "3/31/2022"
        },
        {
          "popis": "zimná údržba",
          "suma": -67.59,
          "datum": "2/28/2022"
        },
        {
          "popis": "zimná údržba",
          "suma": -67.59,
          "datum": "1/31/2022"
        }
      ]
    },
    {
      "kategoria": "Výťahy — opravy",
      "typ": "jednorazove",
      "suma": -96.64,
      "polozky": [
        {
          "popis": "zriadenie OR vo výťahovej šachte, J.8",
          "suma": -43.61,
          "datum": "5/12/2022"
        },
        {
          "popis": "dodanie a výmena silónovej páčky na výťahu, Jis.8",
          "suma": -53.03,
          "datum": "4/30/2022"
        }
      ]
    },
    {
      "kategoria": "Bleskozvody",
      "typ": "pravidelne",
      "suma": -90.0,
      "polozky": [
        {
          "popis": "OP a OS bleskozvodu",
          "suma": -90.0,
          "datum": "11/30/2022"
        }
      ]
    },
    {
      "kategoria": "Elektro / osvetlenie",
      "typ": "jednorazove",
      "suma": -78.0,
      "polozky": [
        {
          "popis": "oprava osvetlenia, nastavenie citlivosti senzorov",
          "suma": -78.0,
          "datum": "9/8/2022"
        }
      ]
    },
    {
      "kategoria": "Požiarna ochrana",
      "typ": "pravidelne",
      "suma": -60.8,
      "polozky": [
        {
          "popis": "Preventívna protipožiarna prehliadka",
          "suma": -60.8,
          "datum": "7/19/2022"
        }
      ]
    },
    {
      "kategoria": "Motor / technika",
      "typ": "jednorazove",
      "suma": -53.58,
      "polozky": [
        {
          "popis": "zriadenie motoru a skúška, Jis.6",
          "suma": -53.58,
          "datum": "5/25/2022"
        }
      ]
    },
    {
      "kategoria": "Vchod / DDZ / kľúče",
      "typ": "jednorazove",
      "suma": -30.0,
      "polozky": [
        {
          "popis": "kontrola DEK systému - skúška funkčnosti",
          "suma": -30.0,
          "datum": "9/9/2022"
        }
      ]
    },
    {
      "kategoria": "Inkasné poplatky",
      "typ": "pravidelne",
      "suma": -27.44,
      "polozky": [
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "12/15/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "11/15/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "10/17/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "9/16/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "8/15/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "7/15/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -5.0,
          "datum": "6/17/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "6/15/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "5/16/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "4/19/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "3/15/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "2/15/2022"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "1/17/2022"
        }
      ]
    },
    {
      "kategoria": "Administratíva/mzdy",
      "typ": "pravidelne",
      "suma": -23.0,
      "polozky": [
        {
          "popis": "poplatok za spracovanie miezd a administratíva",
          "suma": -7.0,
          "datum": "3/31/2022"
        },
        {
          "popis": "vystavenie faktúry",
          "suma": -2.0,
          "datum": "2/28/2022"
        },
        {
          "popis": "poplatok za spracovanie miezd a administratíva",
          "suma": -7.0,
          "datum": "2/28/2022"
        },
        {
          "popis": "poplatok za spracovanie miezd a administratíva",
          "suma": -7.0,
          "datum": "1/31/2022"
        }
      ]
    },
    {
      "kategoria": "Daň zo zostatku",
      "typ": "pravidelne",
      "suma": -0.69,
      "polozky": [
        {
          "popis": "zrážková daň",
          "suma": -0.69,
          "datum": "1/31/2022"
        }
      ]
    }
  ],
  "2023": [
    {
      "kategoria": "Bleskozvody",
      "typ": "pravidelne",
      "suma": -565.35,
      "polozky": [
        {
          "popis": "opravy bleskozvodov",
          "suma": -565.35,
          "datum": "3/6/2023"
        }
      ]
    },
    {
      "kategoria": "Zeleň / stromy",
      "typ": "jednorazove",
      "suma": -420.0,
      "polozky": [
        {
          "popis": "výrub a odvoz stromov",
          "suma": -420.0,
          "datum": "8/28/2023"
        }
      ]
    },
    {
      "kategoria": "Bankové poplatky",
      "typ": "pravidelne",
      "suma": -191.7,
      "polozky": [
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "12/29/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.72,
          "datum": "12/29/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "12/29/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "11/30/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.5,
          "datum": "11/30/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "11/30/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "10/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.16,
          "datum": "10/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "10/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "9/29/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.72,
          "datum": "9/29/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "9/29/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "8/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.82,
          "datum": "8/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "8/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "7/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.5,
          "datum": "7/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "7/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "6/30/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "6/30/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -8.14,
          "datum": "6/30/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "5/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.14,
          "datum": "5/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "5/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "4/28/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -4.82,
          "datum": "4/28/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "4/28/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "3/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.72,
          "datum": "3/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "3/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "2/28/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.4,
          "datum": "2/28/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "2/28/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -2.65,
          "datum": "1/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.26,
          "datum": "1/31/2023"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "1/31/2023"
        }
      ]
    },
    {
      "kategoria": "Požiarna ochrana",
      "typ": "pravidelne",
      "suma": -75.8,
      "polozky": [
        {
          "popis": "Preventívna protipožiarna prehliadka",
          "suma": -75.8,
          "datum": "8/21/2023"
        }
      ]
    },
    {
      "kategoria": "Inkasné poplatky",
      "typ": "pravidelne",
      "suma": -27.64,
      "polozky": [
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "12/15/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "11/15/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "10/16/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "9/18/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "8/15/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "7/17/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -5.2,
          "datum": "6/19/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "6/15/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "5/15/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "4/17/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "3/15/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "2/15/2023"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "1/16/2023"
        }
      ]
    },
    {
      "kategoria": "Administratíva/mzdy",
      "typ": "pravidelne",
      "suma": -3.85,
      "polozky": [
        {
          "popis": "vystavenie faktúry za spotrebu ele. + poštovné",
          "suma": -3.85,
          "datum": "12/31/2023"
        }
      ]
    },
    {
      "kategoria": "Daň zo zostatku",
      "typ": "pravidelne",
      "suma": -0.83,
      "polozky": [
        {
          "popis": "zrážková daň",
          "suma": -0.83,
          "datum": "2/22/2023"
        }
      ]
    }
  ],
  "2024": [
    {
      "kategoria": "Elektro / osvetlenie",
      "typ": "jednorazove",
      "suma": -365.88,
      "polozky": [
        {
          "popis": "oprava osvetlenia J8",
          "suma": -178.08,
          "datum": "12/30/2024"
        },
        {
          "popis": "oprava osvetlenia J6",
          "suma": -82.8,
          "datum": "9/13/2024"
        },
        {
          "popis": "nastavenia senzorov osvetlenia J6",
          "suma": -105.0,
          "datum": "6/28/2024"
        }
      ]
    },
    {
      "kategoria": "Výťahy — opravy",
      "typ": "jednorazove",
      "suma": -296.8,
      "polozky": [
        {
          "popis": "oprava výťahu J8",
          "suma": -77.7,
          "datum": "9/26/2024"
        },
        {
          "popis": "vystredenie motora výťahu, namazanie vodítok výťahu J6",
          "suma": -120.6,
          "datum": "5/27/2024"
        },
        {
          "popis": "vyčistenie, namazanie bŕzd  výťahu J8",
          "suma": -98.5,
          "datum": "5/27/2024"
        }
      ]
    },
    {
      "kategoria": "Vchod / DDZ / kľúče",
      "typ": "jednorazove",
      "suma": -295.0,
      "polozky": [
        {
          "popis": "montáž ochranných líšt na vchodové dvere",
          "suma": -200.0,
          "datum": "12/17/2024"
        },
        {
          "popis": "dodanie a výmena zámku na bráne",
          "suma": -95.0,
          "datum": "10/24/2024"
        }
      ]
    },
    {
      "kategoria": "Bankové poplatky",
      "typ": "pravidelne",
      "suma": -208.37,
      "polozky": [
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "12/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "12/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "12/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "11/29/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.0,
          "datum": "11/29/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "11/29/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "10/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "10/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "10/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "9/30/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.0,
          "datum": "9/30/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "9/30/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "8/30/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.5,
          "datum": "8/30/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "8/30/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "7/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "7/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -8.25,
          "datum": "7/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "6/28/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "6/28/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -9.24,
          "datum": "6/28/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "5/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.38,
          "datum": "5/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "5/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "4/30/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.06,
          "datum": "4/30/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "4/30/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "3/28/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.6,
          "datum": "3/28/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "3/28/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "2/29/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -5.28,
          "datum": "2/29/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "2/29/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "1/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "1/31/2024"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.26,
          "datum": "1/31/2024"
        }
      ]
    },
    {
      "kategoria": "Požiarna ochrana",
      "typ": "pravidelne",
      "suma": -75.8,
      "polozky": [
        {
          "popis": "Preventívna protipožiarna prehliadka",
          "suma": -75.8,
          "datum": "7/1/2024"
        }
      ]
    },
    {
      "kategoria": "Inkasné poplatky",
      "typ": "pravidelne",
      "suma": -28.44,
      "polozky": [
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "12/16/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "11/15/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "10/15/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "9/16/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "8/15/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "7/15/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "6/17/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -6.0,
          "datum": "6/17/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "5/15/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "4/15/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "3/15/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "2/15/2024"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "1/15/2024"
        }
      ]
    },
    {
      "kategoria": "Administratíva/mzdy",
      "typ": "pravidelne",
      "suma": -2.0,
      "polozky": [
        {
          "popis": "vystavenie faktúry",
          "suma": -2.0,
          "datum": "2/29/2024"
        }
      ]
    },
    {
      "kategoria": "Daň zo zostatku",
      "typ": "pravidelne",
      "suma": -0.43,
      "polozky": [
        {
          "popis": "zrážková daň",
          "suma": -0.43,
          "datum": "1/31/2024"
        }
      ]
    }
  ],
  "2025": [
    {
      "kategoria": "Vodomery (cyklická výmena)",
      "typ": "jednorazove",
      "suma": -2891.15,
      "polozky": [
        {
          "popis": "výmena vodomerov",
          "suma": -382.04,
          "datum": "10/20/2025"
        },
        {
          "popis": "dodávka vodomerov",
          "suma": -968.63,
          "datum": "9/9/2025"
        },
        {
          "popis": "výmena vodomerov",
          "suma": -1540.48,
          "datum": "8/29/2025"
        }
      ]
    },
    {
      "kategoria": "Výťahy — opravy",
      "typ": "jednorazove",
      "suma": -1578.03,
      "polozky": [
        {
          "popis": "výmena žiarovky vo výťahu J8",
          "suma": -137.44,
          "datum": "8/31/2025"
        },
        {
          "popis": "výmena spínača pod kabínou výťahu",
          "suma": -235.19,
          "datum": "5/19/2025"
        },
        {
          "popis": "úradná 6 ročná skúška výťahu",
          "suma": -1205.4,
          "datum": "4/16/2025"
        }
      ]
    },
    {
      "kategoria": "Vchod / DDZ / kľúče",
      "typ": "jednorazove",
      "suma": -799.6,
      "polozky": [
        {
          "popis": "oprava DEK výmena čítačky J8",
          "suma": -323.12,
          "datum": "5/15/2025"
        },
        {
          "popis": "oprava DEK J8",
          "suma": -102.83,
          "datum": "5/14/2025"
        },
        {
          "popis": "oprava kovania na hlavnom vchode J8",
          "suma": -60.0,
          "datum": "5/5/2025"
        },
        {
          "popis": "oprava DEK",
          "suma": -313.65,
          "datum": "4/22/2025"
        }
      ]
    },
    {
      "kategoria": "Plyn — opravy",
      "typ": "jednorazove",
      "suma": -344.4,
      "polozky": [
        {
          "popis": "OP a OS plynoveho zariadenia",
          "suma": -344.4,
          "datum": "5/19/2025"
        }
      ]
    },
    {
      "kategoria": "Teplo / ÚK / TÚV",
      "typ": "jednorazove",
      "suma": -263.22,
      "polozky": [
        {
          "popis": "prepláchnutie cirkulačného potrubia",
          "suma": -263.22,
          "datum": "2/3/2025"
        }
      ]
    },
    {
      "kategoria": "Kamery / bezpečnosť",
      "typ": "jednorazove",
      "suma": -235.9,
      "polozky": [
        {
          "popis": "Kamery pre BD",
          "suma": -235.9,
          "datum": "6/26/2025"
        }
      ]
    },
    {
      "kategoria": "Bankové poplatky",
      "typ": "pravidelne",
      "suma": -213.8,
      "polozky": [
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "12/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.75,
          "datum": "12/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "12/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "11/28/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.25,
          "datum": "11/28/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "11/28/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "10/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.5,
          "datum": "10/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "10/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "9/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.25,
          "datum": "9/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "9/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "8/28/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.25,
          "datum": "8/28/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "8/28/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "7/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "7/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "7/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "6/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "6/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -11.5,
          "datum": "6/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "5/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "5/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.75,
          "datum": "5/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "4/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.75,
          "datum": "4/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "4/30/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "3/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "3/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "3/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "2/28/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -6.25,
          "datum": "2/28/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "2/28/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -3.65,
          "datum": "1/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.0,
          "datum": "1/31/2025"
        },
        {
          "popis": "Servisné poplatky /bankové poplatky/",
          "suma": -7.75,
          "datum": "1/31/2025"
        }
      ]
    },
    {
      "kategoria": "Elektro / osvetlenie",
      "typ": "jednorazove",
      "suma": -84.87,
      "polozky": [
        {
          "popis": "výmena svietidla na 4.p",
          "suma": -84.87,
          "datum": "2/5/2025"
        }
      ]
    },
    {
      "kategoria": "Madlá / zábradlia",
      "typ": "jednorazove",
      "suma": -80.0,
      "polozky": [
        {
          "popis": "oprava bezpečnostného madla",
          "suma": -80.0,
          "datum": "10/1/2025"
        }
      ]
    },
    {
      "kategoria": "Požiarna ochrana",
      "typ": "pravidelne",
      "suma": -75.8,
      "polozky": [
        {
          "popis": "Preventívna protipožiarna prehliadka",
          "suma": -75.8,
          "datum": "7/16/2025"
        }
      ]
    },
    {
      "kategoria": "Inkasné poplatky",
      "typ": "pravidelne",
      "suma": -28.05,
      "polozky": [
        {
          "popis": "Inkasné poplatky",
          "suma": -1.56,
          "datum": "12/15/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.56,
          "datum": "11/17/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.56,
          "datum": "10/15/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.56,
          "datum": "9/16/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.56,
          "datum": "8/15/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.56,
          "datum": "7/15/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -8.4,
          "datum": "6/23/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.56,
          "datum": "6/16/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.56,
          "datum": "5/15/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.56,
          "datum": "4/15/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "3/17/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "2/17/2025"
        },
        {
          "popis": "Inkasné poplatky",
          "suma": -1.87,
          "datum": "1/15/2025"
        }
      ]
    },
    {
      "kategoria": "Revízie a doklady",
      "typ": "pravidelne",
      "suma": -18.45,
      "polozky": [
        {
          "popis": "revízna kniha",
          "suma": -18.45,
          "datum": "12/31/2025"
        }
      ]
    },
    {
      "kategoria": "Administratíva/mzdy",
      "typ": "pravidelne",
      "suma": -2.0,
      "polozky": [
        {
          "popis": "vystavenie faktúry+poštovné",
          "suma": -2.0,
          "datum": "2/28/2025"
        }
      ]
    }
  ]
};

export const FOND_ROKY = Object.keys(FOND_BY_YEAR).sort();