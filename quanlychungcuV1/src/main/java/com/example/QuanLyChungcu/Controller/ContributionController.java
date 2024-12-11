package com.example.QuanLyChungcu.Controller;

import com.example.QuanLyChungcu.DTO.ContributionDTO;
import com.example.QuanLyChungcu.Service.ContributionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/admin/contribution")
public class ContributionController {
    private final ContributionServiceImpl contributionService;

    @Autowired
    public ContributionController(ContributionServiceImpl contributionService) {
        this.contributionService = contributionService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ContributionDTO> getAllContribution() {
        return contributionService.getAllContribution();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ContributionDTO getContributionById(@PathVariable Long id) {
        return contributionService.getContributionById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContributionDTO createContribution(@RequestBody ContributionDTO contributionDTO) {
        return contributionService.createContribution(contributionDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ContributionDTO updateContribution(@PathVariable Long id, @RequestBody ContributionDTO contributionDTO) {
        return contributionService.updateContribution(id, contributionDTO);
    }

    @DeleteMapping("/{contributionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteContribution(@PathVariable Long contributionId) {
        contributionService.deleteContribution(contributionId);
    }
}
