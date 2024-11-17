package harkins.code.software.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;


@Entity
public class household {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "household_id")
    private int householdId; // Id

    @NotBlank(message = "Số nhà không được trống")
    @Column(name = "household_number",nullable = false, length = 50)
    private String householdNumber; // Số nhà

    @NotBlank(message = "Tên chủ hộ không được trống")
    @Column(name = "owner_name",nullable = false, length = 30)
    private String ownerName;// Tên chủ hộ

    @NotBlank(message = "Số điện thoại không được trống")
    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber; // SĐT

    @Positive(message = "Diện tích căn hộ không được trống và phải lớn hơn 0")
    @Column(name = "apartment_size", nullable = false)
    private double apartmentSize; // Diện tích

    @JsonIgnore
    @OneToMany(mappedBy = "Household_resident", cascade = CascadeType.ALL)
    private List<resident> Residents;

    public int getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(int householdId) {
        this.householdId = householdId;
    }

    public String getHouseholdNumber() {
        return householdNumber;
    }

    public void setHouseholdNumber(String householdNumber) {
        this.householdNumber = householdNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
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

    public List<resident> getResidents() {
        return Residents;
    }

    public void setResidents(List<resident> residents) {
        Residents = residents;
    }
}
