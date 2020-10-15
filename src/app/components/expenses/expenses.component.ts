import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SenatorsService } from 'src/app/services/senators.service';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseResponse } from 'src/app/models/expense-response.model';
import { Report } from 'src/app/models/report.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  reports: Report[] = [];
  totalAmount: number;
  senatorName: string;
  isLoaded: boolean = false;
  
  constructor(
    private senatorsService: SenatorsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this.senatorsService.getSenatorExpenses(id).subscribe((senator) => {
        this.senatorName = senator.nomeSenador;
        this.updateExpenses(senator.despesas);
        this.updateReports();
        this.isLoaded = true;
      });
    });
  }

  updateExpenses(expenses: ExpenseResponse[]) {
    expenses.forEach((expense) => {
      this.expenses.push(this.getExpense(expense));
    });
  }

  updateReports() {
    this.reports = Object.values(this.groupByType(this.expenses, 'id'));
    this.totalAmount = this.reports
      .map((report) => report.amount)
      .reduce((i, j) => i + j);
  }

  getExpense(expenseReponse: ExpenseResponse): Expense {
    let expense = new Expense();
    expense.id = expenseReponse.tipo;
    expense.provider = expenseReponse.fornec;
    expense.date = new Date(
      expenseReponse.ano,
      expenseReponse.mes,
      expenseReponse.dia
    );
    expense.amount = expenseReponse.valor;
    return expense;
  }

  groupByType(array: Expense[], property: string): { [id: string]: Report } {
    return array.reduce((result, currentValue) => {
      const key = currentValue[property];
      if (!(key in result)) {
        let report = new Report();
        report.id = currentValue.id;
        report.amount = currentValue.amount;
        result[key] = report;
      } else {
        result[key].amount += currentValue.amount;
      }
      return result;
    }, {});
  }
}
