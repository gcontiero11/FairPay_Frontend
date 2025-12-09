"use client";

import { useState } from "react";
import { ExpenseCard, ExpenseCardProps } from "@/components/expense";
import { ExpenseType } from "@/services/expenseType";
import { Button } from "@/components/ui/button";
import ExpenseFormModal from "@/components/expenseFormModal";

const INITIAL_EXPENSES: ExpenseCardProps[] = [
  {
    name: "Aluguel do Apartamento",
    description: "Pagamento mensal do aluguel de Novembro.",
    amount: 2500.0,
    expenseType: ExpenseType.ACCOMMODATION,
    className: "",
  },
  {
    name: "Conta de Luz",
    description: "Consumo do mês de Outubro/2025.",
    amount: 185.5,
    expenseType: ExpenseType.TRANSPORT,
    className: "",
  },
  {
    name: "Supermercado",
    description: "Compras da semana (carnes, legumes e itens de limpeza).",
    amount: 320.75,
    expenseType: ExpenseType.FOOD,
    className: "",
  },
];

export default function HomePage() {
  const [expenses, setExpenses] =
    useState<ExpenseCardProps[]>(INITIAL_EXPENSES);
  const [opened, setOpened] = useState(false);

  function handleCreate(data: {
    name: string;
    description: string;
    amount: number;
    expenseType: ExpenseType;
  }) {
    const newExpense: ExpenseCardProps = {
      ...data,
    };
    setExpenses((expenses) => [newExpense, ...expenses]);
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-8">
        Resumo das Despesas
      </h1>

      <div className="flex justify-end gap-2 mb-6">
        <Button onClick={() => setOpened(true)}>Adicionar Despesa</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenses.map((exp, index) => (
          <ExpenseCard key={index} {...exp} />
        ))}
      </div>

      <ExpenseFormModal
        opened={opened}
        onClose={() => setOpened(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
