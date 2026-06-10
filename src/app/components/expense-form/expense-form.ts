import { Component, output, input, inject, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Expense, ExpenseRequest } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule, NgxCurrencyDirective],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm {
  editingExpense = input<Expense | null>(null);
  expenseSubmit = output<ExpenseRequest>();
  expenseUpdate = output<{ id: string; request: ExpenseRequest }>();
  cancelEdit = output<void>();

  private fb = inject(FormBuilder);

  form = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(2)]],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    date: [this.todayISO(), Validators.required],
    category: ['VARIABLE' as 'FIXED' | 'VARIABLE', Validators.required],
  });

  constructor() {
    effect(() => {
      const expense = this.editingExpense();
      if (expense) {
        this.form.patchValue({
          description: expense.description,
          amount: expense.amount / 100, // centavos → reais para exibição
          date: expense.date,
          category: expense.category,
        });
      } else {
        this.form.reset({ date: this.todayISO(), category: 'VARIABLE' });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const { description, amount, date, category } = this.form.getRawValue();
    const request: ExpenseRequest = {
      description: description!,
      amount: Math.round(amount! * 100), // reais → centavos
      date: date!,
      category: category!,
    };

    const editing = this.editingExpense();
    if (editing) {
      this.expenseUpdate.emit({ id: editing.expenseId, request });
    } else {
      this.expenseSubmit.emit(request);
      this.form.reset({ date: this.todayISO(), category: 'VARIABLE' });
    }
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }

  private todayISO(): string {
    return new Date().toISOString().split('T')[0];
  }
}
