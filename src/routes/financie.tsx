import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ROKY, fmtEur, fmtEurFull, fmtNum } from "@/data/dom-data";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/financie")({
  head: () => ({
    meta: [
      { title: "Financie & Spotreby — Bytový dom Jiskrova 6,8" },
      { name: "description", content: "Ročné vyúčtovania, predpisy a spotreby tepla bytového domu Jiskrova 6,8." },
    ],
  }),
  component: FinanciePage,
});

function FinanciePage() {
  // Vyúčtovanie sa robí len za uzavreté roky
  const ROKY_UZAVRETE = ROKY.filter((r) => !r.partialny);
  const [rokIdx, setRokIdx] = useState(ROKY_UZAVRETE.length - 1);
  const rok = ROKY_UZAVRETE[rokIdx];

  const rocnyPrehlad = ROKY_UZAVRETE.map((r) => ({
    rok: r.rok,
    Predpis: Math.round(r.spoluPredpis),
    Vyuctovanie: Math.round(r.spoluVyuctovanie),
  }));

  const teploPrehlad = ROKY.filter((r) => r.teploCelkomKwh).map((r) => ({
    rok: r.rok,
    kWh: r.teploCelkomKwh,
    "kWh/m²": r.teploNaM2,
  }));

  return (
    <AppShell>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal font-medium">Hospodárenie</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-1">Financie & Spotreby</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Ročné predpisy a vyúčtovania jednotlivých služieb spolu so spotrebou tepla pre celý dom.
        </p>
      </header>

      {/* Súhrnný graf predpis vs vyúčtovanie */}
      <section className="stat-card mb-8">
        <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
          <div>
            <h2 className="font-semibold">Predpis vs. Vyúčtovanie</h2>
            <p className="text-xs text-muted-foreground">Celkové sumy služieb za rok (€)</p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rocnyPrehlad}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="rok" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "0.5rem", fontSize: "0.85rem" }}
                formatter={(v: number) => fmtEur(v)}
              />
              <Legend wrapperStyle={{ fontSize: "0.85rem" }} />
              <Bar dataKey="Predpis" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Vyuctovanie" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Spotreba tepla */}
      <section className="stat-card mb-8">
        <div className="mb-4">
          <h2 className="font-semibold">Spotreba tepla — celý objekt</h2>
          <p className="text-xs text-muted-foreground">
            Podľa ročného rozpočítania od spoločnosti Techem · podlahová plocha 1 224,09 m²
          </p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={teploPrehlad}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="rok" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis yAxisId="left" stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "0.5rem", fontSize: "0.85rem" }}
              />
              <Legend wrapperStyle={{ fontSize: "0.85rem" }} />
              <Line yAxisId="left" type="monotone" dataKey="kWh" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="kWh/m²" stroke="var(--color-chart-4)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {teploPrehlad.map((t) => (
            <div key={t.rok} className="rounded-lg border border-border/70 bg-surface-muted px-3 py-2">
              <div className="text-xs text-muted-foreground">{t.rok}</div>
              <div className="text-sm font-semibold font-display">{fmtNum(t.kWh ?? 0)} kWh</div>
              <div className="text-[11px] text-muted-foreground">{t["kWh/m²"]?.toFixed(1)} kWh/m²</div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailný výpis položiek za vybraný rok */}
      <section className="stat-card">
        <div className="flex items-end justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="font-semibold">Položky vyúčtovania</h2>
            <p className="text-xs text-muted-foreground">Vyberte rok pre detailný rozpis</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {ROKY.map((r, idx) => (
              <button
                key={r.rok}
                onClick={() => setRokIdx(idx)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  idx === rokIdx
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.rok}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-2 pr-4 font-medium">Položka</th>
                <th className="py-2 pr-4 font-medium text-right">Predpis</th>
                <th className="py-2 pr-4 font-medium text-right">Vyúčtovanie</th>
                <th className="py-2 font-medium text-right">Rozdiel</th>
              </tr>
            </thead>
            <tbody>
              {rok.polozky.map((p) => {
                const rozdiel = p.predpis != null ? p.predpis - p.vyuctovanie : null;
                return (
                  <tr key={p.nazov} className="border-b border-border/40 last:border-0">
                    <td className="py-2.5 pr-4">{p.nazov}</td>
                    <td className="py-2.5 pr-4 text-right tabular-nums text-muted-foreground">
                      {p.predpis != null ? fmtEurFull(p.predpis) : "—"}
                    </td>
                    <td className="py-2.5 pr-4 text-right tabular-nums font-medium">{fmtEurFull(p.vyuctovanie)}</td>
                    <td className={`py-2.5 text-right tabular-nums ${rozdiel == null ? "text-muted-foreground" : rozdiel >= 0 ? "text-success" : "text-destructive"}`}>
                      {rozdiel == null ? "—" : `${rozdiel >= 0 ? "+" : ""}${fmtEurFull(rozdiel)}`}
                    </td>
                  </tr>
                );
              })}
              <tr className="font-semibold bg-surface-muted/50">
                <td className="py-3 pr-4">Spolu</td>
                <td className="py-3 pr-4 text-right tabular-nums">{fmtEurFull(rok.spoluPredpis)}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{fmtEurFull(rok.spoluVyuctovanie)}</td>
                <td className={`py-3 text-right tabular-nums ${rok.spoluPredpis - rok.spoluVyuctovanie >= 0 ? "text-success" : "text-destructive"}`}>
                  {fmtEurFull(rok.spoluPredpis - rok.spoluVyuctovanie)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          Vyúčtovanie vyhotovil: <strong className="text-foreground">{rok.vyhotovil}</strong> · Zostatok účtu k 31. 12.{" "}
          {rok.rok}: <strong className="text-foreground">{fmtEurFull(rok.zostatokUctu)}</strong>
        </div>
      </section>
    </AppShell>
  );
}
