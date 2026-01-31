import { Component, EventEmitter, inject, Input, Output, resource, Signal, signal } from '@angular/core';
import { Employee } from '../../../types/employee';
import { DecimalPipe, NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '../../components/modal/modal';
import { EmployeeManager } from '../../../services/employeeManager';
import { Mutation } from '../../common/createMutation';

@Component({
  selector: 'app-employee-row',
  imports: [DecimalPipe, ReactiveFormsModule, NgClass, Modal],
  templateUrl: './employee-row.html',
  styleUrl: './employee-row.css',
})
export class EmployeeRow {
  @Input({ required: true }) employee!: Employee;
  @Output() mutatedEmployee = new EventEmitter<void>();
  readonly employeeManager = inject(EmployeeManager);
  updateEmployeeMutater: Signal<Mutation<Employee, Employee>> | undefined;
  deleteEmployeeMutater: Signal<Mutation<Employee, void>> | undefined;

  editing = signal(false);
  isModalOpen = signal(false);

  ngOnInit() {
    this.updateEmployeeMutater = this.employeeManager.updateEmployee(this.employee.eid);
    this.deleteEmployeeMutater = this.employeeManager.deleteEmployee(this.employee.eid);
  }

  ////// Modal controls and delete employee ///////
  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  deleteEmployee() {
    this.deleteEmployeeMutater!().mutate(undefined, () => { this.closeModal(); this.mutatedEmployee.emit(); })
  }

  ////// Form controls and edit employee ///////
  employeeForm = new FormGroup({
    first: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    last: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    salary: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(40000),
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
      ],
    }),
  });

  handleEditOrSave() {
    if (this.editing()) this.save();
    else this.startEditing();
  }

  startEditing() {
    this.employeeForm.setValue({
      first: this.employee.first,
      last: this.employee.last,
      email: this.employee.email,
      salary: this.employee.salary.toString(),
    });
    this.editing.set(true);
  }

  save() {
    const salary = Number(this.employeeForm.value.salary);
    if (this.employeeForm.valid && !isNaN(salary) && this.employeeForm.value.first !== undefined
      && this.employeeForm.value.last !== undefined && this.employeeForm.value.email !== undefined) {
      this.editing.set(false);
      this.updateEmployeeMutater!().mutate({
        eid: "N/A",
        first: this.employeeForm.value.first,
        last: this.employeeForm.value.last,
        email: this.employeeForm.value.email,
        salary: salary,
      }, () => this.mutatedEmployee.emit());
    }
  }
}
