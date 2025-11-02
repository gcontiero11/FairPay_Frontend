import { ExpenseCard, ExpenseCardProps } from "@/components/expense";
import { Container, Title, SimpleGrid } from "@mantine/core";

const despesas: ExpenseCardProps[] = [
  {
    name: "Aluguel do Apartamento",
    description: "Pagamento mensal do aluguel de Novembro.",
    amount: 2500.0,
  },
  {
    name: "Conta de Luz",
    description: "Consumo do mês de Outubro/2025.",
    amount: 185.5,
  },
  {
    name: "Supermercado",
    description: "Compras da semana (carnes, legumes e itens de limpeza).",
    amount: 320.75,
  },
];

export default function HomePage() {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl" ta="center">
        📈 Resumo das Despesas
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
        {despesas.map((exp, index) => (
          <ExpenseCard key={index} {...exp} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
