package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Contribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contribution_id")
    Long contributionId; // ID khoản đóng góp

    @NotBlank(message = "Loại đóng góp không được trống")
    @Column(name = "contribution_type", nullable = false, length = 50)
    String contributionType; // Loại đóng góp

    @Positive(message = "Số tiền phải lớn hơn 0")
    @Column(name = "amount", nullable = false)
    double amount; // Số tiền đóng góp

    @NotNull(message = "Ngày đóng góp không được để trống")
    @Column(name = "date_contributed", nullable = false)
    LocalDate dateContributed; // Ngày đóng góp

    @ManyToOne
    @JoinColumn(name = "household_id", nullable = false)
    Household Household_contribution; // Quan hệ với hộ gia đình
}
