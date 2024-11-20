package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.Model.Resident;
import com.example.QuanLyChungcu.Service.ResidentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/residents")
public class ResidentController {

    @Autowired
    private ResidentService residentService;
    public ResidentController(ResidentService residentService) {
        this.residentService = residentService;
    }

    // Lấy danh sách tất cả cư dân
    @GetMapping
    public List<Resident> getAllResidents() {
        return residentService.getAllResidents();
    }



    @PostMapping
    public ResponseEntity<String> addResident(@RequestBody @Valid Resident resident, BindingResult result) {
        if (result.hasErrors()) {
            StringBuilder errorMessages = new StringBuilder();
            for (ObjectError error : result.getAllErrors()) {
                errorMessages.append(error.getDefaultMessage()).append(". ");
            }
            return ResponseEntity.badRequest().body("Validation failed: " + errorMessages.toString());
        }
        residentService.addResident(resident, result);
        return ResponseEntity.ok("Resident added successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateResident(@PathVariable Long id, @RequestBody @Valid Resident updatedResident, BindingResult result) {
        if (result.hasErrors()) {
            StringBuilder errorMessages = new StringBuilder();
            for (ObjectError error : result.getAllErrors()) {
                errorMessages.append(error.getDefaultMessage()).append(". ");
            }
            return ResponseEntity.badRequest().body("Validation failed: " + errorMessages.toString());
        }
        Resident updated = residentService.updateResident(id, updatedResident);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resident not found");
        }
        return ResponseEntity.ok("Resident updated successfully");
    }

    // Xóa cư dân
    @DeleteMapping("/{id}")
    public String deleteResident(@PathVariable Long id) {
        boolean isDeleted = residentService.deleteResident(id);
        return isDeleted ? "Resident deleted successfully!" : "Resident not found!";
    }

    // Lấy thông tin cư dân theo ID
    @GetMapping("/{id}")
    public Resident getResidentById(@PathVariable Long id) {
        return residentService.getResidentById(id);
    }
}

