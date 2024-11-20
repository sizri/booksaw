package com.example.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    
    @NotBlank(message = "Username is mandatory")
    private String username;
    
    @NotBlank(message = "Password is mandatory")
    private String password;

    // Getters and Setters
    // (Lombok을 사용하는 경우 @Data 어노테이션을 추가하여 자동 생성 가능)
}
