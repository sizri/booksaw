package com.example.ecommerce.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.ecommerce.mapper.UserMapper;
import com.example.ecommerce.model.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	  User user = userMapper.selectUserByUsername(username);
    	            
    	        // 역할을 GrantedAuthority로 변환
    	        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());

    	        return new org.springframework.security.core.userdetails.User(
    	            user.getUsername(),
    	            user.getPassword(),
    	            Collections.singletonList(authority)
    	        );
    }
}
