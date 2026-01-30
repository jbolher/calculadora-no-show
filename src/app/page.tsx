"use client";

import { RoiCalculator } from "@/components/roi-calculator/roi-calculator";

export default function RoiCalculatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <RoiCalculator />
      </div>
    </div>
  );
}