package com.example.demo.service;

import com.example.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface UserService {
    Page<User> search(Pageable pageable, String username, String sortFiled);

    Optional<User> findUserById (Long userId);

    User saveUser(User user);

    void deleteById(Long id);
}
