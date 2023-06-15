CREATE TABLE Books (
    ISBN varchar(255) NOT NULL UNIQUE,
    title varchar(255) NOT NULL,
    auther varchar(255) NOT NULL,
    price varchar(255) NOT NULL,
    PRIMARY KEY (ISBN)
);

CREATE TABLE Users (
    user_id varchar(255) NOT NULL AUTO_INCREMENT UNIQUE,
    password varchar(255) NOT NULL,
    user_name varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE Ads (
    ad_id int NOT NULL AUTO_INCREMENT UNIQUE,
    ISBN varchar(255) NOT NULL,
    seller_id varchar(255) NOT NULL,
    PRIMARY KEY (ad_id)
);

CREATE TABLE Books (
    ISBN varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    auther varchar(255) NOT NULL,
    price varchar(255) NOT NULL,
    PRIMARY KEY (ISBN)
);