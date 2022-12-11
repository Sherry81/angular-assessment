import { Component } from '@angular/core';
import { EmployeesService } from './employees/employees.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-assessment';
  response:any;
  constructor(private employeeService: EmployeesService){}

  ngOnInit(){
    this.employeeService.getResponse().subscribe(res=>{
      this.response = res;
      setTimeout(() => {
        this.response = '';
      }, 2000);
    })
  }

}
