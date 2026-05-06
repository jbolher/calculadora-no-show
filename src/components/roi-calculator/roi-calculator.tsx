"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { NoShowCalculator } from "./no-show-calculator";
import { LeadsCalculator } from "./leads-calculator";
import { ArrowRight } from "lucide-react";
import { BookingModal } from "./booking-modal";

export function RoiCalculator() {
  return (
    <Tabs defaultValue="noshow" className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <TabsList className="w-full md:w-auto max-w-md bg-background/50 p-1 rounded-2xl border border-border/20">
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
        <BookingModal>
          <Button
            size="lg"
            className="h-12 px-6 rounded-2xl bg-[#2F2B2B] hover:bg-[#2F2B2B]/90 text-[#FDFDF0] font-bold text-sm shadow-lg shadow-[#2F2B2B]/20 group transition-all duration-300 shrink-0"
          >
            <span>Agendar llamada</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={16} />
          </Button>
        </BookingModal>
      </div>
      <TabsContent value="noshow" className="mt-0">
        <NoShowCalculator />
      </TabsContent>
      <TabsContent value="leads" className="mt-0">
        <LeadsCalculator />
      </TabsContent>
    </Tabs>
  );
}