-- Active: 1693236730455@@147.139.210.135@5432@wicak01

CREATE TABLE
    recipe(
        id SERIAL,
        title VARCHAR NOT NULL,
        ingredients TEXT NOT NULL,
        category_id INTEGER NOT NULL,
        photo VARCHAR NOT NULL,
        created_at TIMESTAMP NOT NULL,
        user_id INT,
        image_id VARCHAR
    );

CREATE TABLE
    category(
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR NOT NULL
    );

CREATE TABLE
    users(
        id SERIAL,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        roles VARCHAR,
        image VARCHAR(255),
        image_id VARCHAR(255)
    );

-- insert DATABASE

INSERT INTO category(category_name) VALUES('main course');

INSERT INTO category(category_name) VALUES('desert');

INSERT INTO category(category_name) VALUES('appetizer');