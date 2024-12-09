package com.ApplicationBackend.service;

import com.ApplicationBackend.model.Employee;
import com.ApplicationBackend.model.Route;
import com.ApplicationBackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Add a new employee
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get a specific employee by id
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee updateEmployee(Long id, Employee employee) {
        Optional<Employee> existingEmployee = employeeRepository.findById(id);
        if (existingEmployee.isPresent()) {
            Employee updatedEmployee = existingEmployee.get();
            updatedEmployee.setName(employee.getName());
            updatedEmployee.setEmail(employee.getEmail());
            updatedEmployee.setPhoneNumber(employee.getPhoneNumber());
            updatedEmployee.setAddress(employee.getAddress());
            updatedEmployee.setPlateNumber(employee.getPlateNumber());
            return employeeRepository.save(updatedEmployee);
        }
        return null; // Return null if employee not found
    }

    public boolean deleteEmployee(Long id) {
        Optional<Employee> existingEmployee = employeeRepository.findById(id);
        if (existingEmployee.isPresent()) {
            employeeRepository.delete(existingEmployee.get());
            return true;
        }
        return false;
    }
}
