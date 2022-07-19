package com.example.bookstore_backend.service;

import com.example.bookstore_backend.entity.Order;
import com.example.bookstore_backend.entity.OrderItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    void addToOrder(String[] book_ids,String[] book_nums, int user_id, int price);

    List<Order>getOrders();

    List<Order>getOrder(int user_id);

    int removeOrder(int order_id);
}
