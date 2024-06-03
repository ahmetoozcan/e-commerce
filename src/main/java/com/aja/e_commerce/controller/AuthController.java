package com.aja.e_commerce.controller;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aja.e_commerce.dto.RegisterUserDto;
import com.aja.e_commerce.service.UserService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@AllArgsConstructor
@RequestMapping("/api/public")
public class AuthController {

    private UserService userService;
        
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterUserDto registerUserDto) {
        if(userService.existsByEmail(registerUserDto.getEmail())) {
            return ResponseEntity.status(Response.SC_CONFLICT).body("Email already exists");
        }
        userService.register(registerUserDto);
        return ResponseEntity.status(Response.SC_CREATED).body("User created successfully");
    }
    
}
