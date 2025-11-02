export enum ExpenseType {
  FOOD = 'food',
  TRANSPORT = 'transport',
  ACCOMMODATION = 'accommodation',
  ENTERTAINMENT = 'entertainment',
  UTILITIES = 'utilities',
  GROCERIES = 'groceries',
  OTHER = 'other',
}

export type ExpenseTypeBadgeData = {
  label: string;
  color: string; // Mantine color keyword
};

const MAP: Record<ExpenseType, ExpenseTypeBadgeData> = {
  [ExpenseType.FOOD]: { label: 'Alimentação', color: 'red' },
  [ExpenseType.TRANSPORT]: { label: 'Transporte', color: 'blue' },
  [ExpenseType.ACCOMMODATION]: { label: 'Acomodação', color: 'teal' },
  [ExpenseType.ENTERTAINMENT]: { label: 'Entretenimento', color: 'violet' },
  [ExpenseType.UTILITIES]: { label: 'Contas', color: 'gray' },
  [ExpenseType.GROCERIES]: { label: 'Supermercado', color: 'green' },
  [ExpenseType.OTHER]: { label: 'Outro', color: 'dark' },
};

export function getExpenseTypeBadgeData(
  type?: ExpenseType
): ExpenseTypeBadgeData {
  if (!type) return MAP[ExpenseType.OTHER];
  return MAP[type] ?? MAP[ExpenseType.OTHER];
}
