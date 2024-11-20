package com.example.ecommerce.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.User;

import lombok.Data;
@Data
public class UserResponseDTO {
    private Long id;
    private String username;
    private String password; //test
    private String email;
    private Double balance;
    private String role;
    private LocalDateTime createdAt;
    private List<Product> products;
    // password 필드 제외, getters, setters
    public UserResponseDTO(User user) {
        this.id = user.getUserId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.balance = user.getBalance();
        this.role = user.getRole();
        this.products = user.getProducts();
        this.createdAt = user.getCreatedAt();
        this.password=user.getPassword(); //test
    }
}
