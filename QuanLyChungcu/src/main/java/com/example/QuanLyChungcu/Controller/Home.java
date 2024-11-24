package com.example.QuanLyChungcu.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequestMapping("/trangchu")
public class Home {

    @GetMapping
    public String trangchu() {
        return "trangchu";
    }
}