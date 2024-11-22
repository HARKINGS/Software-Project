package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.ResidentDTO;
import com.example.QuanLyChungcu.Exception.ConflictException;
import com.example.QuanLyChungcu.Exception.ResourceNotFoundException;
import com.example.QuanLyChungcu.Model.Household;
import com.example.QuanLyChungcu.Model.Resident;
import com.example.QuanLyChungcu.Repository.HouseholdRepository;
import com.example.QuanLyChungcu.Repository.ResidentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ResidentServiceImpl implements ResidentService {
    private final ResidentRepository residentRepository;
    private final HouseholdRepository householdRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ResidentServiceImpl(ResidentRepository residentRepository, HouseholdRepository householdRepository, ModelMapper modelMapper) {
        this.residentRepository = residentRepository;
        this.householdRepository = householdRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ResidentDTO> getAllResident() {
        List<Resident> residents = residentRepository.findAll();
        return residents.stream()
                .map(resident -> modelMapper.map(resident, ResidentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ResidentDTO getResidentById(Long id) {
        Resident resident = residentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy nhân khẩu có id: "+id));
        return modelMapper.map(resident, ResidentDTO.class);
    }

    @Override
    public ResidentDTO createResident(ResidentDTO residentDTO) {
        Optional<Resident> findResident = residentRepository.findByIdCard(residentDTO.getIdCard());
        if(findResident.isPresent()) {
            throw new ConflictException("Căn cước công dân đã tồn tại");
        }else {
            Resident residentToSave = modelMapper.map(residentDTO, Resident.class);
            return modelMapper.map(residentRepository.save(residentToSave), ResidentDTO.class);
        }
    }

    @Override
    public ResidentDTO updateResident(Long id, ResidentDTO residentDTO) {
        Optional<Resident> findResident = residentRepository.findById(id);
        if(findResident.isPresent()) {
            Resident residentToUpdate = findResident.get(); // Cần Update
            Resident resident = modelMapper.map(residentDTO, Resident.class); // Hiện tại
            // Update data
            residentToUpdate.setName(resident.getName());
            residentToUpdate.setDateOfBirth(resident.getDateOfBirth());
            residentToUpdate.setIdCard(resident.getIdCard());
            residentToUpdate.setTemporary(resident.isTemporary());
            residentToUpdate.setHousehold_resident(resident.getHousehold_resident());
            residentRepository.save(residentToUpdate);
            // Thiết lập lại liên kết
            if(isChuHo(id, resident.getHousehold_resident().getHouseholdId())) {
                resident.getHousehold_resident().setChuHo(residentToUpdate);
            }
            return modelMapper.map(residentToUpdate, ResidentDTO.class);
        }else {
            throw new ResourceNotFoundException("Không tồn tại nhân khẩu có id: "+id);
        }
    }

    @Override
    public void deleteResident(Long id) {
        Optional<Resident> findResident = residentRepository.findById(id);
        if(findResident.isPresent()) {
            Household household = findResident.get().getHousehold_resident();
            household.setChuHo(null);
            residentRepository.deleteById(id);
            householdRepository.deleteById(household.getHouseholdId());
        }else {
            throw new ResourceNotFoundException("Không tồn tại nhân khẩu có id: "+id);
        }
    }

    public boolean isChuHo(Long residentId, Long householdId) {
        // Tìm resident theo id
        Optional<Resident> resident = residentRepository.findById(residentId);
        if (resident.isPresent()) {
            // Tìm household theo id
            Optional<Household> household = householdRepository.findById(householdId);
            if (household.isPresent()) {
                // Kiểm tra nếu household có owner là resident
                return household.get().getChuHo().getResidentId().equals(resident.get().getResidentId());
            }
        }
        return false;
    }
}
