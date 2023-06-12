package com.example.demo.service;

import com.example.demo.entity.FileData;
import com.example.demo.entity.ImageData;
import com.example.demo.repository.FileDataRepository;
import com.example.demo.repository.StorageRepository;
import com.example.demo.util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class StorageService {

    @Autowired
    private StorageRepository storageRep;

    @Autowired
    private FileDataRepository fileDataRep;

    private final String FOLDER_PART = "C:/imageJava/";

    public String uploadImage(MultipartFile file) throws IOException {
        ImageData imageData = storageRep.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
        if (imageData != null) {
            return "File uploaded successfully : " + file.getOriginalFilename();
        }
        return null;
    }

    public byte[] downloadImage(String fileName) {
        Optional<ImageData> dbImageData = storageRep.findByName(fileName);
        byte[] images = ImageUtils.decompressImage(dbImageData.get().getImageData());
        return images;
    }

    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
        String filePath = FOLDER_PART + file.getOriginalFilename();
        FileData fileData = fileDataRep.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());

        file.transferTo(new File(filePath));

        if (fileData != null) {
            return "File uploaded successfully: " + filePath;
        }
        return null;
    }

    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<FileData> fileData = fileDataRep.findByName(fileName);
        if (fileData.isPresent()) {
            String filePart = fileData.get().getFilePath();
            byte[] images = Files.readAllBytes(new File(filePart).toPath());
            return images;
        }
        return null;
    }
}
