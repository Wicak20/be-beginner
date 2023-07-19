-- Active: 1689605987242@@127.0.0.1@5432@postgres@public

-- create table

CREATE TABLE
    recipe(
        id SERIAL,
        title VARCHAR NOT NULL,
        ingredients TEXT NOT NULL,
        category_id VARCHAR NOT NULL,
        photo VARCHAR NOT NULL
    );

CREATE TABLE
    category(
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );

-- Insert Data--

INSERT INTO
    recipe(
        title,
        ingredients,
        category_id,
        photo
    )
VALUES (
        'telur gulung',
        'telur, msg, bihun, saus',
        '3',
        'https://placehold.co/600x400'
    );

INSERT INTO category(name) VALUES('main course');

INSERT INTO category(name) VALUES('desert');

INSERT INTO category(name) VALUES('appetizer');

SELECT * FROM recipe;

SELECT * FROM recipe WHERE category='appetizer';

UPDATE recipe SET category='main course' WHERE title='babi panggang';

DELETE FROM recipe WHERE id=2;

DELETE FROM recipe WHERE id=3;