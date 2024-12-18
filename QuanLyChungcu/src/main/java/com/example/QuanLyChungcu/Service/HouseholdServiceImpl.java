package com.example.QuanLyChungcu.Service;


import com.example.QuanLyChungcu.DTO.HouseholdDTO;
import com.example.QuanLyChungcu.DTO.ResidentDTO;
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
        Optional<Resident> findResident = residentRepository.findByCccd(householdDTO.getChuHo().getCccd());
        Resident owner;

        if(findResident.isPresent()) {
            throw new ConflictException("Căn cước công dân đã tồn tại");
        } else {
            owner = new Resident();
            owner.setName(householdDTO.getChuHo().getName());
            owner.setDateOfBirth(householdDTO.getChuHo().getDateOfBirth());
            owner.setCccd(householdDTO.getChuHo().getCccd());
            owner.setGender(householdDTO.getChuHo().getGender());
            owner.setPhoneNumber(householdDTO.getChuHo().getPhoneNumber());
            owner.setRelationship("Chủ hộ");
            owner.setTemporary(householdDTO.getChuHo().getTemporary());
        }

        owner.setHousehold_resident(householdToSave);
        householdToSave.setChuHo(owner);
        householdToSave.setHouseholdNumber(householdDTO.getHouseholdNumber());
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
            householdToUpdate.setHouseholdNumber(householdDTO.getHouseholdNumber());
            householdToUpdate.setApartmentSize(householdDTO.getApartmentSize());

            Optional<Resident> findResident = residentRepository.findByCccd(householdDTO.getChuHo().getCccd());
            if(findResident.isEmpty()) {
                Resident residentToSave = new Resident();
                residentToSave.setName(householdDTO.getChuHo().getName());
                residentToSave.setDateOfBirth(householdDTO.getChuHo().getDateOfBirth());
                residentToSave.setCccd(householdDTO.getChuHo().getCccd());
                residentToSave.setGender(householdDTO.getChuHo().getGender());
                residentToSave.setPhoneNumber(householdDTO.getChuHo().getPhoneNumber());
                residentToSave.setRelationship("Chủ hộ");
                residentToSave.setTemporary(householdDTO.getChuHo().getTemporary());
                residentToSave.setHousehold_resident(householdToUpdate);
                residentRepository.save(residentToSave);
                householdToUpdate.setChuHo(residentToSave);
            }else
            {
                Resident residentToUpdate = findResident.get();
                residentToUpdate.setName(householdDTO.getChuHo().getName());
                residentToUpdate.setDateOfBirth(householdDTO.getChuHo().getDateOfBirth());
                residentToUpdate.setCccd(householdDTO.getChuHo().getCccd());
                residentToUpdate.setGender(householdDTO.getChuHo().getGender());
                residentToUpdate.setPhoneNumber(householdDTO.getChuHo().getPhoneNumber());
                residentToUpdate.setRelationship("Chủ hộ");
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

    @Override
    public List<ResidentDTO> getListResident(Long id) {
        List<Resident> residents = residentRepository.findResidentsByHouseholdId(id);

        return residents.stream()
                .map(resident -> modelMapper.map(resident, ResidentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public HouseholdDTO moveHousehold(Long id, String moveHouseholdNumber) {
        Optional<Household> findHousehold = householdRepository.findByHouseholdNumber(moveHouseholdNumber);
        if(findHousehold.isEmpty()) {
            Household household = householdRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tồn tại hộ khẩu có id: "+id));
            household.setHouseholdNumber(moveHouseholdNumber);

            return modelMapper.map(householdRepository.save(household), HouseholdDTO.class);
        }else {
            throw new ConflictException("Số nhà đã có hộ khẩu");
        }
    }

    @Override
    public HouseholdDTO changeOwner(Long householdId, Long residentId) {
        Optional<Household> findHousehold = householdRepository.findById(householdId);
        Optional<Resident> findResident = residentRepository.findById(residentId);
        if(findHousehold.isPresent() && findResident.isPresent()) {
            Household household = findHousehold.get();
            household.getChuHo().setRelationship("Chưa rõ");
            Resident resident  = findResident.get();
            household.setChuHo(resident);
            resident.setRelationship("Chủ hộ");
            return modelMapper.map(householdRepository.save(household), HouseholdDTO.class);
        }else {
            throw new ResourceNotFoundException("Hộ khẩu hoặc cư dân không tồn tại");
        }
    }
}

