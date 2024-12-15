package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.HistoryFeeDTO;
import com.example.QuanLyChungcu.Model.HisrotyParkingFee;
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
        List<HisrotyParkingFee> hisrotyParkingFees = parkingFeeRepository.findByParkingFeeId(parkingFeeId);
        return hisrotyParkingFees.stream()
                .map(hisrotyParkingFee -> modelMapper.map(hisrotyParkingFee, HistoryFeeDTO.class))
                .collect(Collectors.toList());
    }
}
