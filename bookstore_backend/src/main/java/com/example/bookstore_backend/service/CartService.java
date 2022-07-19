package com.example.bookstore_backend.service;

import com.example.bookstore_backend.entity.CartItem;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CartService {
    void addToCart(int user_id, int book_id);
    List<CartItem> getCart(int user_id);
    void deleteCartByIds(String [] delete_ids);
}
