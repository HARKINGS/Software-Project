package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.DTO.HistoryFeeDTO;
import com.example.QuanLyChungcu.Service.HistoryFeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/admin/historyFee")
public class HistoryFeeController {
    private final HistoryFeeServiceImpl historyFeeService;

    @Autowired
    public HistoryFeeController(HistoryFeeServiceImpl historyFeeService) {
        this.historyFeeService = historyFeeService;
    }

    @GetMapping("/{feeId}")
    @ResponseStatus(HttpStatus.OK)
    public List<HistoryFeeDTO> getAllByFeeId(@PathVariable Long feeId) {
        return historyFeeService.getAllByFeeId(feeId);
    }
}
