package com.example.bookstore_backend.respository;

import com.example.bookstore_backend.entity.Order;
import com.example.bookstore_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("from Order" )
    List<Order> getAll();

    @Query("from Order where user_id = :user_id" )
    List<Order> getByUserId(int user_id);
}
