"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { sepolia, mainnet } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "demo";

export const chains = [sepolia, mainnet] as const;

export const wagmiConfig = getDefaultConfig({
  appName: "Mushee",
  projectId,
  chains,
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC || undefined),
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC || undefined),
  },
  ssr: true,
});
