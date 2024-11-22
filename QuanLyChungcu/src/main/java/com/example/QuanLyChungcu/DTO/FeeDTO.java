package com.example.QuanLyChungcu.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

@JsonIgnoreProperties(value = {"id"}, allowGetters = true)
public class FeeDTO {
    private Long feeId;

    @NotBlank(message = "Loại phí không được để trống")
    private String feeType;

    @Positive(message = "Số tiền phải lớn hơn 0")
    private double amount;

    @NotNull(message = "Ngày hạn thanh toán không được để trống")
    private LocalDate dueDate;

    @NotNull(message = "Trạng thái thanh toán không được để trống")
    private Boolean paid;

    @NotNull(message = "Id hộ khẩu không được để trống")
    private Long householdId;

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

    public Boolean getPaid() {
        return paid;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public Long getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(Long householdId) {
        this.householdId = householdId;
    }
}
