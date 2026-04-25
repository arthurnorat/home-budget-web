import { Component, output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ExpenseRequest } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm {
  expenseSubmit = output<ExpenseRequest>();

  private fb = inject(FormBuilder);

  form = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(2)]],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    date: [this.todayISO(), Validators.required],
    category: ['FIXED' as 'FIXED' | 'VARIABLE', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) return;

    const { description, amount, date, category } = this.form.getRawValue();
    this.expenseSubmit.emit({
      description: description!,
      amount: Math.round(amount! * 100), // converte reais → centavos
      date: date!,
      category: category!,
    });
    this.form.reset({ date: this.todayISO(), category: 'FIXED' });
  }

  private todayISO(): string {
    return new Date().toISOString().split('T')[0];
  }
}
