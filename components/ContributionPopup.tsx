"use client";

import { useEffect, useState } from "react";
import { Star, Github, X } from "lucide-react";
import { Card } from "./ui/Card";

export default function ContributionPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Using a unique key to force display for the current session/user
        const popupSeen = localStorage.getItem("grade-compute-v-final-100");
        if (!popupSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000); // 3 seconds delay
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem("grade-compute-v-final-100", "true");
    };

    const handleGithubVisit = () => {
        window.open("https://github.com/Alaa-din/grade-compute-m1-cm", "_blank");
    };

    if (!isMounted || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
            <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
                <Card className="relative bg-[#1e1e20] border-[var(--color-ind-blue)] p-8 shadow-2xl">
                    {/* Close Button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex flex-col items-center text-center gap-5">
                        <div className="p-4 bg-[var(--color-ind-blue)]/20 rounded-full text-[var(--color-gold)]">
                            <Star size={40} />
                        </div>

                        <h3 className="text-2xl font-bold text-white">
                            Merci d’utiliser mon outil ! 💙
                        </h3>

                        <div className="space-y-2 text-gray-300 text-sm leading-relaxed">
                            <p>✅ <a href="https://github.com/Alaa-din/grade-compute-m1-cm" target="_blank" rel="noopener noreferrer" className="text-[var(--color-ind-blue)] hover:underline">Visiter le repo GitHub</a></p>
                            <p>⭐ Donner un Star pour m’encourager</p>
                            <p>💬 Proposer des améliorations</p>
                        </div>

                        <div className="text-[var(--color-gold)] font-arabic text-sm mt-2 italic">
                            "دعواتكم لصاحب التطبيق, votre développeur"
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                            <button
                                onClick={handleGithubVisit}
                                className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-ind-blue)] hover:bg-[var(--color-ind-blue)]/80 text-white py-3 rounded-xl font-bold transition-all transform active:scale-95"
                            >
                                <Github size={20} />
                                Visiter GitHub
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="flex-1 bg-white/10 hover:bg-white/20 text-gray-300 py-3 rounded-xl font-medium transition-colors"
                            >
                                Plus tard
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
