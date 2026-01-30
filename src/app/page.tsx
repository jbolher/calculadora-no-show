import Link from "next/link";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-primary">Bienvenido</h1>
        <p className="text-lg text-muted-foreground">
          Esta es una página en blanco. Puedes empezar a construir tu aplicación aquí.
        </p>
        <Link href="/roi-calculator" passHref>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Ir a la Calculadora de ROI
          </Button>
        </Link>
      </main>
      <MadeWithDyad />
    </div>
  );
}