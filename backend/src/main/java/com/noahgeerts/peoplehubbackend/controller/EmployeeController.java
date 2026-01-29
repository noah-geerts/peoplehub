package com.noahgeerts.peoplehubbackend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noahgeerts.peoplehubbackend.domain.Employee;
import com.noahgeerts.peoplehubbackend.repository.EmployeeRepository;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
    private EmployeeRepository employeeRepo;

    public EmployeeController(EmployeeRepository employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    @PostMapping()
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        logger.info("Creating employee: {}", employee);
        Employee newEmployee = employeeRepo.save(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(newEmployee);
    }

    @GetMapping()
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> allEmployees = StreamSupport.stream(employeeRepo.findAll().spliterator(), false).toList();
        return ResponseEntity.ok(allEmployees);
    }

    @PatchMapping("/{eid}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable String eid, @RequestBody Employee toUpdate) {
        logger.info("Updating employee {}: {}", eid, toUpdate);
        Optional<Employee> existing = employeeRepo.findById(eid);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // We expect thet eid is the correct id and we ignore the one in the toUpdate
        // object
        toUpdate.setEid(eid);
        Employee updated = employeeRepo.save(toUpdate);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{eid}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable String eid) {
        Optional<Employee> existing = employeeRepo.findById(eid);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // If it exists, delete it
        employeeRepo.delete(existing.get());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
