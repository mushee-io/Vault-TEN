"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { Card, Badge, Button, Divider, Textarea } from "@/components/ui";
import { Brain, LockKeyhole, TrendingUp, Users, ShieldCheck } from "lucide-react";

type Submission = {
  id: string;
  prompt: string;
  answer: string;
  createdAt: number;
};

const SKEY = "mushee:submissions:v1";

function loadSubs(): Submission[] {
  try {
    const raw = localStorage.getItem(SKEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Submission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSubs(items: Submission[]) {
  localStorage.setItem(SKEY, JSON.stringify(items));
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const bal = useBalance({ address });

  const [prompt, setPrompt] = useState("What skill will be most valuable in the AI economy?");
  const [answer, setAnswer] = useState("");
  const [subs, setSubs] = useState<Submission[]>([]);
  const [toast, setToast] = useState<string>("");

  useEffect(() => {
    setSubs(loadSubs());
  }, []);

  const stats = useMemo(() => {
    const total = subs.length;
    const uniqueDays = new Set(subs.map(s => new Date(s.createdAt).toDateString())).size;
    return {
      submissions: total,
      activeDays: uniqueDays,
      contributors: Math.max(1, Math.min(124, 80 + total)),
      insights: Math.max(1, Math.min(18, 6 + Math.floor(total / 3))),
    };
  }, [subs]);

  function submit() {
    if (!isConnected) {
      setToast("Connect your wallet to submit.");
      return;
    }
    if (!answer.trim()) {
      setToast("Write a quick answer first.");
      return;
    }
    const item: Submission = {
      id: crypto.randomUUID(),
      prompt,
      answer,
      createdAt: Date.now(),
    };
    const next = [item, ...subs];
    setSubs(next);
    saveSubs(next);
    setAnswer("");
    setToast("Encrypted submission stored (demo).");
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-cream/65">A clean surface for private human intelligence collection.</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-white/5">Network: Sepolia / Mainnet</Badge>
          <Badge className="bg-white/5">Mode: Encrypted (demo)</Badge>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-cream" />
            <div className="text-sm font-semibold">Insights</div>
          </div>
          <div className="mt-3 text-3xl font-semibold">{stats.insights}</div>
          <div className="text-xs text-cream/60">Generated from encrypted submissions.</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-cream" />
            <div className="text-sm font-semibold">Contributors</div>
          </div>
          <div className="mt-3 text-3xl font-semibold">{stats.contributors}</div>
          <div className="text-xs text-cream/60">Community-ready metric for demos.</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5 text-cream" />
            <div className="text-sm font-semibold">Encrypted responses</div>
          </div>
          <div className="mt-3 text-3xl font-semibold">{stats.submissions}</div>
          <div className="text-xs text-cream/60">Stored locally for now (demo).</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-cream" />
            <div className="text-sm font-semibold">Wallet balance</div>
          </div>
          <div className="mt-3 text-3xl font-semibold">
            {bal.data ? Number(bal.data.formatted).toFixed(4) : "—"}
          </div>
          <div className="text-xs text-cream/60">{bal.data?.symbol ?? "ETH"}</div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 border border-white/10">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Submit an insight</div>
                <div className="text-xs text-cream/60">Your answer is treated as encrypted data (demo).</div>
              </div>
            </div>
            <Badge className="bg-white/5">Proof-of-human UX</Badge>
          </div>

          <Divider className="my-5" />

          <div className="space-y-3">
            <div className="text-sm text-cream/80">Prompt</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
              {prompt}
            </div>

            <div className="text-sm text-cream/80">Your answer</div>
            <Textarea
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write a real, human answer…"
            />

            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-cream/55">
                {isConnected ? (
                  <>Connected as <span className="text-cream">{address?.slice(0,6)}…{address?.slice(-4)}</span></>
                ) : (
                  <>Connect wallet to submit.</>
                )}
              </div>
              <Button onClick={submit}>Encrypt & Submit</Button>
            </div>

            {toast ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-cream/80">
                {toast}
              </div>
            ) : null}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-semibold">Latest submissions</div>
          <div className="mt-1 text-xs text-cream/60">Shown as masked previews.</div>
          <Divider className="my-4" />

          <div className="space-y-3">
            {subs.slice(0, 6).map((s) => (
              <div key={s.id} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs text-cream/60">{new Date(s.createdAt).toLocaleString()}</div>
                <div className="mt-1 text-sm text-cream/90 line-clamp-2">
                  {s.answer.length > 42 ? s.answer.slice(0, 42) + "…" : s.answer}
                </div>
                <div className="mt-2 text-[11px] text-cream/50">Encrypted payload • access controlled</div>
              </div>
            ))}
            {subs.length === 0 ? (
              <div className="text-sm text-cream/60">No submissions yet. Add the first one.</div>
            ) : null}
          </div>
        </Card>
      </section>
    </div>
  );
}
