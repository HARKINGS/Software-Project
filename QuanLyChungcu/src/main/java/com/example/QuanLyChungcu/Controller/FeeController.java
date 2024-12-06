package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.DTO.FeeDTO;
import com.example.QuanLyChungcu.Service.FeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/admin/fee")
public class FeeController {
    private final FeeServiceImpl feeService;

    @Autowired
    public FeeController(FeeServiceImpl feeService) {
        this.feeService = feeService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FeeDTO> getAllFee() {
        return feeService.getAllFee();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FeeDTO getFeeById(@PathVariable Long id) {
        return feeService.getFeeById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FeeDTO createFee(@RequestBody FeeDTO feeDTO) {
        return feeService.createFee(feeDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FeeDTO updateFee(@PathVariable Long id, @RequestBody FeeDTO feeDTO) {
        return feeService.updateFee(id, feeDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFee(@PathVariable Long id) {
        feeService.deleteFee(id);
    }
}
