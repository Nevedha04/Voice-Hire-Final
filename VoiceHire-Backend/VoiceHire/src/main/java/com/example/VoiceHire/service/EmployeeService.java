package com.example.VoiceHire.service;

import com.example.VoiceHire.Model.Employee;
import com.example.VoiceHire.Repo.EmployeeRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo repository;

    // Get all employees
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    // Get employee by ID
    public Employee getEmployeeById(int id) {
        return repository.findById(id).orElse(null);
    }



    // Add a new employee
    public Employee addEmployee(Employee employee) {
        return repository.save(employee);
    }
}
