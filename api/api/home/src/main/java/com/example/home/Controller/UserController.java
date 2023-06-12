package com.example.home.Controller;

import com.example.home.entity.User;
import com.example.home.repository.UserRepository;
import com.example.home.service.Impl.UserServiceImpl;
import com.example.home.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private UserService userService;


    @GetMapping("/test")
    public List<User> findAllUser () {
       return userService.getUserList();
    }
    @GetMapping
    Page<User> fetchUserAsFilteredList(@RequestParam(defaultValue = "", required = false) String searchName,
                                       @RequestParam(defaultValue = "0", required = false) int page,
                                       @RequestParam(defaultValue = "30", required = false) int size,
                                       @RequestParam(defaultValue = "") List<String> sortList,
                                       @RequestParam(defaultValue = "DESC") Sort.Direction sortOrder) {
        return userServiceImpl.fetchUserDataPageWithFiltering(searchName, page, size, sortList, sortOrder.toString());
    }

    @PostMapping("/add")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            User addUser = userRepository.save(user);
            return new ResponseEntity<>(addUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
