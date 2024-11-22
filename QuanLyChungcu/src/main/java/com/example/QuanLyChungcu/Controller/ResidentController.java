package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.DTO.ResidentDTO;
import com.example.QuanLyChungcu.Service.ResidentServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/resident")
public class ResidentController {
    private final ResidentServiceImpl residentService;

    @Autowired
    public ResidentController(ResidentServiceImpl residentService) {
        this.residentService = residentService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ResidentDTO> getAllResident() {
        return residentService.getAllResident();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResidentDTO getResidentById(@PathVariable Long id) {
        return residentService.getResidentById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResidentDTO createResident(@RequestBody @Valid ResidentDTO residentDTO) {
        return residentService.createResident(residentDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResidentDTO updateResident(@PathVariable Long id, @RequestBody @Valid ResidentDTO residentDTO) {
        return residentService.updateResident(id, residentDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResident(@PathVariable Long id) {
        residentService.deleteResident(id);
    }
}
