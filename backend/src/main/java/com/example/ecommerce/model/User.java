package com.example.ecommerce.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class User implements UserDetails {
    private Long userId;

    @NotBlank(message = "유저이름 필요")
    @Size(max = 50, message = "유저이름 최대 50")
    private String username;

    @NotBlank(message = "패스워드 필요")
//    @Size(min = 8, message = "패스워드 8자이상")
    private String password;

    @NotBlank(message = "이메일 필요")
    @Email(message = "이메일은 유효해야합니다")
    @Size(max = 100, message = "최대 100자")
    private String email;

    @NotNull(message = "잔액필요")
    private Double balance; // 잔액 필드 추가

    private LocalDateTime createdAt;

    private String role; // 사용자 역할 (예: ROLE_USER, ROLE_ADMIN)

    private List<Product> products; // 일대다 관계 필드 추가

    // UserDetails 인터페이스 메소드 구현
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(role));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 계정이 만료되지 않았음을 나타냅니다.
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 계정이 잠기지 않았음을 나타냅니다.
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 자격 증명이 만료되지 않았음을 나타냅니다.
    }

    @Override
    public boolean isEnabled() {
        return true; // 계정이 활성화되었음을 나타냅니다.
    }
}
