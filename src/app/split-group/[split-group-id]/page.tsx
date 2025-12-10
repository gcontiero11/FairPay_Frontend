"use client";

import { useState, useEffect } from "react";
import { ExpenseCard } from "@/components/expense";
import { ExpenseType } from "@/services/expenseType";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Users } from "lucide-react";
import ExpenseFormModal from "@/components/expenseFormModal";
import { useSplitGroup } from "@/contexts/SplitGroupContext";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function SplitGroupDetailPage() {
  const router = useRouter();
  const params = useParams();
  const groupId = params["split-group-id"] as string;
  const { getSplitGroupById, addExpenseToGroup } = useSplitGroup();
  const [opened, setOpened] = useState(false);

  const splitGroup = getSplitGroupById(groupId);

  useEffect(() => {
    if (!splitGroup) {
      router.push("/split-group");
    }
  }, [splitGroup, router]);

  if (!splitGroup) {
    return null;
  }

  function handleCreate(data: {
    name: string;
    description: string;
    amount: number;
    expenseType: ExpenseType;
  }) {
    addExpenseToGroup(groupId, data);
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dateDisplay = splitGroup.date.isRange
    ? `${formatDate(splitGroup.date.start!)} - ${formatDate(
        splitGroup.date.end!
      )}`
    : formatDate(splitGroup.date.single!);

  const totalExpenses = splitGroup.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalExpenses);

  return (
    <div className="min-h-screen px-4 py-8">
      {/* Header com botão voltar */}
      <div className="container mx-auto max-w-7xl mb-8">
        <Link href="/split-group">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        {/* Informações do Grupo */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-4xl font-bold mb-4">{splitGroup.groupName}</h1>
          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Máximo: {splitGroup.maxPeople} pessoas</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{dateDisplay}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-lg">
              <span className="font-semibold">Total de despesas:</span>{" "}
              <span className="text-2xl font-bold text-green-600">
                {formattedTotal}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mb-6">
          <Button onClick={() => setOpened(true)} size="lg">
            Adicionar Despesa
          </Button>
        </div>
      </div>

      {/* Lista de Despesas */}
      <div className="container mx-auto max-w-7xl">
        {splitGroup.expenses.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Nenhuma despesa cadastrada ainda.
            </p>
            <p className="text-gray-400 mt-2">
              Clique em "Adicionar Despesa" para começar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {splitGroup.expenses.map((exp, index) => (
              <ExpenseCard key={index} {...exp} />
            ))}
          </div>
        )}
      </div>

      <ExpenseFormModal
        opened={opened}
        onClose={() => setOpened(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
