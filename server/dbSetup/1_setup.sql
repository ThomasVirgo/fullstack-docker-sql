DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial UNIQUE,
    email varchar(255),
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);


