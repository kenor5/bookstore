package com.example.bookstore_backend.serviceimpl;

import com.example.bookstore_backend.dao.OrderDao;
import com.example.bookstore_backend.dao.OrderItemDao;
import com.example.bookstore_backend.entity.Order;
import com.example.bookstore_backend.entity.OrderItem;
import com.example.bookstore_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderItemDao orderItemDao;

    @Override
    public void addToOrder(String[] book_ids, String[] book_nums,int user_id, int price) {
        Date date = new Date();
        SimpleDateFormat sim = new SimpleDateFormat("yyyy-MM-dd");
        String h_updateTime = sim.format(date);
        Order order = orderDao.addOrder(user_id, java.sql.Date.valueOf(h_updateTime), price);
        int order_id = order.getOrder_id();
//        System.out.println(order_id);
        for (int i = 0; i < book_ids.length; ++i) {
            orderItemDao.addOrder(Integer.parseInt(book_ids[i]), Integer.parseInt(book_nums[i]), order_id);
        }
    }

    @Override
    public List<Order>getOrders() {
        return orderDao.getOrders();
    }

    @Override
    public int removeOrder(int order_id) {
        orderDao.removeOrder(order_id);
        orderItemDao.removeOrder(order_id);
        return 0;
    }

    @Override
    public List<Order>getOrder(int user_id) {
        return orderDao.getOrder(user_id);
    }
}
