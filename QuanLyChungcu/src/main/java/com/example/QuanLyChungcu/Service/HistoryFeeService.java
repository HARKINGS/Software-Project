package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.HistoryFeeDTO;

import java.util.List;

public interface HistoryFeeService {
    public List<HistoryFeeDTO> getAllByFeeId(Long feeId);
}
