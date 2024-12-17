package com.example.QuanLyChungcu.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

@JsonIgnoreProperties(value = {"id"}, allowGetters = true)
public class ContributionDTO {
    private Long contributionId;

    @NotBlank(message = "Loại đóng góp không được trống")
    private String contributionType;

    @Positive(message = "Số tiền phải lớn hơn 0")
    private double amount;

    @NotNull(message = "Ngày đóng góp không được để trống")
    private LocalDate dateContributed;

    @NotNull(message = "Id hộ khẩu không được để trống")
    private Long householdId;

    public Long getContributionId() {
        return contributionId;
    }

    public void setContributionId(Long contributionId) {
        this.contributionId = contributionId;
    }

    public String getContributionType() {
        return contributionType;
    }

    public void setContributionType(String contributionType) {
        this.contributionType = contributionType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getDateContributed() {
        return dateContributed;
    }

    public void setDateContributed(LocalDate dateContributed) {
        this.dateContributed = dateContributed;
    }

    public Long getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(Long householdId) {
        this.householdId = householdId;
    }
}
