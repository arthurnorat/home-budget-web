import { Component, input, output, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-summary',
  imports: [FormsModule, NgxCurrencyDirective],
  templateUrl: './expense-summary.html',
  styleUrl: './expense-summary.css',
})
export class ExpenseSummary {
  expenses = input.required<Expense[]>();
  income = input.required<number>(); // em centavos
  incomeChange = output<number>();   // emite em centavos

  incomeInputValue = signal(0); // em reais, reage ao que o usuário digita

  constructor() {
    // sincroniza o campo quando o mês muda ou o backend retorna um valor
    effect(() => {
      this.incomeInputValue.set(this.income() / 100);
    });
  }

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

  // calculados a partir do input local para atualizar enquanto o usuário digita
  budget50 = computed(() => Math.round(this.incomeInputValue() * 100 * 0.5));
  budget30 = computed(() => Math.round(this.incomeInputValue() * 100 * 0.3));
  budget20 = computed(() => Math.round(this.incomeInputValue() * 100 * 0.2));

  onSaveIncome(): void {
    this.incomeChange.emit(Math.round(this.incomeInputValue() * 100));
  }

  formatCents(cents: number): string {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
