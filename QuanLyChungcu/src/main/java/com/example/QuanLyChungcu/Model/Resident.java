package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "resident")
public class Resident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resident_id")
    private Long residentId;

    @NotNull(message = "Household ID is mandatory")
    @Column(name = "house_number", nullable = false)
    private String householdId;

    @NotNull(message = "Name is mandatory")
    @Size(min = 2, message = "Name must be at least 2 characters long")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "Date of birth is mandatory")
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @NotNull(message = "ID card is mandatory")
    @Pattern(regexp = "^[0-9]{9}$", message = "ID card must be 9 digits")
    @Column(name = "id_card", nullable = false, unique = true)
    private String idCard;

    @NotNull(message = "Temporary status is mandatory")
    @Column(nullable = false)
    private boolean temporary;
}

