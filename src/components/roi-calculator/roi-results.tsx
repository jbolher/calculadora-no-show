"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Separator } from "../ui/separator";

interface RoiResultsProps {
  moneyLostMonthly: number;
  conservativeScenario: { extraMonthlyRevenue: number; extraAnnualRevenue: number };
  mediumScenario: { extraMonthlyRevenue: number; extraAnnualRevenue: number };
  optimisticScenario: { extraMonthlyRevenue: number; extraAnnualRevenue: number };
  currentMonthlyRevenue: number;
  mediumScenarioMonthlyRevenue: number;
  potentialRevenueAtZeroNoShow: number; // New prop
}

export function RoiResults({
  moneyLostMonthly,
  conservativeScenario,
  mediumScenario,
  optimisticScenario,
  currentMonthlyRevenue,
  mediumScenarioMonthlyRevenue,
  potentialRevenueAtZeroNoShow, // Destructure new prop
}: RoiResultsProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

  const chartData = [
    {
      name: "Ingresos Actuales",
      value: currentMonthlyRevenue,
      fill: "hsl(var(--muted-foreground))", // Steel grey
    },
    {
      name: "Ingresos con IA (Escenario Medio)",
      value: mediumScenarioMonthlyRevenue,
      fill: "hsl(var(--primary))", // Navy blue
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-semibold text-primary text-center">Resultados</h2>

      <Card className="bg-card text-card-foreground shadow-md border-border">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Potencial cantidad que se te está escapando</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-destructive mb-2">
            {formatCurrency(moneyLostMonthly)}
          </p>
          <p className="text-lg text-muted-foreground">
            Si se te presentase el 100% estarías ganando aproximadamente{" "}
            <span className="font-semibold text-primary">
              {formatCurrency(potentialRevenueAtZeroNoShow)}
            </span>{" "}
            al mes.
          </p>
        </CardContent>
      </Card>

      <Separator className="bg-border" />

      <h3 className="text-2xl font-semibold text-primary text-center">Recuperación con IA</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card text-card-foreground shadow-md border-border">
          <CardHeader>
            <CardTitle className="text-lg text-primary">
              Escenario Conservador (Reducción del 10% en No Show)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              Mensual: <span className="text-emerald-600">{formatCurrency(conservativeScenario.extraMonthlyRevenue)}</span>
            </p>
            <p className="text-lg">
              Anual: <span className="text-emerald-800">{formatCurrency(conservativeScenario.extraAnnualRevenue)}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground shadow-md border-border">
          <CardHeader>
            <CardTitle className="text-lg text-primary">
              Escenario Medio (Reducción del 15% en No Show)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              Mensual: <span className="text-emerald-600">{formatCurrency(mediumScenario.extraMonthlyRevenue)}</span>
            </p>
            <p className="text-lg">
              Anual: <span className="text-emerald-800">{formatCurrency(mediumScenario.extraAnnualRevenue)}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground shadow-md border-border">
          <CardHeader>
            <CardTitle className="text-lg text-primary">
              Escenario Optimista (Reducción del 20% en No Show)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              Mensual: <span className="text-emerald-600">{formatCurrency(optimisticScenario.extraMonthlyRevenue)}</span>
            </p>
            <p className="text-lg">
              Anual: <span className="text-emerald-800">{formatCurrency(optimisticScenario.extraAnnualRevenue)}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-border" />

      <h3 className="text-2xl font-semibold text-primary text-center">Comparativa de Ingresos Mensuales</h3>
      <Card className="bg-card text-card-foreground shadow-md border-border p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--popover-foreground))",
              }}
              labelStyle={{ color: "hsl(var(--primary))" }}
            />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Separator className="bg-border" />

      <Card className="bg-card text-card-foreground shadow-lg border-border">
        <CardHeader>
          <CardTitle className="text-xl text-primary text-center">Dinero recuperado al año (Escenario Medio)</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-5xl font-extrabold text-primary">
            {formatCurrency(mediumScenario.extraAnnualRevenue)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}