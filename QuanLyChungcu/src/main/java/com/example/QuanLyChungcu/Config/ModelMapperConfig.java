package com.example.QuanLyChungcu.Config;

import com.example.QuanLyChungcu.DTO.ContributionDTO;
import com.example.QuanLyChungcu.DTO.FeeDTO;
import com.example.QuanLyChungcu.DTO.HouseholdDTO;
import com.example.QuanLyChungcu.DTO.ResidentDTO;
import com.example.QuanLyChungcu.Exception.ResourceNotFoundException;
import com.example.QuanLyChungcu.Model.Contribution;
import com.example.QuanLyChungcu.Model.Fee;
import com.example.QuanLyChungcu.Model.Household;
import com.example.QuanLyChungcu.Model.Resident;
import com.example.QuanLyChungcu.Repository.HouseholdRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    private final HouseholdRepository householdRepository;

    @Autowired
    public ModelMapperConfig(HouseholdRepository householdRepository) {
        this.householdRepository = householdRepository;
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper Mapper = new ModelMapper();

        // ModelMapper cho Resident
        Mapper.typeMap(ResidentDTO.class, Resident.class)
                .addMappings(mapper -> {
                    mapper.skip(Resident::setHousehold_resident);
                    mapper.skip(Resident::setResidentId);
                })
                .setPostConverter(context -> {
                    ResidentDTO source = context.getSource();
                    Resident destination = context.getDestination();

                    if (source.getHouseholdId() != null) {
                        Household household = householdRepository.findById(source.getHouseholdId())
                                .orElseThrow(() -> new ResourceNotFoundException("Không tồn tại hộ khẩu nào có id này"));
                        destination.setHousehold_resident(household);
                    }
                    return destination;
                });

        Mapper.typeMap(Resident.class, ResidentDTO.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getHousehold_resident().getHouseholdId(),
                            ResidentDTO::setHouseholdId);
                });

        // ModelMapper cho Contribution
        Mapper.typeMap(ContributionDTO.class, Contribution.class)
                .addMappings(mapper -> {
                    mapper.skip(Contribution::setHousehold_contribution);
                    mapper.skip(Contribution::setContributionId);
                })
                .setPostConverter(context -> {
                    ContributionDTO source = context.getSource();
                    Contribution destination = context.getDestination();

                    if(source.getHouseholdId() != null) {
                        Household household = householdRepository.findById(source.getHouseholdId())
                                .orElseThrow(() -> new ResourceNotFoundException("Không tồn tại hộ khẩu nào có id này"));
                        destination.setHousehold_contribution(household);
                    }
                    return destination;
                });

        Mapper.typeMap(Contribution.class, ContributionDTO.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getHousehold_contribution().getHouseholdId(),
                            ContributionDTO::setHouseholdId);
                });

        // ModelMapper cho Fee
        Mapper.typeMap(FeeDTO.class, Fee.class)
                .addMappings(mapper -> {
                    mapper.skip(Fee::setHousehold_fee);
                    mapper.skip(Fee::setFeeId);
                })
                .setPostConverter(context -> {
                    FeeDTO source = context.getSource();
                    Fee destination = context.getDestination();

                    if(source.getHouseholdId() != null) {
                        Household household = householdRepository.findById(source.getHouseholdId())
                                .orElseThrow(() -> new ResourceNotFoundException("Không tồn tại hộ khẩu nào có id này"));
                        destination.setHousehold_fee(household);
                    }
                    return destination;
                });

        Mapper.typeMap(Fee.class, FeeDTO.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getHousehold_fee().getHouseholdId(),
                            FeeDTO::setHouseholdId);
                });

        // ModelMapper cho Household
        Mapper.typeMap(HouseholdDTO.class, Household.class)
                .addMappings(mapper -> {
                    mapper.skip(Household::setHouseholdId);
                });

        return Mapper;
    }
}
