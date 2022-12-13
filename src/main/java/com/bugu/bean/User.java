package com.bugu.bean;

public class User {

    private Long id;
    private String username;
    private String password;
    private String QQEmail;
    private String phone;

    public User() {
    }

    public User(Long id, String username, String password, String QQEmail, String phone) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.QQEmail = QQEmail;
        this.phone = phone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getQQEmail() {
        return QQEmail;
    }

    public void setQQEmail(String QQEmail) {
        this.QQEmail = QQEmail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", QQEmail='" + QQEmail + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
