import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Flame, Droplets, TrendingDown, TrendingUp, Euro, Gauge } from "lucide-react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DOM_INFO, ROKY, TEPLO_UK_HISTORIA } from "@/data/dom-data";
import { AppShell } from "@/components/AppShell";

// Chart palette — distinct, readable. Mirrors tokens used in /financie.
const C_UK = "var(--color-chart-1)";        // steel navy
const C_TUV = "var(--color-chart-2)";       // teal
const C_SPOTREBA = "var(--color-chart-4)";  // amber
const C_TUV_SPOTREBA = "var(--color-destructive)"; // red
const C_VAR = "var(--color-chart-1)";       // steel navy
const C_FIX = "var(--color-chart-4)";       // amber
const C_LINE_ALT = "var(--color-chart-5)";  // green
const C_AREA = "var(--color-chart-2)";      // teal
const C_PRICE = "var(--color-chart-3)";     // light teal

// ============= Analýzy a poznámky (textový komentár k ÚK) =============
type AnalyzaStav = "v norme" | "otvorené";

type Analyza = {
  id: string;
  titulok: string;
  stav: AnalyzaStav;
  text: string;
};

const ANALYZA_STAV_TRIEDA: Record<AnalyzaStav, string> = {
  "v norme": "bg-success/10 text-success",
  "otvorené": "bg-warning/15 text-warning",
};

const ANALYZY: Analyza[] = [
  {
    id: "urso",
    titulok: "Maximálna cena ÚRSO",
    stav: "v norme",
    text:
      "K prekročeniu maximálnej ceny ÚRSO nedošlo. Fixná zložka 367,06 €/kW je cena s DPH. Cena 298,42 €/kW bez DPH je teda pod platným stropom (304,84 €/kW do 7. 3. 2025, potom 309,53 €/kW).",
  },
  {
    id: "efektivna-cena",
    titulok: "Efektívna cena tepla",
    stav: "v norme",
    text:
      "Efektívna cena 134,04 €/MWh s DPH je pod stropom 199 €/MWh, ktorý na rok 2025 platil podľa nariadenia vlády 382/2024 (plošné zastropovanie).",
  },
  {
    id: "regulacny-prikon",
    titulok: "Regulačný príkon",
    stav: "otvorené",
    text:
      "Pôvod čísel 32,8974 kW a 9,598 kW (regulačný príkon) sa z Techem/Novbyt dokumentov nedá overiť — či ide o skutočný príkon fakturovaný Engie a.s. za OST 888, alebo o dopočet.",
  },
];

const VYPOCTY: string[] = [
  "367,056760 ÷ 1,23 = 298,42 €/kW bez DPH, pod maximom ÚRSO (304,8364 / 309,5332).",
  "Celý dom: 198 245,59 kWh, 26 571,83 € → 134,04 €/kWh s DPH.",
  "Fixná zložka je 58,7 % účtu, čo nie je bežný stav. Všeobecne objekt vykazuje zvýšené Fixné náklady.",
];

const OPATRENIA = [
  {
    titulok: "Krátkodobo",
    kratko:
      "Overiť vykurovaciu krivku, kontrola rozvodov, TÚV, zavzdušnenia radiátorov a čerpadiel.",
    detail:
      "Prevádzkové opatrenia: doladiť ekvitermiku / vykurovaciu krivku, vyregulovať rozvody, skontrolovať čerpadlá, prietok a cirkuláciu TÚV.",
  },
  {
    titulok: "Administratívne",
    kratko: "Preveriť kapacitu (kW), vysoké fixné náklady.",
    detail:
      "Administratívne opatrenia: preveriť zmluvnú kapacitu (kW) oproti reálnej potrebe, lebo zbytočná rezerva znamená čistý fixný náklad.",
  },
  {
    titulok: "Investične",
    kratko:
      "Termostatické hlavice, zaizolovaná povala, strop pivníc a obnažené rozvody.",
    detail:
      "Investičné opatrenia: TRV a ich vyregulovanie, zateplenie povaly a stropu pivníc, prípadne väčšia investícia do obnovy domu.",
  },
];



export const Route = createFileRoute("/teplo")({
  head: () => ({
    meta: [
      { title: "Teplo (ÚK + TÚV) — Bytový dom Jiskrova" },
      {
        name: "description",
        content:
          "Prehľad nákladov na ústredné kúrenie a ohrev teplej úžitkovej vody v bytovom dome Jiskrova 6,8.",
      },
    ],
  }),
  component: TeploPage,
});

const eur = (n: number) =>
  new Intl.NumberFormat("sk-SK", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

const kwh = (n: number) =>
  `${new Intl.NumberFormat("sk-SK", { maximumFractionDigits: 0 }).format(n)} kWh`;

// Priemer na m² podlahovej plochy objektu
const PLOCHA = DOM_INFO.podlahovaPlocha;
const perM2 = (n: number) => (PLOCHA > 0 ? n / PLOCHA : 0);

function AvgM2({ hodnota, jednotka }: { hodnota: number; jednotka: string }) {
  return (
    <div className="shrink-0 rounded-lg border border-border/60 bg-muted/40 px-2 py-1.5 text-right">
      <div className="text-sm font-display font-semibold text-foreground leading-tight">
        {hodnota > 0 ? hodnota.toFixed(1) : "—"}
      </div>
      <div className="text-[10px] text-muted-foreground leading-none mt-0.5">{jednotka}</div>
    </div>
  );
}

function findPolozka(rok: (typeof ROKY)[number], nazov: string) {
  return rok.polozky.find((p) => p.nazov === nazov);
}

function TeploPage() {

  const data = ROKY.map((r) => {
    const uk = findPolozka(r, "Ústredné kúrenie");
    const tuv = findPolozka(r, "Ohrev teplej vody");
    const ukVyuctovanie = uk?.vyuctovanie ?? 0;
    const tuvVyuctovanie = tuv?.vyuctovanie ?? 0;
    const spolu = ukVyuctovanie + tuvVyuctovanie;
    const kwhTotal = r.teploCelkomKwh ?? 0;
    return {
      rok: r.rok,
      uk: ukVyuctovanie,
      tuv: tuvVyuctovanie,
      spolu,
      ukPredpis: uk?.predpis ?? 0,
      tuvPredpis: tuv?.predpis ?? 0,
      spotrebaKwh: kwhTotal,
      tuvKwh: r.teploTuvKwh ?? 0,
      kwhNaM2: r.teploNaM2 ?? 0,
      cenaZaKwh: kwhTotal > 0 ? spolu / kwhTotal : 0,
    };
  });

  const defaultRok = [...data].reverse().find((d) => d.spolu > 0)?.rok ?? data[data.length - 1].rok;
  const [vybranyRok, setVybranyRok] = useState<number>(defaultRok);
  const selIdx = Math.max(0, data.findIndex((d) => d.rok === vybranyRok));
  const last = data[selIdx];
  const prev = data[selIdx - 1] ?? last;
  // Roky bez údajov (napr. rozbehnutý 2026) nevstupujú do grafov, min/max ani priemerov.
  const dataS = data.filter((d) => d.spotrebaKwh > 0);
  const minRok = [...dataS].sort((a, b) => a.spotrebaKwh - b.spotrebaKwh)[0];
  const maxRok = [...dataS].sort((a, b) => b.spotrebaKwh - a.spotrebaKwh)[0];
  const sumSpolu = dataS.reduce((a, b) => a + b.spolu, 0);
  const sumKwh = dataS.reduce((a, b) => a + b.spotrebaKwh, 0);
  const priemernaCenaKwh = sumKwh > 0 ? sumSpolu / sumKwh : 0;

  const diffSpolu = last.spolu - prev.spolu;
  const diffPct = prev.spolu > 0 ? (diffSpolu / prev.spolu) * 100 : 0;

  return (
    <AppShell>
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <Flame className="size-5" />
          <span className="text-xs font-medium uppercase tracking-wider">Vykurovanie objektu</span>
        </div>
        <h1 className="text-3xl font-display font-semibold text-foreground">
          Teplo — ÚK a ohrev TÚV
        </h1>
        <p className="text-muted-foreground max-w-5xl text-sm">
          Ročný prehľad nákladov na ústredné kúrenie a ohrev teplej úžitkovej vody pre bytový dom{"\u00A0"}
          {DOM_INFO.nazov}. Spotreba je z ročných rozpočítaní Techem, ceny z vyúčtovaní správcu
          (NOVBYT, s.r.o.). Plocha objektu:{" "}
          <strong className="text-foreground">
            {DOM_INFO.podlahovaPlocha.toLocaleString("sk-SK")} m²
          </strong>
          .
        </p>
      </header>

      <div className="inline-flex flex-wrap items-center gap-1 rounded-full bg-muted/60 p-1">
        {data.map((d) => (
          <button
            key={d.rok}
            type="button"
            onClick={() => setVybranyRok(d.rok)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              d.rok === vybranyRok
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {d.rok}
          </button>
        ))}
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Euro className="size-3.5" /> Náklady za {last.rok}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-display font-semibold text-foreground">
                {eur(last.spolu)}
              </div>
              <div
                className={`text-xs mt-1 flex items-center gap-1 ${
                  diffSpolu >= 0 ? "text-warning" : "text-success"
                }`}
              >
                {diffSpolu >= 0 ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {diffSpolu >= 0 ? "+" : ""}
                {eur(diffSpolu)} ({diffPct.toFixed(1)}%) vs {prev.rok}
              </div>
            </div>
            <AvgM2 hodnota={perM2(last.spolu)} jednotka="€ / m²" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Flame className="size-3.5" /> ÚK {last.rok}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-display font-semibold text-foreground">
                {eur(last.uk)}
              </div>
              <div className="text-xs mt-1 text-muted-foreground">
                {last.spolu > 0 ? ((last.uk / last.spolu) * 100).toFixed(0) : "—"}% z nákladov na
                teplo
              </div>
            </div>
            <AvgM2 hodnota={perM2(last.uk)} jednotka="€ / m²" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Droplets className="size-3.5" /> Ohrev TÚV {last.rok}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-display font-semibold text-foreground">
                {eur(last.tuv)}
              </div>
              <div className="text-xs mt-1 text-muted-foreground">
                {last.spolu > 0 ? ((last.tuv / last.spolu) * 100).toFixed(0) : "—"}% z nákladov na
                teplo
              </div>
            </div>
            <AvgM2 hodnota={perM2(last.tuv)} jednotka="€ / m²" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Gauge className="size-3.5" /> Spotreba {last.rok}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-display font-semibold text-foreground">
                {kwh(last.spotrebaKwh)}
              </div>
              <div className="text-xs mt-1 text-muted-foreground">
                {last.spotrebaKwh > 0 ? `${last.cenaZaKwh.toFixed(4)} €/kWh` : "bez údajov"}
              </div>
            </div>
            <AvgM2 hodnota={perM2(last.spotrebaKwh)} jednotka="kWh / m²" />
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">
            Náklady na teplo — ÚK vs. ohrev TÚV
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Stĺpce = vyúčtované náklady (€), čiary = celková spotreba tepla ÚK a TÚV pre celý objekt (kWh)
          </p>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[360px]">
            <ResponsiveContainer>
              <ComposedChart data={dataS} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="rok"
                  stroke="var(--color-muted-foreground)"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="var(--color-muted-foreground)"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k €`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="var(--color-muted-foreground)"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === "Spotreba ÚK (kWh)" || name === "Spotreba TÚV (kWh)") {
                      return [kwh(value), name];
                    }
                    return [eur(value), name];
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="left"
                  dataKey="uk"
                  name="ÚK (€)"
                  stackId="naklady"
                  fill={C_UK}
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="tuv"
                  name="Ohrev TÚV (€)"
                  stackId="naklady"
                  fill={C_TUV}
                  radius={[6, 6, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="spotrebaKwh"
                  name="Spotreba ÚK (kWh)"
                  stroke={C_SPOTREBA}
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="tuvKwh"
                  name="Spotreba TÚV (kWh)"
                  stroke={C_TUV_SPOTREBA}
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Merná spotreba ÚK (kWh/m²)</CardTitle>
            <p className="text-xs text-muted-foreground">
              Najnižšia: {minRok.rok} — {minRok.kwhNaM2.toFixed(1)} kWh/m² · Najvyššia:{" "}
              {maxRok.rok} — {maxRok.kwhNaM2.toFixed(1)} kWh/m²
            </p>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[240px]">
              <ResponsiveContainer>
                <ComposedChart data={dataS} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="rok" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
                  <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [`${v.toFixed(1)} kWh/m²`, "Spotreba"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="kwhNaM2"
                    stroke="var(--color-chart-2)"
                    fill="color-mix(in oklch, var(--color-chart-2) 22%, transparent)"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Jednotková cena tepla ÚK (€/kWh)</CardTitle>
            <p className="text-xs text-muted-foreground">
              Priemer za sledované obdobie: {priemernaCenaKwh.toFixed(4)} €/kWh
            </p>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[240px]">
              <ResponsiveContainer>
                <ComposedChart data={dataS} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="rok" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v: number) => v.toFixed(3)}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [`${v.toFixed(4)} €/kWh`, "Cena"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="cenaZaKwh"
                    stroke="var(--color-chart-3)"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">Ročný prehľad</CardTitle>
          <p className="text-xs text-muted-foreground">
            Sumár za {dataS.length} rokov: {eur(sumSpolu)} · {kwh(sumKwh)}
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rok</TableHead>
                <TableHead className="text-right">ÚK €</TableHead>
                <TableHead className="text-right">Ohrev TÚV €</TableHead>
                <TableHead className="text-right">Spolu €</TableHead>
                <TableHead className="text-right">ÚK Spotreba (kWh)</TableHead>
                <TableHead className="text-right">TÚV (kWh)</TableHead>
                <TableHead className="text-right">ÚK kWh/m²</TableHead>
                <TableHead className="text-right">ÚK €/kWh</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...dataS].reverse().map((r) => (
                <TableRow key={r.rok}>
                  <TableCell className="font-medium">{r.rok}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{eur(r.uk)}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{eur(r.tuv)}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums font-semibold">
                    {eur(r.spolu)}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {r.spotrebaKwh.toLocaleString("sk-SK")}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {r.tuvKwh > 0 ? r.tuvKwh.toLocaleString("sk-SK") : "—"}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {r.kwhNaM2.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {r.cenaZaKwh.toFixed(4)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <UkBreakdownSection />

      <p className="text-xs text-muted-foreground">
        Zdroje: ročné rozpočítania nákladov na teplo a TÚV — Techem, s.r.o.; ročné
        vyúčtovania správcu NOVBYT, s.r.o. (položky „Ústredné kúrenie" a „Ohrev teplej
        vody").
      </p>
      <p className="text-xs text-muted-foreground">
        OST-888: Od júla 2019 prevádzkuje tepelné hospodárstvo prostredníctvom spoločnosti
        TERMMING, skupina Engie.
      </p>
    </div>
    </AppShell>
  );
}

function UkBreakdownSection() {
  const data = TEPLO_UK_HISTORIA.map((r) => ({
    ...r,
    variabilnyPodiel: r.spoluEur > 0 ? (r.variabilneEur / r.spoluEur) * 100 : 0,
    fixnyPodiel: r.spoluEur > 0 ? (r.fixneEur / r.spoluEur) * 100 : 0,
  }));
  const last = data[data.length - 1];
  const prev = data[data.length - 2];
  const priemer = {
    spolu: data.reduce((a, b) => a + b.spoluEur, 0) / data.length,
    var: data.reduce((a, b) => a + b.variabilneEur, 0) / data.length,
    fix: data.reduce((a, b) => a + b.fixneEur, 0) / data.length,
  };
  const varPodiel = (last.variabilneEur / last.spoluEur) * 100;
  const fixPodiel = (last.fixneEur / last.spoluEur) * 100;
  const fixYoY = ((last.fixneEur - prev.fixneEur) / prev.fixneEur) * 100;
  const varYoY = ((last.variabilneEur - prev.variabilneEur) / prev.variabilneEur) * 100;

  const keys = [
    "spotrebaKwh",
    "cenaVariabilna",
    "variabilneEur",
    "regulacnyPrikonKw",
    "fixnaSadzba",
    "fixneEur",
    "spoluEur",
  ] as const;
  const extrema = (() => {
    const result: Record<string, { min: number; max: number }> = {};
    for (const key of keys) {
      const vals = data.map((d) => d[key]);
      result[key] = { min: Math.min(...vals), max: Math.max(...vals) };
    }
    return result;
  })();

  function cellClass(value: number, key: string) {
    const e = extrema[key];
    if (!e) return "";
    if (value === e.max) return "bg-destructive/20 text-destructive font-bold";
    if (value === e.min) return "bg-success/20 text-success font-bold";
    return "";
  }



  return (
    <section className="space-y-4 pt-4 border-t border-border/60">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <Flame className="size-5" />
          <span className="text-xs font-medium uppercase tracking-wider">
            ÚK — rozpad nákladov
          </span>
        </div>
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Ústredné kúrenie: variabilná vs. fixná zložka
        </h2>
        <p className="text-muted-foreground text-sm max-w-3xl">
          Náklady na ÚK od dodávateľa tepla sú rozdelené na <strong>variabilnú</strong> zložku
          (platíme za skutočne spotrebované kWh) a <strong>fixnú</strong> zložku (regulačný príkon
          v kW × fixná sadzba — platíme bez ohľadu na spotrebu). Údaje za roky 2012–2025.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Variabilná zložka {last.rok}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-semibold text-foreground">
              {eur(last.variabilneEur)}
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              {varPodiel.toFixed(0)}% z ÚK · {last.cenaVariabilna.toFixed(4)} €/kWh
            </div>
            <Badge
              variant="outline"
              className={`mt-2 ${varYoY >= 0 ? "text-warning" : "text-success"}`}
            >
              {varYoY >= 0 ? "+" : ""}
              {varYoY.toFixed(1)}% vs {prev.rok}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Fixná zložka {last.rok}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-semibold text-foreground">
              {eur(last.fixneEur)}
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              {fixPodiel.toFixed(0)}% z ÚK · {last.regulacnyPrikonKw.toFixed(2)} kW ×{" "}
              {last.fixnaSadzba.toFixed(1)} €/kW
            </div>
            <Badge
              variant="outline"
              className={`mt-2 ${fixYoY >= 0 ? "text-warning" : "text-success"}`}
            >
              {fixYoY >= 0 ? "+" : ""}
              {fixYoY.toFixed(1)}% vs {prev.rok}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Dlhodobý priemer ÚK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-semibold text-foreground">
              {eur(priemer.spolu)}
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              Var. {eur(priemer.var)} · Fix. {eur(priemer.fix)}
            </div>
            <Badge variant="outline" className="mt-2">
              {last.spoluEur > priemer.spolu ? "+" : ""}
              {(((last.spoluEur - priemer.spolu) / priemer.spolu) * 100).toFixed(0)}% v {last.rok}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">
            Vývoj nákladov na ÚK 2012–{last.rok}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Stĺpce: variabilná + fixná zložka · čiara = spotreba (kWh)
          </p>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[360px]">
            <ResponsiveContainer>
              <ComposedChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="rok" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
                <YAxis
                  yAxisId="left"
                  stroke="var(--color-muted-foreground)"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k €`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="var(--color-muted-foreground)"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === "Spotreba ÚK (kWh)") return [kwh(value), name];
                    return [eur(value), name];
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="left"
                  dataKey="variabilneEur"
                  name="Variabilná (€)"
                  stackId="uk"
                  fill="var(--color-chart-1)"
                >
                  <LabelList
                    dataKey="variabilnyPodiel"
                    position="center"
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="var(--color-primary-foreground)"
                    fontSize={10}
                    fontWeight={600}
                  />
                </Bar>
                <Bar
                  yAxisId="left"
                  dataKey="fixneEur"
                  name="Fixná (€)"
                  stackId="uk"
                  fill="var(--color-chart-4)"
                  radius={[6, 6, 0, 0]}
                >
                  <LabelList
                    dataKey="fixnyPodiel"
                    position="center"
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    fill="var(--color-foreground)"
                    fontSize={10}
                    fontWeight={600}
                  />
                </Bar>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="spotrebaKwh"
                  name="Spotreba ÚK (kWh)"
                  stroke="var(--color-chart-5)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">
            Detail ÚK po rokoch (variabilná + fixná zložka)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rok</TableHead>
                <TableHead className="text-right">Spotreba ÚK (kWh)</TableHead>
                <TableHead className="text-right">Cena var. (€/kWh)</TableHead>
                <TableHead className="text-right">Variabilné (€)</TableHead>
                <TableHead className="text-right">Reg. príkon (kW)</TableHead>
                <TableHead className="text-right">Fixná sadzba (€/kW)</TableHead>
                <TableHead className="text-right">Fixné (€)</TableHead>
                <TableHead className="text-right">ÚK spolu (€)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...data].reverse().map((r) => (
                <TableRow key={r.rok}>
                  <TableCell className="font-medium">{r.rok}</TableCell>
                  <TableCell className={`text-right font-mono tabular-nums ${cellClass(r.spotrebaKwh, "spotrebaKwh")}`}>
                    {r.spotrebaKwh.toLocaleString("sk-SK")}
                  </TableCell>
                  <TableCell className={`text-right font-mono tabular-nums ${cellClass(r.cenaVariabilna, "cenaVariabilna")}`}>
                    {r.cenaVariabilna.toFixed(4)}
                  </TableCell>
                  <TableCell className={`text-right font-mono tabular-nums ${cellClass(r.variabilneEur, "variabilneEur")}`}>
                    {eur(r.variabilneEur)}
                  </TableCell>
                  <TableCell className={`text-right font-mono tabular-nums ${cellClass(r.regulacnyPrikonKw, "regulacnyPrikonKw")}`}>
                    {r.regulacnyPrikonKw.toFixed(2)}
                  </TableCell>
                  <TableCell className={`text-right font-mono tabular-nums ${cellClass(r.fixnaSadzba, "fixnaSadzba")}`}>
                    {r.fixnaSadzba.toFixed(1)}
                  </TableCell>
                  <TableCell className={`text-right font-mono tabular-nums ${cellClass(r.fixneEur, "fixneEur")}`}>
                    {eur(r.fixneEur)}
                  </TableCell>
                  <TableCell className={`text-right font-mono tabular-nums font-semibold ${cellClass(r.spoluEur, "spoluEur")}`}>
                    {eur(r.spoluEur)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">
            Analýzy a poznámky
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Ceny voči stropom ÚRSO, efektívna cena tepla a otvorené body.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {ANALYZY.map((a) => (
            <div
              key={a.id}
              className="relative rounded-lg border bg-muted/30 p-4"
            >
              <span
                className={`absolute right-3 top-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ANALYZA_STAV_TRIEDA[a.stav]}`}
              >
                {a.stav}
              </span>
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <h4 className="max-w-[80%] font-display text-sm font-semibold">
                  {a.titulok}
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {a.text}
              </p>
            </div>
          ))}

          <div className="rounded-lg border p-4">
            <h4 className="mb-2 font-display text-sm font-semibold">
              Kľúčové výpočty
            </h4>
            <ul className="space-y-1.5">
              {VYPOCTY.map((v) => (
                <li
                  key={v}
                  className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border p-4">
            <h4 className="mb-4 font-display text-base font-semibold text-primary">
              Čo môžeme urobiť?
            </h4>
            <div className="grid gap-5 md:grid-cols-3">
              {OPATRENIA.map((o, i) => (
                <div key={o.titulok} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {i + 1}
                    </span>
                    <h5 className="font-display text-sm font-semibold">
                      {o.titulok}
                    </h5>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-primary">
                    {o.kratko}
                  </p>
                  <p className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span>{o.detail}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground">
              Reálny potenciál úspor je približne od 3 do 5 tis. € ročne, teda
              asi 14–22 % z celkových platieb.
            </div>
          </div>



          <div className="rounded-lg border-l-4 border-primary/40 bg-muted/20 p-4">
            <p className="text-sm italic leading-relaxed text-muted-foreground whitespace-pre-line">
              TERMMING, skupina Engie:
              {"\n"}"Nový dodávateľ tepla sa zaviazal, že jeho investície do rozvodov a
              kotolní presiahnu 4,5 milióna eur a musí ich zrealizovať
              najbližších päť rokov. Zaviazal sa tiež, že oproti súčasnosti
              zníži takzvanú fixnú zložku ceny tepla a zvýši výšku nájmu
              v prospech mestskej časti. Oproti súčasnému
              dodávateľovi by v rámci roka mala podľa Kusého cena za
              fixnú zložku poklesnúť zhruba o päť až šesť eur
              za priemerný byt, ktorý má 65 štvorcových metrov."{"\u00A0\n"}
              (Jún 2019, Bratislava Dnes24)
            </p>
          </div>
        </CardContent>

      </Card>
    </section>
  );
}

