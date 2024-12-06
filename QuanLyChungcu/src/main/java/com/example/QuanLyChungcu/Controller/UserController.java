package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.DTO.HouseholdDTO;
import com.example.QuanLyChungcu.DTO.ResidentDTO;
import com.example.QuanLyChungcu.DTO.UserDTO;
import com.example.QuanLyChungcu.Service.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    // Tạo user mới (chỉ admin mới được dùng)
    @PostMapping("/admin/createUser")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO createUser(@RequestBody @Valid UserDTO userDTO) {
        return userService.createUser(userDTO);
    }

    // Đổi tên tài khoản hoặc mật khẩu (chỉ user mới được dùng
    @PutMapping("/user/updateUser")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO updateUser(String password) {
        return userService.updateUser(password);
    }

    @GetMapping("/user/getInfo")
    @ResponseStatus(HttpStatus.OK)
    public ResidentDTO getInfoUser() {
        return userService.getInfoUser();
    }

    @GetMapping("/user/getInfoHousehold")
    @ResponseStatus(HttpStatus.OK)
    public HouseholdDTO getInfoHousehold() {
        return userService.getInfoHousehold();
    }

    @GetMapping("/user/getListResident")
    @ResponseStatus(HttpStatus.OK)
    public List<ResidentDTO> getListResident() {
        return userService.getListResident();
    }
}
