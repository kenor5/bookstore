package com.example.bookstore_backend.serviceimpl;

import com.example.bookstore_backend.dao.UserDao;
import com.example.bookstore_backend.entity.User;
import com.example.bookstore_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User checkUser(String username, String password) {return userDao.checkUser(username,password);}

    @Override
    public List<User> getUsers() {return userDao.getUsers();}

    @Override
    public void updateUser(String username, String password,int user_id,String state)
    {
        userDao.updateUser(username, password, user_id,state);
    }

    @Override
    public int register(String username,
                         String password,
                         String password2,
                         String email) {
        if (!Objects.equals(password, password2)) return 2;
        if (!Pattern.matches("^(\\w+([-.][A-Za-z0-9]+)*){3,18}@\\w+([-.][A-Za-z0-9]+)*\\.\\w+([-.][A-Za-z0-9]+)*$", email))
            return 3;
        return userDao.register(username, password, email);
    }
}
