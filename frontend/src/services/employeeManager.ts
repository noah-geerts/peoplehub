import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Employee } from "../types/employee";
import { getResource } from "../app/common/getResource";
import { createMutation } from "../app/common/createMutation";

@Injectable({ providedIn: 'root' })
export class EmployeeManager {
    httpClient = inject(HttpClient);
    baseURL = "http://localhost:8080/employees"

    createEmployee() {
        return createMutation((employee: Employee) => this.httpClient.post<Employee>(this.baseURL, employee));
    }

    getAllEmployees() {
        return getResource(() => this.httpClient.get<Employee[]>(this.baseURL));
    }

    updateEmployee(eid: string) {
        return createMutation((employee: Employee) => this.httpClient.patch<Employee>(this.baseURL + "/" + eid, employee));
    }

    deleteEmployee(eid: string) {
        return createMutation<Employee, void>(() => this.httpClient.delete<Employee>(this.baseURL + "/" + eid));
    }
}