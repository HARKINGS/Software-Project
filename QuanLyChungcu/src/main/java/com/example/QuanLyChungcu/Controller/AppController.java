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
        return "redirect:/admin/Home";
    }

    @GetMapping("/user")
    public String user() {
        return "redirect:/user/residentUser";   // Trả về trang user.html
    }
}
