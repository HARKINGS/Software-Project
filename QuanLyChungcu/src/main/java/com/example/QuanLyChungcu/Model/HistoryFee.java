package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class HistoryFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "historyFee_id")
    private Long historyFeeId;

    @Column(name = "Amount", nullable = false)
    private double soTien;

    @Column(name = "Payment_date", nullable = false)
    private LocalDate ngayThu;

    @ManyToOne
    @JoinColumn(name = "fee_id", nullable = false)
    private Fee history_fee;

    public Long getHistoryFeeId() {
        return historyFeeId;
    }

    public void setHistoryFeeId(Long historyFeeId) {
        this.historyFeeId = historyFeeId;
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

    public Fee getHistory_fee() {
        return history_fee;
    }

    public void setHistory_fee(Fee history_fee) {
        this.history_fee = history_fee;
    }
}
