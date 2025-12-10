"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSplitGroup } from "@/contexts/SplitGroupContext";
import { toast } from "sonner";

export default function CreateSplitGroupPage() {
  const router = useRouter();
  const { addSplitGroup } = useSplitGroup();
  const [groupName, setGroupName] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [isDateRange, setIsDateRange] = useState(false);
  const [singleDate, setSingleDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName || !maxPeople) {
      toast.error("Erro", {
        description: "Preencha todos os campos obrigatórios.",
      });
      return;
    }

    if (!isDateRange && !singleDate) {
      toast.error("Erro", {
        description: "Selecione uma data para o evento.",
      });
      return;
    }

    if (isDateRange && (!startDate || !endDate)) {
      toast.error("Erro", {
        description: "Selecione as datas de início e término.",
      });
      return;
    }

    const groupId = addSplitGroup({
      groupName,
      maxPeople: parseInt(maxPeople),
      date: {
        isRange: isDateRange,
        single: isDateRange ? undefined : singleDate,
        start: isDateRange ? startDate : undefined,
        end: isDateRange ? endDate : undefined,
      },
      expenses: [],
    });

    toast.success("Sucesso", {
      description: "Grupo criado com sucesso!",
    });

    router.push(`/split-group`);
  };
  return (
    <div className="min-h-screen px-4 py-8">
      {/* Botão voltar */}
      <div className="container mx-auto max-w-2xl mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Formulário */}
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Criar Grupo</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome do Grupo */}
          <div className="space-y-2">
            <Label htmlFor="groupName">
              Nome do Grupo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="groupName"
              placeholder="Ex: Viagem para Praia"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>

          {/* Número Máximo de Pessoas */}
          <div className="space-y-2">
            <Label htmlFor="maxPeople">
              Número Máximo de Pessoas <span className="text-red-500">*</span>
            </Label>
            <Input
              id="maxPeople"
              type="number"
              min="2"
              placeholder="Ex: 10"
              value={maxPeople}
              onChange={(e) => setMaxPeople(e.target.value)}
              required
            />
          </div>

          {/* Toggle para tipo de data */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Data do Evento</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {isDateRange
                    ? "Selecionar por dia"
                    : "Selecionar por intervalo"}
                </span>
                <button
                  type="button"
                  onClick={() => setIsDateRange(!isDateRange)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDateRange ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDateRange ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Campo de data única */}
            {!isDateRange && (
              <div className="space-y-2">
                <Label htmlFor="singleDate">Data</Label>
                <Input
                  id="singleDate"
                  type="date"
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Campos de intervalo de datas */}
            {isDateRange && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data de Término</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Botão Submit */}
          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full">
              Criar Grupo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
