package com.aja.e_commerce.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import com.aja.e_commerce.dto.OrderDto;
import com.aja.e_commerce.dto.ProfileOrderDto;
import com.aja.e_commerce.dto.ProfileProductDto;
import com.aja.e_commerce.enums.OrderStatusEnum;
import com.aja.e_commerce.model.Order;
import com.aja.e_commerce.model.OrderProduct;
import com.aja.e_commerce.model.Product;
import com.aja.e_commerce.repository.OrderRepository;
import com.aja.e_commerce.security.UserPrincipal;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderService {
    
    private OrderRepository orderRepository;
    private ProductService productService;
    private OrderProductService orderProductService;
    @Transactional
    public String createOrder(@AuthenticationPrincipal UserPrincipal currUser,OrderDto orderDto) {
        Order order = Order.builder()
                .user(currUser.getUser())
                .phone(orderDto.getPhone())
                .address(orderDto.getAddress())
                .district(orderDto.getDistrict())
                .city(orderDto.getCity())
                .date(new java.sql.Date(
                        Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()).getTime()))
                .status(OrderStatusEnum.PENDING)
                .build();
                
        orderRepository.save(order);
                
        for (Map.Entry<Long, Integer> entry : orderDto.getProducts().entrySet()) {
            Product product = productService.getProductById(entry.getKey());
            OrderProduct orderProduct = OrderProduct.builder()
                    .order(order)
                    .product(product)
                    .quantity(entry.getValue())
                    .build();

            orderProductService.saveOrderProduct(orderProduct);
        }
        
        return "Order saved";
    }
    
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        order.setStatus(OrderStatusEnum.CANCELLED);
        orderRepository.save(order);
    }

    public List<ProfileOrderDto> getAllOrdersForUser(long id) {
        List<Order> orders = orderRepository.findAllByUserId(id);
        List<ProfileOrderDto> profileOrderDtos = new ArrayList<>();
        for (Order order : orders) {
            long total = 0;
            List<ProfileProductDto> profileProductDtos = new ArrayList<>();
            for (OrderProduct orderProduct : orderProductService.getAllOrderProductByOrderId(order.getId())) {
                long price = orderProduct.getProduct().getPrice();
                long quantity = orderProduct.getQuantity();
                total += price * quantity;

                ProfileProductDto profileProductDto = ProfileProductDto.builder()
                        .name(orderProduct.getProduct().getName())
                        .price(price)
                        .quantity(quantity)
                        .image_path(orderProduct.getProduct().getImage_path())
                        .build();
                profileProductDtos.add(profileProductDto);
            }

            ProfileOrderDto profileOrderDto = ProfileOrderDto.builder()
                    .id(order.getId())
                    .date(order.getDate())
                    .status(order.getStatus())
                    .total(total)
                    .products(profileProductDtos)
                    .build();

            profileOrderDtos.add(profileOrderDto);
        }
        
        return profileOrderDtos;
    }

    public void deleteAllByUserId(long userId) {
        for (Order order : orderRepository.findAllByUserId(userId)) {
            orderProductService.deleteAllByOrderId(order.getId());
        }
        orderRepository.deleteAllByUserId(userId);
    }    

}
