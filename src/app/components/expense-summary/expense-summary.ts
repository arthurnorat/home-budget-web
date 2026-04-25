import { Component, input, computed } from '@angular/core';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.html',
  styleUrl: './expense-summary.css',
})
export class ExpenseSummary {
  expenses = input.required<Expense[]>();

  total = computed(() =>
    this.expenses().reduce((sum, e) => sum + e.amount, 0)
  );

  totalFixed = computed(() =>
    this.expenses()
      .filter(e => e.category === 'FIXED')
      .reduce((sum, e) => sum + e.amount, 0)
  );

  totalVariable = computed(() =>
    this.expenses()
      .filter(e => e.category === 'VARIABLE')
      .reduce((sum, e) => sum + e.amount, 0)
  );

  formatCents(cents: number): string {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
