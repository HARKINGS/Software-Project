package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.HouseholdDTO;
import com.example.QuanLyChungcu.DTO.ResidentDTO;
import com.example.QuanLyChungcu.DTO.UserDTO;

import java.util.List;

public interface UserService {
    public UserDTO createUser(UserDTO userDTO);
    public UserDTO updateUser(String password);
    public ResidentDTO getInfoUser();
    public HouseholdDTO getInfoHousehold();
    public List<ResidentDTO> getListResident();
}
