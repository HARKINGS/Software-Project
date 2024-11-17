package com.example.QuanLyChungcu.Service;


import com.example.QuanLyChungcu.Exception.ConflictException;
import com.example.QuanLyChungcu.Exception.ResourceNotFoundException;
import com.example.QuanLyChungcu.Model.Household;
import com.example.QuanLyChungcu.Repository.HouseholdRepository;
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
    public List<Household> getAllHouseholds() {
        return householdRepository.findAll();
    }

    @Override
    public Household getHouseholdById(int id) {
        return householdRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy hộ khẩu có id đó"));
    }

    @Override
    public Household createHousehold(Household Household) {
        Optional<Household> findHousehold = householdRepository.findByHouseholdNumber(Household.getHouseholdNumber());
        if(findHousehold.isPresent()) {
            throw new ConflictException("Số nhà đã tồn tại");
        }else {
            return householdRepository.save(Household);
        }
    }

    @Override
    public Household updateHousehold(int id, Household Household) {
        Optional<Household> findHousehold = householdRepository.findById(id);
        if(findHousehold.isPresent()) {
            Household householdToUpdate = findHousehold.get();
            householdToUpdate.setHouseholdNumber(Household.getHouseholdNumber());
            householdToUpdate.setOwnerName(Household.getOwnerName());
            householdToUpdate.setPhoneNumber(Household.getPhoneNumber());
            householdToUpdate.setApartmentSize(Household.getApartmentSize());
            return householdRepository.save(householdToUpdate);
        }else {
            throw new ResourceNotFoundException("Không tìm thấy hộ khẩu có id đó");
        }
    }

    @Override
    @Transactional
    public void deleteHousehold(int id) {
        Optional<Household> findHousehold = householdRepository.findById(id);
        if (findHousehold.isPresent()) {
            householdRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Không tìm thấy hộ khẩu có id đó");
        }
    }
}

