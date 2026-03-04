import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f",
        cream: "#f7f1ea",
        milk: "#efe6dc",
        ember: "#d32f2f",
        rust: "#b24a2e",
        cocoa: "#6a4b3a"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(0,0,0,0.25)",
        edge: "0 0 0 1px rgba(18,18,24,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
