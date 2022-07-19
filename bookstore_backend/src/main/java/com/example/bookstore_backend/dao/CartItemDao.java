package com.example.bookstore_backend.dao;

import com.example.bookstore_backend.entity.Book;
import com.example.bookstore_backend.entity.CartItem;

import java.util.List;

public interface CartItemDao {
    void addToCart(int user_id, int book_id);
    List<CartItem> getCart(int user_id);
    void deleteCartByIds(String [] delete_ids);

    CartItem getCartItemByBookAndUser_id(Book book, int user_id);
}
