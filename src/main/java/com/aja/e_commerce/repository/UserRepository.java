package com.aja.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aja.e_commerce.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email);

    boolean existsByEmail(String email);
}
