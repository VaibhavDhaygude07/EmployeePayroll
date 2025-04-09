  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { DashboardComponent } from './Components/dashboard/dashboard.component';
  import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';

  const routes: Routes = [
 
{ path: 'dashboard', component: DashboardComponent },
{ path: 'add-employee', component: EmployeeFormComponent }

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
