package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.HisrotyParkingFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryParkingFeeRepository extends JpaRepository<HisrotyParkingFee, Long> {
    @Query("SELECT hpf FROM HisrotyParkingFee hpf WHERE hpf.history_parkingFee.parkingFeeId = :parkingFeeId")
    List<HisrotyParkingFee> findByParkingFeeId(Long parkingFeeId);
}
