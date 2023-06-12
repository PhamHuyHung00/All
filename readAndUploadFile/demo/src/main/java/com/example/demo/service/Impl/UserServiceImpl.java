package com.example.demo.service.Impl;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.criteria.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Page<User> search(Pageable page, String username, String sortFiled) {
//        List<String> sortFields
//        Sort sort = Sort.by(sortFields.toArray(new String[sortFields.size()]));
        Page<User> pageResult = userRepository.findAll(new Specification<User>() {
            @Override
            public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<>();
                if (username != null && username.trim().length() > 0) {
                    predicates.add(criteriaBuilder.and(criteriaBuilder.like(criteriaBuilder.upper(root.<String>get("userName")), "%" + username.trim().toUpperCase() + "%")));
                }
                if (sortFiled != null && !sortFiled.trim().isEmpty()) {
                    query.orderBy(criteriaBuilder.asc(root.<String>get(sortFiled)));
                }
                return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        }, page);
        return pageResult;
    }

    @Override
    public Optional<User> findUserById(Long userId) {
        if (userId == null) {
            return null;
        }
        Optional<User> getUserById = userRepository.findUserById(userId);
        if (getUserById.isEmpty()){
                throw new IllegalArgumentException("User not exist");
            }
        System.out.println("USER BY ID: " + getUserById.get());
        return getUserById;
    }

    @Override
    public User saveUser(User user) {
        if (Objects.isNull(user)){
            throw new NullPointerException("User Null");
        }
        Optional<User> userExist = userRepository.findByUserName(user.getUserName());
        if (userExist.isPresent() && user.getId() == null){
            throw new IllegalArgumentException("User exists");
        }
       return userRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        if (id == null){
            return;
        }
        Optional<User> getUserById = userRepository.findUserById(id);
        if (getUserById.isEmpty()){
            throw new IllegalArgumentException("User not exist");
        }
        userRepository.deleteById(id);
    }
}
