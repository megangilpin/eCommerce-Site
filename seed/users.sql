use ecommerce; 

create table `users` (
	`uuid` int(11) not null, 
    `email` varchar(255) not null,
	`password` varchar(255) not null,
	primary key (`uuid`)
);
