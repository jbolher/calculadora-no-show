"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle, Calendar, ArrowRight, ShieldCheck, Zap, Rocket } from "lucide-react";

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
    {
      name: "Actual",
      value: currentMonthlyRevenue,
      color: "#10b981", // Verde (según petición)
    },
    {
      name: "Con IA",
      value: mediumScenarioMonthlyRevenue,
      color: "#ef4444", // Rojo (según petición)
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Alerta de Potencial Perdido (Prioridad Alta) */}
      <Card className="bg-destructive/10 text-card-foreground shadow-md border-destructive/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <AlertCircle size={80} />
        </div>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-destructive" size={20} />
            <h3 className="text-sm font-bold uppercase tracking-wider text-destructive">Fuga de ingresos mensual</h3>
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
            <p className="text-4xl font-black text-destructive">
              {formatCurrency(moneyLostMonthly)}
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              es lo que dejas de ingresar cada mes por los No-Shows.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Comparativa y Recuperación Anual */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="md:col-span-3 bg-card shadow-md border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              Impacto en Facturación
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-primary text-primary-foreground shadow-lg border-none flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Rocket size={120} />
          </div>
          <CardHeader className="pb-0 text-center">
            <CardTitle className="text-sm font-medium opacity-90 uppercase tracking-widest">Recuperación Anual</CardTitle>
          </CardHeader>
          <CardContent className="text-center pt-4">
            <p className="text-3xl font-black">
              {formatCurrency(mediumScenario.extraAnnualRevenue)}
            </p>
            <p className="text-[10px] opacity-80 mt-2 uppercase font-bold">Basado en escenario medio</p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Escenarios de Recuperación */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-tighter text-muted-foreground">Escenarios de recuperación con IA</h3>
          <Badge variant="outline" className="text-[10px] font-normal">Cálculos mensuales</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="bg-card border-emerald-500/20 hover:border-emerald-500/50 transition-colors">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-emerald-500" size={16} />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Conservador (20%)</span>
              </div>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(conservativeScenario.extraMonthlyRevenue)}</p>
              <p className="text-[9px] text-muted-foreground mt-1 leading-tight">Garantizado por contrato.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-blue-500/20 hover:border-blue-500/50 transition-colors">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="text-blue-500" size={16} />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Probable (40%)</span>
              </div>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(mediumScenario.extraMonthlyRevenue)}</p>
              <p className="text-[9px] text-muted-foreground mt-1 leading-tight">Resultado medio esperado.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-purple-500/20 hover:border-purple-500/50 transition-colors">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="text-purple-500" size={16} />
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Optimista (80%)</span>
              </div>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(optimisticScenario.extraMonthlyRevenue)}</p>
              <p className="text-[9px] text-muted-foreground mt-1 leading-tight">Máximo potencial técnico.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. Call to Action */}
      <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-none shadow-xl">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold">¿Quieres recuperar estos ingresos?</h4>
            <p className="text-sm opacity-90">Agenda una demo y te mostramos cómo eliminar los No-Shows.</p>
          </div>
          <Button size="lg" variant="secondary" className="font-bold group">
            Agendar Demo Gratis
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}