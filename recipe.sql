-- Active: 1693236730455@@147.139.210.135@5432@wicak01

-- create table

CREATE TABLE
    recipe(
        id SERIAL,
        title VARCHAR NOT NULL,
        ingredients TEXT NOT NULL,
        category_id INTEGER NOT NULL,
        photo VARCHAR NOT NULL
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
        password VARCHAR NOT NULL
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

INSERT INTO category(category_name) VALUES('main course');

INSERT INTO category(category_name) VALUES('desert');

INSERT INTO category(category_name) VALUES('appetizer');

INSERT INTO
    users(name, email, password)
VALUES (
        'Rudi Hartono',
        'rudihrtn@gmail.com',
        'akusygkmu12'
    );

INSERT INTO
    users(name, email, password)
VALUES (
        'Dimas Galih',
        'dmsglih@gmail.com',
        'akusygaku123'
    );

INSERT INTO
    users(name, email, password)
VALUES (
        'Sebastian Nurah',
        'sbstinnrh@gmail.com',
        'qwerty123'
    );

INSERT INTO
    users(name, email, password)
VALUES (
        'Nilam Susi',
        'nilamsusi@gmail.com',
        'akuygtrskiti22'
    );

INSERT INTO
    users(name, email, password)
VALUES (
        'Puspa Jingga',
        'pspajngga@gmail.com',
        'ytrewq321'
    );

SELECT * FROM recipe;

SELECT * FROM recipe WHERE category='appetizer';

UPDATE recipe SET category='main course' WHERE title='babi panggang';

DELETE FROM recipe WHERE id=2;

DELETE FROM recipe WHERE id=3;

ALTER TABLE recipe ADD COLUMN created_At DATE NOT NULL;