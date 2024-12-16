package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class HistoryParkingFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "historyParkingFee_id")
    Long historyParkingFeeId;

    @Column(name = "Amount", nullable = false)
    double soTien;

    @Column(name = "Payment_date", nullable = false)
    LocalDate ngayThu;

    @ManyToOne
    @JoinColumn(name = "parkingFee_id", nullable = false)
    ParkingFee history_parkingFee;
}
