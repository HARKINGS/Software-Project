package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.FeeDTO;
import com.example.QuanLyChungcu.DTO.ParkingFeeDTO;

import java.util.List;

public interface ParkingFeeService {
    public List<ParkingFeeDTO> getAllParkingFee();
    public ParkingFeeDTO getParkingFeeById(Long id);
    public ParkingFeeDTO createParkingFee(ParkingFeeDTO parkingFeeDTO);
    public ParkingFeeDTO updateParkingFee(Long id, ParkingFeeDTO parkingFeeDTO);
    public void deleteParkingFee(Long id);
}
