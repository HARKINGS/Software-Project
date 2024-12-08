package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Long> {
    Optional<Resident> findByCccd(String cccd);
    @Query("SELECT r FROM Resident r WHERE r.Household_resident.householdId = :householdId")
    List<Resident> findResidentsByHouseholdId(Long householdId);
}
