package com.example.QuanLyChungcu.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", name = "Content", nullable = false)
    @Lob
    private String content;

    @Column(name = "Date", nullable = false)
    private LocalDate date;

    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
