export type Category = 'FIXED' | 'VARIABLE';

export interface Expense {
  expenseId: string;
  description: string;
  amount: number;
  date: string;
  category: Category;
  createdAt: string;
}

export interface ExpenseRequest {
  description: string;
  amount: number;
  date: string;
  category: Category;
}
