import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchText: string = '';

  employees = [
    {
      name: 'Sharon Smith',
      gender: 'Female',
      departments: ['Sales', 'HR', 'Finance'],
      salary: '₹ 10,000',
      startDate: '29 Oct 2019',
      profilePic: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Mohammad  Shaikh',
      gender: 'Male',
      departments: ['Sales', 'HR', 'Finance'],
      salary: '₹ 12,000',
      startDate: '01 Jan 2020',
      profilePic: 'https://randomuser.me/api/portraits/men/46.jpg'
    },
    {
      name: 'Jason Johnson',
      gender: 'Male',
      departments: ['Sales', 'HR', 'Finance'],
      salary: '₹ 11,500',
      startDate: '15 Mar 2020',
      profilePic: 'https://randomuser.me/api/portraits/men/52.jpg'
    }
  ];

  filteredEmployees = [...this.employees];

  displayedColumns: string[] = [
    'profile',
    'name',
    'gender',
    'departments',
    'salary',
    'startDate',
    'actions'
  ];

  ngOnInit(): void {
    this.filterEmployees();
  }

  filterEmployees(): void {
    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      this.filteredEmployees = [...this.employees];
    } else {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.name.toLowerCase().includes(search)
      );
    }
  }
}
