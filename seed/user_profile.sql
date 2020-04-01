use ecommerce;

create table `user_profile` (
    `uuid` varchar(255) not null, 
    `type` varchar(255) not null,
    `first_name` varchar(255) not null,
    `last_name` varchar(255) not null,
    `address_line1` varchar(255) not null,
    `address_line2` varchar(255) null, 
    `city` varchar(255) not null,
    `state` varchar(2) null,
    `postcode` varchar(255) null, 
    `country` varchar(2) not null, 
    `default` boolean not null,
     primary key (`uuid`)
);
