"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useSplitGroup } from "@/contexts/SplitGroupContext";
import Link from "next/link";
import { SplitGroupCard } from "@/components/SplitGroupCard";

export default function SplitGroupListPage() {
  const { splitGroups } = useSplitGroup();

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header com botão voltar */}
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Meus Grupos</h1>
            <Link href="/split-group/create">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Criar Novo Grupo
              </Button>
            </Link>
          </div>
        </div>

        {/* Lista de grupos */}
        {splitGroups.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">
              Você ainda não criou nenhum grupo.
            </p>
            <Link href="/split-group/create">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Criar Primeiro Grupo
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {splitGroups.map((group) => (
              <SplitGroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
