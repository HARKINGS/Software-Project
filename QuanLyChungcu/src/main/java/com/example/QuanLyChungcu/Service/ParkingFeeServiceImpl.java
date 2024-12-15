package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.ParkingFeeDTO;
import com.example.QuanLyChungcu.Exception.ResourceNotFoundException;
import com.example.QuanLyChungcu.Model.HisrotyParkingFee;
import com.example.QuanLyChungcu.Model.ParkingFee;
import com.example.QuanLyChungcu.Repository.HistoryParkingFeeRepository;
import com.example.QuanLyChungcu.Repository.ParkingFeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParkingFeeServiceImpl implements ParkingFeeService{
    private final ParkingFeeRepository parkingFeeRepository;
    private final HistoryParkingFeeRepository historyParkingFeeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ParkingFeeServiceImpl(ParkingFeeRepository parkingFeeRepository, HistoryParkingFeeRepository historyParkingFeeRepository, ModelMapper modelMapper) {
        this.parkingFeeRepository = parkingFeeRepository;
        this.historyParkingFeeRepository = historyParkingFeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ParkingFeeDTO> getAllParkingFee() {
        List<ParkingFee> parkingFees = parkingFeeRepository.findAll();
        return parkingFees.stream()
                .map(parkingFee -> modelMapper.map(parkingFee, ParkingFeeDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ParkingFeeDTO getParkingFeeById(Long id) {
        ParkingFee parkingFee = parkingFeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim phi gui xe co id nay"));
        return modelMapper.map(parkingFee, ParkingFeeDTO.class);
    }

    @Override
    public ParkingFeeDTO createParkingFee(ParkingFeeDTO parkingFeeDTO) {
        ParkingFee parkingFee = modelMapper.map(parkingFeeDTO, ParkingFee.class);
        parkingFeeRepository.save(parkingFee);
        HisrotyParkingFee hisrotyParkingFee = new HisrotyParkingFee();
        hisrotyParkingFee.setSoTien(parkingFee.getCollectAmount());
        hisrotyParkingFee.setNgayThu(LocalDate.now());
        hisrotyParkingFee.setHistory_parkingFee(parkingFee);
        historyParkingFeeRepository.save(hisrotyParkingFee);

        return modelMapper.map(parkingFee, ParkingFeeDTO.class);
    }

    @Override
    public ParkingFeeDTO updateParkingFee(Long id, ParkingFeeDTO parkingFeeDTO) {
        Optional<ParkingFee> findParkingFee = parkingFeeRepository.findById(id);
        if(findParkingFee.isPresent()) {
            ParkingFee parkingFeeToUpdate = findParkingFee.get();
            double differenceAmount = parkingFeeDTO.getCollectAmount() - parkingFeeToUpdate.getCollectAmount();
            ParkingFee parkingFee = modelMapper.map(parkingFeeDTO, ParkingFee.class);
            parkingFeeToUpdate.setNumberMotor(parkingFee.getNumberMotor());
            parkingFeeToUpdate.setNumberCar(parkingFee.getNumberCar());
            parkingFeeToUpdate.setAmount(parkingFee.getAmount());
            parkingFeeToUpdate.setCollectAmount(parkingFee.getCollectAmount());
            parkingFeeToUpdate.setDueDate(parkingFee.getDueDate());
            if(parkingFee.getCollectAmount() == parkingFee.getAmount()) {
                parkingFeeToUpdate.setPaid(true);
            }
            parkingFeeToUpdate.setHousehold_parking(parkingFee.getHousehold_parking());
            parkingFeeRepository.save(parkingFeeToUpdate);

            HisrotyParkingFee hisrotyParkingFee = new HisrotyParkingFee();
            hisrotyParkingFee.setSoTien(differenceAmount);
            hisrotyParkingFee.setNgayThu(LocalDate.now());
            hisrotyParkingFee.setHistory_parkingFee(parkingFeeToUpdate);
            historyParkingFeeRepository.save(hisrotyParkingFee);
            return modelMapper.map(parkingFeeToUpdate, ParkingFeeDTO.class);
        }else {
            throw new ResourceNotFoundException("Khong tim thay phi gui xe co id nay");
        }
    }

    @Override
    public void deleteParkingFee(Long id) {
        Optional<ParkingFee> findParkingFee = parkingFeeRepository.findById(id);
        if(findParkingFee.isPresent()) {
            parkingFeeRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("Khong tim thay phi gui xe co id nay");
        }
    }
}
