
CREATE TABLE rooms ( 
 roomsID int NOT NULL PRIMARY KEY, 
 name VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE);
 
CREATE SEQUENCE rooms_seq START 1;

ALTER TABLE rooms ALTER COLUMN roomsID SET DEFAULT nextval('rooms_seq');


CREATE TABLE person ( 
 personID int NOT NULL PRIMARY KEY, 
 firstname VARCHAR(100) NOT NULL, 
 lastname VARCHAR(100) NOT NULL, 
 currentGroup VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 roomsID int NOT NULL, 
 FOREIGN KEY (roomsID) 
 REFERENCES rooms (roomsID) ON DELETE CASCADE ON UPDATE CASCADE);
 
CREATE SEQUENCE person_seq START 1;

ALTER TABLE person ALTER COLUMN personID SET DEFAULT nextval('person_seq');