package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    Long id;

    @Column(name = "Username")
    String username;

    @Column(name = "Password")
    String password;

    @Column(name = "Role")
    String role;

    @OneToOne
    @JoinColumn(name = "residentId", referencedColumnName = "resident_id", nullable = true)
    Resident userOfResident;
}
