package com.example.QuanLyChungcu.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {
    @GetMapping("/login")
    public String login() {
        return "login";  // Trả về trang login.html
    }

    @GetMapping("/admin")
    public String admin() {
        return "Home";  // Trả về trang admin.html
    }

    @GetMapping("/user")
    public String user() {
        return "residentUser";   // Trả về trang user.html
    }
}
