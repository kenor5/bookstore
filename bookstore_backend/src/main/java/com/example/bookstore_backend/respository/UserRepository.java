package com.example.bookstore_backend.respository;

import com.example.bookstore_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("from User where username = :username and password = :password")
    User checkUser(@Param("username") String username,
                   @Param("password") String password);

    @Query("from User where user_type = 1" )
    List<User> getAll();

    @Query("from User where username = :username")
    User getByUsername(@Param("username") String username);
}
