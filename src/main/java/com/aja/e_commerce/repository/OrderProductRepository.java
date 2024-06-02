package com.aja.e_commerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aja.e_commerce.model.OrderProduct;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {
    List<OrderProduct> getAllByOrderId(Long orderId);
    void deleteAllByOrderId(Long orderId);
}