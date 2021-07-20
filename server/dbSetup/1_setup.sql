DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    age int NOT NULL
);

DROP TABLE IF EXISTS user_data;

CREATE TABLE user_data (
    id serial UNIQUE,
    name varchar(255),
    age int,
    username varchar(255),
    password varchar(255)
);


