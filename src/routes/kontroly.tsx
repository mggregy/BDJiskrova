import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { AppShell } from "@/components/AppShell";
import {
  REVIZIE,
  KONSTRUKCNE_PRVKY,
  fmtDate,
  statusRevizie,
  type Revizia,
} from "@/data/dom-data";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  CalendarCheck,
  CalendarX,
  Repeat,
  Scale,
  UserCheck,
  ListChecks,
  Info,
  History,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const searchSchema = z.object({ id: z.string().optional() });

export const Route = createFileRoute("/kontroly")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Zákonné kontroly — Bytový dom Jiskrova 6,8" },
      {
        name: "description",
        content:
          "Stav povinných revízií: elektrika, plyn, bleskozvody, výťahy, hydranty, deratizácia.",
      },
    ],
  }),
  component: KontrolyPage,
});

function KontrolyPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate({ from: "/kontroly" });
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (id) setOpenId(id);
  }, [id]);

  const enriched = REVIZIE.map((r) => ({ ...r, ...statusRevizie(r.platnaDo) })).sort(
    (a, b) => a.dniDoExpiracie - b.dniDoExpiracie,
  );

  const platne = enriched.filter((r) => r.status === "platna");
  const blizia = enriched.filter((r) => r.status === "blizi-sa");
  const expirovane = enriched.filter((r) => r.status === "po-termine");

  const aktivna = openId ? REVIZIE.find((r) => r.id === openId) ?? null : null;

  const closeDialog = () => {
    setOpenId(null);
    if (id) navigate({ search: {} });
  };

  return (
    <AppShell>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal font-medium">
          Bezpečnosť a prevádzka
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-1">Zákonné kontroly</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Prehľad povinných revízií a kontrol bytového domu — kedy boli vykonané a do kedy sú
          platné. Kliknutím na riadok zobrazíte detail kontroly.
        </p>
      </header>

      {/* Súhrn */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard icon={CheckCircle2} label="Platné revízie" value={platne.length} tone="success" />
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

      {/* Tabuľka revízií */}
      <section className="stat-card mb-10 overflow-hidden p-0">
        <div className="px-6 pt-6 pb-4 flex items-center gap-2">
          <ShieldCheck className="size-4 text-teal" />
          <h2 className="font-semibold">Zoznam revízií — zoradené podľa najbližšej expirácie</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-surface-muted/60">
                <TableHead>Kontrola</TableHead>
                <TableHead className="hidden md:table-cell">Kategória</TableHead>
                <TableHead className="hidden sm:table-cell">Posledná</TableHead>
                <TableHead>Platná do</TableHead>
                <TableHead className="hidden lg:table-cell">Frekvencia</TableHead>
                <TableHead className="text-right">Stav</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enriched.map((r) => (
                <TableRow
                  key={r.id}
                  className="cursor-pointer hover:bg-surface-muted/70"
                  onClick={() => setOpenId(r.id)}
                >
                  <TableCell className="font-medium text-foreground">{r.nazov}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {r.kategoria}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {fmtDate(r.poslednaRevizia)}
                  </TableCell>
                  <TableCell className="text-sm text-foreground">{fmtDate(r.platnaDo)}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {r.frekvencia}
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusPill status={r.status} dni={r.dniDoExpiracie} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
              {p.poznamka && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.poznamka}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Dialog open={!!aktivna} onOpenChange={(o) => !o && closeDialog()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {aktivna && <ReviziaDetail revizia={aktivna} />}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function ReviziaDetail({ revizia }: { revizia: Revizia }) {
  const { status, dniDoExpiracie } = statusRevizie(revizia.platnaDo);
  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-teal font-medium">
          <ShieldCheck className="size-3.5" />
          {revizia.kategoria}
        </div>
        <DialogTitle className="text-2xl font-display">{revizia.nazov}</DialogTitle>
        <DialogDescription className="text-sm leading-relaxed">{revizia.popis}</DialogDescription>
      </DialogHeader>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <StatusPill status={status} dni={dniDoExpiracie} />
        {revizia.poznamka && (
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
            <Info className="size-3.5" /> {revizia.poznamka}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        <InfoRow icon={CalendarCheck} label="Posledná revízia" value={fmtDate(revizia.poslednaRevizia)} />
        <InfoRow icon={CalendarX} label="Platná do" value={fmtDate(revizia.platnaDo)} />
        <InfoRow icon={Repeat} label="Frekvencia" value={revizia.frekvencia} />
        <InfoRow icon={UserCheck} label="Vykonáva" value={revizia.vykonavatel ?? "—"} />
      </div>

      <div className="mt-5 space-y-4">
        <DetailBlock icon={Scale} title="Zákonný základ">
          {revizia.zakon}
        </DetailBlock>
        <DetailBlock icon={ListChecks} title="Rozsah kontroly">
          {revizia.rozsah}
        </DetailBlock>
        {revizia.historia && revizia.historia.length > 0 && (
          <DetailBlock icon={History} title="História">
            <ul className="space-y-1.5">
              {revizia.historia.map((h, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium text-foreground">{h.datum}</span>
                  <span className="text-muted-foreground"> — {h.popis}</span>
                </li>
              ))}
            </ul>
          </DetailBlock>
        )}
      </div>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border/70 bg-surface-muted/50 p-3">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

function DetailBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1.5">
        <Icon className="size-3.5" />
        {title}
      </div>
      <div className="text-sm text-foreground leading-relaxed">{children}</div>
    </div>
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

function StatusPill({
  status,
  dni,
}: {
  status: "platna" | "blizi-sa" | "po-termine";
  dni: number;
}) {
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
  const text =
    roky >= 1
      ? `platná ${roky}+ rok${roky >= 5 ? "ov" : roky >= 2 ? "y" : ""}`
      : `platná ${dni} dní`;
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
    "nutná kontrola": "bg-destructive/10 text-destructive",
  };
  return (
    <span
      className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
        map[stav] ?? "bg-surface-muted text-muted-foreground"
      }`}
    >
      {stav}
    </span>
  );
}
