"use client";

import { useEffect, useState } from "react";
import { RoiCalculator } from "@/components/roi-calculator/roi-calculator";

export default function RoiCalculatorPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-16 text-left space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
            Calculadora de Impacto IA
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Calcula tu ROI <span className="text-[#345D36]">Potencial</span>
          </h1>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base leading-relaxed">
            De cada 100 leads, pocos agendan. De los que agendan, muchos no aparecen.
            ¿Sabes cuánto dinero se queda en el camino? Introdúcelo aquí y descúbrelo.
          </p>
        </header>
        
        <RoiCalculator />
        
        <footer className="mt-24 pt-8 border-t border-foreground/5 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            © {mounted ? new Date().getFullYear() : "2025"} Bolher Consulting · Todos los derechos reservados
          </p>
        </footer>
      </div>
    </div>
  );
}