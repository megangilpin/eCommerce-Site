use ecommerce;

create table `users` (
    `uuid` varchar(255) not null, 
    `email` varchar(255) not null,
    `password` varchar(255) not null,
     primary key (`uuid`)
);
