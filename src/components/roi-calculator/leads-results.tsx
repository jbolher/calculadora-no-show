"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShieldCheck, Wallet, Rocket } from "lucide-react";
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
    if (!mounted) return `${Math.round(value)}€`;
    return Math.round(value).toLocaleString("es-ES") + "€";
  };

  const formatNumber = (value: number) => {
    if (!mounted) return `${Math.round(value)}`;
    return Math.round(value).toLocaleString("es-ES");
  };

  const formatPercent = (value: number) => {
    return (value * 100).toFixed(1).replace(".", ",") + "%";
  };

  const tableData = [
    {
      metric: "Booking rate",
      actual: formatPercent(booking_rate_actual),
      base: formatPercent(baseScenario.booking_mejorado),
      medio: formatPercent(medioScenario.booking_mejorado),
      optimista: formatPercent(optimistaScenario.booking_mejorado),
    },
    {
      metric: "Llamadas agendadas",
      actual: formatNumber(llamadas_agendadas),
      base: formatNumber(baseScenario.agendados_mejorados),
      medio: formatNumber(medioScenario.agendados_mejorados),
      optimista: formatNumber(optimistaScenario.agendados_mejorados),
    },
    {
      metric: "Se presentan",
      actual: formatNumber(presentados_actuales),
      base: formatNumber(baseScenario.presentados_mejorados),
      medio: formatNumber(medioScenario.presentados_mejorados),
      optimista: formatNumber(optimistaScenario.presentados_mejorados),
    },
    {
      metric: "Cierres",
      actual: formatNumber(cierres_actuales),
      base: formatNumber(baseScenario.cierres_mejorados),
      medio: formatNumber(medioScenario.cierres_mejorados),
      optimista: formatNumber(optimistaScenario.cierres_mejorados),
    },
    {
      metric: "Ingresos/mes",
      actual: formatCurrency(ingresos_actuales),
      base: formatCurrency(baseScenario.ingresos_mejorados),
      medio: formatCurrency(medioScenario.ingresos_mejorados),
      optimista: formatCurrency(optimistaScenario.ingresos_mejorados),
    },
    {
      metric: "Diferencia",
      actual: "—",
      base: "+" + formatCurrency(baseScenario.beneficio),
      medio: "+" + formatCurrency(medioScenario.beneficio),
      optimista: "+" + formatCurrency(optimistaScenario.beneficio),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Bloque A — Situación actual */}
      <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-foreground">
              Actualmente, de <span className="font-bold">{formatNumber(leads_mensuales)}</span> leads que entran al mes, agendáis <span className="font-bold">{formatNumber(llamadas_agendadas)}</span> llamadas.
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              Con un <span className="font-bold">{noshow}%</span> de no-show, se presentan realmente <span className="font-bold">{formatNumber(presentados_actuales)}</span>.
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              Eso son <span className="font-bold">{formatNumber(cierres_actuales)}</span> cierres al mes × <span className="font-bold">{formatCurrency(ticket)}</span> = <span className="font-bold">{formatCurrency(ingresos_actuales)}</span>/mes de ingresos actuales.
            </p>
          </div>
          <div className="pt-4 border-t border-border/20">
            <p className="text-sm font-bold text-[#B53032]">
              Estás dejando de ingresar entre {formatCurrency(baseScenario.beneficio)} y {formatCurrency(optimistaScenario.beneficio)} al mes por no optimizar tu captación y tu asistencia.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bloque B — Tabla comparativa */}
      <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
            Impacto operativo mensual
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/20 hover:bg-transparent">
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Métrica</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actual</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#5F8649] text-right">Esc. Base (+30%)</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#345D36] text-right">Esc. Medio (+42,5%)</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-[#2F2B2B] text-right">Esc. Optimista (+55%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, i) => (
                  <TableRow key={i} className="border-border/10 hover:bg-primary/5">
                    <TableCell className="text-sm font-medium text-foreground">{row.metric}</TableCell>
                    <TableCell className="text-sm text-right text-muted-foreground">{row.actual}</TableCell>
                    <TableCell className="text-sm text-right font-medium text-[#5F8649]">{row.base}</TableCell>
                    <TableCell className="text-sm text-right font-medium text-[#345D36]">{row.medio}</TableCell>
                    <TableCell className="text-sm text-right font-medium text-[#2F2B2B]">{row.optimista}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Bloque C — Tres escenarios */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 px-2">
          Escenarios de mejora
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              label: "Base", 
              factor: "+30%", 
              booking: baseScenario.booking_mejorado, 
              beneficio: baseScenario.beneficio, 
              icon: ShieldCheck, 
              color: "text-[#5F8649]", 
              bg: "bg-[#5F8649]/10"
            },
            { 
              label: "Medio", 
              factor: "+42,5%", 
              booking: medioScenario.booking_mejorado, 
              beneficio: medioScenario.beneficio, 
              icon: Wallet, 
              color: "text-[#345D36]", 
              bg: "bg-[#345D36]/10"
            },
            { 
              label: "Optimista", 
              factor: "+55%", 
              booking: optimistaScenario.booking_mejorado, 
              beneficio: optimistaScenario.beneficio, 
              icon: Rocket, 
              color: "text-[#2F2B2B]", 
              bg: "bg-[#2F2B2B]/10"
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
                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Booking rate</p>
                    <p className="text-lg font-black text-foreground">{formatPercent(s.booking)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Diferencia mensual</p>
                    <p className="text-2xl font-black text-foreground">
                      +<AnimatedNumber value={s.beneficio} formatter={formatCurrency} /><span className="text-sm font-medium text-muted-foreground">/mes</span>
                    </p>
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