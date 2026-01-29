import { Component, computed, inject, OnInit } from '@angular/core';
import { Card } from '../components/card/card';
import { DecimalPipe } from '@angular/common';
import { EmployeeManager } from '../../services/employeeManager';
import { getResource } from '../common/getResource';

@Component({
  selector: 'app-home',
  imports: [Card, DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly employeeManager = inject(EmployeeManager);
  employeesVM = getResource(() => this.employeeManager.getAllEmployees());

  readonly avgSalary = computed(() => {
    let total = 0;
    const employees = this.employeesVM().data;
    if (employees) {
      employees.forEach(e => total += e.salary);
      return total / employees.length;
    }
    return 0;
  });
}
