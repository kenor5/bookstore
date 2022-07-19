package com.example.bookstore_backend.dao;

import com.example.bookstore_backend.entity.User;

import java.util.List;

public interface UserDao {
    User checkUser(String username, String password);

    List<User> getUsers();

    void updateUser(String username, String password,int user_id,String state);

    int register(String username,
                 String password,
                 String email);
}
