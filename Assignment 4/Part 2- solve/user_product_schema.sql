CREATE DATABASE store;

USE store;

CREATE TABLE User (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName  VARCHAR(50) NOT NULL,
    userName  VARCHAR(50) NOT NULL,
    phone     VARCHAR(20) UNIQUE,
    email     VARCHAR(100) NOT NULL UNIQUE,
    role      VARCHAR(30),
    password  VARCHAR(255) NOT NULL
);

CREATE TABLE Product (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(100) NOT NULL,
    stock     INT DEFAULT 0,
    isDeleted BOOLEAN DEFAULT FALSE,
    price     DECIMAL(10,2) NOT NULL,
    userId    INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id)
);