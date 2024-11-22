package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Long> {
    Optional<Resident> findByIdCard(String idCard);
}
