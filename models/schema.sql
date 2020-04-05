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
  `default` BOOLEAN NOT NULL,
    PRIMARY KEY (`uuid`)
);

CREATE TABLE `users` (
  `uuid` VARCHAR(50) NOT NULL, 
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `last_login` BIGINT(50) NULL
  `access_token` VARCHAR(255) NULL
    PRIMARY KEY (`uuid`)
);
