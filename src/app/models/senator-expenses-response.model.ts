import { ExpenseResponse } from "./expense-response.model";

export class SenatorExpensesResponse {
  id: number;
  nomeSenador: string;
  despesas: ExpenseResponse[];
}