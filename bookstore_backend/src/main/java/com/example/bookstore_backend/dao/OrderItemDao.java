package com.example.bookstore_backend.dao;

import com.example.bookstore_backend.entity.OrderItem;

import java.util.Set;

public interface OrderItemDao {
    void addOrder(int book_id, int book_num, int order_id);

    void removeOrder(int order_id);
}
