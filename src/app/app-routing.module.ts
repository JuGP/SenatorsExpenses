import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { SenatorsComponent } from './components/senators/senators.component';

const routes: Routes = [
  {path: 'senators', component: SenatorsComponent},
  {path: 'senators/:id', component: ExpensesComponent},
  {path: '', redirectTo: 'senators', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
