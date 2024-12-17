package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.FeeDTO;
import com.example.QuanLyChungcu.Exception.ResourceNotFoundException;
import com.example.QuanLyChungcu.Model.Fee;
import com.example.QuanLyChungcu.Model.HistoryFee;
import com.example.QuanLyChungcu.Repository.FeeRepository;
import com.example.QuanLyChungcu.Repository.HistoryFeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeeServiceImpl implements FeeService{
    private final FeeRepository feeRepository;
    private final ModelMapper modelMapper;
    private final HistoryFeeRepository historyFeeRepository;

    @Autowired
    public FeeServiceImpl(FeeRepository feeRepository, ModelMapper modelMapper, HistoryFeeRepository historyFeeRepository) {
        this.feeRepository = feeRepository;
        this.modelMapper = modelMapper;
        this.historyFeeRepository = historyFeeRepository;
    }

    @Override
    public List<FeeDTO> getAllFee() {
        List<Fee> fees = feeRepository.findAll();
        return fees.stream()
                .map(fee -> modelMapper.map(fee, FeeDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public FeeDTO getFeeById(Long id) {
        Fee fee = feeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tồn tại khoản phí có id: "+id));
        return modelMapper.map(fee, FeeDTO.class);
    }

    @Override
    public FeeDTO createFee(FeeDTO feeDTO) {
        Fee fee = modelMapper.map(feeDTO, Fee.class);
        feeRepository.save(fee);
        HistoryFee historyFee = new HistoryFee();
        historyFee.setSoTien(fee.getCollectAmount());
        historyFee.setNgayThu(LocalDate.now());
        historyFee.setHistory_fee(fee);
        historyFeeRepository.save(historyFee);
        return modelMapper.map(fee, FeeDTO.class);
    }

    @Override
    public FeeDTO updateFee(Long id, FeeDTO feeDTO) {
        Optional<Fee> findFee = feeRepository.findById(id);
        if(findFee.isPresent()) {
            Fee feeToUpdate = findFee.get();
            double differenceAmount = feeDTO.getCollectAmount() - feeToUpdate.getCollectAmount();
            Fee fee = modelMapper.map(feeDTO, Fee.class);
            feeToUpdate.setFeeType(fee.getFeeType());
            feeToUpdate.setAmount(fee.getAmount());
            feeToUpdate.setCollectAmount(fee.getCollectAmount());
            feeToUpdate.setDueDate(fee.getDueDate());
            if(fee.getAmount() == fee.getCollectAmount()) {
                feeToUpdate.setPaid(true);
            }
            feeToUpdate.setHousehold_fee(fee.getHousehold_fee());
            feeRepository.save(feeToUpdate);
            HistoryFee historyFee = new HistoryFee();
            historyFee.setSoTien(differenceAmount);
            historyFee.setNgayThu(LocalDate.now());
            historyFee.setHistory_fee(feeToUpdate);
            historyFeeRepository.save(historyFee);
            return modelMapper.map(feeToUpdate, FeeDTO.class);
        }else {
            throw new ResourceNotFoundException("Không tồn tại khoản phí có id: "+id);
        }
    }

    @Override
    public void deleteFee(Long id) {
        Optional<Fee> findFee = feeRepository.findById(id);
        if(findFee.isPresent()) {
            feeRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("Không tồn tại khoản phí có id: "+id);
        }
    }
}
