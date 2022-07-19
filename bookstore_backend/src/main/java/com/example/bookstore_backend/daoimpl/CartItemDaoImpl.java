package com.example.bookstore_backend.daoimpl;

import com.example.bookstore_backend.dao.CartItemDao;
import com.example.bookstore_backend.entity.Book;
import com.example.bookstore_backend.entity.CartItem;
import com.example.bookstore_backend.respository.BookRepository;
import com.example.bookstore_backend.respository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CartItemDaoImpl implements CartItemDao {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public void addToCart(int user_id, int book_id) {
        CartItem cartItem = cartItemRepository.getCartItemByBookAndUser_id(bookRepository.getById(book_id), user_id);
        if (cartItem == null) {
            cartItem = new CartItem(bookRepository.findById(book_id).get(), 1, user_id);
            cartItemRepository.save(cartItem);
        }else {
            cartItem.setBook_num(cartItem.getBook_num()+1);
            cartItemRepository.save(cartItem);
        }
    }


    @Override
    public  CartItem getCartItemByBookAndUser_id(Book book, int user_id) {
        return cartItemRepository.getCartItemByBookAndUser_id(book, user_id);
    }


    @Override
    public List<CartItem> getCart(int user_id) {
        List<CartItem> cartItems = cartItemRepository.getCartByUser_id(user_id);
        if (cartItems == null) {
            cartItems = new ArrayList<>();
        }
        return cartItems;
    }

    @Override
    public void deleteCartByIds(String [] delete_ids) {
        for (String i : delete_ids) {
            cartItemRepository.deleteById(Integer.parseInt(i));
        }
    }
}
