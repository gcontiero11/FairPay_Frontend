"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import { SplitGroup } from "@/contexts/SplitGroupContext";

interface SplitGroupCardProps {
  group: SplitGroup;
}

export function SplitGroupCard({ group }: SplitGroupCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dateDisplay = group.date.isRange
    ? `${formatDate(group.date.start!)} - ${formatDate(group.date.end!)}`
    : formatDate(group.date.single!);

  const totalExpenses = group.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalExpenses);

  return (
    <Link href={`/split-group/${group.id}`}>
      <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl">{group.groupName}</CardTitle>
            <Badge variant="secondary">
              {group.expenses.length} despesa
              {group.expenses.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-2 mt-2">
            <Calendar className="h-4 w-4" />
            {dateDisplay}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span className="text-sm">
                Máximo: {group.maxPeople} pessoa
                {group.maxPeople !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-lg font-bold text-green-600">
                  {formattedTotal}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
