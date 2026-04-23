"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";

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
      name: "Ingresos Actuales",
      value: currentMonthlyRevenue,
      color: "#10b981", // Emerald-500 (Green)
    },
    {
      name: "Ingresos con IA",
      value: mediumScenarioMonthlyRevenue,
      color: "#ef4444", // Red-500 (Red)
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Comparativa de Ingresos Mensuales + Dinero recuperado al año */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card text-card-foreground shadow-md border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-primary">Comparativa Mensual</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground shadow-lg border-primary/20 flex flex-col justify-center">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-lg text-primary">Dinero recuperado al año</CardTitle>
            <p className="text-sm text-muted-foreground">(Escenario Medio)</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-extrabold text-primary">
              {formatCurrency(mediumScenario.extraAnnualRevenue)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-border" />

      {/* 2. Recuperación con IA */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Recuperación con IA</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card text-card-foreground shadow-md border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Conservador (20%)</CardTitle>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-[10px]">Garantizado</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-emerald-600">{formatCurrency(conservativeScenario.extraMonthlyRevenue)}/mes</p>
              <p className="text-xs text-muted-foreground">Lo que garantizamos por contrato.</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground shadow-md border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Medio (40%)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-blue-600">{formatCurrency(mediumScenario.extraMonthlyRevenue)}/mes</p>
              <p className="text-xs text-muted-foreground">Escenario probable con optimización.</p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground shadow-md border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Optimista (80%)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-purple-600">{formatCurrency(optimisticScenario.extraMonthlyRevenue)}/mes</p>
              <p className="text-xs text-muted-foreground">Máximo potencial de recuperación.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* 3. Resultados (Potencial perdido) */}
      <Card className="bg-destructive/5 text-card-foreground shadow-md border-destructive/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-destructive">Potencial cantidad que se te está escapando</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-destructive mb-1">
            {formatCurrency(moneyLostMonthly)} <span className="text-sm font-normal">/ mes</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Si se te presentase el 100% estarías ganando aproximadamente{" "}
            <span className="font-semibold text-primary">
              {formatCurrency(potentialRevenueAtZeroNoShow)}
            </span>{" "}
            al mes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}