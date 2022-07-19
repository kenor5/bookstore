package com.example.bookstore_backend.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "cart_items")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "cart_item_id")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private int cart_item_id;


    @ManyToOne(fetch = FetchType.EAGER,optional=false)
//    @JSONField(serialize = false)
//    @JsonIgnore
//    @JsonBackReference
//    @JsonIgnoreProperties(value = {"price_before"}, ignoreUnknown = true)
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "book_num")
    private int book_num;

    @Column(name = "user_id")
    @JsonBackReference
    private int user_id;

    public CartItem(){};

    public CartItem(Book book, int book_num, int user_id) {
        this.book = book;
        this.book_num = book_num;
        this.user_id = user_id;
    }
}
