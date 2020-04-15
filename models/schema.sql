-- Drops the ecommerce db if it exists currently --
DROP DATABASE IF EXISTS ecommerce;
-- Creates the "ecommerce" database --
CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE `user_profile` (
  `uuid` VARCHAR(50) NOT NULL, 
  `type` VARCHAR(8) NOT NULL,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `address_line1` VARCHAR(255) NOT NULL,
  `address_line2` VARCHAR(255) NULL, 
  `city` VARCHAR(255) NOT NULL,
  `state` VARCHAR(2) NULL,
  `postcode` VARCHAR(20) NULL, 
  `country` VARCHAR(2) NOT NULL, 
  `primary` BOOLEAN NOT NULL,
    PRIMARY KEY (`uuid`)
);

CREATE TABLE `users` (
  `created` BIGINT(50) NOT NULL,
  `uuid` VARCHAR(50) NOT NULL, 
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `last_login` BIGINT(50) NULL,
  `access_token` VARCHAR(255) NULL,
    PRIMARY KEY (`uuid`)
);

CREATE TABLE `products` (
  `id` INTEGER NOT NULL, 
  `name` VARCHAR(50) NOT NULL,
  `category_id` INTEGER NOT NULL, 
  `price` INTEGER(20) NOT NULL,
  `size` VARCHAR(20) NOT NULL,
  `color` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `reviews` (
  `id`  INTEGER NOT NULL AUTO_INCREMENT,
  `product_id` INTEGER NOT NULL,
  `commnent` VARCHAR(225) NULL,
  `rating` INTEGER NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE `categories` (
  `id`  INTEGER NOT NULL AUTO_INCREMENT,   
  `title` VARCHAR(100) NOT NULL,
  `parent_id` INTEGER NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (parent_id) REFERENCES categories (id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

