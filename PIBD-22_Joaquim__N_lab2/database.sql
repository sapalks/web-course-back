
CREATE TABLE company ( 
 compID int NOT NULL PRIMARY KEY, 
 name VARCHAR(40) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE);
 
CREATE SEQUENCE company_seq START 1;

ALTER TABLE company ALTER COLUMN compID SET DEFAULT nextval('company_seq');


CREATE TABLE employee ( 
 empID int NOT NULL PRIMARY KEY, 
 firstname VARCHAR(15) NOT NULL, 
 lastname VARCHAR(30) NOT NULL, 
 email VARCHAR(50) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 compID int NOT NULL, 
 FOREIGN KEY (compID) 
 REFERENCES company (compID) ON DELETE CASCADE ON UPDATE CASCADE);
 
CREATE SEQUENCE employee_seq START 1;

ALTER TABLE employee ALTER COLUMN empID SET DEFAULT nextval('employee_seq');