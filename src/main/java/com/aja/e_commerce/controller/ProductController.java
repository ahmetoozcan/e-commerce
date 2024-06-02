package com.aja.e_commerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aja.e_commerce.service.ProductService;

import lombok.AllArgsConstructor;
import com.aja.e_commerce.model.Product;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/public/product")
public class ProductController {

    private ProductService productService;

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAll();
    }
}
