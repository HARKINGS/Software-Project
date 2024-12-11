package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.ContributionDTO;

import java.util.List;

public interface ContributionService {
    public List<ContributionDTO> getAllContribution();
    public ContributionDTO getContributionById(Long id);
    public ContributionDTO createContribution(ContributionDTO contributionDTO);
    public ContributionDTO updateContribution(Long id, ContributionDTO contributionDTO);
    public void deleteContribution(Long id);
}
