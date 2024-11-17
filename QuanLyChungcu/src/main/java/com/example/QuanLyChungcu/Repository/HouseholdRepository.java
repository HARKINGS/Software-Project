package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.Household;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HouseholdRepository extends JpaRepository<Household, Integer> {
    Optional<Household> findByHouseholdNumber(String household_number);
}

