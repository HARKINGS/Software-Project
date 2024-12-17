package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Resident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resident_id")
    Long residentId;

    @NotBlank(message = "Tên không được để trống")
    @Column(name = "name", nullable = false, length = 30)
    String name;

    @NotNull(message = "Ngày sinh không được để trống")
    @Column(name = "date_of_birth", nullable = false)
    LocalDate dateOfBirth;

    @NotBlank(message = "Giới tính không được trống")
    @Column(name = "sex", nullable = false)
    String gender;

    @Column(name = "phone", nullable = true)
    String phoneNumber;

    @NotBlank(message = "Số CCCD không được để trống")
    @Column(name = "CCCD", nullable = false, length = 20)
    String cccd;

    @NotBlank(message = "Phải có quan hệ với chủ hộ")
    @Column(name = "Quan he voi chu ho", nullable = false)
    String relationship;

    @NotNull(message = "Phải khai báo thường trú hay tạm trú")
    @Column(name = "temporary", nullable = false)
    String temporary;

    @ManyToOne
    @JoinColumn(name = "household_id")
    Household Household_resident;

    @OneToOne(mappedBy = "userOfResident", cascade = CascadeType.REMOVE, orphanRemoval = true)
    Users user;
}