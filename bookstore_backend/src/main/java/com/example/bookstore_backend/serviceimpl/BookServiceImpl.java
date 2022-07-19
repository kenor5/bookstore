package com.example.bookstore_backend.serviceimpl;


import com.example.bookstore_backend.dao.BookDao;
import com.example.bookstore_backend.entity.Book;
import com.example.bookstore_backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public List<Book> getBooks() {
        List<Book> list = bookDao.getBooks();
        return list;
    }

    @Override
    public Book getBook(int book_id) {
        return bookDao.getBook(book_id);
    }

    @Override
    public List<Book> getBookByIds(String [] book_ids){ return bookDao.getBookByIds(book_ids);}

    @Override
    public Book updateBook(
            int book_id,
            String image,
            String name,
            String type,
            String author,
            String price_after,
            String description
    ) {
        return bookDao.updateBook(
                book_id,
                image,
                name,
                type,
                author,
                price_after,
                description
        );
    }

    @Override
    public
    List<Book> getBooksByName(String search) {
        return bookDao.getBooksByName(search);
    }

    @Override
    public
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
    ) {
        return bookDao.newBook(
                isbn,
                name,
                type,
                author,
                price_before,
                price_after,
                description,
                inventory,
                image
        );
    }
}
