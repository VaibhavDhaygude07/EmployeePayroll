import { Component } from '@angular/core';

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
    notes: '',
  };

  // profileImages = [
  //   'assets/profile1.png',
  //   'assets/profile2.png',
  //   'assets/profile3.png',
  //   'assets/profile4.png'
  // ];

  departments = ['HR', 'Sales', 'Finance', 'Engineer', 'Others'];
  salaryOptions = ['20k', '30k', '40k', '50k'];
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years = [2020, 2021, 2022, 2023, 2024, 2025];
}
