package com.example.QuanLyChungcu.DTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public class ParkingFeeDTO {
    private Long parkingFeeId;

    @Positive(message = "So xe may phai lon hon 0")
    private Long numberMotor;

    @Positive(message = "So o to phai lon hon 0")
    private Long numberCar;

    @Positive(message = "So tien phai lon hon 0")
    private double amount;

    @NotNull(message = "So tien da tra khong duoc trong")
    private double collectAmount;

    @NotNull(message = "Han thu khong duoc trong")
    private LocalDate dueDate;

    @NotNull(message = "Trang thai khong duoc trong")
    private Boolean paid;

    @NotNull(message = "Phai co id ho khau")
    private Long householdId;

    public Long getParkingFeeId() {
        return parkingFeeId;
    }

    public void setParkingFeeId(Long parkingFeeId) {
        this.parkingFeeId = parkingFeeId;
    }

    public Long getNumberMotor() {
        return numberMotor;
    }

    public void setNumberMotor(Long numberMotor) {
        this.numberMotor = numberMotor;
    }

    public Long getNumberCar() {
        return numberCar;
    }

    public void setNumberCar(Long numberCar) {
        this.numberCar = numberCar;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getCollectAmount() {
        return collectAmount;
    }

    public void setCollectAmount(double collectAmount) {
        this.collectAmount = collectAmount;
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
