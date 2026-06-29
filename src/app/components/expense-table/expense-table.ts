import { Component, input, output, signal, computed, effect, viewChild, ElementRef } from '@angular/core';
import { Expense, ExpenseRequest, Category } from '../../models/expense.model';

type CategoryFilter = 'ALL' | 'FIXED' | 'VARIABLE';

interface ConsolidateData {
  description: string;
  amount: number;
  date: string;
  category: Category;
}

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
  consolidateExpenses = output<{ idsToDelete: string[]; newExpense: ExpenseRequest }>();

  categoryFilter = signal<CategoryFilter>('ALL');
  selectedIds = signal<Set<string>>(new Set());
  consolidateData = signal<ConsolidateData | null>(null);

  dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('consolidateDialog');

  filteredExpenses = computed(() => {
    const filter = this.categoryFilter();
    if (filter === 'ALL') return this.expenses();
    return this.expenses().filter(e => e.category === filter);
  });

  canConsolidate = computed(() => this.selectedIds().size >= 2);

  constructor() {
    effect(() => {
      this.expenses();
      this.selectedIds.set(new Set());
    }, { allowSignalWrites: true });
  }

  setFilter(filter: CategoryFilter): void {
    this.categoryFilter.set(filter);
  }

  toggleSelection(id: string): void {
    const current = new Set(this.selectedIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.selectedIds.set(current);
  }

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  onConsolidateClick(): void {
    const selected = this.expenses().filter(e => this.selectedIds().has(e.expenseId));
    const totalAmount = selected.reduce((sum, e) => sum + e.amount, 0);
    const mostRecentDate = selected.map(e => e.date).sort().at(-1)!;
    this.consolidateData.set({
      description: selected[0].description,
      amount: totalAmount,
      date: mostRecentDate,
      category: selected[0].category,
    });
    this.dialogRef().nativeElement.showModal();
  }

  onConsolidateConfirm(description: string): void {
    const data = this.consolidateData()!;
    this.consolidateExpenses.emit({
      idsToDelete: [...this.selectedIds()],
      newExpense: { description, amount: data.amount, date: data.date, category: data.category },
    });
    this.dialogRef().nativeElement.close();
  }

  onConsolidateCancel(): void {
    this.dialogRef().nativeElement.close();
  }

  onClearConsolidateData(): void {
    this.consolidateData.set(null);
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
