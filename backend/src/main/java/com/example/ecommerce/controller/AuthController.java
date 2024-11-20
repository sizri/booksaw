package com.example.ecommerce.controller;

import com.example.ecommerce.dto.JwtResponse;
import com.example.ecommerce.dto.LoginRequest;
import com.example.ecommerce.dto.SignupRequest;
import com.example.ecommerce.dto.UserInfo;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.UserService;
import com.example.ecommerce.security.JwtTokenProvider;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@Valid @RequestBody SignupRequest signupRequest) {

        User user = new User();
        logger.debug("before user{}", user);
        user.setUsername(signupRequest.getUsername());
        user.setPassword(signupRequest.getPassword());
        user.setEmail(signupRequest.getEmail());
        user.setRole(signupRequest.getRole());
        user.setBalance(signupRequest.getBalance());
        if(user.getRole()==null)
            user.setRole("ROLE_USER");

        logger.debug("Registering user: {}", user);
        userService.createUser(user);

        logger.debug("User registered successfully with ID: {}", user.getUserId());
        return ResponseEntity.ok("User registered successfully");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // 인증 시도
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            // 인증 성공 시 SecurityContextHolder에 설정
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String username = authentication.getName();
            String role = authentication.getAuthorities().stream()
                                .findFirst()
                                .map(auth -> auth.getAuthority())
                                .orElse("ROLE_USER");

            // JWT 토큰 생성
            String token = jwtTokenProvider.generateToken(username, role);

            logger.debug("User authenticated successfully: {}", authentication.getName());

            // 토큰을 클라이언트에게 반환
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (UsernameNotFoundException ex) {
            logger.error("Username not found: {}", loginRequest.getUsername());
            return ResponseEntity.status(401).body("Authentication failed: Invalid username");
        } catch (BadCredentialsException ex) {
            logger.error("Bad credentials for user: {}", loginRequest.getUsername());
            return ResponseEntity.status(401).body("Authentication failed: Invalid password");
        } catch (Exception ex) {
            logger.error("Authentication failed for user: {}", loginRequest.getUsername(), ex);
            return ResponseEntity.status(401).body("Authentication failed: " + ex.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserInfo> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        logger.debug("me auth인증");

        String username = authentication.getName();
        String role = authentication.getAuthorities().stream()
                            .findFirst()
                            .map(auth -> auth.getAuthority())
                            .orElse("ROLE_USER");

        UserInfo userInfo = new UserInfo(username, role);
        return ResponseEntity.ok(userInfo);
    }
}
