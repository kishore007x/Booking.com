"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "danger" | "ghost";
  loading?: boolean;
  fullWidth?: boolean;
}

export function GlassButton({
  children,
  variant = "primary",
  loading,
  fullWidth,
  className,
  disabled,
  ...props
}: GlassButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "glass-btn px-6 py-3",
    outline: "glass-btn-outline px-6 py-3",
    danger: "bg-red-500/80 hover:bg-red-500 px-6 py-3 rounded-xl border border-red-400/30 text-white",
    ghost: "px-4 py-2 rounded-xl hover:bg-white/5 text-white/70 hover:text-white",
  };

  return (
    <button
      className={cn(base, variants[variant], fullWidth && "w-full", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
