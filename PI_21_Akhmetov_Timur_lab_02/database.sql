CREATE TABLE speciality ( 
 specialityID int NOT NULL PRIMARY KEY, 
 name VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE);
 
CREATE SEQUENCE speciality_seq START 1;

ALTER TABLE speciality ALTER COLUMN specialityID SET DEFAULT nextval('speciality_seq');

CREATE TABLE student ( 
 studentID int NOT NULL PRIMARY KEY, 
 firstname VARCHAR(100) NOT NULL, 
 lastname VARCHAR(100) NOT NULL, 
 isDeleted boolean NOT NULL DEFAULT FALSE,
 specialityID int NOT NULL, 
 FOREIGN KEY (specialityID) 
 REFERENCES speciality (specialityID) ON DELETE CASCADE ON UPDATE CASCADE);
 
CREATE SEQUENCE student_seq START 1;

ALTER TABLE student ALTER COLUMN studentID SET DEFAULT nextval('student_seq');