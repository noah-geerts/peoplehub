import { Component, inject, signal } from '@angular/core';
import { EmployeeRow } from './employee/employee-row';
import { Modal } from '../components/modal/modal';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, JsonPipe, NgClass } from '@angular/common';
import { EmployeeManager } from '../../services/employeeManager';

@Component({
  selector: 'app-people',
  imports: [EmployeeRow, Modal, ReactiveFormsModule, NgClass, JsonPipe],
  templateUrl: './people.html',
  styleUrl: './people.css',
})
export class People {
  readonly employeeManager = inject(EmployeeManager);
  employeeResource = this.employeeManager.getAllEmployees();
  createEmployeeMutater = this.employeeManager.createEmployee();
  isModalOpen = signal(false);

  refetch() {
    this.employeeResource().refetch();
  }

  openModal() {
    this.isModalOpen.set(true);
    this.createEmployeeForm.reset();
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  createEmployee() {
    if (
      this.createEmployeeForm.value.first === undefined ||
      this.createEmployeeForm.value.last === undefined ||
      this.createEmployeeForm.value.email === undefined ||
      this.createEmployeeForm.value.salary === undefined ||
      isNaN(Number(this.createEmployeeForm.value.salary)) ||
      this.createEmployeeForm.invalid
    )
      throw new Error('Form fields not all valid. Cannot create employee.');

    this.createEmployeeMutater().mutate({
      eid: 'N/A',
      first: this.createEmployeeForm.value.first,
      last: this.createEmployeeForm.value.last,
      email: this.createEmployeeForm.value.email,
      salary: Number(this.createEmployeeForm.value.salary),
    }, () => { this.closeModal(); this.refetch(); });
  }

  createEmployeeForm = new FormGroup({
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
}
