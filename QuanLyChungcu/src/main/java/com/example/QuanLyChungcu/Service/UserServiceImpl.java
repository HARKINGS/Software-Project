package com.example.QuanLyChungcu.Service;

import com.example.QuanLyChungcu.DTO.UserDTO;
import com.example.QuanLyChungcu.Exception.ConflictException;
import com.example.QuanLyChungcu.Model.Users;
import com.example.QuanLyChungcu.Repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
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
}
