package com.example.bookstore_backend.dao;

import com.example.bookstore_backend.entity.Order;
import com.example.bookstore_backend.entity.OrderItem;

import java.sql.Date;
import java.util.List;

public interface OrderDao {
    Order addOrder(int user_id, Date date, int price);

    List<Order>getOrders();
    List<Order>getOrder(int user_id);


    void removeOrder(int order_id);
}
