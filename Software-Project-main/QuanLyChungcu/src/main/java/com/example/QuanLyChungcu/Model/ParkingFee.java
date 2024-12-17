package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class ParkingFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parkingFee_id")
    Long parkingFeeId;

    @Column(name = "number_motor", nullable = false)
    Long numberMotor;

    @Column(name = "number_car", nullable = false)
    Long numberCar;

    @Column(name = "amount", nullable = false)
    double amount;

    @Column(name = "collect_amount", nullable = false)
    double collectAmount;

    @Column(name = "due_date", nullable = false)
    LocalDate dueDate;

    @Column(name = "paid", nullable = false)
    Boolean paid;

    @ManyToOne
    @JoinColumn(name = "household_id", nullable = false)
    Household household_parking;

    @OneToMany(mappedBy = "history_parkingFee", cascade = CascadeType.ALL, orphanRemoval = true)
    List<HistoryParkingFee> historyParkingFeeList;
}
