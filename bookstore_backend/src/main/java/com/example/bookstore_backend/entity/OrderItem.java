package com.example.bookstore_backend.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.*;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "order_items")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "order_item_id")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private int order_item_id;


    @ManyToOne
    @JoinColumn(name = "book_id")
    @NotNull
    private Book book;


    private int order_id;

    @Column(name = "book_num")
    private int book_num;

    public OrderItem(Book book, int order_id, int book_num) {
        this.book = book;
        this.order_id = order_id;
        this.book_num = book_num;
    }

    public OrderItem(int order_id, int book_num) {
        this.order_id = order_id;
        this.book_num = book_num;
    }

    public OrderItem() {}
}
