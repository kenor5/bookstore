package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.entity.User;
import com.example.bookstore_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/register")
    public @ResponseBody
    int register(@RequestParam("username")String username,
                   @RequestParam("password") String password,
                   @RequestParam("password2") String password2,
                   @RequestParam("email") String email) {
        return userService.register(username,password,password2, email);
    }

    @RequestMapping("/checkUser")
    public @ResponseBody
    User checkUser(@RequestParam("username")String username,
                   @RequestParam("password") String password) {
        return userService.checkUser(username,password);
    }

    @RequestMapping("/getUsers")
    public @ResponseBody
    List<User> getUsers() {
        return userService.getUsers();
    }

    @RequestMapping("/updateUser")
//    @CrossOrigin
    public @ResponseBody
    void updateUser(@RequestParam("user_id") int user_id,
                   @RequestParam("username")String username,
                   @RequestParam("password") String password,
                    @RequestParam("state") String state
                   ) {
        userService.updateUser(username,password, user_id,state);
    }

}
