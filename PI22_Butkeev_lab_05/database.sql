CREATE TABLE class (  
 classID int NOT NULL PRIMARY KEY,  
 name VARCHAR(100) NOT NULL,  
 isDeleted boolean NOT NULL DEFAULT FALSE);  

CREATE TABLE student ( 
 studentID int NOT NULL PRIMARY KEY, 
 login VARCHAR(100) NOT NULL, 
 mail VARCHAR(100) NOT NULL, 
 division VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 classID int NOT NULL, 
 FOREIGN KEY (classID) 
 REFERENCES class (classID) ON DELETE CASCADE ON UPDATE CASCADE);  

CREATE TABLE users (
	id int NOT NULL PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);


CREATE SEQUENCE class_seq START 1; 
CREATE SEQUENCE student_seq START 1;
CREATE SEQUENCE users_seq START 1;

ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_seq');
ALTER TABLE class ALTER COLUMN classID SET DEFAULT nextval('class_seq');
ALTER TABLE student ALTER COLUMN studentID SET DEFAULT nextval('student_seq');