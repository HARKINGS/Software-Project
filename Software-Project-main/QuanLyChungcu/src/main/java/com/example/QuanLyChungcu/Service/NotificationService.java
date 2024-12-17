package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.NotificationDTO;

import java.util.List;

public interface NotificationService {
    public List<NotificationDTO> getAllNotification();
    public NotificationDTO createNotification(NotificationDTO notificationDTO);
}
