package com.example.QuanLyChungcu.Config;

import com.example.QuanLyChungcu.DTO.*;
import com.example.QuanLyChungcu.Exception.ResourceNotFoundException;
import com.example.QuanLyChungcu.Model.*;
import com.example.QuanLyChungcu.Repository.HouseholdRepository;
import com.example.QuanLyChungcu.Repository.ResidentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class ModelMapperConfig {
    private final HouseholdRepository householdRepository;
    private final ResidentRepository residentRepository;

    @Autowired
    public ModelMapperConfig(HouseholdRepository householdRepository, ResidentRepository residentRepository) {
        this.householdRepository = householdRepository;
        this.residentRepository = residentRepository;
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

        // ModelMapper cho Users
        Mapper.typeMap(UserDTO.class, Users.class)
                .addMappings(mapper -> {
                    mapper.skip(Users::setUserOfResident);
                })
                .setPostConverter(context -> {
                    UserDTO source = context.getSource();
                    Users destination = context.getDestination();

                    if(source.getResidnetId() != null) {
                        Resident resident = residentRepository.findById(source.getResidnetId())
                                .orElseThrow(() -> new ResourceNotFoundException("Khong ton tai nhan khau co id nay"));

                        destination.setUserOfResident(resident);
                    }

                    return destination;
                });

        Mapper.typeMap(Users.class, UserDTO.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getUserOfResident().getResidentId(),
                            UserDTO::setResidnetId);
                });
        return Mapper;
    }
}
