"use client";

import { useMemo, useState } from "react";
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Card, Button, Divider, Input, Badge } from "@/components/ui";
import { SendHorizonal, LockKeyhole, EyeOff, CheckCircle2, AlertTriangle } from "lucide-react";

export default function SendPage() {
  const { isConnected, address } = useAccount();
  const bal = useBalance({ address });

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0.001");
  const [shielded, setShielded] = useState(true);

  const parsed = useMemo(() => {
    try { return parseEther(amount || "0"); } catch { return null; }
  }, [amount]);

  const tx = useSendTransaction();

  async function send() {
    if (!isConnected) return;
    if (!to || !parsed) return;
    // Demo: shielded toggle affects UI copy. Real shielded send would be TEN encrypted execution.
    tx.sendTransaction({ to: to as `0x${string}`, value: parsed });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Private Send</h1>
          <p className="text-sm text-cream/65">A clean transfer flow with an encrypted-mode toggle (demo).</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-white/5">{shielded ? "Shielded mode" : "Standard mode"}</Badge>
          <Badge className="bg-white/5">Balance: {bal.data ? Number(bal.data.formatted).toFixed(4) : "—"} {bal.data?.symbol ?? "ETH"}</Badge>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 border border-white/10">
                <SendHorizonal className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Send</div>
                <div className="text-xs text-cream/60">Demo uses normal EVM transfer; shielded mode is UX + narrative.</div>
              </div>
            </div>
            <button
              onClick={() => setShielded(s => !s)}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-cream/80 hover:bg-white/10"
            >
              {shielded ? <EyeOff className="h-4 w-4" /> : <LockKeyhole className="h-4 w-4" />}
              {shielded ? "Shielded: ON" : "Shielded: OFF"}
            </button>
          </div>

          <Divider className="my-5" />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <div className="text-xs text-cream/60">Recipient</div>
              <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="0x…" />
            </div>
            <div className="space-y-2">
              <div className="text-xs text-cream/60">Amount (ETH)</div>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="text-xs text-cream/60">Execution</div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm">
                {shielded ? "Encrypted execution (TEN narrative)" : "Standard EVM transfer"}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-xs text-cream/55">
              {isConnected ? <>From <span className="text-cream">{address?.slice(0,6)}…{address?.slice(-4)}</span></> : "Connect wallet to send."}
            </div>
            <Button onClick={send} disabled={!isConnected || !to || !parsed || tx.isPending}>
              {tx.isPending ? "Sending..." : "Send"}
            </Button>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-cream/70">
            {shielded ? (
              <div className="flex items-start gap-2">
                <EyeOff className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="font-medium text-cream">Shielded mode (demo)</div>
                  <div className="mt-1">
                    In a TEN mainnet build, the recipient, amount, and memo can be handled via encrypted execution. 
                    This demo focuses on the UX + flow you’ll pitch.
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <LockKeyhole className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="font-medium text-cream">Standard mode</div>
                  <div className="mt-1">Public EVM transfer flow for comparison.</div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-semibold">Status</div>
          <div className="mt-1 text-xs text-cream/60">Live tx state from wagmi.</div>
          <Divider className="my-4" />

          <div className="space-y-3 text-sm">
            {tx.isError ? (
              <div className="flex items-start gap-2 rounded-2xl border border-white/10 bg-black/20 p-3">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="font-medium text-cream">Transaction failed</div>
                  <div className="text-xs text-cream/60 mt-1">{(tx.error as any)?.shortMessage ?? tx.error?.message}</div>
                </div>
              </div>
            ) : null}

            {tx.data ? (
              <div className="flex items-start gap-2 rounded-2xl border border-white/10 bg-black/20 p-3">
                <CheckCircle2 className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="font-medium text-cream">Transaction submitted</div>
                  <div className="text-xs text-cream/60 mt-1">Hash: {tx.data}</div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-xs text-cream/60">
                Fill recipient + amount, then send.
              </div>
            )}

            <Divider />

            <div className="text-xs text-cream/60">
              Tip: Use Sepolia test ETH. Keep amounts small for demos.
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
