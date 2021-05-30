CREATE SEQUENCE direction_seq START 1;
CREATE SEQUENCE schoolboy_seq START 1;
CREATE SEQUENCE users_seq START 1;

CREATE TABLE direction ( 
    directionID int NOT NULL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    isDeleted boolean NOT NULL DEFAULT FALSE
);
 
ALTER TABLE direction ALTER COLUMN directionID SET DEFAULT nextval('direction_seq');

CREATE TABLE schoolboy ( 
    schoolboyID int NOT NULL PRIMARY KEY, 
    fullname VARCHAR(100) NOT NULL,
    classNumber int NOT NULL,
    isDeleted boolean NOT NULL DEFAULT FALSE,
    directionID int NOT NULL, 
    FOREIGN KEY (directionID) 
    REFERENCES direction (directionID) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE schoolboy ALTER COLUMN schoolboyID SET DEFAULT nextval('schoolboy_seq');

CREATE TABLE users (
	id int NOT NULL PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);

ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_seq');