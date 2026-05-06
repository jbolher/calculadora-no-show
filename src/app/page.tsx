"use client";

import { useEffect, useState } from "react";
import { RoiCalculator } from "@/components/roi-calculator/roi-calculator";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const demoUrl = "https://vsl.bolherconsulting.com/vsl-1?utm_medium=leadmagnet&utm_content=calculadora-noshow";

export default function RoiCalculatorPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-16 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="text-left space-y-4">
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
          </div>
          <Button
            size="lg"
            className="h-14 px-8 rounded-2xl bg-[#2F2B2B] hover:bg-[#2F2B2B]/90 text-[#FDFDF0] font-bold text-base shadow-lg shadow-[#2F2B2B]/20 group transition-all duration-300 shrink-0"
            onClick={() => window.open(demoUrl, "_blank")}
          >
            <span>Agendar llamada</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={18} />
          </Button>
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