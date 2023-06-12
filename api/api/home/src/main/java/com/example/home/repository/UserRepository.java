package com.example.home.repository;

import com.example.home.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM user  WHERE name LIKE %:searchName% ", nativeQuery = true)
    Page<User> findUserList (@Param("searchName") String searchName, Pageable pageable);
}
