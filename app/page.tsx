import Link from "next/link";
import { ArrowRight, LockKeyhole, Sparkles, Vault, ShieldCheck, Users, SendHorizonal } from "lucide-react";
import { Button, Card, Badge, Divider } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[32px] matte-strong noise edge p-8 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <Badge>Mushee • TEN-ready</Badge>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Encrypted Human Intelligence Vault
            </h1>
            <p className="text-cream/75 text-base sm:text-lg">
              Collect human insights, keep them private, and prove value without exposing raw data.
              Built for encrypted execution — designed to feel like a real product.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard"><Button>Open Dashboard <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/vault"><Button variant="soft">Go to Vault</Button></Link>
              <Link href="/send"><Button variant="ghost">Private Send</Button></Link>
            </div>
            <div className="text-xs text-cream/50">
              Tagline: <span className="text-cream">“Privacy you can build on.”</span>
            </div>
          </div>

          <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 border border-white/10">
                  <LockKeyhole className="h-5 w-5 text-cream" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Encrypted by design</div>
                  <div className="text-xs text-cream/60">Store insights without leaking raw data.</div>
                </div>
              </div>
              <Divider className="my-4" />
              <div className="text-xs text-cream/60">
                This demo models TEN-style encrypted execution flows and UX patterns.
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 border border-white/10">
                  <Vault className="h-5 w-5 text-cream" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Vaults + token pairing</div>
                  <div className="text-xs text-cream/60">Pair TEN with any asset (demo).</div>
                </div>
              </div>
              <Divider className="my-4" />
              <div className="text-xs text-cream/60">
                Create vaults locally, view balances, and simulate pairing strategies.
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 border border-white/10">
                  <ShieldCheck className="h-5 w-5 text-cream" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Proof-of-human UX</div>
                  <div className="text-xs text-cream/60">Short prompts → encrypted submissions.</div>
                </div>
              </div>
              <Divider className="my-4" />
              <div className="text-xs text-cream/60">
                Perfect for Mushee’s “human intelligence for AI” narrative.
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 border border-white/10">
                  <SendHorizonal className="h-5 w-5 text-cream" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Private send</div>
                  <div className="text-xs text-cream/60">A clean transfer flow (demo).</div>
                </div>
              </div>
              <Divider className="my-4" />
              <div className="text-xs text-cream/60">
                “Shielded mode” is shown as a TEN feature toggle for encrypted execution.
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-cream/60">
          <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4" /> red • white • milky brown</span>
          <span className="text-cream/30">•</span>
          <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> grant-ready demo surface</span>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold tracking-tight">Why this demo wins</h2>
          <p className="mt-2 text-sm text-cream/70">
            It’s not “another dApp”. It’s a privacy-first product story: people contribute intelligence, it stays protected,
            and value is provable. That’s the kind of narrative encrypted execution is made for.
          </p>
          <Divider className="my-5" />
          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium">Homepage</div>
              <div className="text-xs text-cream/60 mt-1">Pitch + entry points.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium">Dashboard</div>
              <div className="text-xs text-cream/60 mt-1">Stats + submissions.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium">Vault</div>
              <div className="text-xs text-cream/60 mt-1">Vault list + pairing.</div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold tracking-tight">Quick start</h3>
          <ol className="mt-3 space-y-2 text-sm text-cream/70 list-decimal list-inside">
            <li>Set WalletConnect Project ID</li>
            <li>Run <span className="text-cream">npm i</span></li>
            <li>Run <span className="text-cream">npm run dev</span></li>
          </ol>
          <Divider className="my-5" />
          <p className="text-xs text-cream/60">
            Tip: use Sepolia for demo transactions. Vault data is stored locally for now.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="https://mushee.xyz" target="_blank" rel="noreferrer">
              <Button variant="ghost">mushee.xyz</Button>
            </a>
            <a href="https://x.com/mushee_io" target="_blank" rel="noreferrer">
              <Button variant="soft">Twitter</Button>
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
