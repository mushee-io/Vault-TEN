# Mushee — Encrypted Human Intelligence Vault (TEN-ready demo)

A clean, grant-friendly demo surface:
- **Home** (pitch + CTA)
- **Dashboard** (submit encrypted human insights - demo storage)
- **Vault** (create vaults + pair TEN with other tokens - demo)
- **Private Send** (transaction flow + shielded-mode narrative toggle)

## Run locally

1) Install
```bash
npm install
```

2) Create `.env.local` (optional but recommended)
```bash
cp .env.example .env.local
```

3) Start
```bash
npm run dev
```

## WalletConnect (recommended)

Create a WalletConnect project and set:
- `NEXT_PUBLIC_WC_PROJECT_ID=...`

If you don't set it, the app will still run, but wallet modal may not work in some environments.

## Notes

- Vaults + submissions are stored in **localStorage** so the demo works without any backend.
- "Shielded mode" is **UX + narrative** in this demo; in a TEN mainnet build it would map to encrypted execution.
