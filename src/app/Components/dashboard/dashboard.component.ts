import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../Services/Employee/employee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchText: string = '';
  employees: any[] = [];
  filteredEmployees: any[] = [];

  displayedColumns: string[] = [
    'profile',
    'name',
    'gender',
    'departments',
    'salary',
    'startDate',
    'actions'
  ];

  constructor(private router: Router, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (res: any) => {
        this.employees = res.map((emp: any) => ({
          id: emp.id,
          name: emp.name,
          gender: emp.gender,
          departments: emp.department?.split(',') || [],
          salary: `₹ ${emp.salary}`,
          startDate: new Date(emp.startDate).toLocaleDateString(),
          profilePic: emp.imageUrl || 'https://randomuser.me/api/portraits/lego/1.jpg'
        }));
        this.filteredEmployees = [...this.employees];
      },
      (err) => {
        console.error('Error fetching employees:', err);
      }

    );
  }


  goToAddUser(): void {
    this.router.navigate(['/add-employee'], { state: { isEditMode: false } });
  }
  
  editEmployee(id: number): void {
    this.router.navigate(['/add-employee', id]);
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
       
        this.getAllEmployees();
      },
      (err: any) => {
        console.error('Error deleting employee:', err);
      
      }
    );
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
