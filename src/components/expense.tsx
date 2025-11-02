"use client";

import {
  Card,
  Text,
  Group,
  Badge,
  Stack,
  useMantineTheme,
} from "@mantine/core";

export interface ExpenseCardProps {
  name: string;
  description: string;
  amount: number;
}

export function ExpenseCard({ name, description, amount }: ExpenseCardProps) {
  const theme = useMantineTheme();

  const amountColor = theme.colors.red[7];
  const cardBorderColor = theme.colors.gray[3];

  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        maxWidth: 340,
        borderColor: cardBorderColor,
        boxShadow: theme.shadows.sm,
      }}
    >
      <Stack justify="space-between" h="100%">
        <Group justify="space-between" mb="xs">
          <Text fw={700} size="lg">
            {name}
          </Text>
          <Badge color="red" variant="light" radius="sm">
            Despesa
          </Badge>
        </Group>

        <Text
          size="sm"
          c="dimmed"
          style={{ flexGrow: 1, marginBottom: theme.spacing.md }}
        >
          {description}
        </Text>
        <Group justify="flex-end">
          <Text
            size="xl"
            fw={700}
            style={{
              color: amountColor,
              textShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
            }}
          >
            {formattedAmount}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
