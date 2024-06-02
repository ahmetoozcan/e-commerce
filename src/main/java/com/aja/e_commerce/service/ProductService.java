package com.aja.e_commerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aja.e_commerce.model.Product;
import com.aja.e_commerce.repository.ProductRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepository productRepository;

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getAll() {
        return productRepository.findAll();         
    }
    
}
