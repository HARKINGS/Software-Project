package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.DTO.NotificationDTO;
import com.example.QuanLyChungcu.Service.NotificationServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotificationController {
    private final NotificationServiceImpl notificationService;

    @Autowired
    public NotificationController(NotificationServiceImpl notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/getAllNotification")
    @ResponseStatus(HttpStatus.OK)
    public List<NotificationDTO> getAllNotification() {
        return notificationService.getAllNotification();
    }

    @PostMapping("/admin/notification")
    @ResponseStatus(HttpStatus.CREATED)
    public NotificationDTO createNotification(@RequestBody @Valid NotificationDTO notificationDTO) {
        return notificationService.createNotification(notificationDTO);
    }
}
