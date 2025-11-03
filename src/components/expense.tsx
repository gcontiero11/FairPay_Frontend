"use client";

import {
  Card,
  Text,
  Group,
  Badge,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import styles from "./expense.module.css";
import { ExpenseType, getExpenseTypeBadgeData } from "../services/expenseType";

export interface ExpenseCardProps {
  name: string;
  description: string;
  amount: number;
  expenseType: ExpenseType;
  className?: string;
}

export function ExpenseCard({
  name,
  description,
  amount,
  className,
  expenseType,
}: ExpenseCardProps) {
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
      tabIndex={0}
      className={`${styles.card} ${className ?? ""}`.trim()}
      withBorder
      style={{
        maxWidth: 340,
        borderColor: cardBorderColor,
        // expose Mantine shadow values as CSS custom properties so the CSS module can use them
        ["--mantine-shadow" as any]: theme.shadows.sm,
        ["--mantine-shadow-hover" as any]: theme.shadows.md,
      }}
    >
      <Stack justify="space-between" h="100%">
        <Group justify="space-between" mb="xs">
          <Text fw={700} size="lg">
            {name}
          </Text>
          {/* badge label and color come from the ExpenseType service */}
          <Badge
            color={getExpenseTypeBadgeData(expenseType).color}
            variant="light"
            radius="sm"
          >
            {getExpenseTypeBadgeData(expenseType).label}
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
