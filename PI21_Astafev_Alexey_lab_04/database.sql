CREATE TABLE author ( 
 authorID int NOT NULL PRIMARY KEY,
 firstname VARCHAR(100) NOT NULL, 
 lastname VARCHAR(100) NOT NULL, 
 isDeleted boolean NOT NULL DEFAULT FALSE);
 
CREATE SEQUENCE author_seq START 1;

ALTER TABLE author ALTER COLUMN authorID SET DEFAULT nextval('author_seq');

CREATE TABLE book ( 
 bookID int NOT NULL PRIMARY KEY, 
 bookname VARCHAR(100) NOT NULL,
 price int NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 authorID int NOT NULL, 
 FOREIGN KEY (authorID) 
 REFERENCES author (authorID) ON DELETE CASCADE ON UPDATE CASCADE);
 
CREATE SEQUENCE book_seq START 1;

ALTER TABLE book ALTER COLUMN bookID SET DEFAULT nextval('book_seq');

CREATE TABLE users (
	id int NOT NULL PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);

CREATE SEQUENCE users_seq START 1;

ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_seq');