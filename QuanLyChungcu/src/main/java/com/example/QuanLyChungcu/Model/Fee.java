package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

@Entity
public class Fee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fee_id")
    private Long feeId; // ID khoản phí

    @NotBlank(message = "Loại phí không được để trống")
    @Column(name = "fee_type", nullable = false, length = 50)
    private String feeType; // Loại phí

    @Positive(message = "Số tiền phải lớn hơn 0")
    @Column(name = "amount", nullable = false)
    private double amount; // Số tiền cần thu

    @NotNull(message = "Ngày hạn thanh toán không được để trống")
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate; // Ngày hạn thanh toán

    @Column(name = "paid", nullable = false)
    private boolean paid; // Đã thanh toán hay chưa

    @ManyToOne
    @JoinColumn(name = "household_id", nullable = false)
    private Household Household_fee; // Quan hệ với hộ gia đình

    // Getters và setters
    public Long getFeeId() {
        return feeId;
    }

    public void setFeeId(Long feeId) {
        this.feeId = feeId;
    }

    public String getFeeType() {
        return feeType;
    }

    public void setFeeType(String feeType) {
        this.feeType = feeType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public Household getHousehold_fee() {
        return Household_fee;
    }

    public void setHousehold_fee(Household household_fee) {
        Household_fee = household_fee;
    }
}
