import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { TopNav, Footer } from "@/components/nav";

export const metadata: Metadata = {
  title: "Mushee — Encrypted Human Intelligence Vault",
  description: "A TEN-ready demo: encrypted human intelligence, private vaults, and shielded transfers (demo).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopNav />
          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
