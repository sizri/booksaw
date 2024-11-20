//package com.example.ecommerce;
//
//import com.example.ecommerce.mapper.ProductMapper;
//import com.example.ecommerce.mapper.UserMapper;
//import com.example.ecommerce.model.Product;
//import com.example.ecommerce.model.User;
//
//import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;
//
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@SpringBootTest
//@Transactional
//public class UserProductIntegrationTest {
//
//    @Autowired
//    private UserMapper userMapper;
//
//    @Autowired
//    private ProductMapper productMapper;
//
//    @Test
//    public void testInsertAndSelectUserWithProducts() {
//        // 사용자 생성
//        User user = new User();
//        user.setUsername("john_doe");
//        user.setPassword("password123");
//        user.setEmail("john@example.com");
//        user.setBalance(1000.0);
//        user.setRole("ROLE_USER");
//
//        // 사용자 삽입
//        userMapper.insertUser(user);
//        Assertions.assertNotNull(user.getUserId(), "User ID should not be null after insertion");
//
//        // 제품 목록 생성
//        List<Product> products = new ArrayList<>();
//
//        Product product1 = new Product();
//        product1.setName("Product A");
//        product1.setDescription("Description A");
//        product1.setPrice(20.0);
//        product1.setStockQuantity(100);
//        product1.setImageUrl("http://example.com/image1.jpg");
//        product1.setUserId(user.getUserId()); // userId 설정
//
//        Product product2 = new Product();
//        product2.setName("Product B");
//        product2.setDescription("Description B");
//        product2.setPrice(30.0);
//        product2.setStockQuantity(200);
//        product2.setImageUrl("http://example.com/image2.jpg");
//        product2.setUserId(user.getUserId()); // userId 설정
//
//        products.add(product1);
//        products.add(product2);
//        System.out.println("user.getUserId():"+user.getUserId());
//        // 제품 삽입
//        for (Product product : products) {
//            productMapper.insertProduct(product);
//            Assertions.assertNotNull(product.getProductId(), "Product ID should not be null after insertion");
//        }
//
//        // 사용자와 관련된 제품 조회
//        User retrievedUser = userMapper.selectUserById(user.getUserId());
//        Assertions.assertNotNull(retrievedUser, "Retrieved user should not be null");
//        Assertions.assertEquals("john_doe", retrievedUser.getUsername(), "Username should match");
//        Assertions.assertEquals(2, retrievedUser.getProducts().size(), "User should have 2 products");
//        System.out.println("retrievedUser.getProducts()"+retrievedUser.getProducts());
//        // 제품 검증
//        for (Product p : retrievedUser.getProducts()) {
//            Assertions.assertNotNull(p.getProductId(), "Product ID should not be null");
//            Assertions.assertEquals(user.getUserId(), p.getUserId(), "Product's userId should match the user");
//        }
//    }
//}
