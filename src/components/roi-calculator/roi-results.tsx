"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle, ArrowRight, ShieldCheck, Rocket, Wallet } from "lucide-react";
import { AnimatedNumber } from "./animated-number";

interface RoiResultsProps {
  moneyLostMonthly: number;
  conservativeScenario: { extraMonthlyRevenue: number; extraAnnualRevenue: number };
  mediumScenario: { extraMonthlyRevenue: number; extraAnnualRevenue: number };
  optimisticScenario: { extraMonthlyRevenue: number; extraAnnualRevenue: number };
  currentMonthlyRevenue: number;
  mediumScenarioMonthlyRevenue: number;
  potentialRevenueAtZeroNoShow: number;
}

export function RoiResults({
  moneyLostMonthly,
  conservativeScenario,
  mediumScenario,
  optimisticScenario,
  currentMonthlyRevenue,
  mediumScenarioMonthlyRevenue,
  potentialRevenueAtZeroNoShow,
}: RoiResultsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatCurrency = (value: number) => {
    if (!mounted) return `${Math.round(value)} €`;
    return new Intl.NumberFormat("es-ES", { 
      style: "currency", 
      currency: "EUR", 
      maximumFractionDigits: 0 
    }).format(value);
  };

  const chartData = [
    { name: "Actual", value: currentMonthlyRevenue, color: "#B53032" },
    { name: "Con IA", value: mediumScenarioMonthlyRevenue, color: "#345D36" },
  ];

  const demoUrl = "https://vsl.bolherconsulting.com/vsl-1?utm_medium=leadmagnet&utm_content=calculadora-noshow";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Top Row: Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Annual Recovery Widget */}
        <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden group hover:shadow-md transition-all duration-300">
          <CardContent className="p-8 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-[#345D36]/10 text-[#345D36]">
                <Rocket size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recuperación Anual</span>
            </div>
            <div>
              <h3 className="text-4xl font-black text-foreground tracking-tight">
                <AnimatedNumber value={mediumScenario.extraAnnualRevenue} formatter={formatCurrency} />
              </h3>
              <p className="text-sm text-muted-foreground mt-2">Ingresos extra proyectados al año con IA</p>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Loss Widget */}
        <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden group hover:shadow-md transition-all duration-300">
          <CardContent className="p-8 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-[#B53032]/10 text-[#B53032]">
                <AlertCircle size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B53032]/70">Pérdida Mensual</span>
            </div>
            <div>
              <h3 className="text-4xl font-black text-[#B53032] tracking-tight">
                <AnimatedNumber value={moneyLostMonthly} formatter={formatCurrency} />
              </h3>
              <p className="text-sm text-[#B53032]/60 mt-2">Dinero que se escapa por No-Shows cada mes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Widget */}
      <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <TrendingUp size={18} className="text-[#345D36]" />
              Impacto en Facturación Mensual
            </h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="8 8" stroke="hsl(var(--muted-foreground)/0.1)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  tickFormatter={(v) => `${v / 1000}k`} 
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--primary)/0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background p-4 shadow-xl rounded-2xl border border-border/20">
                          <p className="text-xs font-bold text-muted-foreground uppercase mb-1">{payload[0].payload.name}</p>
                          <p className="text-lg font-black text-foreground">{formatCurrency(payload[0].value as number)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Scenarios Grid */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 px-2">
          Escenarios de Recuperación
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Conservador", percentage: "20%", value: conservativeScenario.extraMonthlyRevenue, icon: ShieldCheck, color: "text-[#B53032]", bg: "bg-[#B53032]/5", desc: "Mínimo garantizado" },
            { label: "Probable", percentage: "40%", value: mediumScenario.extraMonthlyRevenue, icon: Wallet, color: "text-[#345D36]", bg: "bg-[#345D36]/10", desc: "Resultado esperado" },
            { label: "Optimista", percentage: "80%", value: optimisticScenario.extraMonthlyRevenue, icon: Rocket, color: "text-[#5F8649]", bg: "bg-[#5F8649]/10", desc: "Máximo potencial" },
          ].map((s, i) => (
            <Card key={i} className="border-none shadow-2xl bg-background rounded-2xl hover:translate-y-[-4px] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${s.bg} ${s.color}`}>
                    <s.icon size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</span>
                    <span className={`text-[10px] font-bold ${s.color}`}>{s.percentage}</span>
                  </div>
                </div>
                <p className="text-2xl font-black text-foreground">
                  <AnimatedNumber value={s.value} formatter={formatCurrency} />
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="pt-4">
        <Button
          size="lg"
          className="w-full h-16 rounded-2xl bg-[#2F2B2B] hover:bg-[#2F2B2B]/90 text-[#FDFDF0] font-bold text-lg shadow-lg shadow-[#2F2B2B]/20 group transition-all duration-300"
          onClick={() => window.open(demoUrl, "_blank")}
        >
          <span>Agendar llamada y recuperar ingresos</span>
          <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
        </Button>
        <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-widest">
          Potencial total al 0% No-Show: <span className="font-bold text-foreground">{formatCurrency(potentialRevenueAtZeroNoShow)}/mes</span>
        </p>
      </div>
    </div>
  );
}