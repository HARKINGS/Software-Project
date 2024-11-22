package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContributionRepository extends JpaRepository<Contribution, Long> {
}
