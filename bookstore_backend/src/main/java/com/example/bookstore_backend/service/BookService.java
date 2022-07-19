package com.example.bookstore_backend.service;

import com.example.bookstore_backend.entity.Book;

import java.util.List;

public interface BookService {

    List<Book> getBooks();
    Book getBook(int book_id);
    List<Book> getBookByIds(String [] book_ids);
    Book updateBook(
            int book_id,
            String image,
            String name,
            String type,
            String author,
            String price_after,
            String description
    );

    Book newBook(
            String isbn,
            String name,
            String type,
            String author,
            int    price_before,
            int    price_after,
            String description,
            int    inventory,
            String image
    );

    List<Book> getBooksByName(String search);
}
