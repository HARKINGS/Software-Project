package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class HisrotyParkingFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "historyParkingFee_id")
    private Long historyParkingFeeId;

    @Column(name = "Amount", nullable = false)
    private double soTien;

    @Column(name = "Payment_date", nullable = false)
    private LocalDate ngayThu;

    @ManyToOne
    @JoinColumn(name = "parkingFee_id", nullable = false)
    private ParkingFee history_parkingFee;


    public Long getHistoryParkingFeeId() {
        return historyParkingFeeId;
    }

    public void setHistoryParkingFeeId(Long historyParkingFeeId) {
        this.historyParkingFeeId = historyParkingFeeId;
    }

    public double getSoTien() {
        return soTien;
    }

    public void setSoTien(double soTien) {
        this.soTien = soTien;
    }

    public LocalDate getNgayThu() {
        return ngayThu;
    }

    public void setNgayThu(LocalDate ngayThu) {
        this.ngayThu = ngayThu;
    }

    public ParkingFee getHistory_parkingFee() {
        return history_parkingFee;
    }

    public void setHistory_parkingFee(ParkingFee history_parkingFee) {
        this.history_parkingFee = history_parkingFee;
    }
}
