package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.HistoryParkingFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryParkingFeeRepository extends JpaRepository<HistoryParkingFee, Long> {
    @Query("SELECT hpf FROM HistoryParkingFee hpf WHERE hpf.history_parkingFee.parkingFeeId = :parkingFeeId")
    List<HistoryParkingFee> findByParkingFeeId(Long parkingFeeId);
}
