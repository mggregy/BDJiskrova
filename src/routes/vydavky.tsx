import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ROKY, fmtEur, fmtEurFull } from "@/data/dom-data";
import { FOND_SUMMARY, FOND_BY_YEAR, FOND_ROKY } from "@/data/fond-oprav-historia";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Wrench, Repeat, Zap, ChevronDown } from "lucide-react";
import { useState } from "react";


export const Route = createFileRoute("/vydavky")({
  head: () => ({
    meta: [
      { title: "Výdavky z fondu opráv — Bytový dom Jiskrova 6,8" },
      { name: "description", content: "Ročné čerpanie fondu opráv — opravy, údržba a mimoriadne výdavky." },
    ],
  }),
  component: VydavkyPage,
});

function VydavkyPage() {
  const fondData = ROKY.map((r) => ({
    rok: r.rok,
    Tvorba: Math.round(r.fondTvorba),
    Čerpanie: Math.round(r.fondCerpanie),
    Zostatok: Math.round(r.fondZostatok),
  }));

  const total = ROKY.reduce(
    (acc, r) => ({
      tvorba: acc.tvorba + r.fondTvorba,
      cerpanie: acc.cerpanie + r.fondCerpanie,
    }),
    { tvorba: 0, cerpanie: 0 }
  );

  return (
    <AppShell>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal font-medium">Fond prevádzky, údržby a opráv</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-1">Výdavky z fondu opráv</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Ako sme rok po roku používali fond opráv — investície do bezpečnosti, technického stavu a komfortu domu.
        </p>
      </header>

      {/* KPI */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Kpi label="Aktuálny zostatok fondu" value={fmtEur(ROKY[ROKY.length - 1].fondZostatok)} />
        <Kpi label={`Tvorba ${ROKY[0].rok}–${ROKY[ROKY.length - 1].rok}`} value={fmtEur(total.tvorba)} />
        <Kpi label={`Čerpanie ${ROKY[0].rok}–${ROKY[ROKY.length - 1].rok}`} value={fmtEur(total.cerpanie)} />
      </section>

      {/* Graf */}
      <section className="stat-card mb-10">
        <div className="mb-4">
          <h2 className="font-semibold">Tvorba vs. čerpanie fondu</h2>
          <p className="text-xs text-muted-foreground">Ročné hodnoty (€)</p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fondData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="rok" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "0.5rem", fontSize: "0.85rem" }}
                formatter={(v: number) => fmtEur(v)}
              />
              <Legend wrapperStyle={{ fontSize: "0.85rem" }} />
              <Bar dataKey="Tvorba" fill="var(--color-chart-5)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Čerpanie" fill="var(--color-chart-4)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>


      {/* Detailná kategorizácia z účtovníctva */}
      <FondPolozkoveVydavky />

      {/* Čerpania po rokoch */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Čerpanie fondu po rokoch</h2>
        {[...ROKY].reverse().map((r) => (
          <div key={r.rok} className="stat-card">
            <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-accent grid place-items-center text-primary">
                  <Wrench className="size-5" />
                </div>
                <div>
                  <div className="font-display font-semibold text-lg leading-tight">Rok {r.rok}</div>
                  <div className="text-xs text-muted-foreground">
                    Spolu čerpané: <strong className="text-foreground">{fmtEurFull(r.fondCerpanie)}</strong> · zostatok
                    fondu k 31. 12.: {fmtEurFull(r.fondZostatok)}
                  </div>
                </div>
              </div>
            </div>
            {r.cerpaniaFondu.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">Žiadne zaznamenané výdavky.</p>
            ) : (
              <ul className="divide-y divide-border/60">
                {r.cerpaniaFondu.map((c, i) => (
                  <li key={i} className="py-2.5 flex items-start justify-between gap-4">
                    <span className="text-sm text-foreground">{c.popis}</span>
                    <span className="text-sm tabular-nums font-medium shrink-0">{fmtEurFull(c.suma)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </AppShell>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
      <div className="text-2xl font-bold font-display mt-2">{value}</div>
    </div>
  );
}
