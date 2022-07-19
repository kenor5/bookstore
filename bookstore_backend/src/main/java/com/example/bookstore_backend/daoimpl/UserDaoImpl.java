package com.example.bookstore_backend.daoimpl;

import com.example.bookstore_backend.dao.UserDao;
import com.example.bookstore_backend.entity.User;
import com.example.bookstore_backend.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User checkUser(String username, String password){

        return userRepository.checkUser(username,password);
    }

    @Override
    public List<User> getUsers()  {
        List<User> rt = userRepository.getAll();
        if (rt == null) {
            rt = new ArrayList<>();
        }
        return rt;
    }

    @Override
    public void updateUser(String username, String password,int user_id,String state) {
        User user;
        if (user_id == -1) {
            user = userRepository.getByUsername(username);
            if (user != null) return;
            user = new User(1,1, username, password);
            userRepository.save(user);
            return;
        }
        else
            user = userRepository.getById(user_id);

        if (!Objects.equals(username, "!")) user.setUsername(username);
        if (!Objects.equals(password, "!")) user.setPassword(password);
        if (!Objects.equals(state, "!")) user.setState(Integer.parseInt(state));
        if (Objects.equals(username, "!") && Objects.equals(password, "!") && Objects.equals(state, "!"))
            userRepository.delete(user);
        else userRepository.save(user);
    }

    @Override
    public int register(String username,
                        String password,
                        String email) {
        User tmp = userRepository.getByUsername(username);
        if (tmp != null) return 1;
        tmp = new User(1, 1, email, username, password);
        userRepository.save(tmp);
        return 0;
    }

}
