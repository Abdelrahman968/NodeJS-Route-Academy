CREATE DATABASE IF NOT EXISTS store_db;

USE store_db;


CREATE TABLE Suppliers (
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierName VARCHAR(100) NOT NULL,
    ContactNumber VARCHAR(20)
);

CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL,
    SupplierID INT NOT NULL,

    CONSTRAINT fk_product_supplier
        FOREIGN KEY (SupplierID)
        REFERENCES Suppliers(SupplierID) ON DELETE CASCADE
);

CREATE TABLE Sales (
    SaleID INT AUTO_INCREMENT PRIMARY KEY,
    ProductID INT NOT NULL,
    QuantitySold INT NOT NULL,
    SaleDate DATE NOT NULL,

    CONSTRAINT fk_sale_product
        FOREIGN KEY (ProductID)
        REFERENCES Products(ProductID)
);


