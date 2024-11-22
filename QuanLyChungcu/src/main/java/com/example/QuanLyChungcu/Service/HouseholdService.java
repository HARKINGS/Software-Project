package com.example.QuanLyChungcu.Service;


import com.example.QuanLyChungcu.DTO.HouseholdDTO;
import com.example.QuanLyChungcu.Model.Household;

import java.util.List;

public interface HouseholdService {
    public List<HouseholdDTO> getAllHouseholds();
    public HouseholdDTO getHouseholdById(Long id);
    public HouseholdDTO createHousehold(HouseholdDTO householdDTO);
    public HouseholdDTO updateHousehold(Long id, HouseholdDTO householdDTO);
    public void deleteHousehold(Long id);
}

