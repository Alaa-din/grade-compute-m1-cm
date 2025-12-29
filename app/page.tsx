"use client";

import Background from "@/components/Background";
import Calculator from "@/components/Calculator";
import ContributionPopup from "@/components/ContributionPopup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <Background />
      <ContributionPopup />

      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center z-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-white">
          <span className="text-[var(--color-ind-blue)]">Grade</span> Compute
        </h1>
        <p className="text-[var(--color-mech-gray)] uppercase tracking-wider text-sm sm:text-base font-medium">
          M1 Construction Mécanique
        </p>
      </header>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 z-10 pb-20">
        <Calculator />
      </div>

      <Footer />
    </main>
  );
}
