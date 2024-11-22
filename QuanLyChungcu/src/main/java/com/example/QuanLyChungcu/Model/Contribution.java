package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

@Entity
public class Contribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contribution_id")
    private Long contributionId; // ID khoản đóng góp

    @NotBlank(message = "Loại đóng góp không được trống")
    @Column(name = "contribution_type", nullable = false, length = 50)
    private String contributionType; // Loại đóng góp

    @Positive(message = "Số tiền phải lớn hơn 0")
    @Column(name = "amount", nullable = false)
    private double amount; // Số tiền đóng góp

    @NotNull(message = "Ngày đóng góp không được để trống")
    @Column(name = "date_contributed", nullable = false)
    private LocalDate dateContributed; // Ngày đóng góp

    @ManyToOne
    @JoinColumn(name = "household_id", nullable = false)
    private Household Household_contribution; // Quan hệ với hộ gia đình

    // Getters và setters
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

    public Household getHousehold_contribution() {
        return Household_contribution;
    }

    public void setHousehold_contribution(Household household_contribution) {
        Household_contribution = household_contribution;
    }
}
