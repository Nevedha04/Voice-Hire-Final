package com.example.VoiceHire.Repo;

import com.example.VoiceHire.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepo  extends JpaRepository<Employee, Integer> {






}