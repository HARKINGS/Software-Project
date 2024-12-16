package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Household {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "household_id")
    Long householdId; // Id

    @NotBlank(message = "Số nhà không được trống")
    @Column(name = "household_number",nullable = false, length = 50)
    String householdNumber; // Số nhà

    @Positive(message = "Diện tích căn hộ không được trống và phải lớn hơn 0")
    @Column(name = "apartment_size", nullable = false)
    double apartmentSize; // Diện tích

    @Column(name = "num_cars", nullable = true)
    Long numCars;

    @Column(name = "num_motors", nullable = true)
    Long numMotors;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id", referencedColumnName = "resident_id", nullable = true)
    Resident chuHo;

    @OneToMany(mappedBy = "Household_resident", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Resident> residents;

    @OneToMany(mappedBy = "Household_contribution", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Contribution> contributions;

    @OneToMany(mappedBy = "Household_fee", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Fee> fees;

    @OneToMany(mappedBy = "household_parking", cascade = CascadeType.ALL, orphanRemoval = true)
    List<ParkingFee> parkingFees;
}