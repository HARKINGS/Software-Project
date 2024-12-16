package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.ParkingFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingFeeRepository extends JpaRepository<ParkingFee, Long> {
    @Query("SELECT p FROM ParkingFee p WHERE p.household_parking.householdId = :householdId")
    List<ParkingFee> findParkingFeesByHouseholdId(Long householdId);
}
