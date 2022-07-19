package com.example.bookstore_backend.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name = "users")
@DynamicInsert
@DynamicUpdate
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "user_id")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int user_id;

    @Column(name = "user_type")
    private int user_type;
    private int state;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "tel")
    private String tel;

    @Column(name = "address")
    private String address;

    @Column(name = "username")
//    @JsonIgnore
    private String username;

    @Column(name = "password")
//    @JsonIgnore
    private String password;

    public User() {}

    public User(int user_type, int state, String username, String password) {
        this.user_type = user_type;
        this.state = state;
        this.username = username;
        this.password = password;
    }

    public User(int user_type, int state, String address, String username, String password) {
        this.user_type = user_type;
        this.state = state;
        this.address = address;
        this.username = username;
        this.password = password;
    }
}
