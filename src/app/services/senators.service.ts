import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SenatorResponse } from '../models/senator-response.model';
import { SenatorExpensesResponse } from '../models/senator-expenses-response.model';

@Injectable()
export class SenatorsService {
  readonly API = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getSenators() {
    return this.http.get<SenatorResponse[]>(`${this.API}/senadores`);
  }

  getSenatorExpenses(id:string) {
    return this.http.get<SenatorExpensesResponse>(`${this.API}/despesasSenadores/${id}`);
  }
}
