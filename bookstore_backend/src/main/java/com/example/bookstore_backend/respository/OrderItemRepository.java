package com.example.bookstore_backend.respository;

import com.example.bookstore_backend.entity.OrderItem;
import com.example.bookstore_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    @Query("from OrderItem where order_id = :order_id" )
    List<OrderItem> getOrderItemByOrderId(@Param("order_id") int order_id);
}
