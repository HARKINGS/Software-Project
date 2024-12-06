package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.util.List;

@Entity
public class Household {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "household_id")
    private Long householdId; // Id

    @Column(name = "owner_name",nullable = false, length = 30)
    private String tenChuHo;// Tên chủ hộ

    @NotBlank(message = "Số nhà không được trống")
    @Column(name = "household_number",nullable = false, length = 50)
    private String householdNumber; // Số nhà

    @NotBlank(message = "Số điện thoại không được trống")
    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber; // SĐT

    @Positive(message = "Diện tích căn hộ không được trống và phải lớn hơn 0")
    @Column(name = "apartment_size", nullable = false)
    private double apartmentSize; // Diện tích

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id", referencedColumnName = "resident_id", nullable = true)
    private Resident chuHo;

    @OneToMany(mappedBy = "Household_resident", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Resident> residents;

    @OneToMany(mappedBy = "Household_contribution", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contribution> contributions;

    @OneToMany(mappedBy = "Household_fee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Fee> fees;

    public Long getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(Long householdId) {
        this.householdId = householdId;
    }

    public String getTenChuHo() {
        return tenChuHo;
    }

    public void setTenChuHo(String tenChuHo) {
        this.tenChuHo = tenChuHo;
    }

    public String getHouseholdNumber() {
        return householdNumber;
    }

    public void setHouseholdNumber(String householdNumber) {
        this.householdNumber = householdNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public double getApartmentSize() {
        return apartmentSize;
    }

    public void setApartmentSize(double apartmentSize) {
        this.apartmentSize = apartmentSize;
    }

    public Resident getChuHo() {
        return chuHo;
    }

    public void setChuHo(Resident chuHo) {
        this.chuHo = chuHo;
    }
}