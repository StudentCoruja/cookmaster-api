CREATE DATABASE IF NOT EXISTS cookmaster_db;
USE cookmaster_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'manager', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    ingredients VARCHAR(150) NOT NULL,
    preparation TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE recipes_categories (
    recipe_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, role) VALUES
('Alice', 'alice@example.com', '$2a$10$X6cEPjJIh8s/SCPK5miWEuBju53SjwTYLKFRutxN2X6rK7kenzKa.', 'user'), -- senha 123456Aline
('Bob', 'bob@example.com', '$2a$10$1zpIVxz7NNxaGBwxarmhIudSAGWo8eXSwLbCHvFZ/5Mq78cQybHZ2', 'manager'), -- senha 123456Bob
('Charlie', 'charlie@example.com', '$2a$10$gWS8gVy2xxRlndgLEinHJeURKmF2peMe3pr3Fiyr54d9Qrkwqc5qa', 'admin'); -- senha 123456Charlie

INSERT INTO categories (name) VALUES
('Sobremesa'),
('Vegano'),
('Pizzas'),
('Low Carb');

INSERT INTO recipes (user_id, title, ingredients, preparation) VALUES
(1, 'Bolo de Chocolate', 'Farinha, Açúcar, Chocolate, Ovos', 'Misture os ingredientes e asse por 30 minutos'),
(2, 'Salada Vegana', 'Alface, Tomate, Cenoura, Limão', 'Misture todos os ingredientes em uma tigela'),
(1, 'Pizza de Frango com Catupiry', 'Massa de pizza, Frango desfiado, Catupiry, Molho de tomate, Queijo', 'Espalhe o molho sobre a massa, adicione o frango, catupiry e queijo. Asse por 20 minutos'),
(2, 'Sopa de Legumes', 'Batata, Cenoura, Abobrinha, Caldo de legumes', 'Cozinhe todos os legumes no caldo até ficarem macios e bata no liquidificador se preferir'),
(3, 'Panqueca de Aveia e Banana', 'Aveia, Banana, Ovo, Canela', 'Misture os ingredientes e asse em uma frigideira quente até dourar dos dois lados'),
(1, 'Brownie de Nozes', 'Chocolate, Manteiga, Farinha, Açúcar, Nozes, Ovos', 'Derreta o chocolate com a manteiga, adicione os ingredientes secos, depois os ovos e asse por 25 minutos'),
(3, 'Lasanha Vegetariana', 'Massa de lasanha, Molho de tomate, Berinjela, Abobrinha, Queijo', 'Monte as camadas alternando entre molho, massa e legumes. Finalize com queijo e asse por 40 minutos');

INSERT INTO recipes_categories (recipe_id, category_id) VALUES
(1, 1), -- Bolo de Chocolate: Sobremesa
(2, 2), -- Salada Vegana: Vegano
(3, 1), -- Pizza de Frango com Catupiry: Pizzas
(4, 2), -- Sopa de Legumes: Vegano
(5, 4), -- Panqueca de Aveia e Banana: Low Carb
(6, 1), -- Brownie de Nozes: Sobremesa
(7, 2); -- Lasanha Vegetariana: Vegano
