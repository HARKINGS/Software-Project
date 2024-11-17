package harkins.code.software.services;

import harkins.code.software.exception.ConflictException;
import harkins.code.software.exception.ResourceNotFoundException;
import harkins.code.software.models.household;
import harkins.code.software.repository.HouseholdRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HouseholdServiceImpl implements HouseholdService{
    private HouseholdRepository householdRepository;

    @Autowired
    public HouseholdServiceImpl(HouseholdRepository householdRepository) {
        this.householdRepository = householdRepository;
    }

    @Override
    public List<household> getAllHouseholds() {
        return householdRepository.findAll();
    }

    @Override
    public household getHouseholdById(int id) {
        return householdRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy hộ khẩu có id: "+id));
    }

    @Override
    public household createHousehold(household Household) {
        Optional<household> findHousehold = householdRepository.findByHouseholdNumber(Household.getHouseholdNumber());
        if(findHousehold.isPresent()) {
            throw new ConflictException("Số nhà đã tồn tại");
        }else {
            return householdRepository.save(Household);
        }
    }

    @Override
    public household updateHousehold(int id, household Household) {
        Optional<household> findHousehold = householdRepository.findById(id);
        if(findHousehold.isPresent()) {
            household householdToUpdate = findHousehold.get();
            householdToUpdate.setHouseholdNumber(Household.getHouseholdNumber());
            householdToUpdate.setOwnerName(Household.getOwnerName());
            householdToUpdate.setPhoneNumber(Household.getPhoneNumber());
            householdToUpdate.setApartmentSize(Household.getApartmentSize());
            return householdRepository.save(householdToUpdate);
        }else {
            throw new ResourceNotFoundException("Không tìm thấy hộ khẩu có id: "+id);
        }
    }

    @Override
    @Transactional
    public void deleteHousehold(int id) {
        Optional<household> findHousehold = householdRepository.findById(id);
        if (findHousehold.isPresent()) {
            householdRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Không tìm thấy hộ khẩu có id: "+id);
        }
    }
}
