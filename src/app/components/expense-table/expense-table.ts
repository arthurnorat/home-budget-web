import { Component, input, output } from '@angular/core';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.html',
  styleUrl: './expense-table.css',
})
export class ExpenseTable {
  expenses = input.required<Expense[]>();
  deleteExpense = output<string>();

  formatCents(cents: number): string {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  formatDate(iso: string): string {
    const [year, month, day] = iso.split('-');
    return `${day}/${month}/${year}`;
  }

  formatCategory(category: string): string {
    return category === 'FIXED' ? 'Fixo' : 'Variável';
  }

  onDelete(id: string): void {
    this.deleteExpense.emit(id);
  }
}
