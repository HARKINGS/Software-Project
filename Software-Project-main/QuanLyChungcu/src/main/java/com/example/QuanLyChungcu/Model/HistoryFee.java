package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class HistoryFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "historyFee_id")
    Long historyFeeId;

    @Column(name = "Amount", nullable = false)
    double soTien;

    @Column(name = "Payment_date", nullable = false)
    LocalDate ngayThu;

    @ManyToOne
    @JoinColumn(name = "fee_id", nullable = false)
    Fee history_fee;
}
