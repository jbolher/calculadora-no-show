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

const formSchema = z.object({
  scheduledCalls: z.coerce
    .number()
    .min(0, { message: "El número de llamadas no puede ser negativo." }),
  currentNoShowRate: z.coerce
    .number()
    .min(0, { message: "La tasa de no-show no puede ser negativa." })
    .max(100, { message: "La tasa de no-show no puede exceder el 100%." }),
  currentCloseRate: z.coerce
    .number()
    .min(0, { message: "La tasa de cierre no puede ser negativa." })
    .max(100, { message: "La tasa de cierre no puede exceder el 100%." }),
  averageTicket: z.coerce
    .number()
    .min(0, { message: "El ticket medio no puede ser negativo." }),
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

  // Updated scenarios as requested
  const conservativeScenario = calculateScenario(0.20); // 20% reduction
  const mediumScenario = calculateScenario(0.40); // 40% reduction
  const optimisticScenario = calculateScenario(0.80); // 80% reduction

  const currentMonthlyRevenue = scheduledCalls * (1 - currentNoShowRate) * currentCloseRate * averageTicket;
  const mediumScenarioMonthlyRevenue = currentMonthlyRevenue + mediumScenario.extraMonthlyRevenue;
  const potentialRevenueAtZeroNoShow = scheduledCalls * currentCloseRate * averageTicket;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Sidebar-like Input Section */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="bg-card text-card-foreground shadow-lg border-border sticky top-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-primary">Calculadora de No Show</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="scheduledCalls"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">Llamadas/mes</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                          className="h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentNoShowRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">No Show actual (%)</FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(val) => field.onChange(val[0])}
                        />
                      </FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                        className="h-9 mt-1"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentCloseRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">Cierre actual (%)</FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(val) => field.onChange(val[0])}
                        />
                      </FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                        className="h-9 mt-1"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="averageTicket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">Ticket Medio (€)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                          className="h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
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
  );
}