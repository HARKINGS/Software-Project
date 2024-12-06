package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.ResidentDTO;
import com.example.QuanLyChungcu.DTO.UserDTO;

public interface UserService {
    public UserDTO createUser(UserDTO userDTO);
    public UserDTO updateUser(String password);
    public ResidentDTO getInfoUser();
}
