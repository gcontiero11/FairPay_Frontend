import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-5xl font-bold text-center mb-8">
        Crie seu grupo FairPay
      </h1>
      <Link href="/split-group">
        <Button
          size="lg"
          className="text-lg px-12 py-6 group transition-all hover:scale-105"
        >
          Continuar
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  );
}
