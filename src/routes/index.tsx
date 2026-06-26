import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import {
  ROKY,
  REVIZIE,
  DOM_INFO,
  fmtEur,
  fmtNum,
  fmtDate,
  statusRevizie,
  poslednyRok,
} from "@/data/dom-data";
import { ArrowUpRight, Banknote, Flame, PiggyBank, ShieldCheck, TrendingDown, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bytový dom Jiskrova 6,8 — Prehľad správy a hospodárenia" },
      {
        name: "description",
        content:
          "Prehľadná informačná stránka pre vlastníkov bytov na Jiskrovej 6,8 — financie, spotreby tepla a vody, revízie a čerpanie fondu opráv.",
      },
      { property: "og:title", content: "Bytový dom Jiskrova 6,8" },
      {
        property: "og:description",
        content: "Hospodárenie domu, spotreby a revízie — všetko na jednom mieste.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const fondTrend = ROKY.map((r) => ({
    rok: r.rok,
    Zostatok: r.fondZostatok,
  }));

  const teploTrend = ROKY.filter((r): r is typeof r & { teploCelkomKwh: number } => !!r.teploCelkomKwh).map((r) => {
    const uk = r.polozky.find((p) => p.nazov === "Ústredné kúrenie")?.vyuctovanie ?? 0;
    const tuv = r.polozky.find((p) => p.nazov === "Ohrev teplej vody")?.vyuctovanie ?? 0;
    return {
      rok: r.rok,
      kWh: r.teploCelkomKwh,
      cena: Math.round((uk + tuv) * 100) / 100,
    };
  });

  const platne = REVIZIE.filter((r) => statusRevizie(r.platnaDo).status === "platna").length;
  const blizia = REVIZIE.filter((r) => statusRevizie(r.platnaDo).status === "blizi-sa").length;
  const expirovane = REVIZIE.filter((r) => statusRevizie(r.platnaDo).status === "po-termine").length;

  const najblizsie = [...REVIZIE]
    .map((r) => ({ ...r, ...statusRevizie(r.platnaDo) }))
    .sort((a, b) => a.dniDoExpiracie - b.dniDoExpiracie)
    .filter((r) => r.dniDoExpiracie < 365)
    .slice(0, 4);

  const fondDelta = poslednyRok.fondZostatok - poslednyRok.fondStavZaciatok;
  const teploDelta = poslednyRok.teploCelkomKwh && ROKY[ROKY.length - 2].teploCelkomKwh
    ? poslednyRok.teploCelkomKwh - (ROKY[ROKY.length - 2].teploCelkomKwh ?? 0)
    : 0;

  return (
    <AppShell>
      <section className="space-y-2 mb-8">
        <p className="text-xs uppercase tracking-widest text-teal font-medium">
          Rok {poslednyRok.rok} · stav k 31. 12.
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Naše hospodárenie a starostlivosť o dom
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Prehľadné zhrnutie financií, spotrieb a revízií bytového domu{" "}
          <strong className="text-foreground">{DOM_INFO.nazov}</strong>. Údaje sa každoročne aktualizujú podľa správy
          správcu {DOM_INFO.spravca}.
        </p>
      </section>

      {/* KPI karty */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          icon={Banknote}
          label="Zostatok na účte"
          value={fmtEur(poslednyRok.zostatokUctu)}
          hint={`k 31. 12. ${poslednyRok.rok}`}
          tone="primary"
        />
        <StatCard
          icon={PiggyBank}
          label="Fond opráv"
          value={fmtEur(poslednyRok.fondZostatok)}
          hint={
            <span className="inline-flex items-center gap-1">
              {fondDelta >= 0 ? (
                <TrendingUp className="size-3.5 text-success" />
              ) : (
                <TrendingDown className="size-3.5 text-destructive" />
              )}
              {fondDelta >= 0 ? "+" : ""}
              {fmtEur(fondDelta)} oproti začiatku roka
            </span>
          }
          tone="success"
        />
        <StatCard
          icon={Flame}
          label="Spotreba tepla (dom)"
          value={`${fmtNum(poslednyRok.teploCelkomKwh ?? 0)} kWh`}
          hint={
            teploDelta !== 0 ? (
              <span className="inline-flex items-center gap-1">
                {teploDelta < 0 ? (
                  <TrendingDown className="size-3.5 text-success" />
                ) : (
                  <TrendingUp className="size-3.5 text-warning" />
                )}
                {teploDelta > 0 ? "+" : ""}
                {fmtNum(teploDelta)} kWh medziročne
              </span>
            ) : null
          }
          tone="warning"
        />
        <StatCard
          icon={ShieldCheck}
          label="Revízie"
          value={
            <span className="flex items-baseline gap-2">
              <span>{platne}</span>
              <span className="text-sm font-normal text-muted-foreground">/ {REVIZIE.length}</span>
            </span>
          }
          hint={
            expirovane > 0
              ? `${expirovane} po termíne · ${blizia} čoskoro`
              : blizia > 0
              ? `${blizia} sa blíži k expirácii`
              : "Všetko v poriadku"
          }
          tone={expirovane > 0 ? "destructive" : blizia > 0 ? "warning" : "success"}
        />
      </section>

      {/* Grafy */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <ChartCard
          title="Fond opráv — vývoj zostatku"
          subtitle="Postupne rastie aj po každoročnom čerpaní"
          data={fondTrend}
          dataKey="Zostatok"
          color="var(--color-chart-1)"
          formatY={(v) => `${(v / 1000).toFixed(0)} k€`}
          formatTooltip={(v) => fmtEur(v)}
        />
        <div className="stat-card">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground">Spotreba a cena tepla — celý dom</h3>
              <p className="text-xs text-muted-foreground">kWh / rok (Techem) a zaplatená cena za ÚK + TÚV</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm" style={{ background: "var(--color-chart-2)" }} />
                kWh
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{ background: "var(--color-chart-3)" }} />
                € / rok
              </span>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={teploTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad-kwh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="rok" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  yAxisId="kwh"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)} k`}
                  width={50}
                />
                <YAxis
                  yAxisId="cena"
                  orientation="right"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)} k€`}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.5rem",
                    fontSize: "0.85rem",
                  }}
                  formatter={(v: number, name) =>
                    name === "kWh" ? [`${fmtNum(v)} kWh`, "Spotreba"] : [fmtEur(v), "Cena (ÚK + TÚV)"]
                  }
                />
                <Area
                  yAxisId="kwh"
                  type="monotone"
                  dataKey="kWh"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  fill="url(#grad-kwh)"
                />
                <Line
                  yAxisId="cena"
                  type="monotone"
                  dataKey="cena"
                  stroke="var(--color-chart-3)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "var(--color-chart-3)" }}
                  activeDot={{ r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Najbližšie revízie */}
      <section className="mb-10">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Najbližšie kontroly</h2>
            <p className="text-sm text-muted-foreground">Revízie, ktoré expirujú v najbližšom roku</p>
          </div>
          <Link
            to="/kontroly"
            className="text-sm font-medium text-teal hover:underline inline-flex items-center gap-1"
          >
            Všetky revízie <ArrowUpRight className="size-4" />
          </Link>
        </div>
        {najblizsie.length === 0 ? (
          <div className="stat-card text-sm text-muted-foreground">
            V najbližších 12 mesiacoch neexpiruje žiadna revízia. 🎉
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {najblizsie.map((r) => (
              <Link
                key={r.id}
                to="/kontroly"
                search={{ id: r.id }}
                className="stat-card flex items-center justify-between gap-3 hover:border-teal transition-colors group"
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground truncate group-hover:text-teal transition-colors">
                    {r.nazov}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    platná do {fmtDate(r.platnaDo)} · klikni pre detail
                  </div>
                </div>
                <StatusBadge status={r.status} dni={r.dniDoExpiracie} />
              </Link>
            ))}
          </div>

        )}
      </section>

      {/* CTA dlaždice */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionLink
          to="/financie"
          title="Financie & Spotreby"
          desc="Ročné vyúčtovania od roku 2019, položky ako ÚK, voda, fond opráv, grafy spotreby tepla."
        />
        <SectionLink
          to="/kontroly"
          title="Zákonné kontroly"
          desc="Revízie elektriky, plynu, bleskozvodov, výťahov, deratizácia — stav a platnosť."
        />
        <SectionLink
          to="/vydavky"
          title="Výdavky z fondu opráv"
          desc="Čerpanie fondu po rokoch — opravy, údržba, mimoriadne výdavky."
        />
      </section>
    </AppShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "primary",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  tone?: "primary" | "success" | "warning" | "destructive";
}) {
  const toneClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
          <div className="text-2xl font-bold font-display text-foreground mt-2">{value}</div>
          {hint && <div className="text-xs text-muted-foreground mt-2">{hint}</div>}
        </div>
        <div className={`size-9 shrink-0 rounded-lg grid place-items-center ${toneClasses[tone]}`}>
          <Icon className="size-4" />
        </div>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  data,
  dataKey,
  color,
  formatY,
  formatTooltip,
}: {
  title: string;
  subtitle: string;
  data: Array<Record<string, number>>;
  dataKey: string;
  color: string;
  formatY: (v: number) => string;
  formatTooltip: (v: number) => string;
}) {
  return (
    <div className="stat-card">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="rok" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatY}
              width={50}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem",
                fontSize: "0.85rem",
              }}
              formatter={(v: number) => [formatTooltip(v), ""]}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fill={`url(#grad-${dataKey})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatusBadge({ status, dni }: { status: "platna" | "blizi-sa" | "po-termine"; dni: number }) {
  if (status === "po-termine") {
    return (
      <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
        po termíne · {Math.abs(dni)} dní
      </span>
    );
  }
  if (status === "blizi-sa") {
    return (
      <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-warning/15 text-warning">
        o {dni} dní
      </span>
    );
  }
  return (
    <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
      o {dni} dní
    </span>
  );
}

function SectionLink({ to, title, desc }: { to: "/financie" | "/kontroly" | "/vydavky"; title: string; desc: string }) {
  return (
    <Link
      to={to}
      className="stat-card group flex flex-col justify-between gap-4 hover:border-teal transition-colors"
    >
      <div>
        <h3 className="font-display font-semibold text-foreground group-hover:text-teal transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>
      <span className="text-sm font-medium text-teal inline-flex items-center gap-1">
        Otvoriť <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
