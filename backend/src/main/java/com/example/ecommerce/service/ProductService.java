package com.example.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ecommerce.mapper.ProductMapper;
import com.example.ecommerce.model.Product;

@Service
public class ProductService {
    private final ProductMapper productMapper;
    private final FileStorageService fileStorageService;

    @Autowired
    public ProductService(ProductMapper productMapper, FileStorageService fileStorageService) {
        this.productMapper = productMapper;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    public void createProduct(Product product) {
        productMapper.insertProduct(product);
    }

    public Product getProductById(Long productId) {
        return productMapper.selectProductById(productId);
    }

    public List<Product> getAllProducts() {
        return productMapper.selectAllProducts();
    }


    @Transactional
    public void updateProduct(Product product) {
        productMapper.updateProduct(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
    	 Product product = productMapper.selectProductById(id);
         if (product != null) {
             String imageUrl = product.getImageUrl();
             // 이미지 파일을 삭제합니다.
             fileStorageService.deleteFile(imageUrl);
             // 제품을 삭제합니다.
             productMapper.deleteProduct(id);
         }
    }
}