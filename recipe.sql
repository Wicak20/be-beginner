-- Active: 1689605987242@@127.0.0.1@5432@postgres@public

CREATE TABLE
    recipe(
        id SERIAL,
        title VARCHAR NOT NULL,
        ingredients TEXT NOT NULL,
        category VARCHAR NOT NULL,
        photo VARCHAR NOT NULL
    );

-- Insert Data--

INSERT INTO
    recipe(
        title,
        ingredients,
        category,
        photo
    )
VALUES (
        'telur gulung',
        'telur, msg, bihun, saus',
        'appetizer',
        'https://placehold.co/600x400'
    );

INSERT INTO
    recipe(
        title,
        ingredients,
        category,
        photo
    )
VALUES (
        'babi panggang',
        'babi, msg, kecap, saus',
        'haram food',
        'https://placehold.co/600x400'
    );

SELECT * FROM recipe;

SELECT * FROM recipe WHERE category='appetizer';

UPDATE recipe SET category='main course' WHERE title='babi panggang';

DELETE FROM recipe WHERE id=2;

DELETE FROM recipe WHERE id=3;