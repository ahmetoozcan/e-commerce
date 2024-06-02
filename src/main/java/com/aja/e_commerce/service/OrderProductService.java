package com.aja.e_commerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aja.e_commerce.model.OrderProduct;
import com.aja.e_commerce.repository.OrderProductRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderProductService {
    
    private OrderProductRepository orderProductRepository;

    public List<OrderProduct> getAllOrderProductByOrderId(Long orderId) {
        return orderProductRepository.getAllByOrderId(orderId);
    }

    public OrderProduct saveOrderProduct(OrderProduct orderProduct) {
        return orderProductRepository.save(orderProduct);
    }

    public void deleteAllByOrderId(Long orderId) {
        orderProductRepository.deleteAllByOrderId(orderId);
    }
}
