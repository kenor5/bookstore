package com.example.bookstore_backend.daoimpl;

import com.example.bookstore_backend.dao.OrderDao;
import com.example.bookstore_backend.entity.Order;
import com.example.bookstore_backend.entity.OrderItem;
import com.example.bookstore_backend.respository.OrderItemRepository;
import com.example.bookstore_backend.respository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public Order addOrder(int user_id, Date date, int price) {
        Order order = new Order(user_id, price, date);
        orderRepository.save(order);
        return order;
    }

    @Override
    public List<Order>getOrders() {
        List<Order> rt = orderRepository.getAll();
        for (Order order : rt) {
            List<OrderItem> tmp = orderItemRepository.getOrderItemByOrderId(order.getOrder_id());
            order.setOrderItems(tmp);
        }
        return rt;
    }

    @Override
    public void removeOrder(int order_id) {
        orderRepository.deleteById(order_id);
    }

    @Override
    public List<Order>getOrder(int user_id) {
        List<Order> rt = orderRepository.getByUserId(user_id);
        for (Order order : rt) {
            List<OrderItem> tmp = orderItemRepository.getOrderItemByOrderId(order.getOrder_id());
            order.setOrderItems(tmp);
        }
        return rt;
    }
}
