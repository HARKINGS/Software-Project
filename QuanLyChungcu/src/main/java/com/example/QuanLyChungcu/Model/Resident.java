package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
public class Resident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resident_id")
    private Long residentId;

    @NotBlank(message = "Tên không được để trống")
    @Column(name = "name", nullable = false, length = 30)
    private String name;

    @NotNull(message = "Ngày sinh không được để trống")
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @NotBlank(message = "Số CCCD không được để trống")
    @Column(name = "id_card", nullable = false, length = 20)
    private String idCard;

    @NotBlank(message = "Giới tính không được để trống")
    @Column(name = "Sex", nullable = false, length = 20)
    private String gender;

    @NotBlank(message = "Sdt không được để trống")
    @Column(name = "Phone", nullable = false, length = 20)
    private String phone_number;

    @NotNull(message = "Phải khai báo thường trú hay tạm trú")
    @Column(name = "temporary", nullable = false)
    private String temporary;

    @ManyToOne
    @JoinColumn(name = "household_id")
    private Household Household_resident;

    @OneToOne(mappedBy = "userOfResident", cascade = CascadeType.ALL, orphanRemoval = true)
    private Users user;

    public Long getResidentId() {
        return residentId;
    }

    public void setResidentId(Long residentId) {
        this.residentId = residentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getTemporary() {
        return temporary;
    }

    public void setTemporary(String temporary) {
        this.temporary = temporary;
    }

    public Household getHousehold_resident() {
        return Household_resident;
    }

    public void setHousehold_resident(Household household_resident) {
        Household_resident = household_resident;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }
}