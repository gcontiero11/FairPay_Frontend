"use client";

import { useState } from "react";
import { ExpenseCard, ExpenseCardProps } from "@/components/expense";
import { ExpenseType } from "@/services/expenseType";
import {
  Container,
  Title,
  SimpleGrid,
  Button,
  ActionIcon,
} from "@mantine/core";
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
    <Container size="lg" py="xl">
      <Title order={1} mb="xl" ta="center">
        📈 Resumo das Despesas
      </Title>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <Button onClick={() => setOpened(true)}>Adicionar Despesa</Button>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
        {expenses.map((exp, index) => (
          <ExpenseCard key={index} {...exp} />
        ))}
      </SimpleGrid>

      <ExpenseFormModal
        opened={opened}
        onClose={() => setOpened(false)}
        onCreate={handleCreate}
      />
    </Container>
  );
}
