package com.example.ecommerce.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.dto.UserResponseDTO;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // 생성자 주입
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    

    // 사용자 추가
    @PostMapping
    public ResponseEntity<String> createUser(@Valid @RequestBody User user) {
       	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
        	 userService.createUser(user);
        	 logger.debug("User created successfully with username: {}", user.getUsername());
             return ResponseEntity.ok("User created successfully with username: " + user.getUsername());
        } else {
        	return ResponseEntity.status(403).body("Forbidden: Requires ADMIN role");
        }
       
      
    }

    // 사용자 조회
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable("id") Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            // User 객체를 직접 UserResponseDTO 생성자에 전달
            UserResponseDTO responseDTO = new UserResponseDTO(user);
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
      
    }

    // 모든 사용자 조회
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        if (users != null && !users.isEmpty()) {
            List<UserResponseDTO> responseDTOs = new ArrayList<>();
            for (User user : users) {
                UserResponseDTO dto = new UserResponseDTO(user);
                responseDTOs.add(dto);
            }
            return ResponseEntity.ok(responseDTOs);
        } else {
           
        	return ResponseEntity.notFound().build();
        }
    }

    // 사용자 수정
    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable("id") Long userId, @Valid @RequestBody User user) {
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            user.setUserId(userId);
            userService.updateUser(user);
            logger.debug("User updated successfully with ID: {}", userId);
            return ResponseEntity.ok("User updated successfully");
        } else {
            return ResponseEntity.status(403).body("Forbidden: Requires ADMIN role");
        }
    }

    // 사용자 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) {
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            userService.deleteUser(userId);
            logger.debug("User deleted successfully with ID: {}", userId);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(403).body("Forbidden: Requires ADMIN role");
        }
    }
}

