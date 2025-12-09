"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ExpenseType } from "@/services/expenseType";

export interface Expense {
  name: string;
  description: string;
  amount: number;
  expenseType: ExpenseType;
}

export interface SplitGroup {
  groupName: string;
  maxPeople: number;
  date: {
    isRange: boolean;
    single?: string;
    start?: string;
    end?: string;
  };
  expenses: Expense[];
}

interface SplitGroupContextType {
  splitGroup: SplitGroup | null;
  setSplitGroup: (group: SplitGroup) => void;
  addExpense: (expense: Expense) => void;
  clearGroup: () => void;
}

const SplitGroupContext = createContext<SplitGroupContextType | undefined>(
  undefined
);

export function SplitGroupProvider({ children }: { children: ReactNode }) {
  const [splitGroup, setSplitGroupState] = useState<SplitGroup | null>(null);

  const setSplitGroup = (group: SplitGroup) => {
    setSplitGroupState(group);
  };

  const addExpense = (expense: Expense) => {
    if (!splitGroup) return;
    setSplitGroupState({
      ...splitGroup,
      expenses: [expense, ...splitGroup.expenses],
    });
  };

  const clearGroup = () => {
    setSplitGroupState(null);
  };

  return (
    <SplitGroupContext.Provider
      value={{ splitGroup, setSplitGroup, addExpense, clearGroup }}
    >
      {children}
    </SplitGroupContext.Provider>
  );
}

export function useSplitGroup() {
  const context = useContext(SplitGroupContext);
  if (context === undefined) {
    throw new Error("useSplitGroup must be used within a SplitGroupProvider");
  }
  return context;
}
