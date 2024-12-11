package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.ResidentDTO;
import com.example.QuanLyChungcu.Model.Resident;

import java.util.List;

public interface ResidentService {
    public List<ResidentDTO> getAllResident();
    public ResidentDTO getResidentById(Long id);
    public ResidentDTO createResident(ResidentDTO residentDTO);
    public ResidentDTO updateResident(Long id, ResidentDTO residentDTO);
    public void deleteResident(Long id);
}
