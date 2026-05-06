"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoShowCalculator } from "./no-show-calculator";
import { LeadsCalculator } from "./leads-calculator";

export function RoiCalculator() {
  return (
    <Tabs defaultValue="noshow" className="w-full">
      <TabsList className="w-full max-w-md mx-auto mb-8 bg-background/50 p-1 rounded-2xl border border-border/20">
        <TabsTrigger 
          value="noshow" 
          className="flex-1 rounded-xl text-xs font-bold uppercase tracking-wider data-[state=active]:bg-[#2F2B2B] data-[state=active]:text-[#FDFDF0] data-[state=inactive]:text-muted-foreground transition-all"
        >
          Asistencia
        </TabsTrigger>
        <TabsTrigger 
          value="leads" 
          className="flex-1 rounded-xl text-xs font-bold uppercase tracking-wider data-[state=active]:bg-[#2F2B2B] data-[state=active]:text-[#FDFDF0] data-[state=inactive]:text-muted-foreground transition-all"
        >
          Llamadas Agendadas y Asistencia
        </TabsTrigger>
      </TabsList>
      <TabsContent value="noshow" className="mt-0">
        <NoShowCalculator />
      </TabsContent>
      <TabsContent value="leads" className="mt-0">
        <LeadsCalculator />
      </TabsContent>
    </Tabs>
  );
}