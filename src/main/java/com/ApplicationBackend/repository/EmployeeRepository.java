package com.ApplicationBackend.repository;

import com.ApplicationBackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // You can define custom queries here if needed
}