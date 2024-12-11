package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.ContributionDTO;
import com.example.QuanLyChungcu.Exception.ResourceNotFoundException;
import com.example.QuanLyChungcu.Model.Contribution;
import com.example.QuanLyChungcu.Repository.ContributionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContributionServiceImpl implements ContributionService{
    private final ContributionRepository contributionRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ContributionServiceImpl(ContributionRepository contributionRepository, ModelMapper modelMapper) {
        this.contributionRepository = contributionRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ContributionDTO> getAllContribution() {
        List<Contribution> contributions = contributionRepository.findAll();
        return contributions.stream()
                .map(contribution -> modelMapper.map(contribution, ContributionDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ContributionDTO getContributionById(Long id) {
        Contribution contribution = contributionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tồn tại phí tự nguyện có id: "+id));
        return modelMapper.map(contribution, ContributionDTO.class);
    }

    @Override
    public ContributionDTO createContribution(ContributionDTO contributionDTO) {
        Contribution contributionToSave = modelMapper.map(contributionDTO, Contribution.class);
        return modelMapper.map(contributionRepository.save(contributionToSave), ContributionDTO.class);
    }

    @Override
    public ContributionDTO updateContribution(Long id, ContributionDTO contributionDTO) {
        Optional<Contribution> findContribution = contributionRepository.findById(id);
        if(findContribution.isPresent()) {
            Contribution contributionToUpdate = findContribution.get();
            Contribution contribution = modelMapper.map(contributionDTO, Contribution.class);
            contributionToUpdate.setContributionType(contribution.getContributionType());
            contributionToUpdate.setAmount(contribution.getAmount());
            contributionToUpdate.setDateContributed(contribution.getDateContributed());
            contributionToUpdate.setHousehold_contribution(contribution.getHousehold_contribution());
            return modelMapper.map(contributionRepository.save(contributionToUpdate), ContributionDTO.class);
        }else {
            throw new ResourceNotFoundException("Không tồn tại phí tự nguyện có id: "+id);
        }
    }

    @Override
    public void deleteContribution(Long id) {
        Optional<Contribution> findContribution = contributionRepository.findById(id);
        if(findContribution.isPresent()) {
            contributionRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("Không tồn tại phí tự nguyện có id: "+id);
        }
    }
}
