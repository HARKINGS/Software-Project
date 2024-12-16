package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class ParkingFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parkingFee_id")
    private Long parkingFeeId;

    @Column(name = "number_motor", nullable = false)
    private Long numberMotor;

    @Column(name = "number_car", nullable = false)
    private Long numberCar;

    @Column(name = "amount", nullable = false)
    private double amount;

    @Column(name = "collect_amount", nullable = false)
    private double collectAmount;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "paid", nullable = false)
    private Boolean paid;

    @ManyToOne
    @JoinColumn(name = "household_id", nullable = false)
    private Household household_parking;

    @OneToMany(mappedBy = "history_parkingFee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HistoryParkingFee> historyParkingFeeList;

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

    public Household getHousehold_parking() {
        return household_parking;
    }

    public void setHousehold_parking(Household household_parking) {
        this.household_parking = household_parking;
    }
}
