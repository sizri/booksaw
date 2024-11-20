package com.example.ecommerce.service;

import com.example.ecommerce.mapper.ProductMapper;
import com.example.ecommerce.mapper.UserMapper;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    
    @Autowired
    private ProductMapper productMapper;
    // 생성자 주입
    public UserService(UserMapper userMapper, BCryptPasswordEncoder passwordEncoder) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }
    
    public User getUserByUsername(String username) {
        return userMapper.selectUserByUsername(username);
    }

    @Transactional
    public void createUser(User user) {
        // 비밀번호 암호화
    	
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        logger.debug("Inserting user into database: {}", user);
        userMapper.insertUser(user);
        logger.debug("Inserted user with ID: {}", user.getUserId());
    }

    public User getUserById(Long userId) {
        return userMapper.selectUserById(userId);
    }

    public List<User> getAllUsers() {
        return userMapper.selectAllUsers();
    }

    @Transactional
    public void updateUser(User user) {
        // 비밀번호가 변경되었을 경우 암호화
//        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
//            user.setPassword(passwordEncoder.encode(user.getPassword())); update할때 비번변경됨 실행 x
//        }
        userMapper.updateUser(user);
    }
    @Transactional
    public void createUserWithProducts(User user, List<Product> products) {
        userMapper.insertUser(user); // userId가 자동 생성됨
        
        for (Product product : products) {
            product.setUserId(user.getUserId());
            productMapper.insertProduct(product);
        }
    }

    @Transactional
    public void deleteUser(Long userId) {
        userMapper.deleteUser(userId);
    }
}
