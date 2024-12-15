package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "Username")
    private String username;

    @Column(name = "Password")
    private String password;

    @Column(name = "Role")
    private String role;

    @OneToOne
    @JoinColumn(name = "residentId", referencedColumnName = "resident_id", nullable = true)
    private Resident userOfResident;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Resident getUserOfResident() {
        return userOfResident;
    }

    public void setUserOfResident(Resident userOfResident) {
        this.userOfResident = userOfResident;
    }
}
