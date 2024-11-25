package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.UserLoginDTO;

import java.util.List;

public interface LoginService {
    public boolean checkValid(UserLoginDTO loginRequest);
}
