package com.example.bookstore_backend.entity;


import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.util.List;


@Data
@Entity
@Table(name = "books")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "book_id")
public class Book {
    @Id
    @Column(name = "book_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int book_id;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type ;

    @Column(name = "author")
    private String author;

    @Column(name = "price_before")
    private int price_before;

    @Column(name = "price_after")
    private int price_after;

    @Column(name = "description")
    private String description;

    @Column(name = "inventory")
    private int inventory ;

    @Column(name = "image")
    private String image;



    public Book() {};


    public Book(String isbn, String name, String type, String author, int price_before, int price_after, String description, int inventory, String image) {
        this.isbn = isbn;
        this.name = name;
        this.type = type;
        this.author = author;
        this.price_before = price_before;
        this.price_after = price_after;
        this.description = description;
        this.inventory = inventory;
        this.image = image;
    }

    public Book(int book_id, String isbn, String name, String type, String author, int price_before, int price_after, String description, int inventory, String image) {
        this.book_id = book_id;
        this.isbn = isbn;
        this.name = name;
        this.type = type;
        this.author = author;
        this.price_before = price_before;
        this.price_after = price_after;
        this.description = description;
        this.inventory = inventory;
        this.image = image;
    }
}
