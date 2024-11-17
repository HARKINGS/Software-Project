package harkins.code.software.services;

import harkins.code.software.models.household;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface HouseholdService {
    public List<household> getAllHouseholds();
    public household getHouseholdById(int id);
    public household createHousehold(household Household);
    public household updateHousehold(int id, household Household);
    public void deleteHousehold(int id);
}
