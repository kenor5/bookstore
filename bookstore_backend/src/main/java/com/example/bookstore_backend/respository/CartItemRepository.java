package com.example.bookstore_backend.respository;

import com.example.bookstore_backend.entity.Book;
import com.example.bookstore_backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    @Query("from CartItem where user_id = :user_id")
    List<CartItem> getCartByUser_id(@Param("user_id") int user_id);

    @Query("from CartItem where user_id = :user_id and book = :book")
    CartItem getCartItemByBookAndUser_id(Book book, int user_id);
}
