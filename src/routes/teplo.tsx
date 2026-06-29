import { createFileRoute } from "@tanstack/react-router";
import { Flame, Droplets, TrendingDown, TrendingUp, Euro, Gauge } from "lucide-react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
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
const C_VAR = "var(--color-chart-1)";       // steel navy
const C_FIX = "var(--color-chart-4)";       // amber
const C_LINE_ALT = "var(--color-chart-5)";  // green
const C_AREA = "var(--color-chart-2)";      // teal
const C_PRICE = "var(--color-chart-3)";     // light teal

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
      kwhNaM2: r.teploNaM2 ?? 0,
      cenaZaKwh: kwhTotal > 0 ? spolu / kwhTotal : 0,
    };
  });

  const last = data[data.length - 1];
  const prev = data[data.length - 2];
  const minRok = [...data].sort((a, b) => a.spotrebaKwh - b.spotrebaKwh)[0];
  const maxRok = [...data].sort((a, b) => b.spotrebaKwh - a.spotrebaKwh)[0];
  const sumSpolu = data.reduce((a, b) => a + b.spolu, 0);
  const sumKwh = data.reduce((a, b) => a + b.spotrebaKwh, 0);
  const priemernaCenaKwh = sumKwh > 0 ? sumSpolu / sumKwh : 0;

  const diffSpolu = last.spolu - prev.spolu;
  const diffPct = prev.spolu > 0 ? (diffSpolu / prev.spolu) * 100 : 0;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <Flame className="size-5" />
          <span className="text-xs font-medium uppercase tracking-wider">Vykurovanie objektu</span>
        </div>
        <h1 className="text-3xl font-display font-semibold text-foreground">
          Teplo — ÚK a ohrev TÚV
        </h1>
        <p className="text-muted-foreground max-w-3xl text-sm">
          Ročný prehľad nákladov na ústredné kúrenie a ohrev teplej úžitkovej vody pre bytový dom{" "}
          {DOM_INFO.nazov}. Spotreba je z ročných rozpočítaní Techem, ceny z vyúčtovaní správcu
          (NOVBYT, s.r.o.). Plocha objektu:{" "}
          <strong className="text-foreground">
            {DOM_INFO.podlahovaPlocha.toLocaleString("sk-SK")} m²
          </strong>
          .
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Euro className="size-3.5" /> Náklady za {last.rok}
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Flame className="size-3.5" /> ÚK {last.rok}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-semibold text-foreground">
              {eur(last.uk)}
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              {((last.uk / last.spolu) * 100).toFixed(0)}% z nákladov na teplo
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Droplets className="size-3.5" /> Ohrev TÚV {last.rok}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-semibold text-foreground">
              {eur(last.tuv)}
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              {((last.tuv / last.spolu) * 100).toFixed(0)}% z nákladov na teplo
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Gauge className="size-3.5" /> Spotreba {last.rok}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-semibold text-foreground">
              {kwh(last.spotrebaKwh)}
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              {last.kwhNaM2.toFixed(1)} kWh/m² · {last.cenaZaKwh.toFixed(4)} €/kWh
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">
            Náklady na teplo — ÚK vs. ohrev TÚV
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Stĺpce = vyúčtované náklady (€), čiara = spotreba tepla pre celý objekt (kWh)
          </p>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[360px]">
            <ResponsiveContainer>
              <ComposedChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
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
                    if (name === "Spotreba (kWh)") return [kwh(value), name];
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
                  name="Spotreba (kWh)"
                  stroke={C_SPOTREBA}
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
            <CardTitle className="text-base font-display">Mernná spotreba (kWh/m²)</CardTitle>
            <p className="text-xs text-muted-foreground">
              Najnižšia: {minRok.rok} — {minRok.kwhNaM2.toFixed(1)} kWh/m² · Najvyššia:{" "}
              {maxRok.rok} — {maxRok.kwhNaM2.toFixed(1)} kWh/m²
            </p>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[240px]">
              <ResponsiveContainer>
                <ComposedChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
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
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.18)"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Jednotková cena tepla (€/kWh)</CardTitle>
            <p className="text-xs text-muted-foreground">
              Priemer za sledované obdobie: {priemernaCenaKwh.toFixed(4)} €/kWh
            </p>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[240px]">
              <ResponsiveContainer>
                <ComposedChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
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
                    stroke="hsl(var(--warning))"
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
            Sumár za {data.length} rokov: {eur(sumSpolu)} · {kwh(sumKwh)}
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rok</TableHead>
                <TableHead className="text-right">ÚK — vyúčt.</TableHead>
                <TableHead className="text-right">Ohrev TÚV — vyúčt.</TableHead>
                <TableHead className="text-right">Spolu</TableHead>
                <TableHead className="text-right">Spotreba (kWh)</TableHead>
                <TableHead className="text-right">kWh/m²</TableHead>
                <TableHead className="text-right">€/kWh</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...data].reverse().map((r) => (
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
        Zdroje: ročné rozpočítania nákladov na teplo a TÚV — Techem, s.r.o.; ročné vyúčtovania
        správcu NOVBYT, s.r.o. (položky „Ústredné kúrenie" a „Ohrev teplej vody"); súhrn nákladov
        na teplo od dodávateľa (2025_Jiskrova_naklady_teplo_Zhrnutie.pdf).
      </p>
    </div>
  );
}

function UkBreakdownSection() {
  const data = TEPLO_UK_HISTORIA;
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
            Stĺpce stackované: variabilná + fixná zložka · čiara = spotreba (kWh)
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
                    if (name === "Spotreba (kWh)") return [kwh(value), name];
                    return [eur(value), name];
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="left"
                  dataKey="variabilneEur"
                  name="Variabilná (€)"
                  stackId="uk"
                  fill="hsl(var(--primary))"
                />
                <Bar
                  yAxisId="left"
                  dataKey="fixneEur"
                  name="Fixná (€)"
                  stackId="uk"
                  fill="hsl(var(--warning))"
                  radius={[6, 6, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="spotrebaKwh"
                  name="Spotreba (kWh)"
                  stroke="hsl(var(--accent-foreground))"
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
                <TableHead className="text-right">Spotreba (kWh)</TableHead>
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
                  <TableCell className="text-right font-mono tabular-nums">
                    {r.spotrebaKwh.toLocaleString("sk-SK")}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {r.cenaVariabilna.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {eur(r.variabilneEur)}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {r.regulacnyPrikonKw.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {r.fixnaSadzba.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {eur(r.fixneEur)}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums font-semibold">
                    {eur(r.spoluEur)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

