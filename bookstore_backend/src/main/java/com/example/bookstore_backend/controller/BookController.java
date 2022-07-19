package com.example.bookstore_backend.controller;


import com.alibaba.fastjson.JSONObject;
import com.example.bookstore_backend.entity.Book;
import com.example.bookstore_backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;

//    @CrossOrigin
    @RequestMapping("/getBooks")
    public @ResponseBody
    List<Book> getBooks() {return bookService.getBooks();}

    @RequestMapping("getBooksByName")
    public @ResponseBody
    List<Book> getBooksByName(
            @RequestParam("search") String search
    ) {return bookService.getBooksByName(search);}

    @RequestMapping("/updateBook")
    public @ResponseBody
    Book updateBook(
            @RequestParam("book_id")int book_id,
            @RequestParam("image")String image,
            @RequestParam("name")String name,
            @RequestParam("type")String type,
            @RequestParam("author")String author,
            @RequestParam("price_after")String price_after,
            @RequestParam("description")String description
    ) {return bookService.updateBook(book_id,
            image,
            name,
            type,
            author,
            price_after,
            description);}


    @RequestMapping("/newBook")
    public @ResponseBody
    Book newBook( @RequestParam("isbn")         String isbn,
                  @RequestParam("name")         String name,
                  @RequestParam("type")         String type,
                  @RequestParam("author")       String author,
                  @RequestParam("price_before") int    price_before,
                  @RequestParam("price_after")  int    price_after,
                  @RequestParam("description")  String description,
                  @RequestParam("inventory")    int    inventory,
                  @RequestParam("image")        String image
    ) {return bookService.newBook(
            isbn,
            name,
            type,
            author,
            price_before,
            price_after,
            description,
            inventory,
            image);
    }


//    @CrossOrigin
    @RequestMapping("/getBook")
    public @ResponseBody
    Book getBook(@RequestParam("book_id")int book_id) {
        return bookService.getBook(book_id);
    }

//    @CrossOrigin
    @RequestMapping("/getBookByIds")
    public @ResponseBody
    List<Book> getBookByIds(@RequestParam("book_ids")String[] book_ids) {
        return bookService.getBookByIds(book_ids);
    }


}
