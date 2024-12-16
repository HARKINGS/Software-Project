package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.HistoryFeeDTO;
import com.example.QuanLyChungcu.Model.HistoryParkingFee;
import com.example.QuanLyChungcu.Repository.HistoryParkingFeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoryParkingFeeServiceImpl implements HistoryParkingFeeService{
    private final HistoryParkingFeeRepository parkingFeeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public HistoryParkingFeeServiceImpl(HistoryParkingFeeRepository parkingFeeRepository, ModelMapper modelMapper) {
        this.parkingFeeRepository = parkingFeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<HistoryFeeDTO> getAllHistoryParkingFee(Long parkingFeeId) {
        List<HistoryParkingFee> historyParkingFees = parkingFeeRepository.findByParkingFeeId(parkingFeeId);
        return historyParkingFees.stream()
                .map(historyParkingFee -> modelMapper.map(historyParkingFee, HistoryFeeDTO.class))
                .collect(Collectors.toList());
    }
}
