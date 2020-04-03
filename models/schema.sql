-- Drops the ecommerce db if it exists currently --
DROP DATABASE IF EXISTS ecommerce;
-- Creates the "ecommerce" database --
CREATE DATABASE ecommerce;

USE ecommerce;

create table `user_profile` (
    `uuid` varchar(50) not null, 
    `type` varchar(8) not null,
    `first_name` varchar(20) not null,
    `last_name` varchar(20) not null,
    `address_line1` varchar(255) not null,
    `address_line2` varchar(255) null, 
    `city` varchar(255) not null,
    `state` varchar(2) null,
    `postcode` varchar(20) null, 
    `country` varchar(2) not null, 
    `default` boolean not null,
     primary key (`uuid`)
);

create table `users` (
    `uuid` varchar(50) not null, 
    `email` varchar(50) not null,
    `password` varchar(50) not null,
    `first_name` varchar(20) not null,
    `last_name` varchar(20) not null,
     primary key (`uuid`)
);
