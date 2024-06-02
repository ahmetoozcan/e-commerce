package com.aja.e_commerce.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aja.e_commerce.dto.OrderDto;
import com.aja.e_commerce.dto.ProfileOrderDto;
import com.aja.e_commerce.security.UserPrincipal;
import com.aja.e_commerce.service.OrderService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/private/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<String> createOrder(@AuthenticationPrincipal UserPrincipal currUser,
            @RequestParam long userId, @RequestBody OrderDto orderDto) {
        if (!Long.valueOf(currUser.getUserId()).equals(userId)) {
            return ResponseEntity.badRequest().body("Invalid user id");
        }

        return ResponseEntity.ok(orderService.createOrder(currUser, orderDto));
    }

    
    @GetMapping("/all")
    public ResponseEntity<List<ProfileOrderDto>> getAllOrdersForUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        if (currentUser == null) {
            throw new IllegalArgumentException("User not found");
        }

        return ResponseEntity.ok(orderService.getAllOrdersForUser(currentUser.getUserId()));
    }

    @PutMapping("/cancel")
    public ResponseEntity<?> cancelOrder(@RequestParam Long orderId, @RequestParam Long userId,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        if (!currentUser.getUserId().equals(userId)) {
            return ResponseEntity.status(Response.SC_FORBIDDEN).body("Invalid user id");
        }
        orderService.cancelOrder(orderId);
        return ResponseEntity.status(Response.SC_OK).body("Order cancelled successfully");
    }
}
