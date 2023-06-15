CREATE TABLE Books (
    ISBN varchar(255) NOT NULL UNIQUE,
    title varchar(255) NOT NULL,
    author varchar(255) NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    PRIMARY KEY (ISBN)
);

CREATE TABLE Users (
    user_id int NOT NULL AUTO_INCREMENT UNIQUE,
    password varchar(255) NOT NULL,
    user_name varchar(255) NOT NULL UNIQUE,
    user_email varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (user_id)
);

CREATE TABLE Sellers (
    seller_id int NOT NULL AUTO_INCREMENT UNIQUE,
    location varchar(255) NOT NULL,
    user_id int NOT NULL UNIQUE,
    PRIMARY KEY (seller_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ads (
    ad_id int NOT NULL AUTO_INCREMENT UNIQUE,
    ISBN varchar(255) NOT NULL,
    seller_id int NOT NULL,
    PRIMARY KEY (ad_id),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (seller_id) REFERENCES Sellers(seller_id)
);

CREATE TABLE Transitions (
    transition_id int NOT NULL AUTO_INCREMENT UNIQUE,
    ISBN varchar(255) NOT NULL,
    sale_date DATE NOT NULL,
    user_id int NOT NULL,
    seller_id int NOT NULL,
    PRIMARY KEY (transition_id),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (seller_id) REFERENCES Sellers(seller_id)
);


INSERT INTO Books(ISBN, title, author, price) VALUES
('978-3-16-148410-0', 'Book 1', 'Author 1', 0.99),
('978-3-16-148410-1', 'Book 2', 'Author 2', 99.99),
('978-3-16-148410-2', 'Book 3', 'Author 3', 50.00);

INSERT INTO Users(user_id, password, user_name, user_email) VALUES
(1, '123', 'user1', 'user1@email.com'),
(2, '456', 'user2', 'user2@email.com'),
(3, '789', 'user3', 'user3@email.com');

INSERT INTO Sellers(seller_id, location, user_id) VALUES
(1, 'Location 1', 1),
(2, 'Location 2', 2),
(3, 'Location 3', 3);

INSERT INTO Ads(ad_id, ISBN, seller_id) VALUES
(1, '978-3-16-148410-0', 1),
(2, '978-3-16-148410-1', 2),
(3, '978-3-16-148410-2', 3);

INSERT INTO Transitions(transition_id, ISBN, sale_date, user_id, seller_id) VALUES
(1, '978-3-16-148410-0', '2023-06-15', 1, 1),
(2, '978-3-16-148410-1', '2023-05-16', 2, 2),
(3, '978-3-16-148410-2', '2023-04-17', 3, 3);

DELETE FROM table_name;

SELECT Books.title, Books.author, t.sale_date
FROM Books
JOIN Transitions ON b.ISBN = t.ISBN
WHERE t.user_id = 1 AND t.sale_date >= CURDATE() - INTERVAL 30 DAY
ORDER BY t.sale_date DESC;
