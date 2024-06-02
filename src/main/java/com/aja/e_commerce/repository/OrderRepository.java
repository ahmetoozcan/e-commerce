package com.aja.e_commerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aja.e_commerce.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    void deleteAllByUserId(Long userId);
    List<Order> findAllByUserId(Long userId);
}