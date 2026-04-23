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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoiResults } from "./roi-results";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const formSchema = z.object({
  scheduledCalls: z.coerce.number().min(0),
  currentNoShowRate: z.coerce.number().min(0).max(100),
  currentCloseRate: z.coerce.number().min(0).max(100),
  averageTicket: z.coerce.number().min(0),
});

export function RoiCalculator() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scheduledCalls: 100,
      currentNoShowRate: 50,
      currentCloseRate: 20,
      averageTicket: 1000,
    },
  });

  const { watch } = form;
  const values = watch();

  const scheduledCalls = values.scheduledCalls || 0;
  const currentNoShowRate = values.currentNoShowRate / 100 || 0;
  const currentCloseRate = values.currentCloseRate / 100 || 0;
  const averageTicket = values.averageTicket || 0;

  const lostCalls = scheduledCalls * currentNoShowRate;
  const moneyLostMonthly = lostCalls * currentCloseRate * averageTicket;

  const calculateScenario = (reductionPercentage: number) => {
    const newNoShowRate = currentNoShowRate * (1 - reductionPercentage);
    const recoveredCalls = scheduledCalls * (currentNoShowRate - newNoShowRate);
    const extraMonthlyRevenue = recoveredCalls * currentCloseRate * averageTicket;
    const extraAnnualRevenue = extraMonthlyRevenue * 12;
    return { extraMonthlyRevenue, extraAnnualRevenue };
  };

  const conservativeScenario = calculateScenario(0.20);
  const mediumScenario = calculateScenario(0.40);
  const optimisticScenario = calculateScenario(0.80);

  const currentMonthlyRevenue = scheduledCalls * (1 - currentNoShowRate) * currentCloseRate * averageTicket;
  const mediumScenarioMonthlyRevenue = currentMonthlyRevenue + mediumScenario.extraMonthlyRevenue;
  const potentialRevenueAtZeroNoShow = scheduledCalls * currentCloseRate * averageTicket;

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4">
          <Card className="bg-card shadow-xl border-border sticky top-8">
            <CardHeader className="py-4">
              <CardTitle className="text-lg font-bold text-primary">Configuración</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form className="space-y-3">
                  <FormField
                    control={form.control}
                    name="scheduledCalls"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <div className="flex items-center gap-1">
                          <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">Llamadas/mes</FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild><Info size={12} className="text-muted-foreground cursor-help" /></TooltipTrigger>
                            <TooltipContent><p>Total de llamadas agendadas en tu calendario mensualmente.</p></TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl><Input type="number" {...field} className="h-8 text-sm" /></FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentNoShowRate"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <div className="flex items-center gap-1">
                          <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">No Show (%)</FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild><Info size={12} className="text-muted-foreground cursor-help" /></TooltipTrigger>
                            <TooltipContent><p>Porcentaje de personas que no aparecen en la llamada.</p></TooltipContent>
                          </Tooltip>
                        </div>
                        <Slider min={0} max={100} step={1} value={[field.value]} onValueChange={(val) => field.onChange(val[0])} className="py-2" />
                        <Input type="number" {...field} className="h-8 text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentCloseRate"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <div className="flex items-center gap-1">
                          <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">Cierre (%)</FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild><Info size={12} className="text-muted-foreground cursor-help" /></TooltipTrigger>
                            <TooltipContent><p>Porcentaje de llamadas realizadas que terminan en venta.</p></TooltipContent>
                          </Tooltip>
                        </div>
                        <Slider min={0} max={100} step={1} value={[field.value]} onValueChange={(val) => field.onChange(val[0])} className="py-2" />
                        <Input type="number" {...field} className="h-8 text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="averageTicket"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <div className="flex items-center gap-1">
                          <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">Ticket Medio (€)</FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild><Info size={12} className="text-muted-foreground cursor-help" /></TooltipTrigger>
                            <TooltipContent><p>Valor promedio de cada venta realizada.</p></TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl><Input type="number" {...field} className="h-8 text-sm" /></FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <RoiResults
            moneyLostMonthly={moneyLostMonthly}
            conservativeScenario={conservativeScenario}
            mediumScenario={mediumScenario}
            optimisticScenario={optimisticScenario}
            currentMonthlyRevenue={currentMonthlyRevenue}
            mediumScenarioMonthlyRevenue={mediumScenarioMonthlyRevenue}
            potentialRevenueAtZeroNoShow={potentialRevenueAtZeroNoShow}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}