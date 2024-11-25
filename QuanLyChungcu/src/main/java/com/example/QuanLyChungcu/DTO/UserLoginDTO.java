package com.example.QuanLyChungcu.DTO;

import jakarta.validation.constraints.NotBlank;

public class UserLoginDTO {

    @NotBlank(message = "Username không được trống")
    private String username;

    @NotBlank(message = "Password không được trống")
    private String password;

    public UserLoginDTO(String _username, String _password){
        this.username = _username;
        this.password = _password;
    }

    public String getUsername(){
        return this.username;
    }

    public void setUsername(String _username){
        this.username = _username;
    }

    public String getPassword(){
        return this.password;
    }

    public void setPassword(String _password){
        this.password = _password;
    }

    public String toString(){
        return "username is: " + this.username +" password is: " + this.password; 
    }

    //for demo only
    public boolean valid(){
        if(this.username.equals("admin")&&this.password.equals("admin"))
            return true;
        return false;
    }
}
