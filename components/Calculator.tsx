"use client";

import { useEffect, useState, useMemo } from "react";
import { MODULES_S1, MODULES_S2, ALL_MODULES, calculateModuleAverage, TOTAL_COEFFICIENTS_S1, TOTAL_CREDITS_S1, TOTAL_COEFFICIENTS_S2, TOTAL_CREDITS_S2 } from "@/lib/grades";
import { Input } from "./ui/Input";
import { Card } from "./ui/Card";
import ResultDisplay from "./ResultDisplay";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

interface ModuleGrades {
    [key: string]: {
        ca?: number;
        exam?: number;
    };
}

type TabType = 'S1' | 'S2' | 'ANNUEL';

export default function Calculator() {
    const [grades, setGrades] = useState<ModuleGrades>({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('S1');

    // Load from LocalStorage
    useEffect(() => {
        const savedGrades = localStorage.getItem("grade-compute-data");
        if (savedGrades) {
            try {
                setGrades(JSON.parse(savedGrades));
            } catch (e) {
                console.error("Failed to parse grades", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("grade-compute-data", JSON.stringify(grades));
        }
    }, [grades, isLoaded]);

    const handleInputChange = (moduleId: string, type: 'ca' | 'exam', value: string) => {
        const normalizedValue = value.replace(',', '.');

        if (normalizedValue === '') {
            setGrades(prev => ({
                ...prev,
                [moduleId]: { ...prev[moduleId], [type]: undefined }
            }));
            return;
        }

        const num = parseFloat(normalizedValue);

        if (!isNaN(num) && num >= 0 && num <= 20) {
            setGrades(prev => ({
                ...prev,
                [moduleId]: { ...prev[moduleId], [type]: num }
            }));
        }
    };

    const calculateSemesterResults = (modules: typeof MODULES_S1, totalCoef: number, totalCred: number) => {
        let totalWeightedScore = 0;
        let acquiredCredits = 0;

        const moduleResults = modules.map(module => {
            const moduleGrade = calculateModuleAverage(
                module.id,
                grades[module.id]?.ca,
                grades[module.id]?.exam
            );

            totalWeightedScore += moduleGrade * module.coefficient;

            if (moduleGrade >= 10) {
                acquiredCredits += module.credits;
            }

            return {
                ...module,
                average: moduleGrade
            };
        });

        const semesterAverage = totalWeightedScore / totalCoef;
        const finalCredits = semesterAverage >= 10 ? totalCred : acquiredCredits;

        return {
            moduleResults,
            semesterAverage,
            finalCredits,
            isValidated: semesterAverage >= 10
        };
    };

    const s1Results = useMemo(() => calculateSemesterResults(MODULES_S1, TOTAL_COEFFICIENTS_S1, TOTAL_CREDITS_S1), [grades]);
    const s2Results = useMemo(() => calculateSemesterResults(MODULES_S2, TOTAL_COEFFICIENTS_S2, TOTAL_CREDITS_S2), [grades]);

    const annualAverage = (s1Results.semesterAverage + s2Results.semesterAverage) / 2;
    const isAnnuallyValidated = annualAverage >= 10;
    const annualCredits = s1Results.finalCredits + s2Results.finalCredits;

    if (!isLoaded) return null; // Prevent hydration mismatch

    const renderModules = (modules: typeof MODULES_S1, moduleResults: any[]) => {
        return (
            <div className="grid grid-cols-1 gap-4">
                {modules.map((module, index) => {
                    const modGrade = moduleResults.find(m => m.id === module.id)?.average || 0;
                    const caValue = grades[module.id]?.ca?.toString() ?? '';
                    const examValue = grades[module.id]?.exam?.toString() ?? '';

                    return (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="p-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[var(--color-ind-blue)]">
                                        {module.name}
                                    </h3>
                                    <div className="text-xs text-gray-400 mt-1 flex gap-2">
                                        <span className="bg-white/5 px-1.5 py-0.5 rounded">Coef: {module.coefficient}</span>
                                        <span className="bg-white/5 px-1.5 py-0.5 rounded">Crédits: {module.credits}</span>
                                    </div>
                                </div>

                                <div className="flex items-end gap-3 w-full sm:w-auto">
                                    {module.type !== 'exam_only' && (
                                        <div className="w-20">
                                            <Input
                                                label="TD/TP"
                                                type="number"
                                                placeholder="0-20"
                                                min="0"
                                                max="20"
                                                step="0.01"
                                                value={caValue}
                                                onChange={(e) => handleInputChange(module.id, 'ca', e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {module.type !== 'ca_only' && (
                                        <div className="w-20">
                                            <Input
                                                label="Exam"
                                                type="number"
                                                placeholder="0-20"
                                                min="0"
                                                max="20"
                                                step="0.01"
                                                value={examValue}
                                                onChange={(e) => handleInputChange(module.id, 'exam', e.target.value)}
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col items-center justify-end h-full pb-0.5 min-w-[4rem]">
                                        <span className="text-[10px] uppercase text-gray-500 mb-1">Moy.</span>
                                        <span className={clsx(
                                            "font-bold text-lg",
                                            modGrade >= 10 ? "text-[var(--color-emerald-custom)]" : "text-red-400"
                                        )}>
                                            {modGrade.toFixed(2)}
                                        </span>
                                        {modGrade >= 10 && (
                                            <span className="text-[9px] text-[var(--color-emerald-custom)] font-bold opacity-80 mt-1">
                                                +{module.credits} CR
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            
            {/* Tabs */}
            <div className="flex bg-white/5 p-1 rounded-xl gap-1">
                {(['S1', 'S2', 'ANNUEL'] as TabType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                            "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all",
                            activeTab === tab 
                                ? "bg-[var(--color-ind-blue)] text-white shadow-lg" 
                                : "text-gray-400 hover:text-white hover:bg-white/10"
                        )}
                    >
                        {tab === 'ANNUEL' ? 'Générale' : `Semestre ${tab.replace('S', '')}`}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'S1' && (
                    <motion.div key="s1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                        {renderModules(MODULES_S1, s1Results.moduleResults)}
                        <div className="mt-6">
                            <ResultDisplay
                                average={s1Results.semesterAverage}
                                isValidated={s1Results.isValidated}
                                totalCredits={s1Results.finalCredits}
                            />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'S2' && (
                    <motion.div key="s2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                        {renderModules(MODULES_S2, s2Results.moduleResults)}
                        <div className="mt-6">
                            <ResultDisplay
                                average={s2Results.semesterAverage}
                                isValidated={s2Results.isValidated}
                                totalCredits={s2Results.finalCredits}
                            />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'ANNUEL' && (
                    <motion.div key="annuel" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6">
                        <Card className="p-8 text-center flex flex-col items-center justify-center space-y-6 bg-gradient-to-br from-white/5 to-white/10">
                            <div>
                                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Moyenne Générale</p>
                                <div className={clsx(
                                    "text-6xl font-black",
                                    isAnnuallyValidated ? "text-[var(--color-emerald-custom)] drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]" : "text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.3)]"
                                )}>
                                    {annualAverage.toFixed(2)}
                                </div>
                            </div>

                            <div className="flex gap-8 w-full max-w-xs justify-center pt-4 border-t border-white/10">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-1">Semestre 1</p>
                                    <p className="font-bold text-lg">{s1Results.semesterAverage.toFixed(2)}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-1">Semestre 2</p>
                                    <p className="font-bold text-lg">{s2Results.semesterAverage.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col items-center">
                                {isAnnuallyValidated ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                        <span className="text-5xl mb-2">🎉🎓</span>
                                        <h2 className="text-2xl font-bold text-emerald-400">Admis</h2>
                                        <p className="text-emerald-500/70 text-sm mt-1">Félicitations pour votre réussite !</p>
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                                        <span className="text-5xl mb-2">🔄💪</span>
                                        <h2 className="text-2xl font-bold text-red-400">Ajourné</h2>
                                        <p className="text-red-400/70 text-sm mt-1">Courage pour la session de rattrapage.</p>
                                    </motion.div>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col items-center gap-3 pt-6 pb-12">
                <button
                    onClick={() => {
                        if (confirm("Voulez-vous vraiment effacer toutes les notes ?")) {
                            setGrades({});
                        }
                    }}
                    className="text-xs text-red-500/50 hover:text-red-500 transition-colors uppercase tracking-widest font-medium"
                >
                    Réinitialiser tout
                </button>
            </div>
        </div>
    );
}

