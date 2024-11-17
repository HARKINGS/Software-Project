package harkins.code.software.controller;

import harkins.code.software.models.household;
import harkins.code.software.services.HouseholdServiceImpl;
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
    public List<household> getAllHouseholds() {
        return householdService.getAllHouseholds();
    }

    @GetMapping("/search/{id}")
    @ResponseStatus(HttpStatus.OK)
    public household getHouseholdById(@PathVariable int id) {
        return householdService.getHouseholdById(id);
    }

    @PostMapping("/createHoKhau")
    @ResponseStatus(HttpStatus.CREATED)
    public household createHousehold(@RequestBody @Valid household Household) {
        return householdService.createHousehold(Household);
    }

    @PutMapping("/updateHoKhau/{id}")
    @ResponseStatus(HttpStatus.OK)
    public household updateHouseHold(@PathVariable int id, @RequestBody @Valid household Household) {
        return householdService.updateHousehold(id, Household);
    }

    @DeleteMapping("deleteNhanKhau/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteHouseHold(@PathVariable int id) {
        householdService.deleteHousehold(id);
    }
}
