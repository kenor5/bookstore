package com.example.bookstore_backend.daoimpl;

import com.example.bookstore_backend.dao.OrderItemDao;
import com.example.bookstore_backend.entity.Book;
import com.example.bookstore_backend.entity.OrderItem;
import com.example.bookstore_backend.respository.BookRepository;
import com.example.bookstore_backend.respository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Repository
public class OrderItemDaoImpl implements OrderItemDao {
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private BookRepository bookRepository;


    @Override
    public void addOrder(int book_id, int book_num, int order_id) {
        OrderItem orderItem = new OrderItem(
                                order_id,
                                book_num);
        Book book = bookRepository.getById(book_id);
        book.setInventory(book.getInventory() - book_num);
        bookRepository.save(book);

        orderItem.setBook(bookRepository.findById(book_id).get());
        orderItemRepository.save(orderItem);
    }

    @Override
    public void removeOrder(int order_id) {
        List<OrderItem> orderItems = orderItemRepository.getOrderItemByOrderId(order_id);
        for (OrderItem orderItem : orderItems)
            orderItemRepository.deleteById(orderItem.getOrder_item_id());
    }
}
