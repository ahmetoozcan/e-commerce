package com.aja.e_commerce.service;



import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aja.e_commerce.dto.RegisterUserDto;
import com.aja.e_commerce.dto.UserDto;
import com.aja.e_commerce.model.User;
import com.aja.e_commerce.repository.UserRepository;
import com.aja.e_commerce.security.UserPrincipal;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OrderService orderService;

    public String register(RegisterUserDto registerUserDto) {
        User user = User.builder()
                .email(registerUserDto.getEmail())
                .password(passwordEncoder.encode(registerUserDto.getPassword()))
                .name(registerUserDto.getName())
                .surname(registerUserDto.getSurname())
                .build();
        userRepository.save(user);
        log.info("Registering user: " + registerUserDto);

        return "User created successfully";
    }
    
    @Transactional
    public ResponseEntity<?> removeUserAccount(@AuthenticationPrincipal UserPrincipal currentUser, Long userId) {
        if (!currentUser.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid user id");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        orderService.deleteAllByUserId(userId);

        userRepository.delete(user);

        return ResponseEntity.ok("User account removed successfully");
    }

    public UserDto getLoggedInUser() {
        ModelMapper modelMapper = new ModelMapper();
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        UserDto loggedInUser = modelMapper.map(userPrincipal.getUser(), UserDto.class);

        log.info("Getting logged in user with id: {} and email: {}", loggedInUser.getId(), loggedInUser.getEmail());

        return loggedInUser;
    }

}
