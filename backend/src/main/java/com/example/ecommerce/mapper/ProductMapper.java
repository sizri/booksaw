package com.example.ecommerce.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.ecommerce.model.Product;

@Mapper
public interface ProductMapper {
    void insertProduct(Product product);
    Product selectProductById(@Param("productId") Long productId);
    List<Product> selectAllProducts();
    List<Product> selectProductsByUserId(@Param("userId") Long userId);
    void updateProduct(Product product);
    void deleteProduct(@Param("productId") Long productId);
    

}