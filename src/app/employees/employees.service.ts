import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  public response:any = new BehaviorSubject(null)

  constructor(public http: HttpClient) { }

  getEmployees() {
    return <any>(
      this.http.get("http://dummy.restapiexample.com/api/v1/employees").pipe(
        map(res => res)
      )
    );
  }

  getSingleEmployee(id:any) {
    return <any>(
      this.http.get("http://dummy.restapiexample.com/api/v1/employee/"+id).pipe(
        map(res => res)
      )
    );
  }

  addEmployee(payload:any) {
    return <any>(
      this.http.post("http://dummy.restapiexample.com/api/v1/create", payload).pipe(
        map(res => {
          this.response.next(res)
          return res;
        })
      )
    );
  }

  updateEmployee(payload:any, id:any) {
    return <any>(
      this.http.put("http://dummy.restapiexample.com/api/v1/update/"+id, payload).pipe(
        map(res => {
          this.response.next(res)
          return res;
        })
      )
    );
  }

  deleteEmployee(id:any) {
    return <any>(
      this.http.delete("http://dummy.restapiexample.com/api/v1/delete/"+id).pipe(
        map(res => {
          this.response.next(res)
          return res;
        })
      )
    );
  }

  getResponse(): Observable<any> {
    return this.response.asObservable();
  }
}
