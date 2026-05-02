import { Component, input, output, signal, computed } from '@angular/core';
import { Expense } from '../../models/expense.model';

type CategoryFilter = 'ALL' | 'FIXED' | 'VARIABLE';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.html',
  styleUrl: './expense-table.css',
})
export class ExpenseTable {
  expenses = input.required<Expense[]>();
  editExpense = output<Expense>();
  deleteExpense = output<string>();
  importFixed = output<void>();

  categoryFilter = signal<CategoryFilter>('VARIABLE');

  filteredExpenses = computed(() => {
    const filter = this.categoryFilter();
    if (filter === 'ALL') return this.expenses();
    return this.expenses().filter(e => e.category === filter);
  });

  setFilter(filter: CategoryFilter): void {
    this.categoryFilter.set(filter);
  }

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

  onEdit(expense: Expense): void {
    this.editExpense.emit(expense);
  }

  onDelete(id: string): void {
    this.deleteExpense.emit(id);
  }

  onImportFixed(): void {
    this.importFixed.emit();
  }
}
