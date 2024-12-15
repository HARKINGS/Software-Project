package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.DTO.ParkingFeeDTO;
import com.example.QuanLyChungcu.Service.ParkingFeeServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/admin/parkingFee")
public class ParkingFeeController {
    private final ParkingFeeServiceImpl parkingFeeService;

    @Autowired
    public ParkingFeeController(ParkingFeeServiceImpl parkingFeeService) {
        this.parkingFeeService = parkingFeeService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ParkingFeeDTO> getAllParkingFee() {
        return parkingFeeService.getAllParkingFee();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ParkingFeeDTO getParkingFeeById(@PathVariable Long id) {
        return parkingFeeService.getParkingFeeById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ParkingFeeDTO createParkingFee(@RequestBody @Valid ParkingFeeDTO parkingFeeDTO) {
        return parkingFeeService.createParkingFee(parkingFeeDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ParkingFeeDTO updateParkingFee(@PathVariable Long id, @RequestBody @Valid ParkingFeeDTO parkingFeeDTO) {
        return parkingFeeService.updateParkingFee(id, parkingFeeDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteParkingFee(@PathVariable Long id) {
        parkingFeeService.deleteParkingFee(id);
    }
}
