package com.example.QuanLyChungcu.Repository;

import com.example.QuanLyChungcu.Model.HistoryFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryFeeRepository extends JpaRepository<HistoryFee, Long> {
    @Query("SELECT h FROM HistoryFee h WHERE h.history_fee.feeId = :feeId")
    List<HistoryFee> findHistoryFeesByFeeId(Long feeId);
}
