package com.example.QuanLyChungcu.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @NotNull(message = "Phải khai báo thường trú hay tạm trú")
    @Column(name = "temporary", nullable = false)
    private Boolean temporary;

    @ManyToOne
    @JoinColumn(name = "household_id")
    private Household Household_resident;

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

    public boolean isTemporary() {
        return temporary;
    }

    public void setTemporary(boolean temporary) {
        this.temporary = temporary;
    }

    public Household getHousehold_resident() {
        return Household_resident;
    }

    public void setHousehold_resident(Household household_resident) {
        Household_resident = household_resident;
    }
}