"use client";

export type TokenSymbol = "TEN" | "ETH" | "USDC";

export type Vault = {
  id: string;
  name: string;
  tokenA: TokenSymbol;
  tokenB: TokenSymbol;
  createdAt: number;
};

const KEY = "mushee:vaults:v1";

export function loadVaults(): Vault[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Vault[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveVaults(vaults: Vault[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(vaults));
}

export function addVault(v: Omit<Vault, "id" | "createdAt">): Vault {
  const vaults = loadVaults();
  const id = crypto.randomUUID();
  const next: Vault = { ...v, id, createdAt: Date.now() };
  const updated = [next, ...vaults];
  saveVaults(updated);
  return next;
}

export function removeVault(id: string) {
  const vaults = loadVaults();
  saveVaults(vaults.filter(v => v.id !== id));
}

export function formatPair(a: string, b: string) {
  return `${a}/${b}`;
}
