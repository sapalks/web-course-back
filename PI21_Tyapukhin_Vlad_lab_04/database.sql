CREATE TABLE education ( 
 educationID int NOT NULL PRIMARY KEY, 
 name VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE);
 
CREATE SEQUENCE education_seq START 1;

ALTER TABLE education ALTER COLUMN educationID SET DEFAULT nextval('education_seq');

CREATE TABLE student ( 
 studentID int NOT NULL PRIMARY KEY, 
 firstname VARCHAR(100) NOT NULL,
 lastname VARCHAR(100) NOT NULL, 
 currentGroup VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 educationID int NOT NULL, 
 FOREIGN KEY (educationID) 
 REFERENCES education (educationID) ON DELETE CASCADE ON UPDATE CASCADE);
 
CREATE SEQUENCE student_seq START 1;

ALTER TABLE student ALTER COLUMN studentID SET DEFAULT nextval('student_seq');

CREATE TABLE users (
	id int NOT NULL PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL
);

CREATE SEQUENCE users_seq START 1;

ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_seq');