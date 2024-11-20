package com.example.ecommerce.dto;

import lombok.Data;

@Data
public class UserInfo {
    private String username;
    private String role;

    public UserInfo(String username, String role) {
        this.username = username;
        this.role = role;
   
    }

}