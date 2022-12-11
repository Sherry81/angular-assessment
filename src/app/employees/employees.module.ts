import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: EmployeesListComponent, 
  },
  {
    path: 'add-employee/:id', component: AddEmployeeComponent, 
  },
];

@NgModule({
  declarations: [
    AddEmployeeComponent,
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeesModule { }
