import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-month-navigator',
  templateUrl: './month-navigator.html',
  styleUrl: './month-navigator.css',
})
export class MonthNavigator {
  month = input.required<string>(); // formato: 'yyyy-MM'
  monthChange = output<string>();

  get label(): string {
    const [year, month] = this.month().split('-').map(Number);
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  previous(): void {
    this.monthChange.emit(this.addMonths(this.month(), -1));
  }

  next(): void {
    this.monthChange.emit(this.addMonths(this.month(), 1));
  }

  private addMonths(yearMonth: string, delta: number): string {
    const [year, month] = yearMonth.split('-').map(Number);
    const date = new Date(year, month - 1 + delta);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  }
}
