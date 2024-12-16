package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {
    @Query("SELECT f FROM Fee f WHERE f.Household_fee.householdId = :householdId")
    List<Fee> findFeesByHouseholdId(Long householdId);

}
