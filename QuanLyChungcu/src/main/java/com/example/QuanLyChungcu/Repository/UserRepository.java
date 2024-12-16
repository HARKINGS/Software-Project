package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);

    @Query("SELECT u FROM Users u WHERE u.userOfResident.residentId = :residentId")
    Optional<Users> findUserByResidentId(Long residentId);

    List<Users> findByRole(String role);
}
