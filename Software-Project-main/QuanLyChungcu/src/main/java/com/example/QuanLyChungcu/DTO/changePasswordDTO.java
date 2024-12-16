package com.example.QuanLyChungcu.DTO;


import jakarta.validation.constraints.NotBlank;

public class changePasswordDTO {
    @NotBlank(message = "Mat khau cu khong duoc null")
    private String oldPassword;

    @NotBlank(message = "Mat khau moi khong duoc null")
    private String newPassword;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
