package com.example.QuanLyChungcu.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequestMapping("/dangnhap")
public class Login {

    @GetMapping
    public String trangchu() {
        return "dangnhap";
    }
}