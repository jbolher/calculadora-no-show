"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

interface BookingModalProps {
  children?: React.ReactNode;
  size?: "default" | "lg";
}

export function BookingModal({ children, size = "default" }: BookingModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            size={size}
            className="h-12 px-6 rounded-2xl bg-[#2F2B2B] hover:bg-[#2F2B2B]/90 text-[#FDFDF0] font-bold text-sm shadow-lg shadow-[#2F2B2B]/20 group transition-all duration-300 shrink-0"
          >
            <span>Agendar llamada</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={16} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 gap-0 bg-background border-none overflow-hidden rounded-3xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Agendar llamada</DialogTitle>
        </DialogHeader>
        <div className="relative w-full">
          <iframe
            src="https://links.bolherconsulting.com/widget/booking/h0EjasjTrhs5xc5MAnla"
            style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "700px" }}
            scrolling="no"
            id="h0EjasjTrhs5xc5MAnla_1778043360115"
            title="Agendar llamada"
          />
        </div>
        <script
          src="https://links.bolherconsulting.com/js/form_embed.js"
          type="text/javascript"
        />
      </DialogContent>
    </Dialog>
  );
}