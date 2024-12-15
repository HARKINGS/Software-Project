package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.HistoryFeeDTO;
import com.example.QuanLyChungcu.Model.HistoryFee;
import com.example.QuanLyChungcu.Repository.HistoryFeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoryFeeServiceImpl implements HistoryFeeService{
    private final HistoryFeeRepository historyFeeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public HistoryFeeServiceImpl(HistoryFeeRepository historyFeeRepository, ModelMapper modelMapper) {
        this.historyFeeRepository = historyFeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<HistoryFeeDTO> getAllByFeeId(Long feeId) {
        List<HistoryFee> historyFeeList = historyFeeRepository.findHistoryFeesByFeeId(feeId);
        return historyFeeList.stream()
                .map(historyFee -> modelMapper.map(historyFee, HistoryFeeDTO.class))
                .collect(Collectors.toList());
    }
}
