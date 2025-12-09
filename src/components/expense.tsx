"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  const badgeData = getExpenseTypeBadgeData(expenseType);

  return (
    <Card className={`${styles.card} ${className ?? ""}`.trim()} tabIndex={0}>
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge
            variant="secondary"
            className={`bg-${badgeData.color}-100 text-${badgeData.color}-800 hover:bg-${badgeData.color}-100`}
          >
            {badgeData.label}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <p className="text-2xl font-bold text-red-600">{formattedAmount}</p>
        </div>
      </CardContent>
    </Card>
  );
}
