package com.example.ecommerce.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ShopDTO {
	
	@NotNull
    private Long productId;
 
    private Integer count;

    @NotNull(message = "User ID is mandatory")
    private Long userId; // 외래 키 필드 추가
}
	


