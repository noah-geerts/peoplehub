package com.noahgeerts.peoplehubbackend.repository;

import org.springframework.data.repository.CrudRepository;

import com.noahgeerts.peoplehubbackend.domain.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, String> {

}
