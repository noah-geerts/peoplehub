import { Injectable, signal } from '@angular/core';
import { Employee } from '../types/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeManager {
  // Only expose readonly signal so that all employee logic happens in this service's methods
  private _employees = signal<Employee[]>([
    {
      eid: crypto.randomUUID(),
      first: 'Bob',
      last: 'Morris',
      email: 'bobmorris@outlook.com',
      salary: 112000,
    },
    {
      eid: crypto.randomUUID(),
      first: 'Saint',
      last: 'Jude',
      email: 'stjude@outlook.com',
      salary: 101000,
    },
  ]);
  employees = this._employees.asReadonly();

  // Create
  createEmployee(newEmployee: Employee) {
    this._employees.update((employees) => {
      return [...employees, { ...newEmployee, eid: crypto.randomUUID() }];
    });
  }

  // Read (get all employees)
  getEmployees(): Employee[] {
    return this._employees();
  }

  // Read (get employee by id)
  getEmployeeById(eid: string): Employee | undefined {
    return this._employees().find((emp) => emp.eid === eid);
  }

  // Update
  updateEmployee(eid: string, updatedFields: Partial<Employee>) {
    this._employees.update((employees) =>
      employees.map((emp) => (emp.eid === eid ? { ...emp, ...updatedFields, eid } : emp)),
    );
  }

  // Delete
  deleteEmployee(eid: string) {
    this._employees.update((employees) => employees.filter((emp) => emp.eid !== eid));
  }
}
