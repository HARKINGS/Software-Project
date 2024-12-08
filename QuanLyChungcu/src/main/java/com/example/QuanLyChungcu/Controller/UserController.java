package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.DTO.*;
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

    // Lấy danh sách user(chỉ admin mới được dùng)
    @GetMapping("/admin/Users")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> getListUser() {
        return userService.getListUser();
    }

    // Tạo user mới (chỉ admin mới được dùng)
    @PostMapping("/admin/Users")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO createUser(@RequestBody @Valid UserDTO userDTO) {
        return userService.createUser(userDTO);
    }

    // Sửa thông tin user(chỉ admin mới được dùng)
    @PutMapping("/admin/Users/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return userService.updateUser(id, userDTO);
    }

    // Xóa user(Chỉ admin mới được dùng)
    @DeleteMapping("/admin/Users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // Đổi mật khẩu (chỉ user mới được dùng)
    @PutMapping("/user/changePassword")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO changePasswordUser(@RequestBody @Valid changePasswordDTO changePasswordDTO) {
        return userService.changePasswordUser(changePasswordDTO.getOldPassword(), changePasswordDTO.getNewPassword());
    }

    // Lấy thông tin cá nhân của user
    @GetMapping("/user/getInfo")
    @ResponseStatus(HttpStatus.OK)
    public ResidentDTO getInfoUser() {
        return userService.getInfoUser();
    }

    // Lấy thông tin hộ khẩu của user
    @GetMapping("/user/getInfoHousehold")
    @ResponseStatus(HttpStatus.OK)
    public HouseholdDTO getInfoHousehold() {
        return userService.getInfoHousehold();
    }

    // Lấy danh sách nhân khẩu của hộ khẩu của user
    @GetMapping("/user/getListResident")
    @ResponseStatus(HttpStatus.OK)
    public List<ResidentDTO> getListResident() {
        return userService.getListResident();
    }

    // Lấy danh sách khoản thu của hộ khẩu của user
    @GetMapping("/user/getListFee")
    @ResponseStatus(HttpStatus.OK)
    public List<FeeDTO> getListFee(){
        return userService.getListFee();
    }

    // Lấy danh sách đóng góp tình nguyện của hộ khẩu của user
    @GetMapping("/user/getListContribution")
    @ResponseStatus(HttpStatus.OK)
    public List<ContributionDTO> getListContribution() {
        return userService.getListContribution();
    }
}
