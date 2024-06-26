package com.aja.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aja.e_commerce.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}