package com.aja.e_commerce.dto;


import java.util.Map;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDto {
    private String phone;
    private String address;
    private String district;
    private String city;
    private Map<Long, Integer> products;
}
