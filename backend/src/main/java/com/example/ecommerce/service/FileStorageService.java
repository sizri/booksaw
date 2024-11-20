package com.example.ecommerce.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {
	
	private static final Logger logger = LoggerFactory.getLogger(FileStorageService.class);

    private final Path fileStorageLocation;

    public FileStorageService(@Value("${image.upload.dir}") String uploadDir) throws IOException {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(this.fileStorageLocation);
    }

    @Value("${file.upload-dir}")
    private String uploadDir;
 
    public String storeFile(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        String fileExtension = "";

        if (originalFileName != null && originalFileName.contains(".")) {
            fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        String fileName = UUID.randomUUID().toString() + fileExtension;

        Path targetLocation = Paths.get(uploadDir).resolve(fileName);

        try {
            Files.createDirectories(targetLocation.getParent());
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            logger.debug("\"/uploads/\" + fileName::::"+"/uploads/" + fileName);
            return "/uploads/" + fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }
    
    public void deleteFile(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) {
            return;
        }

        // imageUrl이 "/uploads/filename.ext" 형식이라고 가정
        String fileName = Paths.get(imageUrl).getFileName().toString();

        Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();

        try {
            Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            // 로그를 남기거나 예외 처리를 추가할 수 있습니다.
            throw new RuntimeException("Could not delete file " + fileName + ". Please try again!", ex);
        }
    }

}
