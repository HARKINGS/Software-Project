package com.example.QuanLyChungcu.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.QuanLyChungcu.Service.LoginServiceImpl;
import com.example.QuanLyChungcu.DTO.UserLoginDTO;

import java.util.List;

@Controller
public class LoginController {

    private final LoginServiceImpl loginService;

    private UserLoginDTO currentUser;

    @Autowired
    public LoginController(LoginServiceImpl _loginService) {
        this.loginService = _loginService;
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String loginPage() {
        if(currentUser != null)
            return "redirect:/home";
        return "login";
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String homePage() {
        if(currentUser == null)
            return "redirect:/login";
        return "home";
    }

    @RequestMapping(value = "/loginForm", method = RequestMethod.POST)
    public String postLogin(@RequestParam("username") String _username, 
                            @RequestParam("password") String _password){

        UserLoginDTO newLoginRequest = new UserLoginDTO(_username,_password);
        if(loginService.checkValid(newLoginRequest)){
            currentUser = newLoginRequest;
            return "redirect:/home";
        }
        else
            return "redirect:/error";
    }
}