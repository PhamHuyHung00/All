package com.example.home.service;

import com.example.home.entity.User;

import java.awt.print.Pageable;
import java.util.List;

public interface UserService {

    List<User> getUserList();

    User addUser(User user);

    void delete(int id);
}
