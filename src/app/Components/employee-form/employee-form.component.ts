
import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/Employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  isEditMode: boolean = false;

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
  days = Array.from({ length: 31 }, (_, i) => i+1);
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: number[] = Array.from({ length: 30 }, (_, i) => 2000 + i);


    editId: number | null = null;

    constructor(
      private employeeService: EmployeeService,
      private router: Router,
      private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeService.getEmployeeById(+id).subscribe((emp: any) => {

        const departmentsArray = emp.department.split(',');
        const departmentsObject: any = {};
        this.departments.forEach(dept => {
          departmentsObject[dept] = departmentsArray.includes(dept);
        });

        const date = new Date(emp.startDate);

        this.employee = {
          name: emp.name,
          profileImage: emp.imageUrl,
          gender: emp.gender,
          departments: departmentsObject,
          salary: emp.salary,
          startDay: date.getDate(),
          startMonth: this.months[date.getMonth()],
          startYear: date.getFullYear(),
          notes: emp.notes
        };

        this.editId = emp.id;
      });
    }
  }

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

    if (this.editId !== null) {
      this.employeeService.updateEmployee(this.editId, employeeData).subscribe(
        res => {
          console.log('Employee updated successfully', res);
          this.router.navigate(['/dashboard']);
        },
        err => {
          console.error('Error updating employee', err);
          alert('Something went wrong while updating!');
        }
      );
    } else {
      this.employeeService.addEmployee(employeeData).subscribe(
        res => {
          console.log('Employee added successfully', res);
          this.router.navigate(['/dashboard']);
        },
        err => {
          console.error('Error adding employee', err);
          alert('Something went wrong while adding!');
        }
      );
    }
  }
  onReset(): void {
    this.employee = {
      name: '',
      profileImage: '',
      gender: '',
      departments: {},
      salary: '',
      startDate: new Date(),
      notes: ''
    };
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }

  updateDate(): void {
    if (this.employee.startDay && this.employee.startMonth && this.employee.startYear) {
      const monthIndex = this.months.indexOf(this.employee.startMonth);
      this.employee.startDate = new Date(
        this.employee.startYear,
        monthIndex,
        this.employee.startDay
      );
    } 
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
  
}
