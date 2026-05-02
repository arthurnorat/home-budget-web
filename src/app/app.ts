import { Component, signal, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ExpenseService } from './services/expense.service';
import { Expense, ExpenseRequest } from './models/expense.model';
import { MonthNavigator } from './components/month-navigator/month-navigator';
import { ExpenseForm } from './components/expense-form/expense-form';
import { ExpenseSummary } from './components/expense-summary/expense-summary';
import { ExpenseTable } from './components/expense-table/expense-table';

@Component({
  selector: 'app-root',
  imports: [MonthNavigator, ExpenseForm, ExpenseSummary, ExpenseTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private expenseService = inject(ExpenseService);
  private platformId = inject(PLATFORM_ID);

  currentMonth = signal(this.todayYearMonth());
  expenses = signal<Expense[]>([]);
  loading = signal(false);
  editingExpense = signal<Expense | null>(null);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadExpenses();
    }
  }

  onMonthChange(month: string): void {
    this.currentMonth.set(month);
    this.loadExpenses();
  }

  onExpenseSubmit(request: ExpenseRequest): void {
    this.expenseService.createExpense(request).subscribe({
      next: () => this.loadExpenses(),
    });
  }

  onEditExpense(expense: Expense): void {
    this.editingExpense.set(expense);
  }

  onUpdateExpense(payload: { id: string; request: ExpenseRequest }): void {
    this.expenseService.updateExpense(payload.id, payload.request).subscribe({
      next: () => {
        this.editingExpense.set(null);
        this.loadExpenses();
      },
    });
  }

  onCancelEdit(): void {
    this.editingExpense.set(null);
  }

  onDeleteExpense(id: string): void {
    this.expenseService.deleteExpense(id).subscribe({
      next: () => this.loadExpenses(),
    });
  }

  onImportFixed(): void {
    this.expenseService.importFixed(this.currentMonth()).subscribe({
      next: () => this.loadExpenses(),
    });
  }

  private loadExpenses(): void {
    this.loading.set(true);
    this.expenseService.getExpenses(this.currentMonth()).subscribe({
      next: (data) => {
        this.expenses.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  private todayYearMonth(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  }
}
