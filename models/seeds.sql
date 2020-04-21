INSERT INTO users (uuid, email, password, first_name, last_name)
VALUES ("1234456789", "youremail@mail.com", "password", "Jane", "Doe");

INSERT INTO products (`id`, `name`, `category_id`, `price`, `size`,
`color`, `description`, `image`) VALUES (1, 'Shirt',  1, 100.00, 'small',
'green', 'test product', '/images/products/green-shirt.png');
INSERT INTO products (`id`, `name`, `category_id`, `price`, `size`,
`color`, `description`, `image`) VALUES (2, 'Shirt',  1, 100.00, 'medium',
'red', 'test product', '/images/products/red-shirt.png');
INSERT INTO products (`id`, `name`, `category_id`, `price`, `size`,
`color`, `description`, `image`) VALUES (3, 'Skirt',  1, 100.00, 'medium',
'yellow', 'test product', '/images/products/yellow-skirt.png');
INSERT INTO products (`id`, `name`, `category_id`, `price`, `size`,
`color`, `description`, `image`) VALUES (4, 'Shirt',  1, 100.00, 'large',
'orange', 'test product', '/images/products/orange-shirt.png');