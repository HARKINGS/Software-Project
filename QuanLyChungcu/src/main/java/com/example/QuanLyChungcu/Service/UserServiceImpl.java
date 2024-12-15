package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.*;
import com.example.QuanLyChungcu.Exception.BadRequestException;
import com.example.QuanLyChungcu.Exception.ConflictException;
import com.example.QuanLyChungcu.Exception.ResourceNotFoundException;
import com.example.QuanLyChungcu.Model.*;
import com.example.QuanLyChungcu.Repository.*;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final ResidentRepository residentRepository;
    private final HouseholdRepository householdRepository;
    private final ContributionRepository contributionRepository;
    private final FeeRepository feeRepository;
    private final ParkingFeeRepository parkingFeeRepository;
    private final NotificationRepository notificationRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ResidentRepository residentRepository, HouseholdRepository householdRepository, ContributionRepository contributionRepository, FeeRepository feeRepository, ParkingFeeRepository parkingFeeRepository, NotificationRepository notificationRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.residentRepository = residentRepository;
        this.householdRepository = householdRepository;
        this.contributionRepository = contributionRepository;
        this.feeRepository = feeRepository;
        this.parkingFeeRepository = parkingFeeRepository;
        this.notificationRepository = notificationRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<UserDTO> getListUser() {
        List<Users> users = userRepository.findAll();
        return users.stream()
                .map(users1 -> modelMapper.map(users1, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        Optional<Users> findUser = userRepository.findByUsername(userDTO.getUsername());
        if(findUser.isEmpty()) {
            Users userToSave = modelMapper.map(userDTO, Users.class);
            userToSave.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            return modelMapper.map(userRepository.save(userToSave), UserDTO.class);
        }else {
            throw new ConflictException("Username đã tồn tại vui lòng chọn username khác");
        }
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        Optional<Users> findUser = userRepository.findById(id);
        if(findUser.isPresent()) {
            Optional<Users> findUser1 = userRepository.findByUsername(userDTO.getUsername());
            if(findUser1.isEmpty() || id == findUser1.get().getId()) {
                Users userToSave = findUser.get();
                Users users = modelMapper.map(userDTO, Users.class);
                userToSave.setUsername(users.getUsername());
                userToSave.setPassword(passwordEncoder.encode(users.getPassword()));
                userToSave.setUserOfResident(users.getUserOfResident());
                return modelMapper.map(userRepository.save(userToSave), UserDTO.class);
            }else {
                throw new ConflictException("username da ton tai");
            }
        }else {
            throw new ResourceNotFoundException("Khong ton tai user co id nay");
        }
    }

    @Override
    public void deleteUser(Long id) {
        Optional<Users> findUser = userRepository.findById(id);
        if(findUser.isPresent()) {
            Users users = findUser.get();
            users.getUserOfResident().setUser(null);
            users.setUserOfResident(null);
            userRepository.delete(users);
        }else {
            throw new ResourceNotFoundException("Khong ton tai user co id nay");
        }
    }

    @Override
    public UserDTO changePasswordUser(String oldPassword, String newPassword) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Users> findUser = userRepository.findByUsername(authentication.getName());
        if(findUser.isPresent()) {
            Users users = findUser.get();
            if(passwordEncoder.matches(oldPassword, users.getPassword())) {
                users.setPassword(passwordEncoder.encode(newPassword));

                return modelMapper.map(userRepository.save(users), UserDTO.class);
            }else {
                System.out.println(passwordEncoder.encode(oldPassword));
                throw new BadRequestException("Sai mật khẩu cũ");
            }
        }else {
            throw new ResourceNotFoundException("User khong ton tai");
        }
    }

    @Override
    public ResidentDTO getInfoUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Users> findUser = userRepository.findByUsername(authentication.getName());
        if(findUser.isPresent()) {
            Users users = findUser.get();
            return modelMapper.map(users.getUserOfResident(), ResidentDTO.class);
        }else {
            throw new ResourceNotFoundException("User khong ton tai");
        }
    }

    @Override
    public HouseholdDTO getInfoHousehold() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Users> findUser = userRepository.findByUsername(authentication.getName());
        if(findUser.isPresent()) {
            Users users = findUser.get();
            return modelMapper.map(users.getUserOfResident().getHousehold_resident(), HouseholdDTO.class);
        }else {
            throw new ResourceNotFoundException("User khong ton tai");
        }
    }

    @Override
    public List<ResidentDTO> getListResident() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Users> findUser = userRepository.findByUsername(authentication.getName());
        if(findUser.isPresent()) {
            Users users = findUser.get();
            Long id = users.getUserOfResident().getHousehold_resident().getHouseholdId();
            List<Resident> residents = residentRepository.findResidentsByHouseholdId(id);

            return residents.stream()
                    .map(resident -> modelMapper.map(resident, ResidentDTO.class))
                    .collect(Collectors.toList());
        }else {
            throw new ResourceNotFoundException("User khong ton tai");
        }
    }

    @Override
    public List<FeeDTO> getListFee() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Users> findUser = userRepository.findByUsername(authentication.getName());
        if(findUser.isPresent()) {
            Users users = findUser.get();
            Long id = users.getUserOfResident().getHousehold_resident().getHouseholdId();
            List<Fee> fees = feeRepository.findFeesByHouseholdId(id);

            return fees.stream()
                    .map(fee -> modelMapper.map(fee, FeeDTO.class))
                    .collect(Collectors.toList());
        }else {
            throw new ResourceNotFoundException("User khong ton tai");
        }
    }

    @Override
    public List<ContributionDTO> getListContribution() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Users> findUser = userRepository.findByUsername(authentication.getName());
        if(findUser.isPresent()) {
            Users users = findUser.get();
            Long id = users.getUserOfResident().getHousehold_resident().getHouseholdId();
            List<Contribution> contributions = contributionRepository.findContributionsByHouseholdId(id);

            return contributions.stream()
                    .map(contribution -> modelMapper.map(contribution, ContributionDTO.class))
                    .collect(Collectors.toList());
        }else {
            throw new ResourceNotFoundException("User khong ton tai");
        }
    }

    @Override
    public List<ParkingFeeDTO> getListParkingFee() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Users> findUser = userRepository.findByUsername(authentication.getName());
        if(findUser.isPresent()) {
            Users users = findUser.get();
            Long id = users.getUserOfResident().getHousehold_resident().getHouseholdId();
            List<ParkingFee> parkingFees = parkingFeeRepository.findParkingFeesByHouseholdId(id);

            return parkingFees.stream()
                    .map(parkingFee -> modelMapper.map(parkingFee, ParkingFeeDTO.class))
                    .collect(Collectors.toList());
        }else {
            throw new ResourceNotFoundException("User khong ton tai");
        }
    }
}
