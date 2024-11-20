package com.example.ecommerce.controller;

import com.example.ecommerce.dto.ProductRequest;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.FileStorageService;
import com.example.ecommerce.service.ProductService;
import com.example.ecommerce.service.UserService;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    @Autowired
    private ProductService productService;
    
    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserService userService;
    // 모든 제품 조회 (인증 필요 없음)
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // 특정 제품 조회 (인증 필요 없음)
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

 // 제품 생성 및 업데이트 메소드 수정
    // 제품 생성 (ADMIN 역할 필요)
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<String> createProduct(
            @Valid @RequestPart("product") ProductRequest productRequest,
            @RequestPart(value = "image", required = true) MultipartFile image) {
        logger.debug("Creating product: {}", productRequest);
        if (hasRole("ADMIN")) {
            try {
                // 인증된 사용자 정보 가져오기
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                String username = auth.getName();
                User user = userService.getUserByUsername(username);
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
                }

                // Product 객체 생성 및 사용자 ID 설정
                Product product = new Product();
                product.setTitle(productRequest.getTitle());
                product.setDescription(productRequest.getDescription());
                product.setPrice(productRequest.getPrice());
                product.setStockQuantity(productRequest.getStockQuantity());
                product.setAuthor(productRequest.getAuthor());
                product.setUserId(user.getUserId());
                product.setGenre(productRequest.getGenre());

                // 이미지 처리
                if (image != null && !image.isEmpty()) {
                	logger.debug("image not null!!");
                    String imageUrl = fileStorageService.storeFile(image);
                    product.setImageUrl(imageUrl);
                } else {
                	logger.debug("image is null!!");
                }

                productService.createProduct(product);
                return ResponseEntity.ok("Product created successfully");
            } catch (Exception e) {
                logger.error("파일 업로드 실패", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패: " + e.getMessage());
            }
        } else {
            logger.debug("hasRole ADMIN false");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: Requires ADMIN role");
        }
    }


    // 제품 업데이트 (ADMIN 역할 필요)
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<String> updateProduct(
            @PathVariable Long id,
            @Valid @RequestPart("product") ProductRequest productRequest,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        if (hasRole("ADMIN")) {
            try {
                // 인증된 사용자 정보 가져오기
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                String username = auth.getName();
                User user = userService.getUserByUsername(username);
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
                }
                
                // Product 객체 생성 및 사용자 ID 설정
                Product product = new Product();
                product.setProductId(id);
                product.setTitle(productRequest.getTitle());
                product.setDescription(productRequest.getDescription());
                product.setPrice(productRequest.getPrice());
                product.setStockQuantity(productRequest.getStockQuantity());
                product.setUserId(user.getUserId());
                product.setAuthor(productRequest.getAuthor());
                product.setGenre(productRequest.getGenre());

                // 이미지 처리
                if (image != null && !image.isEmpty()) {
                	logger.debug("notempty");
                    String imageUrl = fileStorageService.storeFile(image);
                    product.setImageUrl(imageUrl);
                }  else {
                	logger.debug("image is null!!");
                	Product p=productService.getProductById(id);
                	logger.debug("imgurl:",p.getImageUrl());
                	product.setImageUrl(p.getImageUrl());
                }

                productService.updateProduct(product);
                return ResponseEntity.ok("Product updated successfully");
            } catch (Exception e) {
                logger.error("파일 업로드 실패", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패: " + e.getMessage());
            }
        } else {
        	logger.debug(" ADMIN role이 아님");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: Requires ADMIN role");
        }
    }
    // 제품 삭제 (ADMIN 역할 필요)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        if (hasRole("ADMIN")) {
            productService.deleteProduct(id);
            return ResponseEntity.ok("Product deleted successfully");
        } else {
            return ResponseEntity.status(403).body("Forbidden: Requires ADMIN role");
        }
    }

    // 제품 목록 조회 with Pagination (인증 필요 없음)


    // Helper 메소드: 인증 상태 및 역할 확인
    private boolean hasRole(String role) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_" + role));
    }
    
    
}
