package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.entity.Book;
import com.example.bookstore_backend.entity.Order;
import com.example.bookstore_backend.entity.OrderItem;
import com.example.bookstore_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping("/addToOrder")
    public void addToOrder(@RequestParam("book_ids")String[] book_ids,
                           @RequestParam("book_nums")String[] book_nums,
                           @RequestParam("user_id")int user_id,
                           @RequestParam("price")int price ) {
        orderService.addToOrder(book_ids,book_nums, user_id, price);

    }

    @RequestMapping("/getOrders")
    public @ResponseBody
    List<Order> getOrders() {
        List<Order> orders = orderService.getOrders();
        for (Order order : orders) {
            List<OrderItem> orderItems = order.getOrderItems();
            for (OrderItem orderItem : orderItems) {
                Book book = orderItem.getBook();
//                System.out.println((orderItem.getOrder_item_id() + ""));
//                System.out.println(book.getName());
                orderItem.setBook(new Book(
                        book.getBook_id(),
                        book.getIsbn(),
                        book.getName(),
                        book.getType(),
                        book.getAuthor(),
                        book.getPrice_before(),
                        book.getPrice_after(),
                        book.getDescription(),
                        book.getInventory(),
                        book.getImage()
                ));

            }
        }
        return orders;

    }

    @RequestMapping("/getOrder")
    public @ResponseBody
    List<Order> getOrder(@RequestParam("user_id") int user_id) {
        List<Order> orders = orderService.getOrder(user_id);
        for (Order order : orders) {
            List<OrderItem> orderItems = order.getOrderItems();
            for (OrderItem orderItem : orderItems) {
                Book book = orderItem.getBook();
                orderItem.setBook(new Book(
                        book.getBook_id(),
                        book.getIsbn(),
                        book.getName(),
                        book.getType(),
                        book.getAuthor(),
                        book.getPrice_before(),
                        book.getPrice_after(),
                        book.getDescription(),
                        book.getInventory(),
                        book.getImage()
                ));

            }
        }
        return orders;

    }

    @RequestMapping("/getAdminOrderByName")
    public @ResponseBody
    List<Order> getAdminOrderByName (@Param("name") String name) {
        List<Order> tmp = getOrders();
        List<Order> rt = new ArrayList<>();
        for (Order order : tmp) {
            List<OrderItem> orderItems = order.getOrderItems();
            for (OrderItem orderItem : orderItems) {
                Book book = orderItem.getBook();
                if (book.getName().contains(name)) {
                    rt.add(order);
                    break;
                }
            }
        }
        return rt;
    }

    @RequestMapping("/getAdminOrderByRange")
    public @ResponseBody
    List<Order> getAdminOrderByRange (
            @Param("start") String start,
            @Param("end") String end
                                     ) throws ParseException {
        String format = "yyyy-MM-dd";
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date startTime = sdf.parse(start);
        Date endTime = sdf.parse(end);

        List<Order> tmp = getOrders();
        List<Order> rt = new ArrayList<>();
        for (Order order : tmp) {
            Date date = order.getOrder_time();
            if (startTime.compareTo(date) <= 0 &&
                   endTime.compareTo(date) >= 0
            )
                rt.add(order);
        }
        return rt;
    }

    @RequestMapping("/getUserOrderByRange")
    public @ResponseBody
    List<Order> getUserOrderByRange (
            @Param("user_id") int user_id,
            @Param("start") String start,
            @Param("end") String end
    ) throws ParseException {
        String format = "yyyy-MM-dd";
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date startTime = sdf.parse(start);
        Date endTime = sdf.parse(end);

        List<Order> tmp = getOrder(user_id);
        List<Order> rt = new ArrayList<>();
        for (Order order : tmp) {
            Date date = order.getOrder_time();
            if (startTime.compareTo(date) <= 0 &&
                    endTime.compareTo(date) >= 0
            )
                rt.add(order);
        }
        return rt;
    }

    @RequestMapping("/getUserOrderByName")
    public @ResponseBody
    List<Order> getUserOrderByName (
            @Param("user_id") int user_id,
            @Param("name") String name) {
        List<Order> tmp = getOrder(user_id);
        List<Order> rt = new ArrayList<>();
        for (Order order : tmp) {
            List<OrderItem> orderItems = order.getOrderItems();
            for (OrderItem orderItem : orderItems) {
                Book book = orderItem.getBook();
                if (book.getName().contains(name)) {
                    rt.add(order);
                    break;
                }
            }
        }
        return rt;
    }

    @RequestMapping("/removeOrder")
    public @ResponseBody
    int removeOrder(@Param("order_id")int order_id) {
        return orderService.removeOrder(order_id);
    }

}
