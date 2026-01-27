import { Component, computed, inject } from '@angular/core';
import { Card } from '../components/card/card';
import { EmployeeManager } from '../../services/employeeManager';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Card, DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly employeeManager = inject(EmployeeManager);
  readonly avgSalary = computed(() => {
    const employees = this.employeeManager.employees();
    if (!employees.length) return 0;
    return employees.reduce((sum, e) => sum + e.salary, 0) / employees.length;
  });
}
