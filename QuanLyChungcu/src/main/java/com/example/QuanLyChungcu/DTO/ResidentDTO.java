package com.example.QuanLyChungcu.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class ResidentDTO {
    private Long residentId;
    @NotBlank(message = "Tên không được để trống")
    private String name;
    @NotNull(message = "Ngày sinh không được để trống")
    private LocalDate dateOfBirth;
    @NotBlank(message = "Số CCCD không được để trống")
    private String idCard;
    @NotNull(message = "Phải khai báo thường trú hay tạm trú")
    private Boolean temporary;
    @NotNull(message = "Id hộ khẩu không được để trống")
    private Long householdId;

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

    public Long getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(Long householdId) {
        this.householdId = householdId;
    }
}
