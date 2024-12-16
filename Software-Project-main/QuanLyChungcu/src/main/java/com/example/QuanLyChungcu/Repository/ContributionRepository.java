package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContributionRepository extends JpaRepository<Contribution, Long> {
    @Query("SELECT c FROM Contribution c WHERE c.Household_contribution.householdId = :householdId")
    List<Contribution> findContributionsByHouseholdId(Long householdId);
}
