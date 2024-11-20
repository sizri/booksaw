package com.example.ecommerce.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.dto.ShopDTO;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.ProductService;
import com.example.ecommerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/shop")
public class ShopController {
	
	private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    @Autowired
    private ProductService productService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    


    @Autowired
    private UserService userService;
    @PostMapping
    public ResponseEntity<String> buyBooks(@Valid @RequestBody List<ShopDTO> shopData){
    	
    	String info="";
    	int sum=0;

    		try {
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                String username = auth.getName();
                User user = userService.getUserByUsername(username);
             
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
                }
              
    		for(ShopDTO shopdto : shopData) {
    			  Product p=productService.getProductById(shopdto.getProductId());
    			if(p.getStockQuantity()<shopdto.getCount()) {
        			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(p.getTitle()+"의 재고가 부족합니다");
        		}
    			sum+=p.getPrice()*shopdto.getCount();
    		}
    		if(user.getBalance()<sum) {
    			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(user.getUsername()+"님의 잔액이 부족합니다");
    		}
    			
    	for(ShopDTO shopdto : shopData) {
    		  Product p=productService.getProductById(shopdto.getProductId());
    		user.setBalance(user.getBalance()-(p.getPrice()*shopdto.getCount()));
    		userService.updateUser(user);
    		p.setStockQuantity(p.getStockQuantity()-shopdto.getCount());
    		if(p.getStockQuantity()==0) {
    			productService.deleteProduct(p.getProductId());
    			info+="'"+p.getTitle()+"'이 매진되었습니다 ";
    		}
    		productService.updateProduct(p);
    		
    		
    	}
    	
    	return ResponseEntity.ok(info+"shop 완료");
    	
    	
    		} catch(Exception e) {
    			logger.error("shop 실패",e);
    		
    			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("shop 실패");
    			
    		}
    	

    	
    	
    	
    }
    
    
    
    
    
    private boolean hasRole(String role) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_" + role));
    }
 
}
