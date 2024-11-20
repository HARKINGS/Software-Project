package com.example.QuanLyChungcu.Service;


import com.example.QuanLyChungcu.Model.Resident;
import com.example.QuanLyChungcu.Repository.ResidentRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.List;
import java.util.Optional;

@Service
public class ResidentService {

    private final ResidentRepository residentRepository;

    public ResidentService(ResidentRepository residentRepository) {
        this.residentRepository = residentRepository;
    }

    // Lấy danh sách tất cả cư dân
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    // Thêm mới cư dân
    public Resident addResident(Resident resident, BindingResult result) {
        if (result.hasErrors()) {
            StringBuilder errorMessages = new StringBuilder();
            for (ObjectError error : result.getAllErrors()) {
                errorMessages.append(error.getDefaultMessage()).append(". ");
            }
            throw new IllegalArgumentException("Validation failed: " + errorMessages.toString());
        }
        return residentRepository.save(resident);
    }

    // Cập nhật thông tin cư dân
    public Resident updateResident(Long residentId, Resident updatedResident) {
        Optional<Resident> existingResident = residentRepository.findById(residentId);
        if (existingResident.isPresent()) {
            Resident resident = existingResident.get();
            resident.setName(updatedResident.getName());
            resident.setDateOfBirth(updatedResident.getDateOfBirth());
            resident.setIdCard(updatedResident.getIdCard());
            resident.setTemporary(updatedResident.isTemporary());
            resident.setHouseholdId(updatedResident.getHouseholdId());
            return residentRepository.save(resident);
        }
        return null;
    }

    // Xóa cư dân
    public boolean deleteResident(Long residentId) {
        if (residentRepository.existsById(residentId)) {
            residentRepository.deleteById(residentId);
            return true;
        }
        return false;
    }

    // Lấy cư dân theo ID
    public Resident getResidentById(Long residentId) {
        return residentRepository.findById(residentId).orElse(null);
    }
}

