package com.example.bookstore_backend.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "orders")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"}) //它是类注解，把类里面的属性忽略掉
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "order_id")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int order_id;

    private int user_id;

    private int tot_price;

    @Column(name = "order_time")
    private Date order_time;

    @OneToMany(fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    public Order(int user_id, int tot_price, Date order_time) {
        this.user_id = user_id;
        this.tot_price = tot_price;
        this.order_time = order_time;
    }

    public Order() {

    }
}
