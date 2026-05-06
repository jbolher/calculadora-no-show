"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadsResults } from "./leads-results";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, ArrowRight } from "lucide-react";

const formSchema = z.object({
  leads_mensuales: z.coerce.number().min(0),
  llamadas_agendadas: z.coerce.number().min(0),
  noshow: z.coerce.number().min(0).max(100),
  ticket: z.coerce.number().min(0),
  cierre: z.coerce.number().min(0).max(100),
});

const demoUrl = "https://vsl.bolherconsulting.com/vsl-1?utm_medium=leadmagnet&utm_content=calculadora-noshow";

export function LeadsCalculator() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leads_mensuales: 300,
      llamadas_agendadas: 45,
      noshow: 40,
      ticket: 2000,
      cierre: 20,
    },
  });

  const { watch } = form;
  const values = watch();

  const leads_mensuales = values.leads_mensuales || 0;
  const llamadas_agendadas = values.llamadas_agendadas || 0;
  const noshow_decimal = (values.noshow || 0) / 100;
  const ticket = values.ticket || 0;
  const cierre_decimal = (values.cierre || 0) / 100;

  const isValid = leads_mensuales > 0 && llamadas_agendadas > 0 && ticket > 0 && (values.cierre || 0) > 0 && (values.noshow || 0) > 0;

  const booking_rate_actual = leads_mensuales > 0 ? llamadas_agendadas / leads_mensuales : 0;
  const presentados_actuales = llamadas_agendadas * (1 - noshow_decimal);
  const cierres_actuales = presentados_actuales * cierre_decimal;
  const ingresos_actuales = cierres_actuales * ticket;

  const calculateScenario = (factor: number) => {
    const booking_mejorado = booking_rate_actual * factor;
    const agendados_mejorados = leads_mensuales * booking_mejorado;
    const noshow_mejorado = noshow_decimal * (1 - 0.20);
    const presentados_mejorados = agendados_mejorados * (1 - noshow_mejorado);
    const cierres_mejorados = presentados_mejorados * cierre_decimal;
    const ingresos_mejorados = cierres_mejorados * ticket;
    const beneficio = ingresos_mejorados - ingresos_actuales;
    return {
      booking_mejorado,
      agendados_mejorados,
      presentados_mejorados,
      cierres_mejorados,
      ingresos_mejorados,
      beneficio,
    };
  };

  const baseScenario = calculateScenario(1.30);
  const medioScenario = calculateScenario(1.425);
  const optimistaScenario = calculateScenario(1.55);

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <Card className="bg-background shadow-2xl border-none rounded-3xl sticky top-8">
            <CardHeader className="pb-2 pt-8 px-8">
              <CardTitle className="text-xl font-bold text-foreground/80">Datos de tu negocio</CardTitle>
              <p className="text-xs text-muted-foreground">Haz más con lo que ya tienes</p>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-8">
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="leads_mensuales"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Leads al mes</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild><Info size={14} className="text-muted-foreground/50 cursor-help" /></TooltipTrigger>
                              <TooltipContent><p>Total de leads nuevos que entran mensualmente.</p></TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="h-12 bg-background border-none shadow-inner rounded-xl text-base font-medium focus-visible:ring-[#345D36]/20"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="llamadas_agendadas"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Llamadas agendadas/mes</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild><Info size={14} className="text-muted-foreground/50 cursor-help" /></TooltipTrigger>
                              <TooltipContent><p>Cuántas llamadas consigues agendar al mes.</p></TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="h-12 bg-background border-none shadow-inner rounded-xl text-base font-medium focus-visible:ring-[#345D36]/20"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="noshow"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">No Show (%)</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild><Info size={14} className="text-muted-foreground/50 cursor-help" /></TooltipTrigger>
                              <TooltipContent><p>Porcentaje de personas que no aparecen a la llamada.</p></TooltipContent>
                            </Tooltip>
                          </div>
                          <span className="text-sm font-bold text-[#345D36]">{field.value}%</span>
                        </div>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(val) => field.onChange(val[0])}
                          className="py-4"
                          rangeClassName="bg-[#345D36]"
                          thumbClassName="border-[#345D36]/50"
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ticket"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ticket Medio (€)</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild><Info size={14} className="text-muted-foreground/50 cursor-help" /></TooltipTrigger>
                              <TooltipContent><p>Valor promedio de cada venta.</p></TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="h-12 bg-background border-none shadow-inner rounded-xl text-base font-medium focus-visible:ring-[#345D36]/20"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cierre"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tasa de cierre (%)</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild><Info size={14} className="text-muted-foreground/50 cursor-help" /></TooltipTrigger>
                              <TooltipContent><p>Porcentaje de llamadas presentadas que cierran en venta.</p></TooltipContent>
                            </Tooltip>
                          </div>
                          <span className="text-sm font-bold text-[#345D36]">{field.value}%</span>
                        </div>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(val) => field.onChange(val[0])}
                          className="py-4"
                          rangeClassName="bg-[#345D36]"
                          thumbClassName="border-[#345D36]/50"
                        />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <Button
                size="lg"
                className="w-full h-16 rounded-2xl bg-[#2F2B2B] hover:bg-[#2F2B2B]/90 text-[#FDFDF0] font-bold text-lg shadow-lg shadow-[#2F2B2B]/20 group transition-all duration-300"
                onClick={() => window.open(demoUrl, "_blank")}
              >
                <span>Agendar llamada y recuperar ingresos</span>
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          {isValid ? (
            <LeadsResults
              leads_mensuales={leads_mensuales}
              llamadas_agendadas={llamadas_agendadas}
              noshow={values.noshow || 0}
              ticket={ticket}
              cierre={values.cierre || 0}
              booking_rate_actual={booking_rate_actual}
              presentados_actuales={presentados_actuales}
              cierres_actuales={cierres_actuales}
              ingresos_actuales={ingresos_actuales}
              baseScenario={baseScenario}
              medioScenario={medioScenario}
              optimistaScenario={optimistaScenario}
            />
          ) : (
            <Card className="border-none shadow-2xl bg-background rounded-3xl p-12 text-center">
              <p className="text-muted-foreground">Completa todos los campos para ver los resultados</p>
            </Card>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}