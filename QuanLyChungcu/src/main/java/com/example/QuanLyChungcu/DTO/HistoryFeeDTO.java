package com.example.QuanLyChungcu.DTO;

import java.time.LocalDate;

public class HistoryFeeDTO {
    private Long historyFeeId;

    private double soTien;

    private LocalDate ngayThu;

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
}
