-- Database: social_network 

-- DROP DATABASE IF EXISTS "social_network ";

CREATE DATABASE "social_network "
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE "social_network "
    IS 'База данных для социальной сети';


-- enum 
CREATE TYPE gender AS enum ('male', 'female');
CREATE TYPE tag AS enum ('#news', '#food', '#cats');


-- Пользователи 
CREATE TABLE users (
	id serial PRIMARY KEY,
	email varchar(50) UNIQUE NOT NULL, 
	firstname varchar(50) NOT NULL, 
	lastname varchar(50) NOT NULL,
	gender gender NOT NULL,
	birthday timestamp
);

-- 
ALTER TABLE users ALTER COLUMN birthday TYPE date;

-- данные пользователей 
INSERT INTO users (email, firstname, lastname, gender, birthday) VALUES ('ivanov@mail.ru', 'Иван', 'Иванов', 'male', '2000-01-01');
INSERT INTO users (email, firstname, lastname, gender, birthday) VALUES ('petrov@mail.ru', 'Петр', 'Петров', 'male', '2000-01-02');
INSERT INTO users (email, firstname, lastname, gender, birthday) VALUES ('s@mail.ru', 'Анна', 'Сидорова', 'female', '2000-01-03');

UPDATE users SET lastname = 'Иванова' WHERE id = 3


-- Посты 
CREATE TABLE posts (
	id serial PRIMARY KEY,
	user_id integer NOT NULL REFERENCES users(id), 
	text text NOT NULL, 	 
	datetime timestamp NOT NULL, 
	tags tag[]
);

ALTER TABLE posts ADD COLUMN count_like integer DEFAULT 0;
ALTER TABLE posts ADD COLUMN count_dislike integer DEFAULT 0;


INSERT INTO posts (user_id, text, datetime, tags, count_like, count_dislike) VALUES ('3', 'С добрым утром! Мой завтрак', '2024-03-19 09:00:00', '{"#food"}', 10, 100);
INSERT INTO posts (user_id, text, datetime, tags, count_like, count_dislike) VALUES ('3', 'Вот еще и мой кот', '2024-03-19 09:00:10', '{"#news", "#cats"}', 100, 0);
INSERT INTO posts (user_id, text, datetime, tags, count_like, count_dislike) VALUES ('1', 'Биткоин снова растет', '2024-03-19 10:00:00', '{"#news"}', 10, 10);

-- Комментарии 
CREATE TABLE comments (
	post_id integer,
	number serial,
	user_id integer NOT NULL REFERENCES users(id), 
	text text NOT NULL, 	 
	datetime timestamp NOT NULL,
	PRIMARY KEY (post_id, number)
);

INSERT INTO comments (post_id, number, user_id, text, datetime) VALUES (1, 1, 2, 'Первый!', '2024-03-19 11:00:00');
INSERT INTO comments (post_id, number, user_id, text, datetime) VALUES (1, 2, 1, 'Тогда я второй', '2024-03-19 11:00:05');
INSERT INTO comments (post_id, number, user_id, text, datetime) VALUES (3, 1, 2, 'Пора продавать!', '2024-03-19 11:00:05');

-- выборка данных 
SELECT p.id, 
	   p.text,	   
	   u.firstname,
	   u.lastname, 
	   p.datetime,
	   p.tags, 
	   c.number AS comment_number, 
	   c.text AS comment_text, 	   
	   cu.firstname AS comment_fname,
	   cu.lastname AS comment_lname,  
	   c.datetime AS comment_time
	FROM posts as p 
	JOIN users AS u ON p.user_id = u.id 
	LEFT JOIN comments AS c ON p.id = c.post_id 
	LEFT JOIN users AS cu ON c.user_id = cu.id 
	ORDER BY p.id