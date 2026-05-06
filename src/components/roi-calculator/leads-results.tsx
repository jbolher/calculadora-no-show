"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { Rocket, AlertCircle, TrendingUp, ShieldCheck, Wallet, Info, Phone } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AnimatedNumber } from "./animated-number";

interface ScenarioData {
  booking_mejorado: number;
  agendados_mejorados: number;
  presentados_mejorados: number;
  cierres_mejorados: number;
  ingresos_mejorados: number;
  beneficio: number;
}

interface LeadsResultsProps {
  leads_mensuales: number;
  llamadas_agendadas: number;
  noshow: number;
  ticket: number;
  cierre: number;
  booking_rate_actual: number;
  presentados_actuales: number;
  cierres_actuales: number;
  ingresos_actuales: number;
  baseScenario: ScenarioData;
  medioScenario: ScenarioData;
  optimistaScenario: ScenarioData;
}

export function LeadsResults({
  leads_mensuales,
  llamadas_agendadas,
  noshow,
  ticket,
  cierre,
  booking_rate_actual,
  presentados_actuales,
  cierres_actuales,
  ingresos_actuales,
  baseScenario,
  medioScenario,
  optimistaScenario,
}: LeadsResultsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatCurrency = (value: number) => {
    if (!mounted) return `${Math.round(value)} €`;
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    if (!mounted) return `${Math.round(value)}`;
    return Math.round(value).toLocaleString("es-ES");
  };

  const formatPercent = (value: number) => {
    return (value * 100).toFixed(1).replace(".", ",") + "%";
  };

  const extraLlamadasMedio = Math.round(medioScenario.agendados_mejorados - llamadas_agendadas);
  const tasaAsistenciaActual = 100 - noshow;
  const tasaAsistenciaMejorada = 100 - (noshow * 0.8);

  // Datos para el gráfico de volumen (llamadas, presentados, cierres)
  const volumeData = [
    {
      name: "Llamadas agendadas",
      Actual: Math.round(llamadas_agendadas),
      "Base +30%": Math.round(baseScenario.agendados_mejorados),
      "Medio +42,5%": Math.round(medioScenario.agendados_mejorados),
      "Optimista +55%": Math.round(optimistaScenario.agendados_mejorados),
    },
    {
      name: "Se presentan",
      Actual: Math.round(presentados_actuales),
      "Base +30%": Math.round(baseScenario.presentados_mejorados),
      "Medio +42,5%": Math.round(medioScenario.presentados_mejorados),
      "Optimista +55%": Math.round(optimistaScenario.presentados_mejorados),
    },
    {
      name: "Cierres",
      Actual: Math.round(cierres_actuales),
      "Base +30%": Math.round(baseScenario.cierres_mejorados),
      "Medio +42,5%": Math.round(medioScenario.cierres_mejorados),
      "Optimista +55%": Math.round(optimistaScenario.cierres_mejorados),
    },
  ];

  // Datos para el gráfico de ingresos
  const revenueData = [
    {
      name: "Ingresos mensuales",
      Actual: Math.round(ingresos_actuales),
      "Base +30%": Math.round(baseScenario.ingresos_mejorados),
      "Medio +42,5%": Math.round(medioScenario.ingresos_mejorados),
      "Optimista +55%": Math.round(optimistaScenario.ingresos_mejorados),
    },
  ];

  const colors = {
    actual: "#D1D1D1",
    base: "#8BA882",
    medio: "#6B8F62",
    optimista: "#4A6741",
  };

  const legendItems = [
    { label: "Actual", color: colors.actual },
    { label: "Base +30%", color: colors.base },
    { label: "Medio +42,5%", color: colors.medio },
    { label: "Optimista +55%", color: colors.optimista },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-4 shadow-xl rounded-2xl border border-border/20">
          <p className="text-xs font-bold text-muted-foreground uppercase mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-muted-foreground">{entry.name}:</span>
              <span className="text-sm font-bold text-foreground">
                {label === "Ingresos mensuales" ? formatCurrency(entry.value) : formatNumber(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Datos para la tabla de cálculos
  const tableRows = [
    { metric: "Tasa de asistencia", actual: tasaAsistenciaActual, base: tasaAsistenciaMejorada, medio: tasaAsistenciaMejorada, optimista: tasaAsistenciaMejorada, format: "percent" as const },
    { metric: "Llamadas agendadas", actual: Math.round(llamadas_agendadas), base: Math.round(baseScenario.agendados_mejorados), medio: Math.round(medioScenario.agendados_mejorados), optimista: Math.round(optimistaScenario.agendados_mejorados), format: "number" as const },
    { metric: "Se presentan", actual: Math.round(presentados_actuales), base: Math.round(baseScenario.presentados_mejorados), medio: Math.round(medioScenario.presentados_mejorados), optimista: Math.round(optimistaScenario.presentados_mejorados), format: "number" as const },
    { metric: "Cierres", actual: Math.round(cierres_actuales), base: Math.round(baseScenario.cierres_mejorados), medio: Math.round(medioScenario.cierres_mejorados), optimista: Math.round(optimistaScenario.cierres_mejorados), format: "number" as const },
    { metric: "Ingresos mensuales", actual: Math.round(ingresos_actuales), base: Math.round(baseScenario.ingresos_mejorados), medio: Math.round(medioScenario.ingresos_mejorados), optimista: Math.round(optimistaScenario.ingresos_mejorados), format: "currency" as const },
  ];

  const formatTableValue = (value: number, format: string) => {
    if (format === "currency") return formatCurrency(value);
    if (format === "percent") return value.toFixed(1).replace(".", ",") + "%";
    return formatNumber(value);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 1: Tres tarjetas KPI lado a lado
          ═══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjeta KPI 1 — Potencial de mejora mensual */}
        <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden group hover:shadow-md transition-all duration-300">
          <CardContent className="p-8 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="p-4 rounded-2xl bg-[#4A6741]/10 text-[#4A6741]">
                <Rocket size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Ingresos extra al mes
              </span>
            </div>
            <div>
              <h3 className="text-4xl font-black text-foreground tracking-tight">
                +<AnimatedNumber value={medioScenario.beneficio} formatter={formatCurrency} />
              </h3>
              <p className="text-sm text-muted-foreground mt-2 md:mt-3">
                Con captación y asistencia optimizadas
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta KPI 2 — Pérdida por no optimizar */}
        <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden group hover:shadow-md transition-all duration-300">
          <CardContent className="p-8 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="p-4 rounded-2xl bg-[#B53032]/10 text-[#B53032]">
                <AlertCircle size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B53032]/70">
                Dinero que dejas de ganar
              </span>
            </div>
            <div>
              <h3 className="text-4xl font-black text-[#B53032] tracking-tight">
                <AnimatedNumber value={baseScenario.beneficio} formatter={formatCurrency} />
              </h3>
              <p className="text-sm text-[#B53032]/60 mt-2 md:mt-3">
                Mínimo mensual sin optimizar tu funnel
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta KPI 3 — Más llamadas agendadas */}
        <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden group hover:shadow-md transition-all duration-300">
          <CardContent className="p-8 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-5 md:mb-8">
              <div className="p-4 rounded-2xl bg-[#345D36]/10 text-[#345D36]">
                <Phone size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Llamadas con asistencia
              </span>
            </div>
            <div>
              <h3 className="text-4xl font-black text-foreground tracking-tight">
                +<AnimatedNumber value={extraLlamadasMedio} formatter={formatNumber} />
              </h3>
              <p className="text-sm text-muted-foreground mt-2 md:mt-3">
                Más agendadas y mejor asistencia al mes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 2: Gráfico de barras agrupadas
          ═══════════════════════════════════════════════════════ */}
      <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <TrendingUp size={18} className="text-[#4A6741]" />
              Impacto por escenario
            </h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-full hover:bg-muted transition-colors">
                  <Info size={20} className="text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="w-[540px] max-w-[540px] p-0 bg-background border border-[#B53032]/20 shadow-xl rounded-2xl overflow-hidden">
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B53032] mb-3">
                    Desglose de cálculos por escenario
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-[#B53032]/20">
                          <th className="text-left py-2 px-2 font-bold text-[#B53032] uppercase tracking-wider">Métrica</th>
                          <th className="text-right py-2 px-2 font-bold text-muted-foreground uppercase tracking-wider">Actual</th>
                          <th className="text-right py-2 px-2 font-bold text-[#8BA882] uppercase tracking-wider">Base +30%</th>
                          <th className="text-right py-2 px-2 font-bold text-[#6B8F62] uppercase tracking-wider">Medio +42,5%</th>
                          <th className="text-right py-2 px-2 font-bold text-[#4A6741] uppercase tracking-wider">Optimista +55%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-[#B53032]/[0.02]" : ""}>
                            <td className="py-2 px-2 font-medium text-[#B53032]">{row.metric}</td>
                            <td className="text-right py-2 px-2 text-muted-foreground font-mono">
                              {formatTableValue(row.actual, row.format)}
                            </td>
                            <td className="text-right py-2 px-2 text-muted-foreground font-mono">
                              {formatTableValue(row.base, row.format)}
                            </td>
                            <td className="text-right py-2 px-2 text-muted-foreground font-mono">
                              {formatTableValue(row.medio, row.format)}
                            </td>
                            <td className="text-right py-2 px-2 text-muted-foreground font-mono">
                              {formatTableValue(row.optimista, row.format)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#B53032]/10 text-[10px] text-[#B53032]/70">
                    <p>Leads mensuales: {formatNumber(leads_mensuales)} · No Show: {noshow}% · Ticket: {formatCurrency(ticket)} · Cierre: {cierre}%</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Leyenda compartida */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Gráfico de volumen: llamadas, presentados, cierres */}
          <div className="h-[280px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={volumeData}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid
                  strokeDasharray="8 8"
                  stroke="hsl(var(--muted-foreground)/0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 10,
                  }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="Actual"
                  fill={colors.actual}
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="Base +30%"
                  fill={colors.base}
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="Medio +42,5%"
                  fill={colors.medio}
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="Optimista +55%"
                  fill={colors.optimista}
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de ingresos separado por diferencia de escala */}
          <div className="pt-6 border-t border-border/10">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                  barGap={4}
                >
                  <CartesianGrid
                    strokeDasharray="8 8"
                    stroke="hsl(var(--muted-foreground)/0.1)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 10,
                    }}
                    tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="Actual"
                    fill={colors.actual}
                    radius={[8, 8, 0, 0]}
                    maxBarSize={50}
                  />
                  <Bar
                    dataKey="Base +30%"
                    fill={colors.base}
                    radius={[8, 8, 0, 0]}
                    maxBarSize={50}
                  />
                  <Bar
                    dataKey="Medio +42,5%"
                    fill={colors.medio}
                    radius={[8, 8, 0, 0]}
                    maxBarSize={50}
                  />
                  <Bar
                    dataKey="Optimista +55%"
                    fill={colors.optimista}
                    radius={[8, 8, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 3: Escenarios de mejora
          ═══════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 px-2">
          Proyección de ingresos extra
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: "Base",
              factor: "+30%",
              booking: baseScenario.booking_mejorado,
              beneficio: baseScenario.beneficio,
              ingresos: baseScenario.ingresos_mejorados,
              icon: ShieldCheck,
              color: "text-[#5F8649]",
              bg: "bg-[#5F8649]/10",
            },
            {
              label: "Medio",
              factor: "+42,5%",
              booking: medioScenario.booking_mejorado,
              beneficio: medioScenario.beneficio,
              ingresos: medioScenario.ingresos_mejorados,
              icon: Wallet,
              color: "text-[#4A6741]",
              bg: "bg-[#4A6741]/10",
            },
            {
              label: "Optimista",
              factor: "+55%",
              booking: optimistaScenario.booking_mejorado,
              beneficio: optimistaScenario.beneficio,
              ingresos: optimistaScenario.ingresos_mejorados,
              icon: Rocket,
              color: "text-[#2F2B2B]",
              bg: "bg-[#2F2B2B]/10",
            },
          ].map((s, i) => (
            <Card key={i} className="border-none shadow-2xl bg-background rounded-2xl hover:translate-y-[-4px] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${s.bg} ${s.color}`}>
                    <s.icon size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</span>
                    <span className={`text-[10px] font-bold ${s.color}`}>{s.factor}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Booking rate mejorado</p>
                    <p className="text-lg font-black text-foreground">{formatPercent(s.booking)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Tasa de asistencia</p>
                    <p className="text-lg font-black text-foreground">{tasaAsistenciaMejorada.toFixed(1).replace(".", ",")}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ingresos proyectados</p>
                    <p className="text-lg font-black text-foreground">
                      <AnimatedNumber value={s.ingresos} formatter={formatCurrency} />
                      <span className="text-xs font-medium text-muted-foreground">/mes</span>
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/10">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Diferencia mensual</p>
                    <p className="text-2xl font-black text-foreground">+<AnimatedNumber value={s.beneficio} formatter={formatCurrency} /></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}