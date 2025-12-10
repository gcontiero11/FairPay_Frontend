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
  id: string;
  groupName: string;
  maxPeople: number;
  date: {
    isRange: boolean;
    single?: string;
    start?: string;
    end?: string;
  };
  expenses: Expense[];
  createdAt: string;
}

interface SplitGroupContextType {
  splitGroups: SplitGroup[];
  addSplitGroup: (group: Omit<SplitGroup, "id" | "createdAt">) => string;
  getSplitGroupById: (id: string) => SplitGroup | undefined;
  addExpenseToGroup: (groupId: string, expense: Expense) => void;
  deleteSplitGroup: (id: string) => void;
}

const SplitGroupContext = createContext<SplitGroupContextType | undefined>(
  undefined
);

export function SplitGroupProvider({ children }: { children: ReactNode }) {
  const [splitGroups, setSplitGroups] = useState<SplitGroup[]>([]);

  const addSplitGroup = (group: Omit<SplitGroup, "id" | "createdAt">) => {
    const newGroup: SplitGroup = {
      ...group,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
    };
    setSplitGroups((prev) => [...prev, newGroup]);
    return newGroup.id;
  };

  const getSplitGroupById = (id: string) => {
    return splitGroups.find((group) => group.id === id);
  };

  const addExpenseToGroup = (groupId: string, expense: Expense) => {
    setSplitGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? { ...group, expenses: [expense, ...group.expenses] }
          : group
      )
    );
  };

  const deleteSplitGroup = (id: string) => {
    setSplitGroups((prev) => prev.filter((group) => group.id !== id));
  };

  return (
    <SplitGroupContext.Provider
      value={{
        splitGroups,
        addSplitGroup,
        getSplitGroupById,
        addExpenseToGroup,
        deleteSplitGroup,
      }}
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
