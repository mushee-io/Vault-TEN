"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { Card, Button, Divider, Input, Badge } from "@/components/ui";
import { addVault, loadVaults, removeVault, type TokenSymbol, type Vault, formatPair } from "@/lib/vaults";
import { Coins, Plus, Trash2, Shield } from "lucide-react";

const TOKENS: TokenSymbol[] = ["TEN", "ETH", "USDC"];

function Select({ value, onChange }: { value: TokenSymbol; onChange: (v: TokenSymbol) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TokenSymbol)}
      className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-cream outline-none focus:border-white/20"
    >
      {TOKENS.map(t => <option key={t} value={t}>{t}</option>)}
    </select>
  );
}

export default function VaultPage() {
  const { isConnected, address } = useAccount();
  const bal = useBalance({ address });

  const [name, setName] = useState("Main Vault");
  const [a, setA] = useState<TokenSymbol>("TEN");
  const [b, setB] = useState<TokenSymbol>("ETH");
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    setVaults(loadVaults());
  }, []);

  const totalVaults = vaults.length;

  const pseudoVaultBalance = useMemo(() => {
    // demo-only: derive a neat looking number from wallet balance
    const base = bal.data ? Number(bal.data.formatted) : 0;
    const tenSide = Math.max(0, base * 120);
    const otherSide = Math.max(0, base * 0.4);
    return { tenSide, otherSide };
  }, [bal.data]);

  function createVault() {
    if (!isConnected) {
      setNote("Connect wallet to create a vault.");
      return;
    }
    if (!name.trim()) {
      setNote("Give the vault a name.");
      return;
    }
    if (a === b) {
      setNote("Pick two different tokens for the pair.");
      return;
    }
    const v = addVault({ name: name.trim(), tokenA: a, tokenB: b });
    setVaults([v, ...vaults]);
    setNote("Vault created (stored locally for demo).");
    setTimeout(() => setNote(""), 2200);
  }

  function del(id: string) {
    removeVault(id);
    setVaults(vaults.filter(v => v.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Vault</h1>
          <p className="text-sm text-cream/65">Create private vaults and pair TEN with other assets (demo).</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-white/5">Vaults: {totalVaults}</Badge>
          <Badge className="bg-white/5">Encryption: On (demo)</Badge>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 border border-white/10">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Create a vault</div>
              <div className="text-xs text-cream/60">Demo-ready vault creation with token pairing.</div>
            </div>
          </div>

          <Divider className="my-5" />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="text-xs text-cream/60">Vault name</div>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Research Vault" />
            </div>
            <div className="space-y-2">
              <div className="text-xs text-cream/60">Pair</div>
              <div className="grid grid-cols-2 gap-2">
                <Select value={a} onChange={setA} />
                <Select value={b} onChange={setB} />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-xs text-cream/55">
              {isConnected ? (
                <>Vault owner: <span className="text-cream">{address?.slice(0,6)}…{address?.slice(-4)}</span></>
              ) : (
                <>Connect wallet to create vaults.</>
              )}
            </div>
            <Button onClick={createVault}><Plus className="h-4 w-4" /> Create</Button>
          </div>

          {note ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-cream/80">{note}</div>
          ) : null}
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-ember text-cream shadow-soft">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Vault balance (demo)</div>
              <div className="text-xs text-cream/60">Derived from connected wallet balance.</div>
            </div>
          </div>

          <Divider className="my-5" />

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-cream/70">TEN side</span>
              <span className="font-semibold">{pseudoVaultBalance.tenSide.toFixed(2)} TEN</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-cream/70">Other side</span>
              <span className="font-semibold">{pseudoVaultBalance.otherSide.toFixed(4)} {b}</span>
            </div>
          </div>

          <Divider className="my-5" />

          <div className="text-xs text-cream/60">
            On TEN mainnet, these balances can be backed by encrypted contract storage and shielded transfers.
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-semibold">Your vaults</div>
          <div className="mt-1 text-xs text-cream/60">Stored locally for demo (no backend needed).</div>
          <Divider className="my-4" />

          <div className="space-y-3">
            {vaults.map((v) => (
              <div key={v.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{v.name}</div>
                    <div className="text-xs text-cream/60 mt-1">Pair: {formatPair(v.tokenA, v.tokenB)}</div>
                    <div className="text-[11px] text-cream/50 mt-2">Created: {new Date(v.createdAt).toLocaleString()}</div>
                  </div>
                  <Button variant="ghost" onClick={() => del(v.id)} aria-label="Remove vault">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {vaults.length === 0 ? (
              <div className="text-sm text-cream/60">No vaults yet — create one above.</div>
            ) : null}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-semibold">Pairing ideas</div>
          <div className="mt-1 text-xs text-cream/60">Simple narratives you can pitch in a demo.</div>
          <Divider className="my-4" />

          <div className="space-y-3 text-sm text-cream/75">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium text-cream">TEN / ETH</div>
              <div className="text-xs text-cream/60 mt-1">Vault collateral + encrypted execution fee narrative.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium text-cream">TEN / USDC</div>
              <div className="text-xs text-cream/60 mt-1">Stable rewards for contributors + private payout rails.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium text-cream">TEN / (any)</div>
              <div className="text-xs text-cream/60 mt-1">Partner token pairing for ecosystem growth.</div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
