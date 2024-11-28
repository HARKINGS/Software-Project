package com.harkins.baseweb.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harkins.baseweb.model.Users;


@Repository
public interface UserRepo extends JpaRepository<Users, Integer>{
    Users findByUsername(String username);
}
