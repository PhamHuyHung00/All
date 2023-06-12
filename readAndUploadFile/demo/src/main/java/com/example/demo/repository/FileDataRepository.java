package com.example.demo.repository;

import com.example.demo.entity.FileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileDataRepository extends JpaRepository<FileData, Long> {
    Optional<FileData> findByName(String name);
}
