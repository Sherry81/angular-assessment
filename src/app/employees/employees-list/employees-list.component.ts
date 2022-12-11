import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees = [];
  loader = true;
  deleteId:any;
  pageNo = 1;
  pages:any;

  constructor(private employeeService: EmployeesService, private router: Router) { }
  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe((res:any)=>{
      this.loader = false;
      this.employees = res.data;
      this.pages = Math.ceil(this.employees.length/10);
    },(err:any)=>{
      this.loader = false;
    })
  }

  addEmployee(id:any = undefined){
    this.router.navigateByUrl(id ? `add-employee/${id}` : `add-employee/new`,{ state: { id: this.employees.length }})
  }

  deleteEmployee(){
    this.employeeService.deleteEmployee(this.deleteId).subscribe((res:any)=>{
      console.log('Deleted Record',res)
    },(err:any)=>{
      this.employeeService.response.next(err)
    })
  }

  counter() {
    return new Array(this.pages);
  }

  getIndex(id:any){
    return this.employees.findIndex((employee:any)=>employee.id == id) + 1;
  }

}
