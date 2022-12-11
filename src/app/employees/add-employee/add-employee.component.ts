import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeForm:any;
  employeeId:any;
  count:any;
  loader = false;

  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeesService) {
    this.addEmployeeForm = new FormGroup({
      employee_name: new FormControl('', Validators.required),
      employee_age: new FormControl('', Validators.required),
      employee_salary: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
    // considering that employees' ids are incrementing and not random
    this.count = history.state?.id + 1;
    this.employeeId = this.route.snapshot.params['id'];
    if(this.employeeId != 'new'){
      this.getSingleEmployee(this.employeeId)
    }
  }

  submit(){
    this.loader = true;
    let payload = {...this.addEmployeeForm.getRawValue(), id: this.employeeId == 'new' ? this.count : this.employeeId}
    if(this.employeeId == 'new'){
      this.employeeService.addEmployee(payload).subscribe((res:any)=>{
        this.loader = false;
        this.router.navigate(['/'])
      },(err:any)=>{
        this.employeeService.response.next(err)
        this.loader = false;
      })
    }
    else{
      this.employeeService.updateEmployee(payload, this.employeeId).subscribe((res:any)=>{
        this.loader = false;
        this.router.navigate(['/'])
      },(err:any)=>{
        this.employeeService.response.next(err)
        this.loader = false;
      })
    }
    
  }

  cancel(){
    this.router.navigate(['/'])
  }

  getSingleEmployee(id:any){
    this.employeeService.getSingleEmployee(id).subscribe((res:any)=>{
      let { employee_name, employee_age, employee_salary } = res.data;
      this.addEmployeeForm.patchValue({
        employee_age,
        employee_name,
        employee_salary
      })
    })
  }

  checkError(field:any){
    return this.addEmployeeForm.get(field)?.errors?.required && (this.addEmployeeForm.get(field)?.dirty || this.addEmployeeForm.get(field)?.touched);
  }

}
