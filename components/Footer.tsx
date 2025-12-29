"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const [year, setYear] = useState<number | string>(2025);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="w-full py-8 mt-12 border-t border-[rgba(255,255,255,0.05)] bg-[var(--background)] relative z-10">
            <div className="container mx-auto px-4 flex flex-col items-center gap-6 text-sm text-[var(--color-mech-gray)]">

                {/* Made with care */}
                <div className="flex items-center gap-2 text-[var(--foreground)] opacity-80">
                    <span>Made with care by your dev</span>
                    <a
                        href="https://github.com/Alaa-din/grade-compute-m1-cm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-ind-blue)] hover:text-[var(--color-emerald-custom)] transition-colors"
                    >
                        <Github size={16} />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center opacity-60">
                    © {year} . Tous droits réservés.
                </div>

                {/* Contacts */}
                <div className="flex gap-6 items-center">
                    <a href="mailto:votre.elaichialadin1@gmail.com" className="hover:text-[var(--color-gold)] transition-colors">
                        <Mail size={18} />
                    </a>
                    <a href="https://github.com/Alaa-din/grade-compute-m1-cm" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">
                        <Github size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/alaaeddine-elaichi-9064291a5/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">
                        <Linkedin size={18} />
                    </a>
                    <a href="#" className="hover:text-[var(--color-gold)] transition-colors">
                        <Twitter size={18} />
                    </a>
                </div>

                {/* Spiritual Note */}
                <div className="text-xs opacity-40 mt-2 font-arabic text-center max-w-md">
                    "اللهم ارزق صاحب هذا التطبيق العافية والنجاح في الدنيا والآخرة"
                </div>

            </div>
        </footer>
    );
}
