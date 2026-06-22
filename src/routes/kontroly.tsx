import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { REVIZIE, KONSTRUKCNE_PRVKY, fmtDate, statusRevizie } from "@/data/dom-data";
import { AlertTriangle, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/kontroly")({
  head: () => ({
    meta: [
      { title: "Zákonné kontroly — Bytový dom Jiskrova 6,8" },
      { name: "description", content: "Stav povinných revízií: elektrika, plyn, bleskozvody, výťahy, hydranty, deratizácia." },
    ],
  }),
  component: KontrolyPage,
});

function KontrolyPage() {
  const enriched = REVIZIE
    .map((r) => ({ ...r, ...statusRevizie(r.platnaDo) }))
    .sort((a, b) => a.dniDoExpiracie - b.dniDoExpiracie);

  const platne = enriched.filter((r) => r.status === "platna");
  const blizia = enriched.filter((r) => r.status === "blizi-sa");
  const expirovane = enriched.filter((r) => r.status === "po-termine");

  return (
    <AppShell>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal font-medium">Bezpečnosť a prevádzka</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-1">Zákonné kontroly</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Prehľad povinných revízií a kontrol bytového domu — kedy boli vykonané a do kedy sú platné.
        </p>
      </header>

      {/* Súhrn */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          icon={CheckCircle2}
          label="Platné revízie"
          value={platne.length}
          tone="success"
        />
        <SummaryCard
          icon={Clock}
          label="Čoskoro expirujú (do 90 dní)"
          value={blizia.length}
          tone="warning"
        />
        <SummaryCard
          icon={AlertTriangle}
          label="Po termíne"
          value={expirovane.length}
          tone="destructive"
        />
      </section>

      {/* Zoznam revízií */}
      <section className="stat-card mb-10">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <ShieldCheck className="size-4 text-teal" />
          Zoznam revízií
        </h2>
        <div className="divide-y divide-border/60">
          {enriched.map((r) => (
            <div key={r.nazov} className="py-3 flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-foreground">{r.nazov}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Posledná revízia: {fmtDate(r.poslednaRevizia)} · platná do {fmtDate(r.platnaDo)}
                  {r.poznamka ? ` · ${r.poznamka}` : ""}
                </div>
              </div>
              <StatusPill status={r.status} dni={r.dniDoExpiracie} />
            </div>
          ))}
        </div>
      </section>

      {/* Stav konštrukčných prvkov */}
      <section>
        <h2 className="text-xl font-semibold mb-1">Stav konštrukčných prvkov</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Informatívne hodnotenie zo správy správcu — pre potreby plánovania budúcich opráv.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {KONSTRUKCNE_PRVKY.map((p) => (
            <div key={p.prvok} className="stat-card">
              <div className="flex items-start justify-between gap-3">
                <div className="font-medium text-foreground text-sm">{p.prvok}</div>
                <StavBadge stav={p.stav} />
              </div>
              {p.poznamka && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.poznamka}</p>}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  tone: "success" | "warning" | "destructive";
}) {
  const toneClasses: Record<string, string> = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <div className="stat-card flex items-center gap-4">
      <div className={`size-11 rounded-lg grid place-items-center ${toneClasses[tone]}`}>
        <Icon className="size-5" />
      </div>
      <div>
        <div className="text-2xl font-bold font-display">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function StatusPill({ status, dni }: { status: "platna" | "blizi-sa" | "po-termine"; dni: number }) {
  if (status === "po-termine") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
        <AlertTriangle className="size-3.5" />
        po termíne ({Math.abs(dni)} dní)
      </span>
    );
  }
  if (status === "blizi-sa") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-warning/15 text-warning">
        <Clock className="size-3.5" />
        expiruje o {dni} dní
      </span>
    );
  }
  const roky = Math.floor(dni / 365);
  const text = roky >= 1 ? `platná ${roky}+ rok${roky >= 5 ? "ov" : roky >= 2 ? "y" : ""}` : `platná ${dni} dní`;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-success/10 text-success">
      <CheckCircle2 className="size-3.5" />
      {text}
    </span>
  );
}

function StavBadge({ stav }: { stav: string }) {
  const map: Record<string, string> = {
    "v norme": "bg-success/10 text-success",
    "nové": "bg-teal/15 text-teal",
    "rekonštruované": "bg-teal/15 text-teal",
    "opotrebované vekom": "bg-warning/15 text-warning",
    "nutná oprava-výmena": "bg-destructive/10 text-destructive",
    "požadovaná montáž": "bg-warning/15 text-warning",
  };
  return (
    <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${map[stav] ?? "bg-surface-muted text-muted-foreground"}`}>
      {stav}
    </span>
  );
}
