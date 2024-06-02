package com.aja.e_commerce.dto;

import java.sql.Date;
import java.util.List;

import com.aja.e_commerce.enums.OrderStatusEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileOrderDto {
    private Long id;
    private Date date;
    private OrderStatusEnum status;
    private Long total;
    private List<ProfileProductDto> products;
}
