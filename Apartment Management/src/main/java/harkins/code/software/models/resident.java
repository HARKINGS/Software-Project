package harkins.code.software.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Resident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resident_id")
    private int residentId;

    @Column(name = "name", nullable = false, length = 30)
    private String name;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "id_card", nullable = false, length = 20)
    private String idCard;

    @Column(name = "temporary", nullable = false)
    private boolean temporary;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "household_id")
    private Household Household_resident;

    public int getResidentId() {
        return residentId;
    }

    public void setResidentId(int residentId) {
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