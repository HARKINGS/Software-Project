package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.DTO.HouseholdDTO;
import com.example.QuanLyChungcu.Service.HouseholdServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/household")
public class HouseholdController {
    private final HouseholdServiceImpl householdService;

    @Autowired
    public HouseholdController(HouseholdServiceImpl householdService) {
        this.householdService = householdService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<HouseholdDTO> getAllHouseholds() {
        return householdService.getAllHouseholds();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HouseholdDTO getHouseholdById(@PathVariable Long id) {
        return householdService.getHouseholdById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HouseholdDTO createHousehold(@RequestBody @Valid HouseholdDTO householdDTO) {
        return householdService.createHousehold(householdDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HouseholdDTO updateHouseHold(@PathVariable Long id, @RequestBody @Valid HouseholdDTO householdDTO) {
        return householdService.updateHousehold(id, householdDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteHouseHold(@PathVariable Long id) {
        householdService.deleteHousehold(id);
    }
}
