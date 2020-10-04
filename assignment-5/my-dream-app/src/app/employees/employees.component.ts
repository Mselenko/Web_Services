import { Component, OnInit } from '@angular/core';
import { Employee } from './../data/employee';
import { EmployeeService } from './../data/employee.service'


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  getEmployeesSub: any;
  loadingError: boolean = false;


  constructor(private e: EmployeeService) { }


  ngOnInit() {
    try {
      this.getEmployeesSub = this.e.getEmployees().subscribe(employees => this.employees = employees);
    } catch (error) {
      this.loadingError = true;
      console.log(error);
    }
  }

  ngOnDestroy() {
    if (this.getEmployeesSub)
      this.getEmployeesSub.unsubscribe();
  }

}
