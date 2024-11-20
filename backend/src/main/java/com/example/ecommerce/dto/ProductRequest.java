// src/main/java/com/example/ecommerce/dto/ProductRequest.java
package com.example.ecommerce.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class ProductRequest {

    @NotBlank(message = "제품 이름은 필수입니다.")
    private String title;

    @NotBlank(message = "제품 설명은 필수입니다.")
    private String description;

    @NotNull(message = "가격은 필수입니다.")
    @PositiveOrZero(message = "가격은 0 이상이어야 합니다.")
    private Double price;

    @NotNull(message = "재고 수량은 필수입니다.")
    @Min(value = 0, message = "재고 수량은 0 이상이어야 합니다.")
    private Integer stockQuantity;
    @NotNull(message = "author is null")
    private String author;
    @NotNull(message = "genre is null")
    private String genre;

    // Getters and Setters

   
}
