"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { clsx } from "clsx";

interface ResultDisplayProps {
    average: number;
    isValidated: boolean;
    totalCredits: number;
}

export default function ResultDisplay({ average, isValidated, totalCredits }: ResultDisplayProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                "mt-8 p-6 rounded-2xl border flex flex-col items-center text-center shadow-lg relative overflow-hidden",
                isValidated
                    ? "bg-[rgba(0,128,96,0.1)] border-[var(--color-emerald-custom)]"
                    : "bg-[rgba(239,68,68,0.1)] border-red-500/50"
            )}
        >
            <div className="relative z-10 flex flex-col items-center gap-3">
                <h2 className="text-lg uppercase tracking-widest opacity-80">Moyenne Générale</h2>

                <div className="text-5xl font-bold tabular-nums tracking-tight">
                    {average.toFixed(2)}<span className="text-2xl opacity-50">/20</span>
                </div>

                <div className={clsx(
                    "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mt-2",
                    isValidated ? "bg-[var(--color-emerald-custom)] text-white" : "bg-red-500 text-white"
                )}>
                    {isValidated ? <CheckCircle size={18} /> : <XCircle size={18} />}
                    {isValidated ? "Semestre Validé" : "Semestre Non Validé"}
                </div>

                <div className="mt-4 flex flex-col items-center gap-1">
                    <span className="text-[10px] uppercase opacity-50 tracking-widest">Crédits accumulés</span>
                    <div className="text-xl font-bold text-[var(--color-gold)]">
                        {totalCredits} <span className="text-xs opacity-50">/ 30</span>
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className={clsx(
                "absolute inset-0 blur-3xl opacity-20 pointer-events-none",
                isValidated ? "bg-[var(--color-emerald-custom)]" : "bg-red-500"
            )} />
        </motion.div>
    );
}
