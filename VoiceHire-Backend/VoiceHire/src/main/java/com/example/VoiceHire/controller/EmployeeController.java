package com.example.VoiceHire.controller;

import com.example.VoiceHire.Model.Employee;
import com.example.VoiceHire.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*") // Open for all, modify as needed for production
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    // GET method to fetch all employees
    @GetMapping("/getEmployees")
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    // GET method to fetch a single employee by ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable int id) {
        return service.getEmployeeById(id);
    }
    @GetMapping("/byJobDomain")
    public ResponseEntity<List<Employee>> getEmployeesByJobDomain(@RequestParam String jobDomain) {
        List<Employee> employees = service.getAllEmployees()
                .stream()
                .filter(employee -> jobDomain.equalsIgnoreCase(employee.getJobDomain().trim()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/countByJobDomain")
    public ResponseEntity<Integer> getCountByJobDomain(@RequestParam String jobDomain) {
        List<Employee> employees = service.getAllEmployees()
                .stream()
                .filter(employee -> jobDomain.equalsIgnoreCase(employee.getJobDomain().trim()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(employees.size());
    }
    // POST method to add a new employee
    @PostMapping("/create")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee createdEmployee = service.addEmployee(employee);
        return ResponseEntity.status(201).body(createdEmployee);
    }

}
