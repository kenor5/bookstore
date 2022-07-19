package com.example.bookstore_backend.respository;

import com.example.bookstore_backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("select b from Book b")
    List<Book> getBooks();

}
