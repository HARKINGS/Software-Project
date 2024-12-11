package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.FeeDTO;

import java.util.List;

public interface FeeService {
    public List<FeeDTO> getAllFee();
    public FeeDTO getFeeById(Long id);
    public FeeDTO createFee(FeeDTO feeDTO);
    public FeeDTO updateFee(Long id, FeeDTO feeDTO);
    public void deleteFee(Long id);
}
