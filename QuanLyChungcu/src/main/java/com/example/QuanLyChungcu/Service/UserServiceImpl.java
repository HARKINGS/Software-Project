package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.ResidentDTO;
import com.example.QuanLyChungcu.DTO.UserDTO;
import com.example.QuanLyChungcu.Exception.ConflictException;
import com.example.QuanLyChungcu.Exception.ResourceNotFoundException;
import com.example.QuanLyChungcu.Model.Users;
import com.example.QuanLyChungcu.Repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final ResidentRepository residentRepository;
    private final HouseholdRepository householdRepository;
    private final ContributionRepository contributionRepository;
    private final FeeRepository feeRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ResidentRepository residentRepository, HouseholdRepository householdRepository, ContributionRepository contributionRepository, FeeRepository feeRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.residentRepository = residentRepository;
        this.householdRepository = householdRepository;
        this.contributionRepository = contributionRepository;
        this.feeRepository = feeRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
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
    public UserDTO updateUser(String password) {
        return null;
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
}
