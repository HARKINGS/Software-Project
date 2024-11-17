package com.example.QuanLyChungcu.Service;


import com.example.QuanLyChungcu.Model.Household;

import java.util.List;

public interface HouseholdService {
    public List<Household> getAllHouseholds();
    public Household getHouseholdById(int id);
    public Household createHousehold(Household Household);
    public Household updateHousehold(int id, Household Household);
    public void deleteHousehold(int id);
}

