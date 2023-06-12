package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
 Optional<User> findByUserName(String name);

 @Query(value = "SELECT * FROM User u WHERE u.id = :u_id", nativeQuery = true)
 Optional<User> findUserById(@Param("u_id") Long userId);

}
