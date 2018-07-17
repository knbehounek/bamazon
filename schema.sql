DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    Item_ID MEDIUMINT AUTO_INCREMENT NOT NULL,
    Product_Name VARCHAR(100) NOT NULL,
    Department_Name VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock_Quantity INT(10) NOT NULL,
    primary key(ItemID)
)
