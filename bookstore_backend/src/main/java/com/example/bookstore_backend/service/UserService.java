package com.example.bookstore_backend.service;

import com.example.bookstore_backend.entity.User;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface UserService {

    User checkUser(String username, String password);
    void updateUser(String username, String password,int user_id,String state);
    List<User> getUsers();
    int register(String username,
                  String password,
                  String password2,
                  String email);
}
