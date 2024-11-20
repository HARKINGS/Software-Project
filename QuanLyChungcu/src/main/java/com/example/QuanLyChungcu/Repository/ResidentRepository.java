package com.example.QuanLyChungcu.Repository;


import com.example.QuanLyChungcu.Model.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Long> {
    List<Resident> findByHouseholdId(String householdId);
    Resident findByIdCard(String idCard);
}
