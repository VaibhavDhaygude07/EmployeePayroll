import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/Employee/employee.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  
  employee: any = {
    name: '',
    profileImage: '',
    gender: '',
    departments: {},
    salary: '',
    startDay: '',
    startMonth: '',
    startYear: '',
    notes: ''
  };

  profileImages = [
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/46.jpg',
    'https://randomuser.me/api/portraits/men/52.jpg',
    'https://randomuser.me/api/portraits/men/81.jpg'
  ];

  departments = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
  salaryOptions = [20000, 30000, 40000, 50000];

  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years = [2020, 2021, 2022, 2023, 2024, 2025];
employeeForm: any;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onSubmit() {
    const departmentArray = Object.keys(this.employee.departments).filter(
      key => this.employee.departments[key]
    );

    const startDate = new Date(
      `${this.employee.startMonth} ${this.employee.startDay}, ${this.employee.startYear}`
    );

    const employeeData = {
      name: this.employee.name,
      imageUrl: this.employee.profileImage,
      gender: this.employee.gender,
      department: departmentArray.join(','),
      salary: Number(this.employee.salary),
      startDate: startDate.toISOString(),
      notes: this.employee.notes
    };

    console.log('Data being sent to API:', employeeData);

    this.employeeService.addEmployee(employeeData).subscribe(
      (res: any) => {
        console.log('Employee added successfully', res);
        this.router.navigate(['/dashboard']);
      },
      (err: any) => {
        console.error('Error adding employee', err);
        alert('Something went wrong!');
      }
    );
  }

  onReset() {
    this.employee = {
      name: '',
      profileImage: '',
      gender: '',
      departments: {},
      salary: '',
      startDay: '',
      startMonth: '',
      startYear: '',
      notes: ''
    };
  }

  onCancel(form?: NgForm) {
    if (form) form.resetForm();
    this.router.navigate(['/dashboard']);
  }
  
}
