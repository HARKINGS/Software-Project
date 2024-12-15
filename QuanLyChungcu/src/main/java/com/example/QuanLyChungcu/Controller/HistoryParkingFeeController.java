package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.DTO.HistoryFeeDTO;
import com.example.QuanLyChungcu.Service.HistoryParkingFeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/admin/historyParkingFee")
public class HistoryParkingFeeController {
    private final HistoryParkingFeeServiceImpl historyParkingFeeService;

    @Autowired
    public HistoryParkingFeeController(HistoryParkingFeeServiceImpl historyParkingFeeService) {
        this.historyParkingFeeService = historyParkingFeeService;
    }

    @GetMapping("/{parkingFeeId}")
    @ResponseStatus(HttpStatus.OK)
    public List<HistoryFeeDTO> getAllHistoryParkingFee(@PathVariable Long parkingFeeId) {
        return historyParkingFeeService.getAllHistoryParkingFee(parkingFeeId);
    }
}
