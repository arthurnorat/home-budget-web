import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IncomeResponse {
  month: string;
  amount: number; // em centavos
}

@Injectable({ providedIn: 'root' })
export class IncomeService {
  private readonly http = inject(HttpClient);
  private readonly incomeUrl = environment.incomeUrl;

  getIncome(month: string): Observable<IncomeResponse> {
    return this.http.get<IncomeResponse>(this.incomeUrl, { params: { month } });
  }

  saveIncome(month: string, amount: number): Observable<IncomeResponse> {
    return this.http.put<IncomeResponse>(this.incomeUrl, { amount }, { params: { month } });
  }
}
