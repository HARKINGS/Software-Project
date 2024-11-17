package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.Model.Household;
import com.example.QuanLyChungcu.Service.HouseholdServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/household")
public class HouseholdController {
    HouseholdServiceImpl householdService;

    @Autowired
    public HouseholdController(HouseholdServiceImpl householdService) {
        this.householdService = householdService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Household> getAllHouseholds() {
        return householdService.getAllHouseholds();
    }

    @GetMapping("/search/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Household getHouseholdById(@PathVariable int id) {
        return householdService.getHouseholdById(id);
    }

    @PostMapping("/createHoKhau")
    @ResponseStatus(HttpStatus.CREATED)
    public Household createHousehold(@RequestBody @Valid Household household) {
        return householdService.createHousehold(household);
    }

    @PutMapping("/updateHoKhau/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Household updateHouseHold(@PathVariable int id, @RequestBody @Valid Household Household) {
        return householdService.updateHousehold(id, Household);
    }

    @DeleteMapping("deleteNhanKhau/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteHouseHold(@PathVariable int id) {
        householdService.deleteHousehold(id);
    }
}
