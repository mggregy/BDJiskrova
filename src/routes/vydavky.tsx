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
                  <div className="font-display font-semibold text-lg leading-tight flex items-center gap-2">
                    Rok {r.rok}
                    {r.partialny && (
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-warning/15 text-warning font-medium">
                        YTD · prebieha
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Spolu čerpané: <strong className="text-foreground">{fmtEurFull(r.fondCerpanie)}</strong> · zostatok
                    fondu {r.partialny && r.ytdDoDna ? `k ${r.ytdDoDna}` : "k 31. 12."}: {fmtEurFull(r.fondZostatok)}
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

function FondPolozkoveVydavky() {
  const [rok, setRok] = useState<string>(FOND_ROKY[FOND_ROKY.length - 1]);
  const [otvorene, setOtvorene] = useState<Record<string, boolean>>({});

  const pravidelne = FOND_SUMMARY.filter((s) => s.typ === "pravidelne");
  const jednorazove = FOND_SUMMARY.filter((s) => s.typ === "jednorazove");
  const spoluPravidelne = pravidelne.reduce((a, s) => a + s.spolu, 0);
  const spoluJednorazove = jednorazove.reduce((a, s) => a + s.spolu, 0);

  const rokData = FOND_BY_YEAR[rok] ?? [];
  const rokTotal = rokData.reduce((a, k) => a + k.suma, 0);

  return (
    <section className="mb-10 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Položkové čerpanie fondu ({FOND_ROKY[0]}–{FOND_ROKY[FOND_ROKY.length - 1]})</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Zdroj: účtovné výpisy z fondu opráv (Fond opráv domu {FOND_ROKY[0]}–{FOND_ROKY[FOND_ROKY.length - 1]}). Rok 2026 je uvedený k 30. 6. (YTD).
          Kategórie sú rozdelené podľa toho, či ide o pravidelne sa opakujúce výdavky alebo o jednorazové opravy a investície.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SumaryCard
          icon={<Repeat className="size-5" />}
          title="Pravidelné výdavky"
          subtitle="Opakujú sa každý rok"
          suma={spoluPravidelne}
          zoznam={pravidelne}
          accent="text-teal"
        />
        <SumaryCard
          icon={<Zap className="size-5" />}
          title="Jednorazové výdavky"
          subtitle="Opravy a investície podľa potreby"
          suma={spoluJednorazove}
          zoznam={jednorazove}
          accent="text-primary"
        />
      </div>

      <div className="stat-card">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div>
            <h3 className="font-semibold">Rozpad po kategóriách — vybraný rok</h3>
            <p className="text-xs text-muted-foreground">Klikni na kategóriu pre zobrazenie jednotlivých položiek.</p>
          </div>
          <div className="flex gap-1 rounded-lg bg-accent p-1">
            {FOND_ROKY.map((y) => (
              <button
                key={y}
                onClick={() => setRok(y)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                  rok === y ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground mb-3">
          Spolu čerpané v roku {rok}: <strong className="text-foreground">{fmtEurFull(Math.abs(rokTotal))}</strong>
        </div>

        <ul className="divide-y divide-border/60">
          {rokData.map((k) => {
            const key = `${rok}-${k.kategoria}`;
            const open = otvorene[key];
            return (
              <li key={key} className="py-2">
                <button
                  onClick={() => setOtvorene((s) => ({ ...s, [key]: !s[key] }))}
                  className="w-full flex items-center justify-between gap-3 text-left hover:bg-accent/40 rounded px-2 py-1.5 transition"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ChevronDown
                      className={`size-4 text-muted-foreground shrink-0 transition-transform ${open ? "" : "-rotate-90"}`}
                    />
                    <span className="text-sm font-medium truncate">{k.kategoria}</span>
                    <span
                      className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${
                        k.typ === "pravidelne" ? "bg-teal/10 text-teal" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {k.typ === "pravidelne" ? "pravidelné" : "jednorazové"}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0">· {k.polozky.length}×</span>
                  </div>
                  <span className="text-sm tabular-nums font-medium shrink-0">{fmtEurFull(Math.abs(k.suma))}</span>
                </button>
                {open && (
                  <ul className="mt-1 ml-6 divide-y divide-border/40">
                    {k.polozky.map((p, i) => (
                      <li key={i} className="py-1.5 flex items-start justify-between gap-3 text-xs">
                        <div className="min-w-0">
                          <div className="text-foreground">{p.popis}</div>
                          <div className="text-muted-foreground">{p.datum}</div>
                        </div>
                        <span className="tabular-nums text-muted-foreground shrink-0">{fmtEurFull(Math.abs(p.suma))}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function SumaryCard({
  icon,
  title,
  subtitle,
  suma,
  zoznam,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  suma: number;
  zoznam: typeof FOND_SUMMARY;
  accent: string;
}) {
  const top = [...zoznam].sort((a, b) => a.spolu - b.spolu).slice(0, 5);
  return (
    <div className="stat-card">
      <div className="flex items-center gap-3 mb-3">
        <div className={`size-9 rounded-lg bg-accent grid place-items-center ${accent}`}>{icon}</div>
        <div>
          <div className="font-semibold leading-tight">{title}</div>
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-lg font-bold font-display">{fmtEurFull(Math.abs(suma))}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">2022–2025 spolu</div>
        </div>
      </div>
      <ul className="space-y-1 text-xs">
        {top.map((s) => (
          <li key={s.kategoria} className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground truncate">{s.kategoria}</span>
            <span className="tabular-nums font-medium shrink-0">{fmtEurFull(Math.abs(s.spolu))}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

