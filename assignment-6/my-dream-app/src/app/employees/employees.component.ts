import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../data/employee.service';
import { Employee } from '../data/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  getEmployeesSub: any;
  loadingError: boolean;
  filteredEmployees: Employee[];

  constructor(private t: EmployeeService, private router: Router) {
    this.loadingError = false;
    this.getEmployeesSub = "";
  }

  onEmployeeSearchKeyUP(event: any) {
    this.filteredEmployees = this.employees.filter((emp) => {
      return emp.FirstName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1 || emp.LastName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1 || emp.Position.PositionName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
    })
  }

  ngOnInit() {
    this.getEmployeesSub = this.t.getEmployees().subscribe((employees) => { this.employees = employees; this.filteredEmployees = employees; }, () => { this.loadingError = true; });
  }


  routeEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }


  ngOnDestroy() {
    if (this.getEmployeesSub)
      this.getEmployeesSub.unsubscribe();
  }
}