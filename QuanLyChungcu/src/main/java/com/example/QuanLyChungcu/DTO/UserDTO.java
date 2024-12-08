package com.example.QuanLyChungcu.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UserDTO {
    private Long id;

    @NotBlank(message = "Tên tài khoản không được trống")
    private String username;

    @NotBlank(message = "Mật khấu không được trống")
    private String password;

    @NotBlank(message = "Phải có role")
    private String role;

    @NotNull(message = "Phải liên kết với resident thông qua residentId")
    private Long residentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getResidentId() {
        return residentId;
    }

    public void setResidentId(Long residnetId) {
        this.residentId = residnetId;
    }
}
