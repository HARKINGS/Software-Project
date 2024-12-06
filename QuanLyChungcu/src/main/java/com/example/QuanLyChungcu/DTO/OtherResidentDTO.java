package com.example.QuanLyChungcu.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class OtherResidentDTO {
    private Long residentId;
    @NotBlank(message = "Tên không được để trống")
    private String name;
    @NotNull(message = "Ngày sinh không được để trống")
    private LocalDate dateOfBirth;
    @NotBlank(message = "Số CCCD không được để trống")
    private String idCard;
    @NotNull(message = "Phải khai báo thường trú hay tạm trú")
    private Boolean temporary;

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

    public Boolean getTemporary() {
        return temporary;
    }

    public void setTemporary(Boolean temporary) {
        this.temporary = temporary;
    }
}
