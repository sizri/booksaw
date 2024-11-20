package com.example.ecommerce.model;

import java.time.LocalDateTime;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class Product {
    private Long productId;

    @NotBlank(message = "Product name is mandatory")
    private String title;
    @NotNull
    private String description;

    @NotNull(message = "Price is mandatory")
    @Positive(message = "Price must be positive")
    private Double price;
    @NotNull
    private Integer stockQuantity;
    @NotNull
    private String imageUrl;
    @NotNull
    private String author;
    
    @NotNull
    private String genre;

    private LocalDateTime createdAt;

    @NotNull(message = "User ID is mandatory")
    private Long userId; // 외래 키 필드 추가
}
