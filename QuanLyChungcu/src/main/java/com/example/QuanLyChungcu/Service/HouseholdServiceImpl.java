package com.example.QuanLyChungcu.Service;


import com.example.QuanLyChungcu.DTO.HouseholdDTO;
import com.example.QuanLyChungcu.Exception.ConflictException;
import com.example.QuanLyChungcu.Exception.ResourceNotFoundException;
import com.example.QuanLyChungcu.Model.Household;
import com.example.QuanLyChungcu.Model.Resident;
import com.example.QuanLyChungcu.Repository.HouseholdRepository;
import com.example.QuanLyChungcu.Repository.ResidentRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HouseholdServiceImpl implements HouseholdService{
    private final HouseholdRepository householdRepository;
    private final ResidentRepository residentRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public HouseholdServiceImpl(HouseholdRepository householdRepository, ResidentRepository residentRepository, ModelMapper modelMapper) {
        this.householdRepository = householdRepository;
        this.residentRepository = residentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<HouseholdDTO> getAllHouseholds() {
        List<Household> householdList = householdRepository.findAll();
        return householdList.stream()
                .map(household -> modelMapper.map(household, HouseholdDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public HouseholdDTO getHouseholdById(Long id) {
        Household household = householdRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy hộ khẩu có id: "+id));
        return modelMapper.map(household, HouseholdDTO.class);
    }

    @Override
    @Transactional
    public HouseholdDTO createHousehold(HouseholdDTO householdDTO) {
        Optional<Household> findHousehold = householdRepository.findByHouseholdNumber(householdDTO.getHouseholdNumber());
        if (findHousehold.isPresent()) {
            throw new ConflictException("Số nhà đã tồn tại");
        }
        Household householdToSave = new Household();
        Optional<Resident> findResident = residentRepository.findByIdCard(householdDTO.getChuHo().getIdCard());
        Resident owner;

        if(findResident.isPresent()) {
            throw new ConflictException("Căn cước công dân đã tồn tại");
        } else {
            owner = new Resident();
            owner.setName(householdDTO.getChuHo().getName());
            owner.setDateOfBirth(householdDTO.getChuHo().getDateOfBirth());
            owner.setIdCard(householdDTO.getChuHo().getIdCard());
            owner.setTemporary(householdDTO.getChuHo().getTemporary());
        }

        owner.setHousehold_resident(householdToSave);
        householdToSave.setChuHo(owner);

        householdToSave.setTenChuHo(owner.getName());
        householdToSave.setHouseholdNumber(householdDTO.getHouseholdNumber());
        householdToSave.setPhoneNumber(householdDTO.getPhoneNumber());
        householdToSave.setApartmentSize(householdDTO.getApartmentSize());

        residentRepository.save(owner);
        householdRepository.save(householdToSave);

        return modelMapper.map(householdToSave, HouseholdDTO.class);
    }


    @Override
    @Transactional
    public HouseholdDTO updateHousehold(Long id, HouseholdDTO householdDTO) {
        Optional<Household> findHousehold = householdRepository.findById(id);
        if(findHousehold.isPresent()) {
            Household householdToUpdate = findHousehold.get();
            householdToUpdate.setTenChuHo(householdDTO.getChuHo().getName());
            householdToUpdate.setHouseholdNumber(householdDTO.getHouseholdNumber());
            householdToUpdate.setPhoneNumber(householdDTO.getPhoneNumber());
            householdToUpdate.setApartmentSize(householdDTO.getApartmentSize());

            Optional<Resident> findResident = residentRepository.findByIdCard(householdDTO.getChuHo().getIdCard());
            if(findResident.isEmpty()) {
                Resident residentToSave = new Resident();
                residentToSave.setName(householdDTO.getChuHo().getName());
                residentToSave.setDateOfBirth(householdDTO.getChuHo().getDateOfBirth());
                residentToSave.setIdCard(householdDTO.getChuHo().getIdCard());
                residentToSave.setTemporary(householdDTO.getChuHo().getTemporary());
                residentToSave.setHousehold_resident(householdToUpdate);
                residentRepository.save(residentToSave);
                householdToUpdate.setChuHo(residentToSave);
            }else
            {
                Resident residentToUpdate = findResident.get();
                residentToUpdate.setName(householdDTO.getChuHo().getName());
                residentToUpdate.setDateOfBirth(householdDTO.getChuHo().getDateOfBirth());
                residentToUpdate.setIdCard(householdDTO.getChuHo().getIdCard());
                residentToUpdate.setTemporary(householdDTO.getChuHo().getTemporary());
                residentToUpdate.setHousehold_resident(householdToUpdate);
                residentRepository.save(residentToUpdate);
                householdToUpdate.setChuHo(residentToUpdate);
            }
            return modelMapper.map(householdRepository.save(householdToUpdate), HouseholdDTO.class);
        }else {
            throw new ResourceNotFoundException("Không tồn tại hộ khẩu có id: "+id);
        }
    }

    @Override
    @Transactional
    public void deleteHousehold(Long id) {
        Optional<Household> findHousehold = householdRepository.findById(id);
        if (findHousehold.isPresent()) {
            householdRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Không tồn tại hộ khẩu có id: "+id);
        }
    }
}

