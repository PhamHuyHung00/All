package com.example.home.service.Impl;

import com.example.home.entity.User;
import com.example.home.repository.UserRepository;
import com.example.home.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    public Page<User> fetchUserDataPageWithFiltering(String searchName, int page, int pageSize, List<String> sortList, String sortOrder){
        Pageable pageable = PageRequest.of(page , pageSize, Sort.by(createSortOrder(sortList, sortOrder)));
       return userRepo.findUserList(searchName, pageable );
    }

    private List<Sort.Order> createSortOrder(List<String> sortList, String sortDirection) {
        List<Sort.Order> sorts = new ArrayList<>();
        Sort.Direction direction;
        for (String sort : sortList) {
            if (sortDirection != null) {
                direction = Sort.Direction.fromString(sortDirection);
            } else {
                direction = Sort.Direction.DESC;
            }
            sorts.add(new Sort.Order(direction, sort));
        }
        return sorts;
    }

    @Override
    public List<User> getUserList() {
        return userRepo.findAll();
    }

    @Override
    public User addUser(User user) {
        return null;
    }

    @Override
    public void delete(int id) {

    }
}
