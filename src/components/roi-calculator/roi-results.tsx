"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle, ArrowRight, ShieldCheck, Zap, Rocket } from "lucide-react";

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
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

  const chartData = [
    { name: "Actual", value: currentMonthlyRevenue, color: "#10b981" },
    { name: "Con IA", value: mediumScenarioMonthlyRevenue, color: "#ef4444" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* BLOQUE 1: Comparativa e Ingresos Anuales */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="md:col-span-3 bg-card shadow-md border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
              <TrendingUp size={16} className="text-primary" />
              Comparativa de Ingresos Mensuales
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: "8px" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-primary text-primary-foreground shadow-lg border-none flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10"><Rocket size={120} /></div>
          <CardHeader className="pb-0 text-center">
            <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Dinero recuperado al año</CardTitle>
          </CardHeader>
          <CardContent className="text-center pt-4">
            <p className="text-3xl font-black">{formatCurrency(mediumScenario.extraAnnualRevenue)}</p>
            <p className="text-[9px] opacity-70 mt-2 font-medium">Basado en escenario medio (40%)</p>
          </CardContent>
        </Card>
      </div>

      {/* BLOQUE 2: Recuperación con IA */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Zap size={14} className="text-yellow-500" />
          Escenarios de recuperación con IA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="bg-card border-emerald-500/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="text-emerald-500" size={14} />
                <span className="text-[10px] font-bold uppercase">Conservador (20%)</span>
              </div>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(conservativeScenario.extraMonthlyRevenue)}</p>
              <p className="text-[9px] text-muted-foreground mt-1">Garantizado por contrato.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-blue-500/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-blue-500" size={14} />
                <span className="text-[10px] font-bold uppercase">Probable (40%)</span>
              </div>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(mediumScenario.extraMonthlyRevenue)}</p>
              <p className="text-[9px] text-muted-foreground mt-1">Resultado medio esperado.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-purple-500/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="text-purple-500" size={14} />
                <span className="text-[10px] font-bold uppercase">Optimista (80%)</span>
              </div>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(optimisticScenario.extraMonthlyRevenue)}</p>
              <p className="text-[9px] text-muted-foreground mt-1">Máximo potencial técnico.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* BLOQUE 3: Resultados (Potencial Perdido) */}
      <Card className="bg-destructive/5 border-destructive/20 overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-destructive" size={18} />
            <h3 className="text-sm font-bold uppercase tracking-wider text-destructive">Resultados: Potencial perdido</h3>
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
            <p className="text-4xl font-black text-destructive">{formatCurrency(moneyLostMonthly)}</p>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">es lo que dejas de ingresar cada mes por los No-Shows.</p>
              <p className="text-[10px] text-muted-foreground italic">
                Potencial total si el No-Show fuera 0%: <span className="font-bold text-primary">{formatCurrency(potentialRevenueAtZeroNoShow)}/mes</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Final */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none shadow-xl">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold">¿Quieres recuperar estos ingresos?</h4>
            <p className="text-xs opacity-90">Agenda una demo y te mostramos cómo eliminar los No-Shows.</p>
          </div>
          <Button size="lg" variant="secondary" className="font-bold group w-full md:w-auto">
            Agendar Demo Gratis
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}