import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M1 Construction Mécanique - Calculateur de Moyenne",
  description: "Calculez votre moyenne semestrielle et validez votre semestre.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans dark bg-[var(--background)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
