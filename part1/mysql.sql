CREATE TABLE Books (
    ISBN varchar(255) NOT NULL UNIQUE,
    title varchar(255) NOT NULL,
    auther varchar(255) NOT NULL,
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
    user_id varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (seller_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Ads (
    ad_id int NOT NULL AUTO_INCREMENT UNIQUE,
    ISBN varchar(255) NOT NULL,
    seller_id varchar(255) NOT NULL,
    PRIMARY KEY (ad_id),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN)
);

CREATE TABLE Transitions (
    transition_id int NOT NULL AUTO_INCREMENT UNIQUE,
    ISBN varchar(255) NOT NULL,
    sale_date DATE NOT NULL,
    user_id int NOT NULL,
    sellers_id int NOT NULL,
    PRIMARY KEY (transition_id),
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
);