import { inject, Injectable, Signal, signal } from "@angular/core";
import { EmployeeManager } from "./employeeManager";
import { Employee } from "../types/employee";
import { Observable, Subscription, take } from "rxjs";

type EmployeesVM = {
    error: string | undefined;
    loading: boolean;
    data: Employee[]
}

@Injectable({ providedIn: 'root' })
export class EmployeeStore {
    employeeManager = inject(EmployeeManager);
    subscription: Subscription | undefined;
    readonly employeesVM = signal<EmployeesVM>({
        loading: false,
        data: [],
        error: undefined,
    })

    loadEmployees() {
        this.employeesVM.set({
            loading: true,
            data: [],
            error: undefined
        })

        if (this.subscription !== undefined)
            this.subscription.unsubscribe();

        this.subscription = this.employeeManager.getAllEmployees().subscribe({
            error: (e) => this.employeesVM.set({ loading: false, error: e, data: [] }),
            next: data => this.employeesVM.set({
                loading: false,
                data,
                error: undefined,
            })
        })
    }
}