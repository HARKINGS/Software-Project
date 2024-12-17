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
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long notificationId;

    @Column(name = "Title", nullable = false)
    String title;

    @Column(name = "Content", nullable = false)
    String content;

    @Column(name = "Date", nullable = false)
    LocalDate date;
}
