DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    Item_ID INT AUTO_INCREMENT NOT NULL,
    Product_Name VARCHAR(100) NOT NULL,
    Department_Name VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock_Quantity INT(10) NOT NULL,
    primary key(Item_ID)
);

select * from products;

INSERT INTO products(Product_Name, Department_Name, Price, Stock_Quantity)
VALUES 
	("FitBit", "FITNESS", 150.99, 150),
    ("Mac & Cheese", "GROCERIES", 1.99, 200),
    ("Monster Hunter World", "ENTERTAINMENT", 49.99, 50),
    ("Jurassic Park T-shirt", "CLOTHING", 25.00, 5),
	("Weights", "FITNESS", 29.99, 75),
    ("Bacon", "GROCERIES", 7.99, 100),
    ("Zero Horizon", "ENTERTAINMENT", 49.99, 40),
    ("Nike Running Shoes", "CLOTHING", 40.00, 15),
    ("Jurassic World", "ENTERTAINMENT", 19.99, 45),
    ("Risk", "ENTERTAINMENT", 24.99, 30);
    
CREATE TABLE Departments(
    DepartmentID INT AUTO_INCREMENT NOT NULL,
    Department_Name VARCHAR(50) NOT NULL,
    OverHeadCosts DECIMAL(10,2) NOT NULL,
    TotalSales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(DepartmentID));

INSERT INTO Departments(Department_Name, OverHeadCosts, TotalSales)
VALUES 
	('ENTERTAINMENT', 50000.00, 15000.00),
    ('HOME', 30000.00, 15000.00),
    ('FITNESS', 3000.00, 12000.00),
    ('GROCERIES', 1200.00, 15000.00),
    ('KIDS', 40000.00, 12000.00),
    ('CLOTHING', 35000.00, 15000.00);