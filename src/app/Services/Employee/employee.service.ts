import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../Http/http.service';

export interface Employee {
  name: string;
  profileImage: string;
  gender: string;
  department: string[];
  salary: number;
  startDate: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private httpService: HttpService) {} 

  addEmployee(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   
    return this.httpService.PostMethod('https://localhost:7273/api/Employees', reqData);
  }

  getAllEmployees() {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpService.getService('https://localhost:7273/api/Employees');
  }

  deleteEmployee(id: number) {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpService.deleteService(`https://localhost:7273/api/Employees/${id}`);
  }
}
