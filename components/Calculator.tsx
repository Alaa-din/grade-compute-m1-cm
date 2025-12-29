"use client";

import { useEffect, useState, useMemo } from "react";
import { MODULES, calculateModuleAverage, TOTAL_COEFFICIENTS, TOTAL_CREDITS } from "@/lib/grades";
import { Input } from "./ui/Input";
import { Card } from "./ui/Card";
import ResultDisplay from "./ResultDisplay";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface ModuleGrades {
    [key: string]: {
        ca?: number;
        exam?: number;
    };
}

export default function Calculator() {
    const [grades, setGrades] = useState<ModuleGrades>({});
    const [isLoaded, setIsLoaded] = useState(false);

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
        // Replace comma with dot for float parsing
        const normalizedValue = value.replace(',', '.');

        // Allow empty string to reset field
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

    const results = useMemo(() => {
        let totalWeightedScore = 0;
        let acquiredCredits = 0;

        const moduleResults = MODULES.map(module => {
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

        const semesterAverage = totalWeightedScore / TOTAL_COEFFICIENTS;

        // If semester average >= 10, all credits are validated (compensation rule usually, 
        // but user said "Affichage optionnel des crédits acquis (si note ≥ 10)". 
        // Usually if Avg >= 10, then Total Credits = 30. 
        // If Avg < 10, then Sum of credits where module >= 10.
        // I will implement "If Avg >= 10, displayed credits = 30, else sum of acquired".

        const finalCredits = semesterAverage >= 10 ? TOTAL_CREDITS : acquiredCredits;

        return {
            moduleResults,
            semesterAverage,
            finalCredits,
            isValidated: semesterAverage >= 10
        };
    }, [grades]);

    if (!isLoaded) return null; // Prevent hydration mismatch

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 gap-4">
                {MODULES.map((module, index) => {
                    const modGrade = results.moduleResults.find(m => m.id === module.id)?.average || 0;
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
                                        <span className="bg-white/5px-1.5 py-0.5 rounded">Coef: {module.coefficient}</span>
                                        <span className="bg-white/5px-1.5 py-0.5 rounded">Crédits: {module.credits}</span>
                                    </div>
                                </div>

                                <div className="flex items-end gap-3 w-full sm:w-auto">
                                    {/* CA Input */}
                                    {module.type !== 'exam_only' && (
                                        <div className="w-20">
                                            <Input
                                                label="CA"
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

                                    {/* Exam Input */}
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

                                    {/* Module Average Badge */}
                                    <div className="flex flex-col items-center justify-end h-full pb-0.5 min-w-[3rem]">
                                        <span className="text-[10px] uppercase text-gray-500 mb-1">Moy.</span>
                                        <span className={clsx(
                                            "font-bold text-lg",
                                            modGrade >= 10 ? "text-[var(--color-emerald-custom)]" : "text-red-400"
                                        )}>
                                            {modGrade.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            <ResultDisplay
                average={results.semesterAverage}
                isValidated={results.isValidated}
                totalCredits={results.finalCredits}
            />
        </div>
    );
}
