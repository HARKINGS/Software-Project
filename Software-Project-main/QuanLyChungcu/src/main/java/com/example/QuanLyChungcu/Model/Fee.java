package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class Fee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fee_id")
    Long feeId; // ID khoản phí

    @NotBlank(message = "Loại phí không được để trống")
    @Column(name = "fee_type", nullable = false, length = 50)
    String feeType; // Loại phí

    @Positive(message = "Số tiền phải lớn hơn 0")
    @Column(name = "amount", nullable = false)
    double amount; // Số tiền cần thu

    @Column(name = "collectAmount", nullable = false)
    double collectAmount;

    @NotNull(message = "Ngày hạn thanh toán không được để trống")
    @Column(name = "due_date", nullable = false)
    LocalDate dueDate; // Ngày hạn thanh toán

    @Column(name = "paid", nullable = false)
    boolean paid; // Đã thanh toán hay chưa

    @ManyToOne
    @JoinColumn(name = "household_id", nullable = false)
    Household Household_fee; // Quan hệ với hộ gia đình

    @OneToMany(mappedBy = "history_fee", cascade = CascadeType.ALL, orphanRemoval = true)
    List<HistoryFee> historyFeeList;
}
