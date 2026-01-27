package com.noahgeerts.peoplehubbackend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.noahgeerts.peoplehubbackend.domain.Employee;
import com.noahgeerts.peoplehubbackend.repository.EmployeeRepository;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private EmployeeRepository employeeRepo;

    public EmployeeController(EmployeeRepository employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @PostMapping()
    public ResponseEntity<Employee> createEmployee(Employee employee) {
        Employee newEmployee = employeeRepo.save(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(newEmployee);
    }

    @GetMapping()
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> allEmployees = StreamSupport.stream(employeeRepo.findAll().spliterator(), false).toList();
        return ResponseEntity.ok(allEmployees);
    }

    @PatchMapping("/{eid}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable String eid, Employee toUpdate) {
        Optional<Employee> existing = employeeRepo.findById(eid);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        // TODO update logic
    }
}
