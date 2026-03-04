"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "@/components/cn";
import { Badge } from "@/components/ui";
import { Shield, Vault, LayoutDashboard, SendHorizonal, Home } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vault", label: "Vault", icon: Vault },
  { href: "/send", label: "Private Send", icon: SendHorizonal },
];

export function TopNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="matte-strong noise edge rounded-3xl px-4 py-3 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="group flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-ember text-cream shadow-soft">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold tracking-tight">Mushee</div>
                  <div className="text-xs text-cream/60">Encrypted human intelligence</div>
                </div>
              </Link>
              <Badge className="hidden sm:inline-flex">TEN-ready demo</Badge>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => {
                const active = pathname === l.href;
                const Icon = l.icon;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "flex items-center gap-2 rounded-2xl px-3 py-2 text-sm text-cream/80 hover:bg-white/5 border border-transparent",
                      active && "bg-white/5 border-white/10 text-cream"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ConnectButton accountStatus="avatar" showBalance={false} />
            </div>
          </div>

          <div className="mt-3 flex md:hidden gap-2 overflow-x-auto pb-1">
            {links.map((l) => {
              const active = pathname === l.href;
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2 text-xs text-cream/80 hover:bg-white/5 border border-transparent",
                    active && "bg-white/5 border-white/10 text-cream"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 pt-8">
      <div className="matte noise edge rounded-3xl px-5 py-6 text-sm text-cream/70">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-medium text-cream">Mushee — UK Incorporated</div>
          <div className="flex flex-wrap items-center gap-3">
            <a className="hover:text-cream" href="https://mushee.xyz" target="_blank" rel="noreferrer">mushee.xyz</a>
            <span className="text-cream/30">•</span>
            <a className="hover:text-cream" href="https://x.com/mushee_io" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
        <div className="mt-3 text-xs text-cream/50">
          Demo build: wallet connect + vaults + token pairing + send flow. Privacy mode is presented as a TEN encrypted-execution feature.
        </div>
      </div>
    </footer>
  );
}
