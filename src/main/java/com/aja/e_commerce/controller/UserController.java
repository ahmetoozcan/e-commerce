package com.aja.e_commerce.controller;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aja.e_commerce.dto.UserDto;
import com.aja.e_commerce.security.UserPrincipal;
import com.aja.e_commerce.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/private/user")
public class UserController {
    private UserService userService;

    @GetMapping("/auth")
    public ResponseEntity<UserDto> getLoggedInUser() {
         return ResponseEntity.status(Response.SC_OK).body(userService.getLoggedInUser());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> removeUserAccount(@AuthenticationPrincipal UserPrincipal currentUser,@RequestParam Long userId) {
        userService.removeUserAccount(currentUser,userId);
        return ResponseEntity.status(Response.SC_OK).body("User account removed successfully");
    }
}
