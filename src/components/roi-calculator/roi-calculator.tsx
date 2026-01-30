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
import { Separator } from "../ui/separator";

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
      currentNoShowRate: 50, // Default no-show rate
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

  // Calculations
  const lostCalls = scheduledCalls * currentNoShowRate;
  const moneyLostMonthly = lostCalls * currentCloseRate * averageTicket;

  const calculateScenario = (reductionPercentage: number) => {
    const newNoShowRate = currentNoShowRate * (1 - reductionPercentage);
    const recoveredCalls = scheduledCalls * (currentNoShowRate - newNoShowRate);
    const extraMonthlyRevenue = recoveredCalls * currentCloseRate * averageTicket;
    const extraAnnualRevenue = extraMonthlyRevenue * 12;
    return { extraMonthlyRevenue, extraAnnualRevenue };
  };

  const conservativeScenario = calculateScenario(0.10); // 10% reduction in no-show rate
  const mediumScenario = calculateScenario(0.15); // 15% reduction in no-show rate
  const optimisticScenario = calculateScenario(0.20); // 20% reduction in no-show rate

  const currentMonthlyRevenue = scheduledCalls * (1 - currentNoShowRate) * currentCloseRate * averageTicket;
  const mediumScenarioMonthlyRevenue = currentMonthlyRevenue + mediumScenario.extraMonthlyRevenue;

  return (
    <Card className="bg-card text-card-foreground shadow-lg border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Calculadora de ROI</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="scheduledCalls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Número de llamadas agendadas al mes</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                      className="bg-input text-foreground border-border focus-visible:ring-ring"
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
                  <FormLabel className="text-muted-foreground">Tasa de No Show actual (%)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val[0])}
                      className="w-full"
                    />
                  </FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                    className="mt-2 bg-input text-foreground border-border focus-visible:ring-ring"
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
                  <FormLabel className="text-muted-foreground">Tasa de Cierre actual (%)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val[0])}
                      className="w-full"
                    />
                  </FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                    className="mt-2 bg-input text-foreground border-border focus-visible:ring-ring"
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
                  <FormLabel className="text-muted-foreground">Ticket Medio de venta (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                      className="bg-input text-foreground border-border focus-visible:ring-ring"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <Separator className="my-8 bg-border" />

        <RoiResults
          moneyLostMonthly={moneyLostMonthly}
          conservativeScenario={conservativeScenario}
          mediumScenario={mediumScenario}
          optimisticScenario={optimisticScenario}
          currentMonthlyRevenue={currentMonthlyRevenue}
          mediumScenarioMonthlyRevenue={mediumScenarioMonthlyRevenue}
        />
      </CardContent>
    </Card>
  );
}