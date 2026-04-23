"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle, ArrowRight, ShieldCheck, Rocket, Target, Zap } from "lucide-react";

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
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

  const chartData = [
    { name: "Actual", value: currentMonthlyRevenue, color: "#2F2B2B" },
    { name: "Con IA", value: mediumScenarioMonthlyRevenue, color: "#93AC72" },
  ];

  const demoUrl = "https://vsl.bolherconsulting.com/vsl-1?utm_medium=leadmagnet&utm_content=calculadora-noshow";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* BLOQUE 1: Comparativa e Ingresos Anuales */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="md:col-span-3 bg-card shadow-md border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
              <TrendingUp size={14} className="text-[#93AC72]" />
              Proyección de Ingresos Mensuales
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  stroke="#2F2B2B" 
                  fontSize={11} 
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={10} 
                  tickFormatter={(v) => `${v / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  formatter={(v: number) => [formatCurrency(v), "Ingresos"]} 
                  contentStyle={{ 
                    backgroundColor: "#FFFCED", 
                    borderRadius: "12px", 
                    border: "1px solid #2F2B2B10",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                  }} 
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-xl border-none flex flex-col justify-center relative overflow-hidden text-white" style={{ backgroundColor: '#93AC72' }}>
          <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12"><Zap size={160} /></div>
          <CardHeader className="pb-0 text-center relative z-10">
            <CardTitle className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-90">Recuperación Anual Estimada</CardTitle>
          </CardHeader>
          <CardContent className="text-center pt-4 relative z-10">
            <p className="text-4xl font-black tracking-tight">{formatCurrency(mediumScenario.extraAnnualRevenue)}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/20 text-[9px] font-bold uppercase">
              <Target size={10} /> Escenario Probable
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BLOQUE 2: Resultados (Potencial Perdido) - EL DOLOR */}
      <Card className="overflow-hidden border-2" style={{ backgroundColor: '#de656008', borderColor: '#de656020' }}>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-full bg-[#de656015]">
              <AlertCircle style={{ color: '#de6560' }} size={20} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#de6560' }}>Fuga de Ingresos Mensual</h3>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-5xl font-black tracking-tighter" style={{ color: '#de6560' }}>{formatCurrency(moneyLostMonthly)}</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                Dinero que "quemas" cada mes debido a los No-Shows.
              </p>
            </div>
            <div className="bg-white/50 p-3 rounded-lg border border-[#de656010]">
              <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Potencial Máximo (0% No-Show)</p>
              <p className="text-lg font-bold text-[#2F2B2B]">{formatCurrency(potentialRevenueAtZeroNoShow)}<span className="text-[10px] font-normal text-muted-foreground ml-1">/mes</span></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BLOQUE 3: Escenarios de recuperación con IA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Impacto de la IA en tu facturación
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="bg-card border-border/40 hover:border-[#93AC7250] transition-colors">
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-[#93AC72]" size={16} />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Conservador (20%)</span>
              </div>
              <p className="text-2xl font-bold text-[#2F2B2B]">{formatCurrency(conservativeScenario.extraMonthlyRevenue)}</p>
              <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">Mínimo esperado con optimización básica.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-[#93AC7230] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#93AC72] text-white text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase">Recomendado</div>
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="text-[#93AC72]" size={16} fill="#93AC72" />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Probable (40%)</span>
              </div>
              <p className="text-2xl font-bold text-[#93AC72]">{formatCurrency(mediumScenario.extraMonthlyRevenue)}</p>
              <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">Resultado estándar de nuestros clientes.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/40 hover:border-[#93AC7250] transition-colors">
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="text-[#2F2B2B]" size={16} />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Optimista (80%)</span>
              </div>
              <p className="text-2xl font-bold text-[#2F2B2B]">{formatCurrency(optimisticScenario.extraMonthlyRevenue)}</p>
              <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">Máximo potencial con IA avanzada.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Final */}
      <Card className="bg-[#2F2B2B] text-white border-none shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#93AC72]"></div>
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <h4 className="text-xl font-bold tracking-tight">¿Listo para dejar de perder dinero?</h4>
            <p className="text-sm text-white/70 max-w-md">
              Analizamos tu caso particular y te mostramos cómo nuestra IA puede recuperar estos ingresos en menos de 30 días.
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-[#93AC72] hover:bg-[#829a63] text-white font-bold px-8 py-6 text-lg rounded-full group shadow-lg shadow-[#93AC7220] transition-all hover:scale-105"
            onClick={() => window.open(demoUrl, "_blank")}
          >
            Agendar Demo Gratis
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}