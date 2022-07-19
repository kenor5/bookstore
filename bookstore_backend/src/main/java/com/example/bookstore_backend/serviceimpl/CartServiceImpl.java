package com.example.bookstore_backend.serviceimpl;

import com.example.bookstore_backend.dao.CartItemDao;
import com.example.bookstore_backend.entity.CartItem;
import com.example.bookstore_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartItemDao cartItemDao;

    @Override
    public void addToCart(int user_id, int book_id) {
        cartItemDao.addToCart(user_id, book_id);
    }

    @Override
    public List<CartItem> getCart(int user_id) {
        return cartItemDao.getCart(user_id);
    }

    @Override
    public void deleteCartByIds(String [] delete_ids) {
        cartItemDao.deleteCartByIds(delete_ids);
    }
}
