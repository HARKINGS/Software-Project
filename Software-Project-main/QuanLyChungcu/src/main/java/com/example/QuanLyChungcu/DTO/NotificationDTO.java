package com.example.QuanLyChungcu.DTO;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public class NotificationDTO {
    @NotBlank(message = "Phai co tieu de")
    private String title;

    @NotBlank(message = "Phai co noi dung")
    private String content;

    private LocalDate date;

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
