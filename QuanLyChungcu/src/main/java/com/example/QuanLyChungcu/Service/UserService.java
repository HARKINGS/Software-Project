package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.*;

import java.util.List;

public interface UserService {
    public List<UserDTO> getListUser();
    public UserDTO createUser(UserDTO userDTO);
    public UserDTO updateUser(Long residentId, UserDTO userDTO);
    public void deleteUser(Long residentId);
    public UserDTO changePasswordUser(String oldPassword, String newPassword);
    public ResidentDTO getInfoUser();
    public HouseholdDTO getInfoHousehold();
    public List<ResidentDTO> getListResident();
    public List<FeeDTO> getListFee();
    public List<ContributionDTO> getListContribution();
}
