"use client";

import { InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function Input({ label, className, disabled, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-medium text-[rgba(255,255,255,0.6)] uppercase tracking-wider">
                {label}
            </label>
            <input
                className={twMerge(
                    clsx(
                        "h-10 w-full rounded-md border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-all",
                        "focus:border-[var(--color-ind-blue)] focus:ring-1 focus:ring-[var(--color-ind-blue)]",
                        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[rgba(0,0,0,0.2)]",
                        className
                    )
                )}
                disabled={disabled}
                {...props}
            />
        </div>
    );
}
