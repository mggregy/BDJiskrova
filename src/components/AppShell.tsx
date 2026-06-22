import { Link } from "@tanstack/react-router";
import { Building2, LayoutDashboard, Receipt, ShieldCheck, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { DOM_INFO } from "@/data/dom-data";

const navItems = [
  { to: "/", label: "Prehľad", icon: LayoutDashboard },
  { to: "/financie", label: "Financie & Spotreby", icon: Receipt },
  { to: "/kontroly", label: "Zákonné kontroly", icon: ShieldCheck },
  { to: "/vydavky", label: "Výdavky z fondu", icon: Wrench },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/70 bg-surface/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="size-10 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-sm">
                <Building2 className="size-5" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-semibold text-foreground text-base">
                  {DOM_INFO.nazov}
                </div>
                <div className="text-xs text-muted-foreground">{DOM_INFO.mesto}</div>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-colors flex items-center gap-2"
                  activeProps={{
                    className:
                      "px-3 py-2 rounded-md text-sm font-medium text-primary bg-accent flex items-center gap-2",
                  }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          {/* mobile nav */}
          <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto -mx-2 px-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="shrink-0 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-surface-muted flex items-center gap-1.5"
                activeProps={{
                  className:
                    "shrink-0 px-3 py-1.5 rounded-md text-xs font-medium text-primary bg-accent flex items-center gap-1.5",
                }}
                activeOptions={{ exact: item.to === "/" }}
              >
                <item.icon className="size-3.5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      <footer className="border-t border-border/70 mt-12 bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex flex-wrap gap-x-6 gap-y-1 justify-between">
          <span>
            Správca: <strong className="text-foreground">{DOM_INFO.spravca}</strong> · objekt č. {DOM_INFO.cisloDomu}
          </span>
          <span>{DOM_INFO.pocetBytov} bytov · {DOM_INFO.podlahovaPlocha.toLocaleString("sk-SK")} m²</span>
        </div>
      </footer>
    </div>
  );
}
