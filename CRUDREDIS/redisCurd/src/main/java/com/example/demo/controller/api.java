package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class api {

    @Autowired
    private ProductDao dao;

    @PostMapping
    public Product save (@RequestBody Product product){
        return dao.save(product);
    }

    @GetMapping
    public List<Product> getAllProduct(){
        return dao.findAll();
    }

    @GetMapping("/{id}")
    public Product findProduct(@PathVariable int id){
        return dao.findProductById(id);
    }

    @DeleteMapping("/{id}")
    public String remove (@PathVariable int id){
     return dao.deleteProduct(id);
    }
}
