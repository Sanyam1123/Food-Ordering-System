CREATE DATABASE FoodOrderingSystem;
USE FoodOrderingSystem;

CREATE TABLE Customer (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contact_number INT UNIQUE
);
CREATE TABLE Vehicles (
    vehicle_id INT PRIMARY KEY,
    type VARCHAR(50),
    registration_number INT UNIQUE,
    availability_status VARCHAR(30)
);
CREATE TABLE Delivery_Person (
    delivery_person_id INT PRIMARY KEY,
    name VARCHAR(100),
    contact_number INT UNIQUE,
    vehicle_id INT,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id)
);
CREATE TABLE Restaurants (
    restaurant_id INT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(200),
    food_type VARCHAR(10),
    contact_number INT
);
CREATE TABLE Menu_Items (
    item_id INT PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(200),
    price DECIMAL(10,2),
    restaurant_id INT,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    order_time TIME,
    order_date DATE,
    total_amount DECIMAL(10,2),
    customer_id INT,
    delivery_person_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (delivery_person_id) REFERENCES Delivery_Person(delivery_person_id)
);
CREATE TABLE Order_Details (
    order_id INT,
    item_id INT,
    PRIMARY KEY (order_id, item_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (item_id) REFERENCES Menu_Items(item_id)
);
CREATE TABLE Payment (
    payment_id INT PRIMARY KEY,
    order_id INT,
    amount DECIMAL(10,2),
    status VARCHAR(20),
    payment_method VARCHAR(20),
    payment_date DATE,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);