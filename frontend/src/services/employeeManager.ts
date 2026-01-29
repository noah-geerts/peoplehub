import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Employee } from "../types/employee";
import { catchError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EmployeeManager {
    httpClient = inject(HttpClient);
    baseURL = "http://localhost:8080/employees"

    createEmployee(employee: Employee) {
        return this.httpClient.post(this.baseURL, employee);
    }

    getAllEmployees() {
        return this.httpClient.get<Employee[]>(this.baseURL);
    }

    updateEmployee(eid: string, employee: Employee) {
        return this.httpClient.patch(this.baseURL + "/" + eid, employee);
    }

    deleteEmployee(eid: string) {
        return this.httpClient.delete(this.baseURL + "/" + eid);
    }
}