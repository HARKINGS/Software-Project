package com.example.QuanLyChungcu.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class HouseholdDTO {

    private Long householdId;

    @NotBlank(message = "Số nhà không được trống")
    private String householdNumber;

    @Positive(message = "Diện tích căn hộ không được trống và phải lớn hơn 0")
    private double apartmentSize;

    @Valid
    private OtherResidentDTO chuHo;

    public Long getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(Long householdId) {
        this.householdId = householdId;
    }

    public String getHouseholdNumber() {
        return householdNumber;
    }

    public void setHouseholdNumber(String householdNumber) {
        this.householdNumber = householdNumber;
    }

    public double getApartmentSize() {
        return apartmentSize;
    }

    public void setApartmentSize(double apartmentSize) {
        this.apartmentSize = apartmentSize;
    }

    public OtherResidentDTO getChuHo() {
        return chuHo;
    }

    public void setChuHo(OtherResidentDTO chuHo) {
        this.chuHo = chuHo;
    }
}
