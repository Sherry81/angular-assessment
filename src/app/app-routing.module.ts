import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',      
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
      }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
