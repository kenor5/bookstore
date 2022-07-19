package com.example.bookstore_backend.controller;

import com.example.bookstore_backend.entity.CartItem;
import com.example.bookstore_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

//    @CrossOrigin
    @RequestMapping("/addToCart")
    public void addToCart(@RequestParam("user_id")int user_id,
                          @RequestParam("book_id")int book_id) {
        cartService.addToCart(user_id, book_id);
    }

//    @CrossOrigin
    @RequestMapping("/getCart")
    public @ResponseBody
    List<CartItem> getCart(@RequestParam("user_id")int user_id) {
        return cartService.getCart(user_id);
    }

    @RequestMapping("/deleteCartByIds")
    public void deleteCartByIds(@RequestParam("delete_ids")String [] delete_ids) {
        cartService.deleteCartByIds(delete_ids);
    }

}
