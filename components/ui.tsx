"use client";

import * as React from "react";
import { cn } from "./cn";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost"|"soft" }) {
  const { className, variant="primary", ...rest } = props;
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string,string> = {
    primary: "bg-ember text-cream hover:brightness-110 shadow-soft",
    ghost: "bg-transparent text-cream hover:bg-white/5 border border-white/10",
    soft: "matte-strong text-cream hover:bg-white/10 border border-white/10"
  };
  return <button className={cn(base, variants[variant], className)} {...rest} />;
}

export function Card({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("matte noise edge rounded-3xl p-5 shadow-soft", className)} {...rest} />;
}

export function Badge({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cream/90", className)} {...rest} />;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      className={cn("w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-white/20", className)}
      {...rest}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return (
    <textarea
      className={cn("w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-white/20", className)}
      {...rest}
    />
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-white/10", className)} />;
}
