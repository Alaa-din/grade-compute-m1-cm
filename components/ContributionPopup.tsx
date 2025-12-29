"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Github, X } from "lucide-react";
import { Card } from "./ui/Card";

export default function ContributionPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasVisited, setHasVisited] = useState(false);

    useEffect(() => {
        // Check if the user has already dismissed the popup
        const visited = localStorage.getItem("grade-compute-visited");
        if (visited === "true") {
            setHasVisited(true);
            return;
        }

        // Show popup after 5 seconds for easier testing
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsOpen(false);
        // Don't save permanent dismissal, maybe just session?
        // User asked: "Sauvegarder dans localStorage" -> implying permanent Dismiss
        localStorage.setItem("grade-compute-visited", "true");
        setHasVisited(true);
    };

    const handleGithubVisit = () => {
        window.open("https://github.com/Alaa-din/grade-compute-m1-cm", "_blank");
    };

    if (hasVisited) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="w-full max-w-md"
                    >
                        <Card className="relative bg-[var(--color-dark-bg)] border-[var(--color-ind-blue)] p-6 shadow-2xl overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={handleDismiss}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="p-3 bg-[var(--color-ind-blue)]/20 rounded-full text-[var(--color-ind-blue)]">
                                    <Star size={32} />
                                </div>

                                <h3 className="text-xl font-bold text-white">
                                    Merci d’utiliser mon outil ! 💙
                                </h3>

                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Si vous l’appréciez, n’hésitez pas à : <br />
                                    ✅ <a href="https://github.com/Alaa-din/grade-compute-m1-cm" target="_blank" rel="noopener noreferrer" className="text-[var(--color-ind-blue)] hover:underline">Visiter le repo GitHub</a> <br />
                                    ⭐ Donner un Star pour m’encourager <br />
                                    💬 Proposer des améliorations
                                </p>

                                <div className="text-[var(--color-gold)] font-arabic text-sm mt-2">
                                    "دعواتكم لصاحب التطبيق, votre développeur"
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                                    <button
                                        onClick={handleGithubVisit}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-ind-blue)] hover:bg-[var(--color-ind-blue)]/80 text-white py-2.5 rounded-lg font-medium transition-colors"
                                    >
                                        <Github size={18} />
                                        Visiter GitHub
                                    </button>
                                    <button
                                        onClick={handleDismiss}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 py-2.5 rounded-lg font-medium transition-colors"
                                    >
                                        Ne plus afficher
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
