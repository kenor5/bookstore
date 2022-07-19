package com.example.bookstore_backend.daoimpl;


import com.alibaba.fastjson.JSONObject;
import com.example.bookstore_backend.dao.BookDao;
import com.example.bookstore_backend.entity.Book;
import com.example.bookstore_backend.respository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> getBooks(){return bookRepository.getBooks();}

    @Override
    public Book getBook(int book_id) {return bookRepository.getById(book_id);}

    @Override
    public List<Book> getBookByIds(String [] book_ids){
        List<Book> rt = new ArrayList<>();
        for (String i: book_ids) {
            rt.add(bookRepository.getById(Integer.parseInt(i)));
        }
        return rt;
    }

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
        Book cur = getBook(book_id);
//        System.out.println(name);
        if (!Objects.equals(name, "!")) cur.setName(name);
        if (!Objects.equals(image, "!")) cur.setImage(image);
        if (!Objects.equals(type, "!")) cur.setType(type);
        if (!Objects.equals(author, "!")) cur.setAuthor(author);
        if (!Objects.equals(price_after, "!")) cur.setPrice_after(123);
        if (!Objects.equals(description, "!")) cur.setDescription(description);
        if (Objects.equals(name, "!")&&
                Objects.equals(image, "!")&&
            Objects.equals(type, "!")&&
            Objects.equals(author, "!")&&
            Objects.equals(price_after, "!")&&
            Objects.equals(description, "!"))
            bookRepository.delete(cur);
        else
            bookRepository.save(cur);
        return cur;
    }

    @Override
    public
    List<Book> getBooksByName(String search) {
        List<Book> all = bookRepository.findAll();
        List<Book> rt = new ArrayList<>();
        for (Book b : all) {
            if (b.getName().contains(search))
                rt.add(b);
        }
        return rt;
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
        Book book = new Book(isbn,
                name,
                type,
                author,
                price_before,
                price_after,
                description,
                inventory,
                image);
        bookRepository.save(book);
        return book;
    }
}
