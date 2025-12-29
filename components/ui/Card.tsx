"use client";

import { HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={twMerge(
                clsx(
                    "rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(30,30,32,0.6)] backdrop-blur-sm text-[var(--foreground)] shadow-sm",
                    "hover:border-[rgba(255,215,0,0.3)] transition-colors duration-300",
                    className
                )
            )}
            {...props}
        />
    )
);
Card.displayName = "Card";

export { Card };
