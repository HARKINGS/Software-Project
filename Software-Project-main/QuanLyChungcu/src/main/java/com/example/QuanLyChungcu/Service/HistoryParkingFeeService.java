package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.HistoryFeeDTO;

import java.util.List;

public interface HistoryParkingFeeService {
    public List<HistoryFeeDTO> getAllHistoryParkingFee(Long parkingFeeId);
}
